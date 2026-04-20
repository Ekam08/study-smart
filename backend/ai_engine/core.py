import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from typing import List, Dict, Any

# Dummy initial model for demonstration
class PredictiveModel:
    def __init__(self):
        self.model = LogisticRegression()
        # Train on some dummy data to make it usable out of the box
        # Features: [avg_past_score, total_study_time, accuracy_trend]
        X = np.array([
            [85, 120, 0.9], [40, 30, 0.4], [60, 60, 0.6],
            [95, 200, 0.95], [30, 20, 0.3], [75, 90, 0.75]
        ])
        # Target: 1 (High risk of failure) or 0 (Low risk)
        y = np.array([0, 1, 1, 0, 1, 0])
        self.model.fit(X, y)
        
    def predict_risk(self, features: List[float]) -> float:
        """Returns the probability of being at risk (0 to 1)"""
        prob = self.model.predict_proba([features])[0][1]
        return round(prob * 100, 2)

predictor = PredictiveModel()

def calculate_weak_topics(topic_stats: List[Dict[str, float]]) -> List[Dict[str, Any]]:
    """
    topic_stats: [{"topic": "Algebra", "accuracy": 0.6, "avg_time": 45, "max_time": 60, "mistake_rate": 0.4}]
    weak_score = (1 - accuracy)*0.5 + (avg_time/max_time)*0.3 + mistake_rate*0.2
    """
    results = []
    for stat in topic_stats:
        acc = stat.get("accuracy", 0)
        avg_t = stat.get("avg_time", 0)
        max_t = stat.get("max_time", 60)
        mistake = stat.get("mistake_rate", 0)
        
        weak_score = (1 - acc) * 0.5 + (avg_t / max_t) * 0.3 + mistake * 0.2
        results.append({
            "topic": stat["topic"],
            "weak_score": round(weak_score * 100, 2),
            "is_weak": weak_score > 0.5
        })
    # Sort by weakest first
    results.sort(key=lambda x: x["weak_score"], reverse=True)
    return results

def adjust_difficulty(current_difficulty: str, last_score: float) -> str:
    levels = ["easy", "medium", "hard"]
    idx = levels.index(current_difficulty)
    
    if last_score >= 80 and idx < len(levels) - 1:
        return levels[idx + 1]
    elif last_score < 50 and idx > 0:
        return levels[idx - 1]
    return current_difficulty

def generate_study_plan(weak_topics: List[str], available_days: int = 7) -> Dict[str, Any]:
    plan = {"schedule": []}
    if not weak_topics:
        return plan
        
    # Simple spaced repetition logic
    for day in range(1, available_days + 1):
        daily_topics = []
        for i, topic in enumerate(weak_topics):
            # Prioritize weaker topics more often (e.g., day 1, 3, 5 for weakest)
            if day % (i + 1 + (1 if i==0 else 0)) == 0 or day == 1:
                daily_topics.append(topic)
        
        plan["schedule"].append({
            "day": day,
            "focus_topics": daily_topics,
            "estimated_minutes": len(daily_topics) * 30
        })
    return plan
