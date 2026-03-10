import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, LogOut, Briefcase } from "lucide-react";
// import axios from "axios";
import Logout from "../Logout";

export default function Sidebar() {
  const navigate = useNavigate();
  

  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
  //   } catch (err) {
  //     console.log("Error logging out:", err);
  //   } finally {
  //     sessionStorage.removeItem("myUser");
  //     navigate("/login");
  //   }
  // };
  return (
    <div className="h-svh w-60 bg-gray-900 border-r border-gray-800 flex flex-col justify-between">
      <div>
        <div className="p-6 py-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            EMS Dashboard
          </h1>
        </div>

        <nav className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            <Home size={20} /> Home
          </button>

          <button
            onClick={() => navigate("/employees")}
            className="flex items-center gap-3 w-full px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            <Users size={20} /> Employees
          </button>

          <button
            onClick={() => navigate("/department")}
            className="flex items-center gap-3 w-full px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            <Briefcase size={20} /> Departments
          </button>
        </nav>
      </div>

      <div className="p-6 border-t border-gray-800">
        {/* <button
          onClick={handleLogout}
          className="flex items-center hover:scale-110 gap-3 w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 rounded-lg text-white hover:from-red-700 hover:to-red-600 transition-all"
        >
          <LogOut size={18} /> Logout
        </button> */}

        <Logout/>
      </div>
    </div>
  );
}
