import type { NextConfig } from "next";

// Static media in /public keeps its filename across deploys, so cache for a week and
// let the browser keep serving it for a month while it revalidates in the background.
const mediaCache = "public, max-age=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
    // 12KB of CSS goes inline in the HTML: no render-blocking stylesheet request
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85, 92],
    // optimised photos are cached for 30 days instead of re-encoding on revalidation
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return ["/video/:path*", "/images/:path*", "/brand/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: mediaCache }],
    }));
  },
};

export default nextConfig;
