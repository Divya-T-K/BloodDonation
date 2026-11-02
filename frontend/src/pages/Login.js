import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(formData);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <h1>Welcome back</h1>
      <p className="page-sub">Sign in to manage donors and blood requests.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label className="label" htmlFor="email">Email address</label>
          <input id="email" className="input" type="email" name="email" value={formData.email}
            onChange={handleChange} placeholder="you@example.com" required />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <input id="password" className="input" type="password" name="password" value={formData.password}
            onChange={handleChange} placeholder="Your password" required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-block">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="auth-foot">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </AuthShell>
  );
};

export default Login;
