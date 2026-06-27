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