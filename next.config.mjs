/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/alegria', destination: '/villa-serena', permanent: true },
      { source: '/alegria/:path*', destination: '/villa-serena/:path*', permanent: true },
      { source: '/casamomi', destination: '/casa-blu', permanent: true },
      { source: '/casamomi/:path*', destination: '/casa-blu/:path*', permanent: true },
    ];
  },
}

export default nextConfig
