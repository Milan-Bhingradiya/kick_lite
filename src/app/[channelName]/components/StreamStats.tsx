import type React from "react";
import type { ChannelData } from "@/lib/types";
import { TrendingUp, Eye, Clock, Users } from "lucide-react";

interface StreamStatsProps {
  channel: ChannelData;
}

const StreamStats: React.FC<StreamStatsProps> = ({ channel }) => {
  const streamDuration = channel.stream?.start_time
    ? Math.floor(
        (Date.now() - new Date(channel.stream.start_time).getTime()) / 1000 / 60
      )
    : 0;

  const stats = [
    {
      icon: Eye,
      label: "Current Viewers",
      value: channel.stream?.viewer_count?.toLocaleString() || "0",
      color: "text-green-400",
    },
    {
      icon: Clock,
      label: "Stream Duration",
      value: `${Math.floor(streamDuration / 60)}h ${streamDuration % 60}m`,
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      label: "Peak Viewers",
      value: channel.stream?.viewer_count?.toLocaleString() || "0", // You might want to track this separately
      color: "text-purple-400",
    },
    {
      icon: Users,
      label: "Followers",
      value: "N/A", // This would need to come from a different API endpoint
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-4 border border-gray-700"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-700 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreamStats;
