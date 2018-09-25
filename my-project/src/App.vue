<style>



</style>

<template>

<div id="app">
    <div class="container">
      <!-- <nav-bar></nav-bar> -->
        <router-view/>
    </div>
</div>

</template>

<script>
//import NavBar from './components/NavBar'

export default {
    name: 'App',
    methods: {
        checkAuth: function() {
            this.$store.dispatch('checkAuth');
        },

    },
    created() {
        this.checkAuth();

    },
      components:{}
}

</script>
