import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute ({ token, children }) {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};