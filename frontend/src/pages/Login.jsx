import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'student') navigate('/student-dashboard');
    else navigate('/teacher-dashboard');
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" placeholder="Full Name" className="input-field" required />
        )}
        <input type="email" placeholder="Email" className="input-field" required />
        <input type="password" placeholder="Password" className="input-field" required />
        
        {!isLogin && (
          <select 
            className="input-field" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student" style={{color: 'black'}}>Student</option>
            <option value="teacher" style={{color: 'black'}}>Teacher</option>
          </select>
        )}
        
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span 
          style={{ color: 'var(--primary)', cursor: 'pointer' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign up' : 'Login'}
        </span>
      </p>
    </div>
  );
}
