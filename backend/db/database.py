from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_config = Database()

async def connect_to_mongo():
    db_config.client = AsyncIOMotorClient(settings.MONGO_URI)
    db_config.db = db_config.client.get_database() # Uses db name from URI

async def close_mongo_connection():
    if db_config.client:
        db_config.client.close()

def get_database():
    return db_config.db
