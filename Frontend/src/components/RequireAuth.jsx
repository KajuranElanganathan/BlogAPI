import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ adminOnly = false }) {
  const { user, token } = useAuth();

  // Still fetching user info
  if (token && user === null) return <p>Loading...</p>;

  // Not logged in
  if (!user) return <Navigate to="/user/login" replace />;

  // Admin-only page
  if (adminOnly && user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
}
