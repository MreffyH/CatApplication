module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'react-native-reanimated/plugin', // Tambahkan ini untuk react-native-reanimated
      ],
    };
  };