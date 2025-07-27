/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add the Kick domains to the images configuration
  images: {
    domains: ['files.kick.com', 'images.kick.com', 'docs.kick.com'],
  },

  // Add the rewrite rules for CORS
  // async rewrites() {
  //   return [
  //     {
  //       // This proxies the video stream's M3U8 manifest and chunks
  //       source: '/kick-stream/:path*',
  //       destination: 'https://kick.com/api/v1/:path*',
  //     },
  //     {
  //       // This proxies the main channel API call to avoid CORS errors
  //       source: '/kick-api/:path*',
  //       destination: 'https://kick.com/api/v1/:path*',
  //     },
  //   ];
  // },
}

export default nextConfig;