import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NO "output: standalone" — Vercel maneja su propio output
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // Permitir imágenes locales del directorio /public
    unoptimized: false,
  },
};

export default nextConfig;
