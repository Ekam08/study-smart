import { useState } from 'react';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('insights');

  // Mock State for Quizzes
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Algebra Basics', questions: 10, status: 'Active' },
    { id: 2, title: 'Geometry Midterm', questions: 25, status: 'Draft' },
  ]);

  // Mock State for Resources
  const [resources, setResources] = useState([
    { id: 1, title: 'Algebra Formula Sheet', type: 'PDF', link: '#' },
    { id: 2, title: 'Geometry Video Lecture', type: 'Video', link: '#' },
  ]);

  const handleDeleteQuiz = (id) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const handleAddQuiz = () => {
    const newQuiz = {
      id: Date.now(),
      title: 'New Quiz ' + (quizzes.length + 1),
      questions: 15,
      status: 'Draft'
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const handleAddResource = () => {
    const newResource = {
      id: Date.now(),
      title: 'New Study Material ' + (resources.length + 1),
      type: 'Document',
      link: '#'
    };
    setResources([...resources, newResource]);
  };

  return (
    <div className="animate-fade-in">
      <h2>Teacher Dashboard</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
        <button 
          className={activeTab === 'insights' ? 'btn-primary' : 'btn-outline'} 
          onClick={() => setActiveTab('insights')}
        >
          Class Insights
        </button>
        <button 
          className={activeTab === 'quizzes' ? 'btn-primary' : 'btn-outline'} 
          onClick={() => setActiveTab('quizzes')}
        >
          Manage Quizzes
        </button>
        <button 
          className={activeTab === 'resources' ? 'btn-primary' : 'btn-outline'} 
          onClick={() => setActiveTab('resources')}
        >
          Study Resources
        </button>
      </div>
      
      {activeTab === 'insights' && (
        <>
          <div className="grid-3" style={{ margin: '2rem 0' }}>
            <div className="glass-panel stat-card">
              <div className="stat-value">42</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-value" style={{ color: 'var(--danger)' }}>5</div>
              <div className="stat-label">At-Risk Students</div>
            </div>
            <div className="glass-panel stat-card">
              <div className="stat-value">Geometry</div>
              <div className="stat-label">Class Weakest Topic</div>
            </div>
          </div>

          <div className="glass-panel">
            <h3>Class Insights</h3>
            <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem' }}>Student Name</th>
                  <th style={{ padding: '1rem' }}>Avg Score</th>
                  <th style={{ padding: '1rem' }}>Weakest Topic</th>
                  <th style={{ padding: '1rem' }}>Risk Level</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>John Doe</td>
                  <td style={{ padding: '1rem' }}>65%</td>
                  <td style={{ padding: '1rem' }}>Geometry</td>
                  <td style={{ padding: '1rem', color: 'var(--warning)' }}>Medium</td>
                  <td style={{ padding: '1rem' }}><button className="btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px' }}>Message</button></td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem' }}>Jane Smith</td>
                  <td style={{ padding: '1rem' }}>42%</td>
                  <td style={{ padding: '1rem' }}>Algebra</td>
                  <td style={{ padding: '1rem', color: 'var(--danger)' }}>High</td>
                  <td style={{ padding: '1rem' }}><button className="btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px' }}>Message</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'quizzes' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3>Manage Quizzes</h3>
              <p style={{ color: 'var(--text-muted)' }}>Create, edit, and assign quizzes to your students.</p>
            </div>
            <button className="btn" onClick={handleAddQuiz}>+ Add New Quiz</button>
          </div>

          <div className="card-grid">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="item-card">
                <div>
                  <div className="item-card-title">{quiz.title}</div>
                  <div className="item-card-meta">
                    <span className="badge-outline">{quiz.questions} Questions</span>
                    <span className={`badge ${quiz.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {quiz.status}
                    </span>
                  </div>
                </div>
                <div className="item-card-footer">
                  <button className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '6px' }}>Edit</button>
                  <button 
                    className="btn-outline" 
                    style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '6px', color: 'var(--danger)', borderColor: 'var(--danger)' }} 
                    onClick={() => handleDeleteQuiz(quiz.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {quizzes.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
              No quizzes available. Click "Add New Quiz" to start.
            </div>
          )}
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3>Study Resources (Content)</h3>
              <p style={{ color: 'var(--text-muted)' }}>Provide notes, videos, and interactive materials to your students.</p>
            </div>
            <button className="btn" onClick={handleAddResource}>+ Add Resource</button>
          </div>

          <div className="card-grid">
            {resources.map(resource => (
              <div key={resource.id} className="item-card">
                <div>
                  <div className="item-card-title">{resource.title}</div>
                  <div className="item-card-meta">
                    <span className="badge-outline">{resource.type}</span>
                  </div>
                </div>
                <div className="item-card-footer">
                  <a href={resource.link} className="btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '6px', textAlign: 'center', flex: 1 }}>View</a>
                  <button 
                    className="btn-outline" 
                    style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '6px', color: 'var(--danger)', borderColor: 'var(--danger)' }} 
                    onClick={() => handleDeleteResource(resource.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {resources.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
              No resources available.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
