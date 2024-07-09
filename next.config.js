const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@babel/preset-env": require.resolve("@babel/preset-env"),
        "@babel/preset-react": require.resolve("@babel/preset-react"),
        "@babel/preset-typescript": require.resolve("@babel/preset-typescript"),
      };
    }
    return config;
  },
});
