"use client"

import type React from "react"
import type { StreamSession } from "@/lib/types"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Play, Eye, Clock } from "lucide-react"

interface RelatedVideosProps {
  videos: StreamSession[]
  currentVideoId: number
  channelName: string
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos, currentVideoId, channelName }) => {
  const router = useRouter()

  const relatedVideos = videos.filter((video) => video.id !== currentVideoId && !video.is_live).slice(0, 10)

  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:00`
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const handleVideoClick = (video: StreamSession) => {
    const encodedSource = btoa(video.source)
    router.push(`/${channelName}/videos/${video.id}?src=${encodedSource}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">More from {channelName}</h2>

      <div className="space-y-3">
        {relatedVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoClick(video)}
            className="flex gap-3 bg-gray-800 hover:bg-gray-700 rounded-lg p-3 cursor-pointer transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
              <Image
                src={video.thumbnail?.src || "/placeholder.svg?height=90&width=160&query=video thumbnail"}
                alt={video.session_title}
                width={160}
                height={90}
                className="w-40 h-24 object-cover rounded-lg"
              />

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>

              {/* Duration */}
              <div className="absolute bottom-1 right-1 bg-black/80 text-white px-2 py-1 rounded text-xs">
                {formatDuration(video.duration)}
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm line-clamp-2 mb-1 group-hover:text-green-400 transition-colors">
                {video.session_title}
              </h3>

              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{formatViews(video.views || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(video.created_at)}</span>
                  </div>
                </div>

                {/* Tags */}
                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {relatedVideos.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📹</div>
          <p className="text-gray-400 text-sm">No more videos available</p>
        </div>
      )}
    </div>
  )
}

export default RelatedVideos
