/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// export default function Home() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [loggedIn, setLoggedIn] = useState(false);

  
//   useEffect(() => {
//     checkCookie();
//     chackSession();
    
//   }, [navigate]);

//   const chackSession = () => {
//     const storedUser = JSON.parse(sessionStorage.getItem("myUser"));
    
//     if (!storedUser) {
//       navigate("/login"); // redirect to login if not logged in
//     } else {
//       setUser(storedUser);
//       // console.log("User data loaded:", storedUser);
//       window.location.reload;
//     }
//   }

//   const checkCookie = async () => {

//   try {
//     const res = await axios.post('http://localhost:5000/cookie-check');

//     if (res.data.message === 'Login Successful') {
//       // console.log('Authenticated User:', res.data.user);

//       // ✅ Store user in sessionStorage
//       sessionStorage.setItem('myUser', JSON.stringify(res.data.user));

//       setLoggedIn(true);
//       navigate('/'); // redirect to home/dashboard
//     }
//   } catch (err) {
//     console.log('No active session found or cookie expired.');
//      navigate('/login');
//   }
// };

//   return (
//     <div className="hero flex flex-col justify-center items-center text-center min-h-screen">
//       <div className="p-6 border-3 border-black rounded-xl shadow-lg bg-white">
//         <p className="font-bold text-lg mb-2">
//           This website is created for Login and Authentication practice.
//         </p>

//         {user ? (
//           <div className="text-left bg-gray-50 p-4 rounded-md mt-4">
//             <p>
//               <strong>Username:</strong> {user.username}
//             </p>
//             <p>
//               <strong>role:</strong> {user.role}
//             </p>
//           </div>
//         ) : (
//           <p className="text-gray-500">Loading user data...</p>
//         )}
//       </div>
//     </div>
//   );
// }



// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const { user } = useAuth();
//   // const [user, setUser] = useState(null);
//   const [empCount, setEmpCount] = useState('');
//   const [deptCount, setDeptCount] = useState('');
//   const [empStatusCount, setEmpStatusCount] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // const init = async () => {
//     //   try {
//     //     const storedUser = JSON.parse(sessionStorage.getItem("myUser"));
//     //     if (storedUser) {
//     //       setUser(storedUser);
//     //       setLoading(false);
//     //       return;
//     //     }

//     //     const res = await axios.post(
//     //       "http://localhost:5000/cookie-check",
//     //       {},
//     //       { withCredentials: true }
//     //     );

//     //     if (res.data.message === "Login Successful") {
//     //       sessionStorage.setItem("myUser", JSON.stringify(res.data.user));
//     //       setUser(res.data.user);
//     //     } else {
//     //       navigate("/login");
//     //     }
//     //   } catch (err) {
//     //     console.log("Session expired or no cookie found:", err.message);
//     //     navigate("/login");
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     // init();
//     handleCountEmp();
//     handleCountDept();
//     handlEmpStatusCount();
//   }, [navigate]);

  

// const handleCountEmp = async () => {
//     try{
//         const res = await axios.post("http://localhost:5000/count-emp");
//         if(!res.data){
//             setEmpCount("NaN");
//         }
//         setEmpCount(res.data);
//     }
//     catch (err) {
//         console.log('count of employee not found.');
//     }
//  }
// const handleCountDept = async () => {
//     try{
//         const res = await axios.post("http://localhost:5000/count-dept");
//         if(!res.data){
//             setDeptCount("NaN");
//         }
//         setDeptCount(res.data);
//     }
//     catch (err) {
//         console.log('count of department not found.');
//     }
//  }

// const handlEmpStatusCount = async () => {
//     try{
//         const res = await axios.post("http://localhost:5000/countempstatus");
//         if(!res.data){
//             setEmpStatusCount("NaN");
//         }
//         setEmpStatusCount(res.data);
//     }
//     catch (err) {
//         console.log('no Active employee found');
//     }
//  }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-950 text-gray-400 animate-pulse">
//         Checking session...
//       </div>
//     );
//   }

//   return (
//     // <div className="flex h-screen bg-gray-950 text-gray-100">
//     //   {/* Sidebar */}
//     //   <Sidebar onLogout={handleLogout} />

//     //   {/* Main Section */}
//     //   <div className="flex flex-col flex-1 overflow-y-auto">
//     //     <Navbar user={user} />

//     //     {/* Dashboard Content */}
//     //     <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     //       {/* Example Stat Cards */}
//     //       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-violet-500/30 transition-all">
//     //         <h3 className="text-gray-400 text-sm mb-2">Total Employees</h3>
//     //         <p className="text-3xl font-bold text-violet-400">{empCount}</p>
//     //       </div>

//     //       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-indigo-500/30 transition-all">
//     //         <h3 className="text-gray-400 text-sm mb-2">Departments</h3>
//     //         <p className="text-3xl font-bold text-indigo-400">{deptCount}</p>
//     //       </div>

//     //       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-violet-500/30 transition-all">
//     //         <h3 className="text-gray-400 text-sm mb-2">Active Employees</h3>
//     //         <p className="text-3xl font-bold text-violet-400">{empStatusCount}</p>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

//     <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {/* Total Employees */}
//       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-violet-500/30 transition-all">
//         <h3 className="text-gray-400 text-sm mb-2">Total Employees</h3>
//         <p className="text-3xl font-bold text-violet-400">{empCount}</p>
//       </div>

//       {/* Departments */}
//       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-indigo-500/30 transition-all">
//         <h3 className="text-gray-400 text-sm mb-2">Departments</h3>
//         <p className="text-3xl font-bold text-indigo-400">{deptCount}</p>
//       </div>

//       {/* Active Employees */}
//       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-violet-500/30 transition-all">
//         <h3 className="text-gray-400 text-sm mb-2">Active Employees</h3>
//         <p className="text-3xl font-bold text-violet-400">{empStatusCount}</p>
//       </div>
//     </div>
//   );
// }




// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import apis from '../apis.json';
import { data } from "react-router-dom";

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
