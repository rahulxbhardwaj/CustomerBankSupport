import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  serverExternalPackages: ['mongoose', 'bcrypt'],
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
