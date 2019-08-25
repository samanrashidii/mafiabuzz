import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

import './registerServiceWorker';

// Mobile Touch

Vue.use(Vue2TouchEvents)

// Global Components

import Button from '@/components/global/Button.vue';
import PageBox from '@/components/global/PageBox.vue';

Vue.component('app-button', Button);
Vue.component('page-box', PageBox);

// Required External Files

require('@/assets/styles/style.scss');

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
