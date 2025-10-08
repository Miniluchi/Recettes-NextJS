import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev",
      },
    ],
  },
};

export default nextConfig;
