import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-serif font-normal text-gray-900 hover:text-gray-600 transition"
        >
          McMaster Student Hub
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-gray-700 hover:text-gray-900 transition"
          >
            Home
          </Link>

          {user ? (
            <>
              {/* Dashboard only if author/admin */}
              {["ADMIN", "AUTHOR"].includes(user.role) && (
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-700 hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="text-sm text-gray-700 hover:text-gray-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user/login"
                className="text-sm text-gray-700 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                to="/user/register"
                className="text-sm text-gray-700 hover:text-gray-900 transition"
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
