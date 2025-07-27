"use client";

import type React from "react";
import { getChannelAllVideo } from "@/lib/interaction/dataGetter";
import type { ChannelAllVideosResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Play, Eye, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OldVideosProps {
  channelName: string;
}

function PastStreamCard({
  video,
  channelName,
}: {
  video: any;
  channelName: string;
}) {
  const router = useRouter();

  const handleVideoClick = () => {
    // Encode the source URL for security
    const encodedSource = btoa(video.source);
    router.push(`/${channelName}/videos/${video.id}?src=${encodedSource}`);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:00`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={handleVideoClick}
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:ring-2 hover:ring-green-400 transition-all duration-300 hover:scale-105 group cursor-pointer"
    >
      <div className="relative">
        <Image
          src={
            video.thumbnail?.src ||
            "/placeholder.svg?height=180&width=320&query=stream thumbnail"
          }
          alt={video.session_title}
          width={320}
          height={180}
          className="w-full h-48 object-cover"
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-green-600 rounded-full p-3">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
            {formatDuration(video.duration)}
          </div>
        )}

        {/* View Count Badge */}
        <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {video.views?.toLocaleString() ||
            video.viewer_count?.toLocaleString() ||
            0}
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
          {video.session_title}
        </h4>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(video.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(video.duration || 0)}</span>
          </div>
        </div>

        {/* Categories */}
        {video.categories && video.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {video.categories
              .slice(0, 2)
              .map((category: any, index: number) => (
                <span
                  key={index}
                  className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs"
                >
                  {category.name}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

const OldVideos: React.FC<OldVideosProps> = ({ channelName }) => {
  const { data, isLoading, error } = useQuery<ChannelAllVideosResponse>({
    queryKey: ["channel-videos", channelName],
    queryFn: () => getChannelAllVideo(channelName),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-700"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📹</div>
        <h3 className="text-xl font-bold text-white mb-2">No Past Streams</h3>
        <p className="text-gray-400">
          This channel hasnt streamed yet or videos are not available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((video) => (
        <PastStreamCard
          key={video.id}
          video={video}
          channelName={channelName}
        />
      ))}
    </div>
  );
};

export default OldVideos;
