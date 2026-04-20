from fastapi import APIRouter, HTTPException
from models.domain import QuizResult
from db.database import get_database
from ai_engine.core import adjust_difficulty
from datetime import datetime
from uuid import uuid4

router = APIRouter()

@router.post("/add-result")
async def add_quiz_result(result: QuizResult):
    db = get_database()
    result_dict = result.model_dump()
    result_dict["timestamp"] = datetime.utcnow()
    result_dict["_id"] = str(uuid4())
    
    await db["quiz_results"].insert_one(result_dict)
    
    # Adaptive engine logic
    new_diff = adjust_difficulty(result.difficulty, result.score)
    return {"message": "Result saved successfully", "next_recommended_difficulty": new_diff}
