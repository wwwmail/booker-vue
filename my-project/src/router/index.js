import Vue from 'vue'
import store from './../store'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/Calendar'
import Login from '@/components/Login'
import MainApp from '@/components/MainApp'
import AdminAddUser from '@/components/admin/AdminAddUser'

import AdminEditUser from '@/components/admin/AdminEditUser'
import AddEvent from '@/components/AddEvent'

import EditEvent from '@/components/EditEvent'

import NavBar from '@/components/NavBar'

import AdminRooms from '@/components/admin/AdminRooms'

import AdminAddRoom from '@/components/admin/AdminAddRoom'

import AdminEditRoom from '@/components/admin/AdminEditRoom'

import AdminUsers from '@/components/admin/AdminUsers'
Vue.use(Router)



const routes =  [
    {
      path: '/',
      name: 'MainApp',
      component: MainApp
    },
    {
      path: '/user/add',
      name: 'AdminAddUser',
      component: AdminAddUser,
      meta: {
                requiresAuth: true,
                is_admin : true
            }
    },

    {
      path: '/user/:id',
      name: 'AdminEditUser',
      component: AdminEditUser,
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
      name: 'AdminUsers',
      component: AdminUsers,
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
