// src/components/Loader.jsx
import React from "react";

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  full: "w-24 h-24",
};

const textMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  full: "text-xl",
};

export default function Loader({
  size = "md",
  label = "Loading...",
  showText = true,
  className = "",
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3
        ${size === "full" ? "min-h-screen" : "h-full"}
        ${className}
      `}
    >
      {/* Gradient Spinning Ring */}
      <div
        className={`
          relative ${sizeMap[size]}
          before:absolute before:inset-0 before:rounded-full before:border-4
          before:border-t-transparent before:border-r-violet-500 before:border-b-indigo-500 before:border-l-transparent
          before:animate-spin
          after:absolute after:inset-1 after:rounded-full after:bg-gray-950
        `}
      />

      {/* Optional Text */}
      {showText && (
        <p
          className={`
            ${textMap[size]} font-medium text-gray-400 animate-pulse
          `}
        >
          {label}
        </p>
      )}
    </div>
  );
}