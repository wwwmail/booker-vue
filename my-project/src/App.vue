<style>

.padding-0{
  padding: 0 !important;
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

ul.event li a.event,span.event{
  padding: 2px 7px;
  border-radius: 5px;
  cursor: pointer;
}

ul.event li{
  margin-bottom: 5px;
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
.bg-secondary {
    background-color: #7aa8d1 !important;
}
.bg-info {
    background-color: #7baa67 !important;
}
.admin .row{
  margin-bottom: 10px;
}
.item-button{
  margin-top: 20px;
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
