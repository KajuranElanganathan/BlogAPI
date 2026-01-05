import { Link, Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
