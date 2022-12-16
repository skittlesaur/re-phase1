module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"]
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
