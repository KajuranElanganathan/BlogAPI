import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Header() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg"
          : isHomepage
          ? "bg-transparent"
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`text-3xl font-extrabold tracking-wide transition-all duration-300 ${
            scrolled 
              ? "text-gray-900 drop-shadow-sm" 
              : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          }`}
        >
          MyBlog
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium transition-all duration-300 ${
              scrolled 
                ? "text-gray-700 hover:text-blue-600" 
                : "text-white hover:text-blue-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
            }`}
          >
            Home
          </Link>

          {user ? (
            <>
              {/* Dashboard only if author/admin */}
              {["ADMIN", "AUTHOR"].includes(user.role) && (
                <Link
                  to="/dashboard"
                  className={`font-medium transition-all duration-300 ${
                    scrolled 
                      ? "text-gray-700 hover:text-blue-600" 
                      : "text-white hover:text-blue-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className={`px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
                  scrolled
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user/login"
                className={`font-medium transition-all duration-300 ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600" 
                    : "text-white hover:text-blue-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                }`}
              >
                Login
              </Link>
              <Link
                to="/user/register"
                className={`font-medium transition-all duration-300 ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600" 
                    : "text-white hover:text-blue-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                }`}
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