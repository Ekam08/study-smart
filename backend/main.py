from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import auth, quiz, analysis, plan, content

app = FastAPI(title="StudySmart AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["Quiz System"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Performance Analysis"])
app.include_router(plan.router, prefix="/api/plan", tags=["Study Plan"])
app.include_router(content.router, prefix="/api/content", tags=["Content System"])

@app.get("/")
def root():
    return {"message": "Welcome to StudySmart AI API"}
