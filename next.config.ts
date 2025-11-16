/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // config options here 
};

export default nextConfig;
*/
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  
  // Optimize for static generation where possible
  poweredByHeader: false,
  generateEtags: false,
  
  // Enhanced static generation settings
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // File tracing for static generation
  outputFileTracingIncludes: {
    '/': ['./public/**/*', './public/videos/**/*'],
  },
  
  // Optimize build output
  compiler: {
    removeConsole: false,
  },
  
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable static imports for better production handling
    unoptimized: false,
    // Allow external images from WordPress
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sportendorse.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  
  // Enhanced webpack configuration for video optimization
  webpack: (config, { isServer }) => {
    config.output.chunkLoadTimeout = 30000;
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      
      // Optimize chunking for better video loading
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            // Separate chunk for video utilities
            video: {
              name: 'video-utils',
              chunks: 'all',
              test: /[\\/]utils[\\/]videoOptimization/,
              priority: 20,
            },
          },
        },
      };
    }
    
    return config;
  },
};

export default config;