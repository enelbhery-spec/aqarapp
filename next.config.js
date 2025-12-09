/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
