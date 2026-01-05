import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Header() {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 z-50 p-6"
    >
      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
        </Link>

        {user ? (
          <>
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
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              Sign Up
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
            </Link>
            <Link
              to="/user/register"
              className="px-5 py-2 text-sm font-semibold bg-white text-slate-950 rounded-lg hover:bg-white/90 transition-all transform hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}

export default Header;
