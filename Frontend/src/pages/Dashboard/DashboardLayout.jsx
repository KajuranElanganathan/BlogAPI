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
      <h2>Dashboard</h2>
      <nav>
        <Link to="/dashboard/home">Home</Link> |{" "}
        <Link to="/dashboard/create">Create Post</Link>
      </nav>
      <hr />
      <Outlet /> {/* ✅ nested pages render here */}
    </div>
  );
}


export default DashboardLayout;
