import Vue from 'vue';
// import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';

// Mobile Touch

// Vue.use(Vue2TouchEvents)

// Global Components

import Button from '@/components/global/Button.vue';

Vue.component('app-button', Button);

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
  router,
  store,
  render: h => h(App),
}).$mount('#app');
