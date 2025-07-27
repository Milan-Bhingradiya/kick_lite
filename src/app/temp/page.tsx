"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const kickApiResponse = {
  id: 1842770,
  user_id: 1894880,
  slug: "soyomartv",
  is_banned: false,
  playback_url:
    "https://fa723fc1b171.us-west-2.playback.live-video.net/api/video/v1/us-west-2.196233775518.channel.LjoFgVPPRANA.m3u8?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy13ZXN0LTI6MTk2MjMzNzc1NTE4OmNoYW5uZWwvTGpvRmdWUFBSQU5BIiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6Imh0dHBzOi8va2ljay5jb20saHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20saHR0cHM6Ly8qLmtpY2subGl2ZSxodHRwczovL3BsYXllci5raWNrLmNvbSxodHRwczovL2FkbWluLmtpY2suY29tLGh0dHBzOi8vYmV0YS5raWNrLmNvbSxodHRwczovL25leHQua2ljay5jb20saHR0cHM6Ly9kYXNoYm9hcmQua2ljay5jb20saHR0cHM6Ly8qLnByZXZpZXcua2ljay5jb20iLCJhd3M6c3RyaWN0LW9yaWdpbi1lbmZvcmNlbWVudCI6ZmFsc2UsImV4cCI6MTc1MzU5MzAwMn0.0PHyhdKtJ6kgwwQiuXG2vwx6Z4o0f4P6ekmFwt82ObCAbDbc7w0N3kG2hXon_O7d8zkNAyRC5uY2jt0jKVNeFSaPW7oEIacHqF0k7Z2iiqSzg2WE48NrLHPlv3q8FP5y",
  livestream: {
    session_title: "TARDE POR LA VELADA",
    is_live: true,
    viewer_count: 17962,
    thumbnail: {
      url: "https://images.kick.com/video_thumbnails/LjoFgVPPRANA/jgYwffmX3AiZ/720.webp",
    },
  },
  user: {
    username: "SoyOmarTV",
    profile_pic:
      "https://files.kick.com/images/user/1894880/profile_image/conversion/8b1addbe-b6b3-4e05-9ac9-cbbee5ff19f8-fullsize.webp",
  },
};

const KickPlayerPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLive = kickApiResponse.livestream.is_live;
  const playbackUrl = kickApiResponse.playback_url;
  const title = kickApiResponse.livestream.session_title;
  const username = kickApiResponse.user.username;
  const viewers = kickApiResponse.livestream.viewer_count;

  useEffect(() => {
    if (isLive && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(playbackUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current?.play();
        });
        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = playbackUrl;
        videoRef.current.play();
      }
    }
  }, [isLive, playbackUrl]);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#121212",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%", maxWidth: 1280 }}>
        <video
          ref={videoRef}
          controls
          style={{ width: "100%", border: "2px solid #53C851" }}
          poster={kickApiResponse.livestream.thumbnail.url}
        />
        <div
          style={{
            marginTop: 10,
            padding: 10,
            background: "#222",
            borderRadius: 5,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.5em", color: "#53C851" }}>
            {isLive ? title : "Stream is currently offline."}
          </h2>
          <p>
            <strong>Channel:</strong> <span>{username}</span>
          </p>
          <p>
            <strong>Viewers:</strong> <span>{viewers}</span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span style={{ color: isLive ? "#53C851" : "red" }}>
              {isLive ? "Live" : "Offline"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default KickPlayerPage;
