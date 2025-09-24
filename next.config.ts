import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    ppr: false,
  },
  images: {
    remotePatterns: [
      {
        // To allow all the domain
        protocol: "https",
        hostname: "**",
      },
    ],
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
    minimumCacheTTL: 2678400, // 31 days
  },

  async rewrites() {
    return [
      {
        source: "/products",
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
