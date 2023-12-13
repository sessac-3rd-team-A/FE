/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {};

module.exports = nextConfig;
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
