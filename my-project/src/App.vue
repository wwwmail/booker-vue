
<template>

<div id="app">

    <router-view/>
</div>

</template>

<script>

export default {
    name: 'App',
    methods:{
      checkAuth: function(){
          this.$store.dispatch('checkAuth');
      },
      addCounter(){
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


<style>


</style>
