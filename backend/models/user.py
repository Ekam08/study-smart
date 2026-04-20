from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "student" # student or teacher

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    user_id: str
    name: str
    email: EmailStr
    role: str
    learning_profile: Optional[Dict[str, Any]] = {}

class Token(BaseModel):
    access_token: str
    token_type: str
