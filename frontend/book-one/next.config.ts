import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Minimizes Docker image size dramatically
  logging: {
    fetches: {
      fullUrl: true, // Logs the full URL of server-side fetch requests
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error', 'warn'] } 
      : false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/book-one', // Change this to your desired path
        permanent: true,       // Use true for 301 permanent redirect, false for 302 temporary
      },
    ];
  },
};

export default nextConfig;
