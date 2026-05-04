import { Navigate, Outlet } from 'react-router-dom';

const AUTH_KEY = 'eventos_auth_magic';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticated(value: boolean) {
  if (value) {
    localStorage.setItem(AUTH_KEY, 'true');
    return;
  }

  localStorage.removeItem(AUTH_KEY);
}

export default function RequireAuth() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login_magic" replace />;
}