/** @type {import('next').NextConfig} */
const nextConfig = {
  // تفعيل React Strict Mode
  reactStrictMode: true,

  // إعدادات الصور (Supabase + تحسين الأداء)
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // كاش 30 يوم
  },

  // ضغط الملفات تلقائيًا
  compress: true,

  // إعدادات تجريبية مسموحة في Next.js 15
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;
