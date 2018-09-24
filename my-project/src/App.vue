<style>



</style>

<template>

<div id="app">
    <div class="container">
        <router-view/>
    </div>
</div>

</template>

<script>

export default {
    name: 'App',
    methods: {
        checkAuth: function() {
            this.$store.dispatch('checkAuth');
        },
        addCounter() {
            this.$store.dispatch('addCountCartItems');
        }
    },
    created() {
        this.checkAuth();
        this.addCounter();
    },
    //  components:{Books,Genres,Authors,NavBar}
}

</script>
