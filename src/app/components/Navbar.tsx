"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="bg-[#18181b] border-b border-[#232326] px-6 py-3 flex items-center justify-between">
        {/* Left: Menu Button & Logo */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-green-500 p-1"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </button>

          <a href="/" className="flex items-center gap-2">
            <Image
              src="https://kick.com/img/kick-logo.svg"
              alt="Kick Logo"
              width={62}
              height={62}
              className="h-8"
            />
            {/*   <span className="text-white font-bold text-xl">Kick</span> */}
          </a>
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex gap-6 ml-6">
            <a href="#" className="text-white hover:text-green-500 font-medium">
              Following
            </a>
            <a href="#" className="text-white hover:text-green-500 font-medium">
              Browse
            </a>
          </div>
        </div>
        {/* Center: Search */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#232326] text-white rounded-full py-2 pl-4 pr-10 focus:outline-none"
            />
            <span className="absolute right-3 top-2 text-gray-400">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                />
              </svg>
            </span>
          </div>
        </div>
        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-[#232326] text-white px-4 py-2 rounded-full hover:bg-[#2ecc40] hover:text-black transition font-medium">
            Sign Up
          </button>
          <button className="bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 transition font-medium">
            Log In
          </button>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
