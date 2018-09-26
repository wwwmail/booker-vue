

<template>



<nav class="navbar navbar-expand-sm bg-warning navbar-dark" v-if="isAdmin">
<ul class="navbar-nav">
  <li class="nav-item active">
    <router-link class="nav-link" :to="{ name: 'Admin', params: {} }">Admin users</router-link>
  </li>
  <li class="nav-item active">
    <router-link class="nav-link" :to="{ name: 'AdminRooms', params: {} }">Admin rooms</router-link>
  </li>
  <li class="nav-item active">
    <router-link class="nav-link" :to="{ name: 'Calendar', params: {} }">Calendar</router-link>
  </li>
</ul>

<ul class="navbar-nav ml-auto">
      <li class="nav-item active">
         <logout></logout>
      </li>
    </ul>

</nav>


<nav class="navbar navbar-expand-sm bg-primary navbar-dark"  v-else-if="isAuth">
<ul class="navbar-nav">

</ul>
<ul class="navbar-nav ml-auto">
      <li class="nav-item active">
         <logout></logout>
      </li>
    </ul>
</nav>

<nav class="navbar navbar-expand-sm bg-primary navbar-dark"  v-else>
<ul class="navbar-nav">

  <li class="nav-item active">
    <router-link class="nav-link" :to="{ name: 'Calendar', params: {} }">Calendar</router-link>
  </li>
</ul>
</nav>




</template>

<script>


import Logout from './Logout';
export default {
    name: 'NavBar',
    computed: {
        isAuth() {
            return this.$store.state.isAuth;
        },
        isAdmin(){
          return this.$store.state.isAdmin;
        }
    },
    components: {Logout}
}

</script>
