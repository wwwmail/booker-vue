import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
import MainApp from '@/components/MainApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainApp',
      component: MainApp
    },
    {
      path: '/booker',
      name: 'Calendar',
      component: Calendar
    }
  ]
})
