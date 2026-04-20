from fastapi import APIRouter, HTTPException, status, Depends
from models.user import UserCreate, UserLogin, Token, UserResponse
from core.security import get_password_hash, verify_password, create_access_token
from db.database import get_database
from uuid import uuid4

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=500, detail="Database not connected")
        
    existing_user = await db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user_id = str(uuid4())
    hashed_password = get_password_hash(user.password)
    
    new_user = {
        "user_id": user_id,
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed_password,
        "role": user.role,
        "learning_profile": {}
    }
    
    await db["users"].insert_one(new_user)
    
    return UserResponse(**new_user)

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db = get_database()
    db_user = await db["users"].find_one({"email": user.email})
    
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    access_token = create_access_token(subject=db_user["user_id"])
    return {"access_token": access_token, "token_type": "bearer"}
