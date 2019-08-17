module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fa',
      fallbackLocale: 'fa',
      localeDir: 'locales',
      enableInSFC: true,
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/_variables.scss";'
      }
    }
  },
  // publicPath: '/mafiabuzzi/',
};