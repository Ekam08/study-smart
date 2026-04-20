from fastapi import APIRouter
from models.domain import ContentItem
from db.database import get_database

router = APIRouter()

@router.post("/")
async def add_content(item: ContentItem):
    db = get_database()
    await db["content"].insert_one(item.model_dump())
    return {"message": "Content added successfully"}

@router.get("/")
async def get_content(topic: str = None):
    db = get_database()
    query = {"topic": topic} if topic else {}
    cursor = db["content"].find(query)
    items = await cursor.to_list(length=100)
    for i in items:
        i["_id"] = str(i["_id"])
    return items
