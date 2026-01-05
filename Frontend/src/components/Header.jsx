import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all"
        >
          McMaster Student Hub
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Home
          </Link>

          {user ? (
            <>
              {["ADMIN", "AUTHOR"].includes(user.role) && (
                <Link
                  to="/dashboard"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user/login"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/user/register"
                className="px-4 py-2 text-sm bg-white text-[#0a0a0a] rounded-lg font-medium hover:bg-white/90 transition-all"
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
