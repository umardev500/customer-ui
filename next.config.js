/** @type {import('next').NextConfig} */
const baseURL = 'https://eb41-140-213-132-236.ap.ngrok.io'
// const baseURL = 'http://localhost:8000'

const nextConfig = {
  reactStrictMode: false,
  basePath: "/app",
  env: {
    CUSTOMER_STATIC: `${baseURL}/customer/static`,
    CUSTOMER_API: `${baseURL}/customer/api`,
    SERVER_TIME_API: `${baseURL}/server-time`,
    AUTH_API: `${baseURL}/auth/customer/api`,
    SECRET: 'taiAyam',
    DUMY_USERNAME: "dummyusername",
    DUMY_PASSWORD: "dummypassword"
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
