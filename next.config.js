const fs = require('fs');
const path = require('path');

const nextConfig = {
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem')),
    },
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/naver/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media1.jjalkey.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ahwhew.com',
      },
      {
        protocol: 'https',
        hostname: 'example-bucket-seeun.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
