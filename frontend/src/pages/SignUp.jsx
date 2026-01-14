import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple SignUp page
export default function SignUp() {
  const navigate = useNavigate?.() || (() => {});
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Email is invalid';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data?.message || 'Signup failed');
      } else {
        setMessage('Signup successful — redirecting to login...');
        setTimeout(() => navigate('/login'), 1200);
      }
    } catch (err) {
      setMessage(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <h2 style={{ marginBottom: 12 }}>Create account</h2>

        <label style={styles.label}>
          Name
          <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </label>

        <label style={styles.label}>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} style={styles.input} />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </label>

        <label style={styles.label}>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} style={styles.input} />
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </label>

        <label style={styles.label}>
          Confirm password
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} style={styles.input} />
          {errors.confirm && <div style={styles.error}>{errors.confirm}</div>}
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        {message && <div style={styles.message}>{message}</div>}

        <div style={{ marginTop: 8 }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    padding: 20,
  },
  form: {
    width: 360,
    padding: 20,
    border: '1px solid #e6e6e6',
    borderRadius: 6,
    boxShadow: '0 3px 8px rgba(0,0,0,0.03)',
    background: '#fff',
  },
  label: { display: 'block', marginBottom: 12, fontSize: 14 },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px 10px',
    marginTop: 6,
    boxSizing: 'border-box',
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    marginTop: 8,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 4,
    border: 'none',
    background: '#0b5cff',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  error: { color: '#b00020', fontSize: 12, marginTop: 6 },
  message: { marginTop: 10, fontSize: 13 },
};
