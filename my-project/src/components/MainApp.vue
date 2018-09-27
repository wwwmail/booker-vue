<template>

<div >
<!-- <nav-bar></nav-bar> -->
    <div v-if="Admin">
      <calendar></calendar>
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
        Login, Calendar, Logout,NavBar
    }
}

</script>
