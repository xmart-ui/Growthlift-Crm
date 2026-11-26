
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from database import (
    users_collection,
    customers_collection,
    businesses_collection,
    leads_collection
     
)


from database import (
    users_collection,
    customers_collection
)

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_access_token
)


app = FastAPI(
    title="GrowthLift CRM API",
    description="Backend API for GrowthLift Digital CRM",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# OAUTH2 AUTHENTICATION
# =====================================

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# =====================================
# PYDANTIC MODELS
# =====================================

class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class CustomerRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str
    company: str
    status: str = "active"


class CustomerUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    company: str | None = None
    status: str | None = None


# =====================================
# HELPER FUNCTION
# =====================================

def serialize_customer(customer):
    return {
        "id": str(customer["_id"]),
        "name": customer["name"],
        "email": customer["email"],
        "phone": customer["phone"],
        "company": customer["company"],
        "status": customer["status"]
    }


# =====================================
# HOME ROUTE
# =====================================

@app.get("/")
async def home():
    return {
        "message": "GrowthLift CRM Backend Running"
    }


# =====================================
# DATABASE TEST
# =====================================

@app.get("/test-db")
async def test_database():
    try:
        await users_collection.find_one({})

        return {
            "message": "MongoDB Connected Successfully"
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {str(error)}"
        )


# =====================================
# SIGNUP API
# =====================================

@app.post("/signup")
async def signup(user: SignupRequest):

    existing_user = await users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hash_password(user.password)
    }

    await users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully",
        "name": user.name,
        "email": user.email
    }


# =====================================
# LOGIN API
# =====================================

@app.post("/login")
async def login(user: LoginRequest):

    existing_user = await users_collection.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_correct = verify_password(
        user.password,
        existing_user["hashed_password"]
    )

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        existing_user["email"]
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"]
        }
    }


# =====================================
# GET CURRENT LOGGED-IN USER
# =====================================

async def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    email = verify_access_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = await users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user


# =====================================
# GET ALL USERS
# =====================================

@app.get("/users")
async def get_users(
    current_user: dict = Depends(get_current_user)
):

    users = []

    async for user in users_collection.find():
        users.append({
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        })

    return {
        "users": users
    }


# =====================================
# PROTECTED DASHBOARD API
# =====================================

@app.get("/dashboard")
async def dashboard(
    current_user: dict = Depends(get_current_user)
):

    return {
        "message": "Welcome to GrowthLift CRM Dashboard",
        "user": {
            "name": current_user["name"],
            "email": current_user["email"]
        }
    }


# =====================================
# CREATE CUSTOMER
# =====================================

@app.post("/customers")
async def create_customer(
    customer: CustomerRequest,
    current_user: dict = Depends(get_current_user)
):

    new_customer = customer.model_dump()

    new_customer["owner_email"] = current_user["email"]

    result = await customers_collection.insert_one(
        new_customer
    )

    return {
        "message": "Customer created successfully",
        "customer_id": str(result.inserted_id)
    }


# =====================================
# GET ALL CUSTOMERS
# =====================================

@app.get("/customers")
async def get_customers(
    current_user: dict = Depends(get_current_user)
):

    customers = []

    cursor = customers_collection.find({
        "owner_email": current_user["email"]
    })

    async for customer in cursor:
        customers.append(serialize_customer(customer))

    return {
        "total": len(customers),
        "customers": customers
    }


# =====================================
# UPDATE CUSTOMER
# =====================================

@app.put("/customers/{customer_id}")
async def update_customer(
    customer_id: str,
    customer: CustomerUpdate,
    current_user: dict = Depends(get_current_user)
):

    try:
        object_id = ObjectId(customer_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid customer ID"
        )

    update_data = customer.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No update data provided"
        )

    result = await customers_collection.update_one(
        {
            "_id": object_id,
            "owner_email": current_user["email"]
        },
        {
            "$set": update_data
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return {
        "message": "Customer updated successfully"
    }


# =====================================
# DELETE CUSTOMER
# =====================================

@app.delete("/customers/{customer_id}")
async def delete_customer(
    customer_id: str,
    current_user: dict = Depends(get_current_user)
):

    try:
        object_id = ObjectId(customer_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid customer ID"
        )

    result = await customers_collection.delete_one(
        {
            "_id": object_id,
            "owner_email": current_user["email"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return {
        "message": "Customer deleted successfully"
    }

# =====================================
# LEADS MODEL
# =====================================

class LeadRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = ""
    company: str = ""
    source: str = "Website"
    status: str = "New"
    assigned: str = ""


class LeadUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    company: str | None = None
    source: str | None = None
    status: str | None = None
    assigned: str | None = None


def serialize_lead(lead):
    return {
        "id": str(lead["_id"]),
        "name": lead.get("name", ""),
        "email": lead.get("email", ""),
        "phone": lead.get("phone", ""),
        "company": lead.get("company", ""),
        "source": lead.get("source", "Website"),
        "status": lead.get("status", "New"),
        "assigned": lead.get("assigned", "")
    }


# =====================================
# CREATE LEAD
# =====================================

@app.post("/leads")
async def create_lead(
    lead: LeadRequest,
    current_user: dict = Depends(get_current_user)
):
    new_lead = lead.model_dump()
    new_lead["owner_email"] = current_user["email"]

    result = await leads_collection.insert_one(new_lead)

    return {
        "message": "Lead created successfully",
        "lead_id": str(result.inserted_id)
    }


# =====================================
# GET ALL LEADS
# =====================================

@app.get("/leads")
async def get_leads(
    current_user: dict = Depends(get_current_user)
):
    leads = []

    cursor = leads_collection.find({
        "owner_email": current_user["email"]
    })

    async for lead in cursor:
        leads.append(serialize_lead(lead))

    return {
        "total": len(leads),
        "leads": leads
    }


# =====================================
# UPDATE LEAD
# =====================================

@app.put("/leads/{lead_id}")
async def update_lead(
    lead_id: str,
    lead: LeadUpdate,
    current_user: dict = Depends(get_current_user)
):
    try:
        object_id = ObjectId(lead_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid lead ID"
        )

    update_data = lead.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=400,
            detail="No update data provided"
        )

    result = await leads_collection.update_one(
        {
            "_id": object_id,
            "owner_email": current_user["email"]
        },
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    return {
        "message": "Lead updated successfully"
    }


# =====================================
# DELETE LEAD
# =====================================

@app.delete("/leads/{lead_id}")
async def delete_lead(
    lead_id: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        object_id = ObjectId(lead_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid lead ID"
        )

    result = await leads_collection.delete_one(
        {
            "_id": object_id,
            "owner_email": current_user["email"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    return {
        "message": "Lead deleted successfully"
    }


# =====================================
# BUSINESS MODEL
# =====================================

class BusinessRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str
    industry: str
    website: str = ""
    status: str = "active"


class BusinessUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    industry: str | None = None
    website: str | None = None
    status: str | None = None


# =====================================
# CREATE BUSINESS
# =====================================

@app.post("/businesses")
async def create_business(
    business: BusinessRequest,
    current_user: dict = Depends(get_current_user)
):
    new_business = business.model_dump()
    new_business["owner_email"] = current_user["email"]

    result = await businesses_collection.insert_one(new_business)

    return {
        "message": "Business created successfully",
        "business_id": str(result.inserted_id)
    }


# =====================================
# GET ALL BUSINESSES
# =====================================

@app.get("/businesses")
async def get_businesses(
    current_user: dict = Depends(get_current_user)
):
    businesses = []

    cursor = businesses_collection.find({
        "owner_email": current_user["email"]
    })

    async for business in cursor:
        business["id"] = str(business.pop("_id"))
        business.pop("owner_email", None)
        businesses.append(business)

    return {
        "total": len(businesses),
        "businesses": businesses
    }


# =====================================
# UPDATE BUSINESS
# =====================================

@app.put("/businesses/{business_id}")
async def update_business(
    business_id: str,
    business: BusinessUpdate,
    current_user: dict = Depends(get_current_user)
):
    try:
        object_id = ObjectId(business_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid business ID")

    update_data = business.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")

    result = await businesses_collection.update_one(
        {
            "_id": object_id,
            "owner_email": current_user["email"]
        },
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Business not found")

    return {"message": "Business updated successfully"}


# =====================================
# DELETE BUSINESS
# =====================================

@app.delete("/businesses/{business_id}")
async def delete_business(
    business_id: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        object_id = ObjectId(business_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid business ID")

    result = await businesses_collection.delete_one(
        {
            "_id": object_id,
            "owner_email": current_user["email"]
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Business not found")

    return {"message": "Business deleted successfully"}

