import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'moviesList',
      component: resolve => require(['@/components/moviesList.vue'], resolve),
    },
    {
      path: '/detail/:id',
      name: 'movieDetail',
      component: resolve => require(['@/components/detail.vue'], resolve),
    }
  ]
})
