import Vue from 'vue'
import store from './../store'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
import MainApp from '@/components/MainApp'
import AddUser from '@/components/AddUser'

import EditUser from '@/components/EditUser'
import AddEvent from '@/components/AddEvent'

import EditEvent from '@/components/EditEvent'

import NavBar from '@/components/NavBar'
Vue.use(Router)



const routes =  [
    {
      path: '/',
      name: 'MainApp',
      component: MainApp
    },
    {
      path: '/user/add',
      name: 'AddUser',
      component: AddUser,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/user/:id',
      name: 'EditUser',
      component: EditUser,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },
    {
      path: '/event/add',
      name: 'AddEvent',
      component: AddEvent,
      meta: {
                requiresAuth: true,
              //  is_admin : true
            }
    },
    {
      path: '/edit/event/:id',
      name: 'EditEvent',
      component: EditEvent
    },

    {
      path: '/navbar',
      name: 'NavBar',
      component: NavBar
    },
    {
      path: '/booker',
      name: 'Calendar',
      component: Calendar
    },


  ];



const router = new Router({routes})

router.beforeEach((to, from, next) => {
 if(to.meta.is_admin) {
   if(to.meta.is_admin) {

     const authUser =  store.state.isAdmin;
     if(authUser) {
       next()
     }else {
       next('/')
     }
   }
 }else {
   next()
 }
})


export default router;
