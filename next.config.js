/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/webp", "image/avif"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
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
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "aqarapp.vercel.app", // 👈 رابط Vercel
          },
        ],
        destination: "https://trand-aqar.online/:path*", // 👈 الدومين الجديد
        permanent: true,
      },
    ];
  },
};

export default nextConfig;