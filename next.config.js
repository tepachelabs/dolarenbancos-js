/** @type {import('next').NextConfig} */
const nextConfig = {}

const { withLogtail } = require('@logtail/next');

module.exports = withLogtail(nextConfig);
