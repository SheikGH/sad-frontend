import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await api.get('/user/permissions/');
      // const currentUser = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).user_id;
      // const allowedPages = res.data.filter(p => p.user === currentUser && p.access === 'view').map(p => p.page);
      const allowedPages = res.data.map(p => p.page);
      setPages([...new Set(allowedPages)]);
    };
    fetchPermissions();
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      <ul className="list-group">
        {pages.map((page) => (
          <li key={page} className="list-group-item">
            <Link to={`/page/${page}`}>{page.replace(/_/g, ' ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
