import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogOut, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";

function Header() {
  const { user, logout } = useAuth();
  const { scrollToTop } = useHome();

  const handleHomeClick = () => {
    if (scrollToTop && typeof scrollToTop === 'function') {
      scrollToTop();
    } else {
      // Fallback: scroll to top and dispatch event
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('homeClick'));
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 z-50 p-6 pointer-events-auto"
    >
      <nav className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors relative group px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm pointer-events-auto"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
        </motion.button>

        {user ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 backdrop-blur-sm pointer-events-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pointer-events-auto">
              <Link
                to="/user/login"
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors relative group px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign Up</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pointer-events-auto">
              <Link
                to="/user/register"
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-white text-slate-950 rounded-lg hover:bg-white/90 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </motion.div>
          </>
        )}
      </nav>
    </motion.header>
  );
}

export default Header;
