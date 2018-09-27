<style>

.padding-0{
  padding: 0;
}
.rooms{
  background: #b4b4b4;
  color: #fff;
}

.settings{
  min-height: 30px;
  color: #fff;
  background-color: #fc6c2d;
}

ul.event li a,span{
  padding: 2px;
  border-radius: 5px;
}

.d-block .row  div{
  padding: 10px;
  color: #fff;
}
.d-block .row  div textarea{
  color: #fff;
}
input.form-control.bg-info {
    color: #fff;
}
.d-block .row  div h3{
  color: #17a2b8;
}
.text-red{
  color: red;
    font-weight: 700;
}
.main-container {
  background: #fff;
  box-shadow: #c0bfbf 0px 10px 8px;
  padding: 25px;

}
.btn-event {
  padding-left: 20px;
  padding-right: 20px;
}
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
