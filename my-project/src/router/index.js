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

import AdminRooms from '@/components/admin/AdminRooms'

import AdminAddRoom from '@/components/admin/AdminAddRoom'

import AdminEditRoom from '@/components/admin/AdminEditRoom'

import Admin from '@/components/Admin'
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
      path: '/event/add/:id',
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
      path: '/admin/rooms',
      name: 'AdminRooms',
      component: AdminRooms,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/rooms/add',
      name: 'AdminAddRoom',
      component: AdminAddRoom,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/admin/rooms/:id',
      name: 'AdminEditRoom',
      component: AdminEditRoom,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },


    {
      path: '/admin/users',
      name: 'Admin',
      component: Admin,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },



    {
      path: '/navbar',
      name: 'NavBar',
      component: NavBar
    },
    {
      path: '/booker',
      name: 'Calendar',
      component: Calendar,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
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
