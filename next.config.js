/** @type {import('next').NextConfig} */
// const baseURL = 'https://b934-140-213-140-224.ap.ngrok.io'
const baseURL = 'http://localhost:8000'

const nextConfig = {
  reactStrictMode: false,
  basePath: "/app",
  env: {
    MEMBERSHIP_STATIC: `${baseURL}/membership/static`,
    CUSTOMER_API: `${baseURL}/customer/api`,
    SERVER_TIME_API: `${baseURL}/server-time`,
    AUTH_API: `${baseURL}/auth/customer/api`,
    SECRET: 'taiAyam',
    DUMY_USERNAME: "walisongo",
    DUMY_PASSWORD: "walisongopass"
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: true,
        basePath: false
      },
    ]
  },
}

module.exports = nextConfig
