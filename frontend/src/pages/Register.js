import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data);
      toast.success(`Account created. Welcome, ${data.name}!`);
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <h1>Create your account</h1>
      <p className="page-sub">Join the platform and start saving lives.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" className="input" type="text" name="name" value={formData.name}
            onChange={handleChange} placeholder="Your full name" required />
        </div>
        <div className="field">
          <label className="label" htmlFor="email">Email address</label>
          <input id="email" className="input" type="email" name="email" value={formData.email}
            onChange={handleChange} placeholder="you@example.com" required />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <input id="password" className="input" type="password" name="password" value={formData.password}
            onChange={handleChange} placeholder="At least 6 characters" required />
        </div>
        <div className="field">
          <label className="label" htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" className="input" type="password" name="confirmPassword" value={formData.confirmPassword}
            onChange={handleChange} placeholder="Repeat your password" required />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-block">
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="auth-foot">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </AuthShell>
  );
};

export default Register;
