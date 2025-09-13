import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardLayout() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  if (user.role !== "AUTHOR" && user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">Access Denied</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hello, {user.username}</span>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md px-6 py-3 flex gap-4 border-b">
        <Link
          to="/dashboard/home"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link
          to="/dashboard/posts/create"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Create Post
        </Link>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Nested dashboard pages render here */}
      </main>
    </div>
  );
}

export default DashboardLayout;
