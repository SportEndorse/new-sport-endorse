import { withSentryConfig } from '@sentry/nextjs';
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  
  // IMPORTANT: Automatically redirect URLs with trailing slashes to non-trailing slash versions
  // This is handled at build time, not via middleware (no function invocation costs)
  trailingSlash: false,
  
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
  
  // Redirects from old website URLs to new URLs
  // These are processed at the Edge (no serverless function costs on Vercel)
  async redirects() {
    return [
      // Old website URL redirects
      {
        source: '/brand-elite-athlete-sponsorship',
        destination: '/brands',
        permanent: true,
      },
      {
        source: '/nil-athletes-register',
        destination: '/talent',
        permanent: true,
      },
      {
        source: '/elite-athletes-register',
        destination: '/talent',
        permanent: true,
      },
      {
        source: '/sponsorship-management-agencies',
        destination: '/agency',
        permanent: true,
      },
      {
        source: '/athlete-sponsorship-success',
        destination: '/success-stories',
        permanent: true,
      },
      {
        source: '/sponsorship-management-demo',
        destination: '/subscription',
        permanent: true,
      },
      {
        source: '/sports-sponsorship-agency-about-us-sport-endorse',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/sponsorship-faqs',
        destination: '/faqs',
        permanent: true,
      },
      {
        source: '/privacy-centre',
        destination: '/privacy-center',
        permanent: true,
      },
      {
        source: '/b2b-quiz-form',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact-sport-endorse',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/athlete-sponsorship-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/athlete-sponsorship-podcast',
        destination: '/podcasts',
        permanent: true,
      },
      {
        source: '/sports-marketing-news',
        destination: '/presses',
        permanent: true,
      },
      // Handle any trailing slashes on old URLs (backup for trailingSlash: false)
      {
        source: '/brand-elite-athlete-sponsorship/',
        destination: '/brands',
        permanent: true,
      },
      {
        source: '/nil-athletes-register/',
        destination: '/talent',
        permanent: true,
      },
      {
        source: '/elite-athletes-register/',
        destination: '/talent',
        permanent: true,
      },
      {
        source: '/sponsorship-management-agencies/',
        destination: '/agency',
        permanent: true,
      },
      {
        source: '/athlete-sponsorship-success/',
        destination: '/success-stories',
        permanent: true,
      },
      {
        source: '/sponsorship-management-demo/',
        destination: '/subscription',
        permanent: true,
      },
      {
        source: '/sports-sponsorship-agency-about-us-sport-endorse/',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/sponsorship-faqs/',
        destination: '/faqs',
        permanent: true,
      },
      {
        source: '/privacy-centre/',
        destination: '/privacy-center',
        permanent: true,
      },
      {
        source: '/b2b-quiz-form/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact-sport-endorse/',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/athlete-sponsorship-blog/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/athlete-sponsorship-podcast/',
        destination: '/podcasts',
        permanent: true,
      },
      {
        source: '/sports-marketing-news/',
        destination: '/presses',
        permanent: true,
      },
    ];
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
      // ...existing code...
    }
    
    return config;
  },
};

export default withSentryConfig(config, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "sport-endorse-website",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
