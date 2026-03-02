import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-center">
      <h1 className="text-8xl font-extrabold text-violet-600 mb-4">404</h1>
      <p className="text-2xl text-gray-100 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
