/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flagcdn.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
