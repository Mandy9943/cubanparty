import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cubanparty.uy",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "storage.cubanparty.uy",
      },
    ],
    unoptimized: true, // Disable image optimization
  },
};

export default nextConfig;
