

<template>


    <div v-if="isAdmin">
      <div class="nav">
        <router-link :to="{ name: 'AddUser', params: {} }">AddUser</router-link>
        <router-link :to="{ name: 'AddEvent', params: {} }">AddEvent</router-link>
        <router-link :to="{ name: 'Calendar', params: {} }">Calendar</router-link>

      </div>


    </div>

    <div  v-else-if="isAuth">
      <div class="nav">
        <router-link :to="{ name: 'AddUser', params: {} }">AddUser</router-link>
        <router-link :to="{ name: 'AddEvent', params: {} }">AddEvent</router-link>
        <router-link :to="{ name: 'Calendar', params: {} }">Calendar</router-link>

      </div>

    </div>

    <div v-else>
      <div class="nav">
        <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
        <router-link :to="{ name: 'Calendar', params: {} }">Calendar</router-link>

      </div>
    </div>



</template>

<script>



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
    components: {}
}

</script>
