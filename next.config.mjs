/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // السماح بعرض الصور من Supabase Storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkjeobavbxsarxbwmffj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // تفعيل دعم الصور الخارجية بالكامل
    domains: ["rkjeobavbxsarxbwmffj.supabase.co"],
    formats: ["image/avif", "image/webp"],
  },

  // تجاهل أخطاء Typescript أثناء البناء (اختياري)
  typescript: {
    ignoreBuildErrors: true,
  },

  // تجاهل أخطاء ESLint أثناء البناء (اختياري)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
