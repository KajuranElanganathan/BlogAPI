import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all">
            McMaster Student Hub
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
          >
            Events
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
          >
            Organizations
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
          </Link>

          {user ? (
            <>
              {["ADMIN", "AUTHOR"].includes(user.role) && (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
                </Link>
              )}
              <button
                onClick={logout}
                className="px-5 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 backdrop-blur-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user/login"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/user/register"
                className="px-5 py-2 text-sm font-semibold bg-white text-[#0a0a0a] rounded-lg hover:bg-white/90 transition-all transform hover:scale-105"
              >
                Join
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/user/login"
              className="px-4 py-2 text-sm font-semibold bg-white text-[#0a0a0a] rounded-lg hover:bg-white/90 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
