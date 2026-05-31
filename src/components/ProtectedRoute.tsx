import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useSaaS();

  // If the user is authenticated but not an admin, or not authenticated at all, redirect to home page (/)
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
