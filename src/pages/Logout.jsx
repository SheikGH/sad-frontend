import React, { useEffect } from 'react';
import { logout } from '../utils/auth';

const Logout = () => {
  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h4>Logging out...</h4>
    </div>
  );
};

export default Logout;