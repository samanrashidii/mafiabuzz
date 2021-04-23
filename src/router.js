import Vue from 'vue'
import Router from 'vue-router'

const NotFound = (resolve) => {
  require.ensure(['./views/NotFound.vue'], () => {
    resolve(require('./views/NotFound.vue'))
  })
}

const About = (resolve) => {
  require.ensure(['./views/About.vue'], () => {
    resolve(require('./views/About.vue'))
  })
}

const Creator = (resolve) => {
  require.ensure(['./views/Creator.vue'], () => {
    resolve(require('./views/Creator.vue'))
  })
}

const HowToPlay = (resolve) => {
  require.ensure(['./views/HowToPlay.vue'], () => {
    resolve(require('./views/HowToPlay.vue'))
  })
}

const Characters = (resolve) => {
  require.ensure(['./views/Characters.vue'], () => {
    resolve(require('./views/Characters.vue'))
  })
}

const Support = (resolve) => {
  require.ensure(['./views/Support.vue'], () => {
    resolve(require('./views/Support.vue'))
  })
}

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'creator',
      component: Creator
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/how-to-play',
      name: 'howtoplay',
      component: HowToPlay
    },
    {
      path: '/characters',
      name: 'characters',
      component: Characters
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    {
      path: '/error-404',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: { name: 'not-found' }
    }
  ]
})
