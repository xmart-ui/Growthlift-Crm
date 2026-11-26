import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncMongoClient(MONGO_URI)

database = client["growthlift_crm"]

users_collection = database["users"]
customers_collection = database["customers"]
businesses_collection = database["businesses"]
leads_collection = database["leads"]