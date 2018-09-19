<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>

<template>

<div class="container main-container">
<logout></logout>
    <div v-if="isAdmin">
        <admin></admin>
    </div>

    <div  v-else-if="isAuth">
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

export default {
    name: 'MainApp',
    computed: {
        isAuth() {
            return this.$store.state.isAuth;
        },
        isAdmin(){
          return this.$store.state.isAdmin;
        }
    },
    components: {
        Login, Calendar, Admin, Logout
    }
}

</script>
