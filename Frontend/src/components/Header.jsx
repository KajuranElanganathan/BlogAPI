import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  console.log("Header user:", user); // should now show user object after login

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <nav>
        <Link to="/">Home</Link>{" "}
        {user ? (
          <>
            <span>Welcome, {user.email || user.name}!</span>{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/user/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
