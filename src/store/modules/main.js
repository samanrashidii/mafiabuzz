import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    mainApp: {
      navigation: [
        {
          name: 'navigation[0].name',
          url: 'creator',
          image: 'creator.svg',
          alt: 'navigation[0].alt',
        },
        {
          name: 'navigation[1].name',
          url: 'howtoplay',
          image: 'howtoplay.svg',
          alt: 'navigation[1].alt',
        },
        {
          name: 'navigation[2].name',
          url: 'about',
          image: 'logo.png',
          alt: 'navigation[2].alt',
        },
      ],
      language: {
        text: 'language.text',
        image: 'language.svg',
        alt: 'language.alt',
      },
    },
  },
  getters: {
    MainApp: state => state.mainApp,
  },
  mutations: {
    SET_MAIN_APP: (state, data) => {
      Vue.set(state, 'mainApp', data);
    },
  },
  actions: {
    SetMainApp: (context, data) => {
      context.commit('SET_MAIN_APP', data);
    },
  },
};
