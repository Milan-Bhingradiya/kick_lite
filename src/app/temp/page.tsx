"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

// const kickApiResponse = {
//   id: 1842770,
//   user_id: 1894880,
//   slug: "soyomartv",
//   is_banned: false,
//   // playback_url:
//   //   "https://fa723fc1b171.us-west-2.playback.live-video.net/api/video/v1/us-west-2.196233775518.channel.LjoFgVPPRANA.m3u8?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy13ZXN0LTI6MTk2MjMzNzc1NTE4OmNoYW5uZWwvTGpvRmdWUFBSQU5BIiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6Imh0dHBzOi8va2ljay5jb20saHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20saHR0cHM6Ly8qLmtpY2subGl2ZSxodHRwczovL3BsYXllci5raWNrLmNvbSxodHRwczovL2FkbWluLmtpY2suY29tLGh0dHBzOi8vYmV0YS5raWNrLmNvbSxodHRwczovL25leHQua2ljay5jb20saHR0cHM6Ly9kYXNoYm9hcmQua2ljay5jb20saHR0cHM6Ly8qLnByZXZpZXcua2ljay5jb20iLCJhd3M6c3RyaWN0LW9yaWdpbi1lbmZvcmNlbWVudCI6ZmFsc2UsImV4cCI6MTc1MzU5NTQ4N30.LDIznh6xGqIfmebefkx2Ze72IdeqOmBXVTlwBAHm4uVW9cBjsEVdgIb2rQo5uCOGOR56_XR7pymaY2sFwN5zWtYbGpAuBzLr6fSHr_EQD5EGG4NUvqmn9zvhSQ0Efobq",
//   playback_url:
//     "https://fa723fc1b171.us-west-2.playback.live-video.net/api/video/v1/us-west-2.196233775518.channel.LjoFgVPPRANA.m3u8?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzM4NCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy13ZXN0LTI6MTk2MjMzNzc1NTE4OmNoYW5uZWwvTGpvRmdWUFBSQU5BIiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6Imh0dHBzOi8va2ljay5jb20saHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20saHR0cHM6Ly8qLmtpY2subGl2ZSxodHRwczovL3BsYXllci5raWNrLmNvbSxodHRwczovL2FkbWluLmtpY2suY29tLGh0dHBzOi8vYmV0YS5raWNrLmNvbSxodHRwczovL25leHQua2ljay5jb20saHR0cHM6Ly9kYXNoYm9hcmQua2ljay5jb20saHR0cHM6Ly8qLnByZXZpZXcua2ljay5jb20iLCJhd3M6c3RyaWN0LW9yaWdpbi1lbmZvcmNlbWVudCI6ZmFsc2UsImV4cCI6MTc1MzU5NTQ4N30.LDIznh6xGqIfmebefkx2Ze72IdeqOmBXVTlwBAHm4uVW9cBjsEVdgIb2rQo5uCOGOR56_XR7pymaY2sFwN5zWtYbGpAuBzLr6fSHr_EQD5EGG4NUvqmn9zvhSQ0Efobq",
//   livestream: {
//     session_title: "TARDE POR LA VELADA",
//     is_live: true,
//     viewer_count: 17962,
//     thumbnail: {
//       url: "https://images.kick.com/video_thumbnails/LjoFgVPPRANA/jgYwffmX3AiZ/720.webp",
//     },
//   },
//   user: {
//     username: "SoyOmarTV",
//     profile_pic:
//       "https://files.kick.com/images/user/1894880/profile_image/conversion/8b1addbe-b6b3-4e05-9ac9-cbbee5ff19f8-fullsize.webp",
//   },
// };

const KickPlayerPage: React.FC = () => {
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
      <iframe
        src="https://player.kick.com/sgt_jackson12"
        height="720"
        width="1280"
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
        style={{ border: "2px solid #53C851", borderRadius: 8 }}
        title="Kick.com Player"
      />
    </div>
  );
};

export default KickPlayerPage;
