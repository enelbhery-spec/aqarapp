/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/webp", "image/avif"],

    // ✅ دعم Supabase بالكامل
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],

    // ✅ كاش للصور (30 يوم)
    minimumCacheTTL: 2592000, 
  },

  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

// ✅ استخدم هذه الصيغة بدلاً من module.exports
export default nextConfig;