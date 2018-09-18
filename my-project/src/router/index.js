import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/Calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calendar',
      component: Calendar
    }
  ]
})
