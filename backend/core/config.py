import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "StudySmart AI"
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017/studysmart")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecret_key_studysmart")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 1 week

    class Config:
        env_file = ".env"

settings = Settings()
