from fastapi import APIRouter
from ai_engine.core import generate_study_plan
from pydantic import BaseModel
from typing import List

router = APIRouter()

class PlanRequest(BaseModel):
    weak_topics: List[str]

@router.post("/generate")
async def get_plan(request: PlanRequest):
    plan = generate_study_plan(request.weak_topics)
    return plan
