import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // ✅ permite imágenes externas de Sanity
  },
}

export default nextConfig
