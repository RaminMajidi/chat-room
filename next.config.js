/** @type {import('next').NextConfig} */


module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: true };

    return config;
  },
};


