/** @type {import('next').NextConfig} */

if (!process.env.INTERNAL_MESSAGE_ID) {
  throw new Error("INTERNAL_MESSAGE_ID is not defined in .env file, if this is unintentional create it: INTERNAL_MESSAGE_ID=\"...\" ");
}
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
};

export default nextConfig;
