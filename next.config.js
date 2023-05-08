/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production'
const name = 'portfolio_2023' // github이름과 일치하지 않는 경우 '.'으로 해서 상대경로로 해야함. 정확히 모르겠음. 
const nextConfig = {
  reactStrictMode: true,
  assetPrefix:!debug ? `/${name}/`:``,  
  basePath: `/${name}`, 
  trailingSlash: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig