import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import apis from '../apis.json';
// import { data } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const apis_list = apis;
  const [empCount, setEmpCount] = useState("-");
  const [deptCount, setDeptCount] = useState("-");
  const [activeCount, setActiveCount] = useState("-");

  
  // Load counts once user is verified
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [e, d, a] = await Promise.all([
          axios.post(apis_list?.at(0).api_emplpyee.api_count_employees),
          axios.post(apis_list?.at(0).api_department.api_count_department),
          axios.post(apis_list?.at(0).api_emplpyee.api_count_active_employees),
        ]);
        setEmpCount(e.data ?? "0");
        setDeptCount(d.data ?? "0");
        setActiveCount(a.data ?? "0");
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchCounts();
  }, []);
  
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Employees */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-violet-500/30 transition-all">
        <h3 className="text-gray-400 text-sm mb-2">Total Employees</h3>
        <p className="text-3xl font-bold text-violet-400">{empCount}</p>
      </div>

      {/* Departments */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-indigo-500/30 transition-all">
        <h3 className="text-gray-400 text-sm mb-2">Departments</h3>
        <p className="text-3xl font-bold text-indigo-400">{deptCount}</p>
      </div>

      {/* Active Employees */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-violet-500/30 transition-all">
        <h3 className="text-gray-400 text-sm mb-2">Active Employees</h3>
        <p className="text-3xl font-bold text-violet-400">{activeCount}</p>
      </div>
    </div>
  );
}
