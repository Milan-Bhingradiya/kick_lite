"use client";

import type React from "react";
import { useState } from "react";
import type { ChannelData } from "@/lib/types";
import { Eye, Users, Clock, Maximize2, Volume2, VolumeX } from "lucide-react";

interface LiveStreamProps {
  slug_username: string;
  channel: ChannelData;
}

const LiveStream: React.FC<LiveStreamProps> = ({ slug_username, channel }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById(
      "stream-player"
    ) as HTMLIFrameElement;
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Stream Player */}
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Live Indicator */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {channel.stream?.viewer_count?.toLocaleString() || 0}
          </div>
        </div>

        {/* Player Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Stream Iframe */}
        <iframe
          id="stream-player"
          src={`https://player.kick.com/${slug_username}${
            isMuted ? "?muted=true" : ""
          }`}
          height="600"
          width="100%"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
          className="w-full aspect-video"
          title="Kick.com Player"
        />
      </div>

      {/* Stream Info */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">
              {channel.stream_title || `${channel.slug}'s Stream`}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>
                  {channel.stream?.viewer_count?.toLocaleString() || 0} viewers
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  Started{" "}
                  {new Date(
                    channel.stream?.start_time || ""
                  ).toLocaleTimeString()}
                </span>
              </div>
              {channel.category && (
                <div className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
                  {channel.category.name}
                </div>
              )}
              {channel.stream?.is_mature && (
                <div className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full">
                  Mature Content
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Follow
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
