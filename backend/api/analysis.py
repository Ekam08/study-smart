from fastapi import APIRouter
from db.database import get_database
from ai_engine.core import predictor, calculate_weak_topics

router = APIRouter()

@router.get("/{user_id}")
async def analyze_performance(user_id: str):
    db = get_database()
    cursor = db["quiz_results"].find({"user_id": user_id})
    results = await cursor.to_list(length=100)
    
    if not results:
        return {"message": "No data found for this user", "weak_topics": [], "failure_risk_percentage": 0}
        
    # In a real app we'd aggregate actual stats from MongoDB here.
    # Using mock topic_stats for the AI engine to process.
    topic_stats = [
        {"topic": "Algebra", "accuracy": 0.6, "avg_time": 45, "max_time": 60, "mistake_rate": 0.4},
        {"topic": "Calculus", "accuracy": 0.8, "avg_time": 30, "max_time": 60, "mistake_rate": 0.2},
        {"topic": "Geometry", "accuracy": 0.4, "avg_time": 55, "max_time": 60, "mistake_rate": 0.6}
    ]
    weak_topics = calculate_weak_topics(topic_stats)
    
    # Using mock features for the predictive model [avg_score, total_time, accuracy]
    avg_score = sum([r["score"] for r in results]) / len(results)
    risk = predictor.predict_risk([avg_score, 120.0, avg_score/100.0])
    
    return {
        "weak_topics": weak_topics,
        "failure_risk_percentage": risk,
        "total_quizzes_taken": len(results)
    }
