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
      {
        source: '/squadTypes',
        destination: '/factions',
        permanent: true,
      },
      {
        source: '/squadTypes/OCL',
        destination: '/squadTypes/CWB',
        permanent: true,
      },
      {
        source: '/squadTypes/EIR',
        destination: '/squadTypes/REL',
        permanent: true,
      },
      {
        source: '/squadTypes/CRS',
        destination: '/squadTypes/SCH',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
