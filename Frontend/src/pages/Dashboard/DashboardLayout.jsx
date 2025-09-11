import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/user/login" />;
  }

  if (user.role !== "AUTHOR" && user.role !== "ADMIN") {
    return <p>Access denied</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> 
    </div>
  );
}

export default DashboardLayout;
