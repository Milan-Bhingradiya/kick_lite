"use client";
import React from "react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#18181b] border-r border-[#232326] transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#232326]">
            <div className="flex items-center gap-2">
              <Image
                src="https://kick.com/img/kick-logo.svg"
                alt="Kick Logo"
                width={24}
                height={24}
                className="h-6"
              />
              <span className="text-white font-bold text-lg">Kick</span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-500 p-1"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Menu Items */}
          <div className="flex-1 py-4">
            <nav className="space-y-2 px-4">
              {/* Home */}
              <a
                href="/"
                className="flex items-center gap-3 text-white hover:text-green-500 hover:bg-[#232326] px-3 py-2 rounded-lg transition-colors"
                onClick={onClose}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                <span className="font-medium">Home</span>
              </a>

              {/* Browse */}
              <a
                href="/browse"
                className="flex items-center gap-3 text-white hover:text-green-500 hover:bg-[#232326] px-3 py-2 rounded-lg transition-colors"
                onClick={onClose}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium">Browse</span>
              </a>

              {/* Following */}
              <a
                href="/following"
                className="flex items-center gap-3 text-white hover:text-green-500 hover:bg-[#232326] px-3 py-2 rounded-lg transition-colors"
                onClick={onClose}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01 1.01l-2.54 7.63H14v6h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 1h-2c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5z" />
                </svg>
                <span className="font-medium">Following</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
