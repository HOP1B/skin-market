import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  env: {
    env: process.env.DATABASE_URL!,
  },
};

export default nextConfig;
