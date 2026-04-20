from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class QuizResult(BaseModel):
    quiz_id: str
    user_id: str
    score: float
    time_taken: int
    difficulty: str
    responses: List[Dict[str, Any]] = []
    
class ContentItem(BaseModel):
    title: str
    type: str
    topic: str
    difficulty: str
    url: str
