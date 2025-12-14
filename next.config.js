/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // كاش 30 يوم
  },

  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  swcMinify: true,
};

module.exports = nextConfig;
