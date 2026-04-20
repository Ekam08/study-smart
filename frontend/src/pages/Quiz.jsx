import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Mock quiz data
  const questions = [
    { q: "What is 5 + 5?", options: ["8", "10", "12", "15"], ans: "10" },
    { q: "Solve for x: 2x = 10", options: ["2", "4", "5", "8"], ans: "5" },
    { q: "What is the derivative of x^2?", options: ["x", "2x", "x^3", "2"], ans: "2x" }
  ];

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].ans) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Finished! Score: ${score + (option === questions[currentQuestion].ans ? 1 : 0)}/${questions.length}\nAI will now adjust your next quiz difficulty.`);
      navigate('/analysis');
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Adaptive Quiz</h2>
        <span style={{ background: 'var(--primary)', padding: '0.2rem 1rem', borderRadius: '15px', color: 'white' }}>
          Question {currentQuestion + 1}/{questions.length}
        </span>
      </div>
      
      <h3 style={{ marginBottom: '2rem', fontSize: '1.4rem' }}>{questions[currentQuestion].q}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions[currentQuestion].options.map((opt, idx) => (
          <button 
            key={idx} 
            className="btn btn-outline" 
            style={{ textAlign: 'left', padding: '1rem' }}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
