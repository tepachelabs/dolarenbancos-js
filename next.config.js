/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
}

const { withLogtail } = require('@logtail/next');

module.exports = withLogtail(nextConfig);
