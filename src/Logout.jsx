import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        if(confirm("Are you sure? You want to logout?")){
            try {
                await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
            } catch (err) {
                console.log("Error logging out:", err);
            } finally {
                sessionStorage.removeItem("myUser");
                navigate("/login");
            }
        }
        else {
            alert("Logout is cancelled");
        }
        
    };
    
  return (
    <div>
      <button
          onClick={handleLogout}
          className="flex items-center hover:scale-110 gap-3 w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 rounded-lg text-white hover:from-red-700 hover:to-red-600 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
    </div>
  )
}

export default Logout
