module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fa',
      fallbackLocale: 'fa',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/sass/global.scss";',
      },
    },
  },
};
