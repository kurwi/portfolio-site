/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  onDemandEntries: {
    maxInactiveAge: 3 * 1000,
    pagesBufferLength: 0,
  },
  
  experimental: {
    optimizePackageImports: ['clsx'],
    optimizeCss: true,
  },
  
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true,
      };
    }
    config.resolve.symlinks = false;
    return config;
  },
};

module.exports = nextConfig;
