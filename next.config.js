// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/focus",
        destination: "https://pomodoro-app-sandy-eta.vercel.app/",
        permanent: false,
        basePath: false,
      },
      {
        source: "/planets",
        destination: "https://planets-gamma-beryl.vercel.app/",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
