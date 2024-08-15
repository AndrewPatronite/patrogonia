module.exports = function override(config, _env) {
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
    string_decoder: require.resolve('string_decoder/'),
  };
  return config;
};
