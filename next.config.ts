import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old flat routes → new nested structure.
      { source: "/work", destination: "/resume", permanent: true },
      {
        source: "/writing",
        destination: "/interests/articles",
        permanent: true,
      },
      {
        source: "/writing/:slug",
        destination: "/interests/articles/:slug",
        permanent: true,
      },
      { source: "/quotes", destination: "/interests/quotes", permanent: true },
      { source: "/art", destination: "/interests/art", permanent: true },
      { source: "/media/tv", destination: "/media/movies", permanent: true },
    ];
  },
};

export default nextConfig;
