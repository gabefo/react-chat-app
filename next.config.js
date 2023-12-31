/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/conversations',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
