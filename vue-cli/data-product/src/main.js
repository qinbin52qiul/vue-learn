import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Layout from './components/layout'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailAnaPage from './pages/detail/analysis'
import DetailPubPage from './pages/detail/publish'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/count',
      children: [
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
