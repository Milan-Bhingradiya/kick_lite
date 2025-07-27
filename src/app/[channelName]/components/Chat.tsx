// components/Chat.tsx
import React from "react";

const Chat: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg h-[720px] max-h-screen flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="text-sm">
          <span className="text-green-400 font-bold">Streamer:</span> Hey
          everyone! Welcome to the stream.
        </div>
        <div className="text-sm">
          <span className="text-blue-400 font-medium">User123:</span> Awesome
          stream!
        </div>
        <div className="text-sm">
          <span className="text-pink-400 font-medium">ChatBot:</span> Follow the
          channel for more content!
        </div>
        {/* Add more chat messages here */}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Send a message..."
          className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default Chat;
