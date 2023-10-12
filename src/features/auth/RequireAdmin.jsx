import React from 'react';
import { selectCurrentToken, selectCurrentUser } from './authSlice';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAdmin = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);

  // Redirect to login page if token is not present
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home page if user is not an admin
  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the child components
  return <>{children}</>;
};

export default RequireAdmin;
