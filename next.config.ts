import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smart-task-studios-admin.notebrains.com',
      },
    ],
  },
}

export default nextConfig
