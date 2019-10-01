import Vue from 'vue';
// import Vue2TouchEvents from 'vue2-touch-events';
import Notifications from 'vue-notification';
import App from './App.vue';
import router from './router';
import store from './store/index';
import i18n from './i18n';

import './registerServiceWorker';

// Global Components

import Button from './components/global/Button.vue';
import PageBox from './components/global/PageBox.vue';

// Mobile Touch

// Vue.use(Vue2TouchEvents);
Vue.use(Notifications);

Vue.component('AppButton', Button);
Vue.component('PageBox', PageBox);

// Vue Config

Vue.config.productionTip = false;

// Vue Router

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

// Create Vue

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
