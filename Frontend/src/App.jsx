import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>

      <Header/>
      <nav style={{ marginBottom: "20px" }}>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
