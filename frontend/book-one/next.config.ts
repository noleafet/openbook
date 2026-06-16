import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // Logs the full URL of server-side fetch requests
    },
  },
};

export default nextConfig;
