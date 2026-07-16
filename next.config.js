/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/webp", "image/avif"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkjeobavbxsarxbwmffj.supabase.co",
      },
    ],

    minimumCacheTTL: 2592000,
  },

  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async redirects() {
    return [
      
      // 1. تحويل أي مسارات قديمة أو مكسورة خاصة بالمنتجات/العقارات المحذوفة لتجنب الـ 404
      // (قم بتعديل /products/ للمسار القديم الذي قمت بحذفه اليوم إذا كان موجوداً)
      {
        source: "/products/:path*",
        destination: "/",
        permanent: true,
      },

      // 2. كود تحويل نطاق Vercel الافتراضي إلى نطاقك الأساسي الفعلي
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "aqarapp.vercel.app",
          },
        ],
        destination: "https://trand-aqar.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;