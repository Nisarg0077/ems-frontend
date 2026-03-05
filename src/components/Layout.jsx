/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // optional: call a /logout endpoint to delete the cookie server-side
      await fetch("http://localhost:5000/logout", { method: "POST", credentials: "include" });
    } catch (e) { /* ignore */ }
    logout();               // clear context + sessionStorage
    navigate("/login");
  };

  // If no user → redirect to login (protected layout)
  if (!user) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar onLogout={handleLogout} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar user={user} />
        <Outlet />   {/* <-- Home, Employees, Departments, … */}
      </div>
    </div>
  );
}