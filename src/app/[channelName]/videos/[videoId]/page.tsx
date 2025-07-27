"use client"

import { getChannelAllVideo } from "@/lib/interaction/dataGetter"
import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation"
import VideoPlayer from "./components/VideoPlayer"
import RelatedVideos from "./components/RelatedVideos"
import VideoInfo from "./components/VideoInfo"
import { useState, useEffect } from "react"
import type { StreamSession } from "@/lib/types"

function VideoPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [currentVideo, setCurrentVideo] = useState<StreamSession | null>(null)

  const channelName = typeof params?.channelName === "string" ? params.channelName : ""
  const videoId = typeof params?.videoId === "string" ? params.videoId : ""

  // Get video source from URL params (base64 encoded for security)
  const encodedSource = searchParams.get("src")
  const videoSource = encodedSource ? atob(encodedSource) : ""

  const {
    data: allVideos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["channel-videos", channelName],
    queryFn: () => getChannelAllVideo(channelName),
  })

  useEffect(() => {
    if (allVideos && videoId) {
      const video = allVideos.find((v) => v.id.toString() === videoId)
      if (video) {
        setCurrentVideo(video)
      }
    }
  }, [allVideos, videoId])

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-800 rounded-xl mb-6"></div>
            <div className="h-8 bg-gray-800 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !currentVideo) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold mb-2">Video Not Found</h1>
          <p className="text-gray-400">The requested video could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Video Section */}
          <div className="xl:col-span-3">
            <VideoPlayer
              source={videoSource || currentVideo.source}
              poster={currentVideo.thumbnail?.src}
              title={currentVideo.session_title}
            />
            <VideoInfo video={currentVideo} channelName={channelName} />
          </div>

          {/* Related Videos Sidebar */}
          <div className="xl:col-span-1">
            <RelatedVideos videos={allVideos || []} currentVideoId={currentVideo.id} channelName={channelName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPage
