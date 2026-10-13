import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, "../../"),
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:8081/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
