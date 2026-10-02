import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 92],
  },
};

export default nextConfig;
