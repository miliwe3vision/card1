import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  experimental: {
    proxyTimeout: 5 * 60 * 1000,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/auth/:path*",
        destination: "http://127.0.0.1:8000/auth/:path*",
      },
    ];
  },
};

export default nextConfig;