import { useState } from 'react';
import './App.css';

// Hardcoded credentials (problem)
const API_KEY = '12345-SECRET-KEY';

function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Unused variable (problem)
  const unusedVar = 'I am not used';

  // Function with too many parameters (problem)
  function tooManyParams(a, b, c, d, e, f) {
    return a + b + c + d + e + f;
  }

  // Duplicate code (problem)
  function duplicate1() {
    return 'duplicate';
  }
  function duplicate2() {
    return 'duplicate';
  }

  // Commented-out code (problem)
  // alert('This is commented out!');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(false);
    try {
      // Console.log left in production (problem)
      console.log('Submitting form:', form);
      // Use of eval (security risk)
      eval("console.log('Eval is dangerous!')");
      const res = await fetch('http://localhost:4000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify(form),
      });
      // Unhandled promise (problem)
      fetch('http://localhost:4000/api/submit');
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '' });
      } else {
        setError(data.error || 'Submission failed.');
      }
    } catch (err) {
      setError('Network or server error.');
    }
    setLoading(false);
  };

  return (
    <div className="centered-form-wrapper">
      <div className="advanced-form-card">
        <h2 className="advanced-form-title">Advanced React Form</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="advanced-form-label">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="advanced-form-input"
              placeholder="Enter your name"
              autoComplete="off"
              disabled={loading}
            />
          </div>
          <div>
            <label className="advanced-form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="advanced-form-input"
              placeholder="Enter your email"
              autoComplete="off"
              disabled={loading}
            />
          </div>
          <div>
            <label className="advanced-form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="advanced-form-input"
              placeholder="Enter your phone number"
              autoComplete="off"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="advanced-form-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {error && (
          <div style={{ color: '#dc2626', background: '#fef2f2', borderRadius: 8, padding: 12, marginTop: 18, fontWeight: 500 }}>
            {error}
          </div>
        )}
        {submitted && (
          <div className="advanced-form-success">
            <h4>Form Submitted!</h4>
            {/* XSS vulnerability: rendering user input as HTML (problem) */}
            <div dangerouslySetInnerHTML={{ __html: `<b>Name:</b> ${form.name}<br/><b>Email:</b> ${form.email}<br/><b>Phone:</b> ${form.phone}` }} />
            <div>Your data has been saved to the database.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
