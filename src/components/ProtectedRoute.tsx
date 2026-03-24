import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // convert to ms
    return Date.now() > expiry;
  } catch (e) {
    return true;
  }
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("refreshToken");

  if (!token || isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
