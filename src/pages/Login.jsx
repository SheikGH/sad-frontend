import React, { useState } from 'react';
import api from '../api/api';
import { setTokens } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/token/', {
        username: email,
        password,
      });
      setTokens(response.data.access, response.data.refresh);
      // const userRes = await api.get('/user/users/me/');
      const userRes = await api.get('/user/users/');
      const filtered = userRes.data.filter(u => u.username === email);
      console.log('filtered:', userRes.data, filtered, filtered[0].is_super_admin);
      filtered[0].is_super_admin ? navigate('/admin') : navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control my-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control my-2" />
        {error && <div className="text-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;