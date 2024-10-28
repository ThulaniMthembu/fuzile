import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'], // Add any image domains you'll be using
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // Add any other Next.js 15.0.1 compatible options here
};

export default nextConfig;