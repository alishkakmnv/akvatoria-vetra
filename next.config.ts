import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // В домашней папке лежит посторонний package-lock.json — фиксируем корень
    root: __dirname,
  },
};

export default nextConfig;
