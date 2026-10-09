// Complementa o app.json. EXPO_BASE_URL define o caminho em que o app é publicado
// (no GitHub Pages ele fica em /Facilita/app, dentro da vitrine).
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    ...(process.env.EXPO_BASE_URL ? { baseUrl: process.env.EXPO_BASE_URL } : {}),
  },
});
