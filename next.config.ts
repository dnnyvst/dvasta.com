import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/focus",
        destination: "https://pomodoro-app-sandy-eta.vercel.app/",
        permanent: false,
        basePath: false,
      },
      {
        source: "/space",
        destination: "https://planets-gamma-beryl.vercel.app/",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
