import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Typechecking is run separately (e.g. `npx tsc --noEmit`) to avoid
    // environment-specific spawn issues during `next build`.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Avoid spawning multiple node processes in restricted environments.
    workerThreads: true,
    cpus: 1,
  },
};

export default nextConfig;
