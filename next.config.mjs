/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  productionBrowserSourceMaps: false
}

export default nextConfig
