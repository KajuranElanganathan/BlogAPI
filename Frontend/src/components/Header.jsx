import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
          MyBlog
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          {user ? (
            <>
              <span className="text-gray-700">
                Welcome, <span className="font-semibold">{user.username || user.email}</span>!
              </span>

              {/* Show Dashboard for ADMIN or AUTHOR */}
              {["ADMIN", "AUTHOR"].includes(user.role) && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/user/register"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
