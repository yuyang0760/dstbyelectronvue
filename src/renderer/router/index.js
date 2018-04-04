import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/first_page',
      name: 'first_page',
      component: require('@/components/FirstPage.vue').default
    },
    {
      path: '/second_page',
      name: 'second_page',
      component: require('@/components/SecondPage.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
