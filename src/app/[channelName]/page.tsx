"use client";

import { getBasicInfoOfChannel } from "@/lib/interaction/dataGetter";
import { useQuery } from "@tanstack/react-query";
import LiveStream from "./components/LiveStream";
import OldVideos from "./components/OldVideos";
import { useParams } from "next/navigation";
import ChannelInfoCard from "./components/ChannelInfoCard";
import StreamStats from "./components/StreamStats";

function Page() {
  const params = useParams();
  const channel_name =
    typeof params?.channelName === "string"
      ? params.channelName
      : Array.isArray(params?.channelName)
      ? params.channelName[0]
      : "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["channel-info", channel_name],
    queryFn: () => getBasicInfoOfChannel(channel_name),
    refetchInterval: 30000, // Refetch every 30 seconds to check live status
  });

  if (isLoading) {
    return (
      <div className="bg-[#18181b] min-h-screen text-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-[#232329] rounded w-1/3 mb-6"></div>
            <div className="h-96 bg-[#232329] rounded mb-6"></div>
            <div className="h-20 bg-[#232329] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#18181b] min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-[#222]">Error fetching channel data.</p>
        </div>
      </div>
    );
  }

  const channel = data?.data?.[0];

  if (!channel) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">Channel Not Found</h1>
          <p className="text-[#222]">No channel found with that name.</p>
        </div>
      </div>
    );
  }

  const isLive = channel.stream?.is_live;

  return (
    <div className="bg-[#18181b] min-h-screen text-white">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Channel Info Header */}
        <ChannelInfoCard channel={channel} />

        {/* Stream Stats */}
        {isLive && <StreamStats channel={channel} />}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Stream/Video Player */}
          <div className="xl:col-span-3">
            {isLive ? (
              <LiveStream slug_username={channel.slug} channel={channel} />
            ) : (
              <div className="bg-gradient-to-br from-[#18181b] to-[#232329] rounded-xl shadow-lg p-12 text-center border border-[#232329]">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-[#232329] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-[#222]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 text-white">
                    Channel is Offline
                  </h2>
                  <p className="text-[#222] text-lg max-w-md mx-auto">
                    {channel.slug} is not currently streaming. Check out their
                    past broadcasts below or follow for notifications!
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Follow Channel
                  </button>
                  <button className="bg-[#232329] hover:bg-[#18181b] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Enable Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Chat Sidebar - Only show when live */}
          {isLive && (
            <div className="xl:col-span-1">
              <div className="sticky top-6">
                <div className="bg-[#232329] rounded-xl shadow-lg border border-[#18181b] h-[600px] flex flex-col">
                  <div className="p-4 border-b border-[#18181b]">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      Live Chat
                    </h3>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      src={`https://www.kick.com/embed/chat/${channel.slug}`}
                      className="w-full h-full border-0"
                      title="Chat"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Past Streams Section */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold">Past Broadcasts</h2>
            <div className="h-px bg-[#232329] flex-1"></div>
          </div>
          <OldVideos channelName={channel_name} />
        </div>
      </div>
    </div>
  );
}

export default Page;
