import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import DynamicPage from './pages/DynamicPage';
import Logout from './pages/Logout';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUserName] = useState(localStorage.getItem('username') || '');

  return (
    <div className="App">
      <Router>
        <ToastContainer theme='dark' position='top-center' />
        <Header token={token} setToken={setToken} username={username} setUserName={setUserName} />
        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="panel panel-default">
              <div className="panel-body"></div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/page/:pageName" element={<DynamicPage />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </Router >
    </div>
  )
};

export default App;