/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_NAME: process.env.JWT_NAME,
  }
}

module.exports = nextConfig
