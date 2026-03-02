/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";


axios.defaults.withCredentials = true;

export default function Login() {
  const { login } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkCookie();
    

  }, [])
  

  const checkCookie = async () => {
  try {
    const res = await axios.post('http://localhost:5000/cookie-check');

    if (res.data.message === 'Login Successful') {
      console.log('Authenticated User:', res.data.user);
      
      // ✅ Store user in sessionStorage
      sessionStorage.setItem('myUser', JSON.stringify(res.data.user));

      setLoggedIn(true);
      navigate('/'); // redirect to home/dashboard
    }
  } catch (err) {
    console.log('No active session found or cookie expired.');
  }
};
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/login', {user, password });
      if (res.data.message === 'Login Successful') {
        sessionStorage.setItem('myUser', JSON.stringify(res.data.user));
        login(res.data.user)
        setLoggedIn(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('Server connection failed.');
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    // <div className="login flex justify-center align-middle">
    //   <div className="login-frm border rounded border-violet-600 mt-56 p-6">
    //     <h1 className="text-center text-3xl font-bold">LogIn Page</h1>
    //     <form onSubmit={handleSubmit}>
    //       <div className="frm-div p-8 pb-0 pt-1">
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           className="font-bold text-xl rounded m-2 p-1"
    //           onChange={(e) => setUser(e.target.value)}
    //           required
    //         />
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           className="font-bold text-xl rounded p-1 m-2"
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //         <button type="submit" className="btn text-center border-4 font-bold p-2 m-2 w-24">
    //           Login
    //         </button>

    //         <Link className="underline text-yellow-500" to="/register">
    //           don't have an account?
    //         </Link>
    //       </div>
    //     </form>
    //   </div>
    // </div>


     <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-700/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/40 blur-3xl rounded-full"></div>

      <div className="relative bg-gray-900/70 border border-gray-700 shadow-2xl backdrop-blur-xl rounded-2xl p-10 w-full max-w-md text-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Employee Management System
          </h1>
          <p className="text-gray-400 mt-2 text-sm tracking-wide">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 shadow-md hover:shadow-indigo-500/40 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-gray-700 w-1/3"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="h-px bg-gray-700 w-1/3"></div>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>

  );
}
