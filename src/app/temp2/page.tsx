"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const videoSrc =
  "https://stream.kick.com/ivs/v1/196233775518/0bkko8gv8sUA/2025/7/26/13/24/HYgBowEa9LNt/media/hls/master.m3u8";

const KickVodPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
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
        videoRef.current.src = videoSrc;
        videoRef.current.addEventListener("loadedmetadata", function () {
          videoRef.current?.play();
        });
      }
    }
  }, []);

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
      <h2 style={{ marginBottom: 20 }}>Kick VOD Player</h2>
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{
          width: "80vw",
          maxWidth: 1280,
          border: "2px solid #53C851",
          borderRadius: 8,
        }}
        poster="https://images.kick.com/video_thumbnails/LjoFgVPPRANA/jgYwffmX3AiZ/720.webp"
      />
    </div>
  );
};

export default KickVodPlayer;
