import type React from "react"
import type { StreamSession } from "@/lib/types"
import { Calendar, Clock, Eye, Tag, ThumbsUp, Share2 } from "lucide-react"

interface VideoInfoProps {
  video: StreamSession
  channelName: string
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video, channelName }) => {
  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`
    }
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Video Title and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{video.session_title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{video.views?.toLocaleString() || 0} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(video.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(video.duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            <ThumbsUp className="w-4 h-4" />
            Like
          </button>
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">{channelName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{channelName}</h3>
              <p className="text-sm text-gray-400">Streamer</p>
            </div>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Follow
          </button>
        </div>

        {/* Video Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-medium">Language:</span>
            <span>{video.language}</span>
          </div>

          {video.is_mature && (
            <div className="flex items-center gap-2">
              <div className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                Mature Content
              </div>
            </div>
          )}

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              {video.tags.map((tag, index) => (
                <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Categories */}
          {video.categories && video.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.categories.map((category, index) => (
                <span key={index} className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoInfo
