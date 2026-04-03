/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['dev.ruinstars.com'],
  turbopack: {},

  async redirects() {
    return [
      {
        source: '/assets/Ruinstars%20-%20The%20Rules%20-%2020250708%20-%20FullColor.pdf',
        destination: '/rules',
        permanent: true,
      },
      {
        source: '/assets/Ruinstars - The Rules - 20250708 - FullColor.pdf',
        destination: '/rules',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
