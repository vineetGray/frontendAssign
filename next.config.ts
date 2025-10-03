import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };
// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // allow any path on that hostname
      },
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
