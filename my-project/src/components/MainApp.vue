<template>

<div class="container main-container">
<nav-bar></nav-bar>
    <div v-if="Admin">
        <admin></admin>
    </div>

    <div  v-else-if="Auth">
      <calendar></calendar>
    </div>

    <div v-else>
        <login></login>
    </div>

</div>

</template>

<script>

import Login from './Login';
import Calendar from './Calendar';
import Admin from './Admin';
import Logout from './Logout';
import NavBar from './NavBar'

export default {
    name: 'MainApp',
    computed: {
        Auth() {
            return this.$store.state.isAuth;
        },
        Admin(){
          return this.$store.state.isAdmin;
        }
    },
    components: {
        Login, Calendar, Admin, Logout,NavBar
    }
}

</script>
