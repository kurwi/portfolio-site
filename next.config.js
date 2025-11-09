/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'", // base
      "script-src 'self'", // no remote scripts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // allow Google Fonts CSS
      "font-src 'self' https://fonts.gstatic.com", // allow font files
      "img-src 'self' data: blob:", // images + inline data
      "connect-src 'self'", // API calls local only
      "frame-ancestors 'none'", // prevent embedding
      'upgrade-insecure-requests'
    ].join('; ')
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ]
  }
}

module.exports = nextConfig
