import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wojciech Staniszewski — Portfolio',
    short_name: 'WS Portfolio',
    description: 'Portfolio showcasing production-grade data and AI systems, engineering impact, and skills.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
