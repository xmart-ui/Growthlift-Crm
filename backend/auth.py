
import os
import jwt

from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is missing from .env")

ALGORITHM = "HS256"


# Hash password
def hash_password(password: str):
    return password_hash.hash(password)


# Verify password
def verify_password(password: str, hashed_password: str):
    return password_hash.verify(password, hashed_password)


# Create JWT token
def create_access_token(email: str):
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)

    payload = {
        "sub": email,
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# Verify JWT token
def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload["sub"]

    except jwt.InvalidTokenError:
        return None
