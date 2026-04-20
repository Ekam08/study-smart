import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analysis() {
  const data = {
    labels: ['Algebra', 'Calculus', 'Geometry'],
    datasets: [
      {
        label: 'Accuracy %',
        data: [60, 80, 40],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 4
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } },
      title: { display: true, text: 'Subject Performance', color: 'white' },
    },
    scales: {
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
    }
  };

  return (
    <div className="animate-fade-in">
      <h2>AI Performance Analysis</h2>
      
      <div className="grid-2" style={{ marginTop: '2rem' }}>
        <div className="glass-panel">
          <Bar data={data} options={options} />
        </div>
        
        <div className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem' }}>AI Learning Insights</h3>
          
          <div style={{ padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid var(--danger)', marginBottom: '1rem', borderRadius: '4px' }}>
            <strong style={{ color: 'var(--danger)' }}>Weak Topic Detected: Geometry</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              High mistake rate (60%) and long response times. The AI engine recommends revising foundational proofs.
            </p>
          </div>
          
          <div style={{ padding: '1rem', background: 'rgba(52, 211, 153, 0.1)', borderLeft: '4px solid var(--success)', marginBottom: '1rem', borderRadius: '4px' }}>
            <strong style={{ color: 'var(--success)' }}>Strength: Calculus</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Excellent accuracy and speed. Difficulty will be increased in the next quiz.
            </p>
          </div>
          
          <div style={{ padding: '1rem', background: 'rgba(251, 191, 36, 0.1)', borderLeft: '4px solid var(--warning)', borderRadius: '4px' }}>
            <strong style={{ color: 'var(--warning)' }}>Predictive Model</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Our Logistic Regression model indicates a 25% risk of falling behind next week. Consistency is key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
