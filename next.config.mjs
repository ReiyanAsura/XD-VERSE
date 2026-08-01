/** @type {import('next').NextConfig} */
const isBuild = process.argv.includes('build')

const nextConfig = {
  output: isBuild ? 'export' : undefined,
  assetPrefix: isBuild ? './' : undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
