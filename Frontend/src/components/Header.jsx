import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <nav>
        <Link to="/">Home</Link>{" "}
        {user ? (
          <>
            <span>Welcome, {user.email}!</span>{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
