import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/traslado/:path*',
        destination: '/comunas/:path*',
        permanent: true,
      },
      {
        source: '/comuna/:path*',
        destination: '/comunas/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
