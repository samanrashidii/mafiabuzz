import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


// Global Components

import Navigation from '@/components/global/Navigation.vue';

Vue.component('app-navigation', Navigation);

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
