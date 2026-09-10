import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Minimizes Docker image size dramatically
  logging: {
    fetches: {
      fullUrl: true, // Logs the full URL of server-side fetch requests
    },
  },
};

export default nextConfig;
