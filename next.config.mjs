/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Disable the experimental Turbopack flags that cause panics on
     CSS color interpolation. The stable bundler handles all animation
     styles correctly. */
  experimental: {},

  // Silence the high-verbosity NextAuth _log POST loop in dev
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
