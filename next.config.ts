import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'mysql2'],
  },
};

export default nextConfig;
