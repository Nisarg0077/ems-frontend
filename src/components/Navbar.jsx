import React from "react";
import { Bell } from "lucide-react";

export default function Navbar({ user }) {
  return (
    <div className="sticky top-0 w-full z-50 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-100 tracking-wide">
        Welcome, <span className="text-violet-400">{user?.username}</span>
      </h2>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-200 transition-all">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-sm font-bold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <span className="text-sm text-gray-300">{user?.role}</span>
        </div>
      </div>
    </div>
  );
}
