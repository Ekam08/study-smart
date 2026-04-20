import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock resources provided by the teacher
  const resources = [
    { id: 1, title: 'Algebra Formula Sheet', type: 'PDF', difficulty: 'Medium', link: '#' },
    { id: 2, title: 'Calculus Limits Tutorial', type: 'Video', difficulty: 'Hard', link: '#' },
    { id: 3, title: 'Geometry Proofs Practice', type: 'Interactive', difficulty: 'Easy', link: '#' }
  ];

  return (
    <div className="animate-fade-in">
      <h2>Student Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <button 
          className={activeTab === 'overview' ? 'btn-primary' : 'btn-outline'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'resources' ? 'btn-primary' : 'btn-outline'} 
          onClick={() => setActiveTab('resources')}
        >
          Study Resources
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div className="grid-3" style={{ marginBottom: '2rem' }}>
            <div className="glass-panel stat-card">
              <div className="stat-value">85%</div>
              <div className="stat-label">Average Score</div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-value">12h</div>
              <div className="stat-label">Study Time</div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-value">3</div>
              <div className="stat-label">Weak Topics</div>
            </div>
          </div>

          <div className="grid-2">
            <div className="glass-panel">
              <h3>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <Link to="/quiz" className="btn" style={{ textAlign: 'center' }}>Take Adaptive Quiz</Link>
                <Link to="/analysis" className="btn btn-outline" style={{ textAlign: 'center' }}>View Performance Analysis</Link>
                <Link to="/study-plan" className="btn btn-outline" style={{ textAlign: 'center' }}>Generate Study Plan</Link>
              </div>
            </div>
            
            <div className="glass-panel">
              <h3>Recent Updates</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                  New Quiz assigned: <strong>Algebra Basics</strong>
                </li>
                <li style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                  Study Plan generated for <strong>Calculus</strong>
                </li>
                <li style={{ padding: '1rem' }}>
                  Reminder: <strong>Geometry</strong> test next week
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3>Study Resources</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Access all study materials, notes, and videos provided by your teacher here.
              </p>
            </div>
          </div>

          <div className="card-grid">
            {resources.map(resource => (
              <div key={resource.id} className="item-card">
                <div>
                  <div className="item-card-title">{resource.title}</div>
                  <div className="item-card-meta">
                    <span className="badge">{resource.type}</span>
                    <span className={`badge ${resource.difficulty === 'Hard' ? 'badge-danger' : resource.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'}`}>
                      {resource.difficulty}
                    </span>
                  </div>
                </div>
                <div className="item-card-footer">
                  <a href={resource.link} className="btn" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '6px', textDecoration: 'none' }}>
                    Study Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          {resources.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
              No resources available at the moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
