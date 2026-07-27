/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/XD-VERSE',
  assetPrefix: '/XD-VERSE/',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
