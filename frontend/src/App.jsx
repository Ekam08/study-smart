import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import Quiz from './pages/Quiz';
import Analysis from './pages/Analysis';
import StudyPlan from './pages/StudyPlan';
import TeacherDashboard from './pages/TeacherDashboard';
import './index.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/' || location.pathname === '/login';
  const isDashboard = location.pathname === '/student-dashboard' || location.pathname === '/teacher-dashboard';

  return (
    <nav className="nav-bar animate-fade-in">
      <div className="nav-brand">StudySmart AI</div>
      <div>
        {!isLogin && (
          <>
            {!isDashboard && (
              <button 
                className="btn btn-outline" 
                style={{ marginRight: '1rem' }} 
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            )}
            <Link to="/login" className="btn btn-primary">Logout</Link>
          </>
        )}
        {isLogin && (
          <Link to="/login" className="btn btn-outline">Login</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

