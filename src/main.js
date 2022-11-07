import Vue from 'vue'
// Plugins
import Notifications from 'vue-notification'
import VueMeta from 'vue-meta'
import Loading from 'vue-loading-overlay'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './i18n'
import VueClipboard from 'vue-clipboard2'
import 'vue-loading-overlay/dist/vue-loading.css'
import BackToTop from 'vue-backtotop'
// Global Items
import global from '@/mixins/global'
import Button from './components/BaseButton.vue'
import PageBox from './components/BasePageBox.vue'
const VueScrollTo = require('vue-scrollto')

Vue.component('AppButton', Button)
Vue.component('PageBox', PageBox)
Vue.mixin(global)
Vue.use(VueMeta)
Vue.use(Notifications)
Vue.use(Loading)
Vue.use(VueClipboard)
Vue.use(VueScrollTo)
Vue.use(BackToTop)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
