import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  // ✅ الإعداد الحديث لتفعيل التحديث الفوري للـ Service Worker
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  },
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      
      {
        protocol: "https",
        hostname: "rkjeobavbxsarxbwmffj.supabase.co", // ✅ أضفناه لتفادي خطأ الصورة من Supabase
      },
    ],
  },
};

export default withPWA(nextConfig);
