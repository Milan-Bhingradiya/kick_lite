"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import type { ChannelData } from "@/lib/types";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

interface ChannelInfoCardProps {
  channel: ChannelData;
}

const ChannelInfoCard: React.FC<ChannelInfoCardProps> = ({ channel }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const accessToken = "YOUR_ACCESS_TOKEN";
        const response = await axios.get(channel.banner_picture, {
          headers: { Authorization: `Bearer ${accessToken}` },
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        setImgUrl(URL.createObjectURL(blob));
      } catch (err) {
        setImgUrl(null);
      }
    };

    if (channel.banner_picture) {
      fetchImage();
    }
  }, [channel.banner_picture]);

  return (
    <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-6 border border-gray-700">
      {/* Banner Background */}
      {imgUrl && (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={imgUrl || "/placeholder.svg"}
            alt="Channel Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="relative p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Channel Avatar/Banner */}
          <div className="flex-shrink-0">
            {imgUrl ? (
              <Image
                src={imgUrl || "/placeholder.svg"}
                alt="Channel Banner"
                width={120}
                height={120}
                className="rounded-xl object-cover border-2 border-green-500"
                priority
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {channel.slug.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Channel Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white truncate">
                {channel.slug}
              </h1>
              {channel.stream?.is_live && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              )}
            </div>

            {channel.channel_description && (
              <p className="text-gray-300 mb-3 line-clamp-2">
                {channel.channel_description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {channel.category && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{channel.category.name}</span>
                </div>
              )}

              {channel.stream?.language && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{channel.stream.language.toUpperCase()}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined Kick</span>
              </div>
            </div>

            {channel.stream_title && (
              <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                <p className="text-green-400 font-medium">Current Stream:</p>
                <p className="text-white">{channel.stream_title}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 lg:flex-shrink-0">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              Follow
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfoCard;
