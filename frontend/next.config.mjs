/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/language_school/' : '',
  basePath: isProd ? '/language_school' : '',
  output: 'export'
};

export default nextConfig;