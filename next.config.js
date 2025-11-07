/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ إعدادات الصور (Supabase Storage)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkjeobavbxsarxbwmffj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    domains: ["rkjeobavbxsarxbwmffj.supabase.co"],
    formats: ["image/avif", "image/webp"],
  },

  // ✅ تحسين حجم البناء (build optimization)
  compress: true,
  productionBrowserSourceMaps: false, // يمنع ملفات ضخمة أثناء البناء
  webpack: (config) => {
    config.optimization.minimize = true; // ضغط الكود النهائي
    return config;
  },

  // ✅ تحسين استيراد المكتبات الثقيلة (اختياري)
  experimental: {
    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },
  },

  // ✅ تضمين المتغيرات البيئية أثناء البناء
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // ✅ تجاوز أخطاء Typescript و ESLint أثناء البناء
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
