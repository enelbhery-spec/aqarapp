/** @type {import('next').NextConfig} */
const nextConfig = {
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

  // تضمين المتغيرات البيئية أثناء البناء
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
