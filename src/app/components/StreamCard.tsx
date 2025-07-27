import React from "react";
import Image from "next/image";
import type { Livestream } from "@/lib/types";

function StreamCard({
  stream,
  onClick,
}: {
  stream: Livestream;
  onClick?: () => void;
}) {
  return (
    <div
      className="group w-[320px] flex-shrink-0 bg-[#181818] rounded-lg overflow-hidden shadow-md relative cursor-pointer hover:ring-2 hover:ring-green-400 transition"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Go to channel ${stream.channel?.slug}`}
    >
      {/* Stream Thumbnail */}
      <div className="relative aspect-video">
        <Image
          src={stream.thumbnail?.src || "/default-thumbnail.png"}
          alt={stream.session_title}
          fill
          className="object-cover"
          sizes="320px"
        />
        {/* LIVE badge */}
        {stream.is_live && (
          <div className="absolute top-2 left-2 bg-black/60 text-green-400 text-xs font-bold px-2 py-1 rounded">
            LIVE
          </div>
        )}
        {/* Watching Live badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          {stream.viewer_count} watching
        </div>
      </div>
      {/* Card Content */}
      <div className="p-3 flex gap-3 items-center">
        {/* Channel Logo */}
        <Image
          src={stream.channel?.user?.profilepic || "/default-avatar.png"}
          alt={stream.channel?.slug || "Channel"}
          width={40}
          height={40}
          className="rounded-full object-cover border border-gray-700"
        />
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold truncate">
            {stream.channel?.user?.username || "Unknown"}
          </div>
          <div className="text-gray-400 text-xs truncate">
            {stream.session_title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreamCard;
