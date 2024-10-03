
// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/access/login" />;
};

export default PrivateRoute;