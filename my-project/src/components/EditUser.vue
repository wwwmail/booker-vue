

<template>

<div class="container main-container">
    <div class="row">
        <h1 class="title-current text-center">current user {{$route.params.id}}</h1>
    </div>
    <div class="update-book">
        <div class="row">
            <div class="col-12">{{infoMessage}}</div>
        </div>

        <div class="row item-list">
            <div class="col-3">firstName</div>
            <div class="col-9">
                <input class="form-control" v-model="user.first_name">
            </div>

        </div>
        <div class="row item-list">
            <div class="col-3">lastName</div>
            <div class="col-9">
                <textarea class="form-control" v-model="user.last_name"></textarea>
            </div>
        </div>

        <div class="row item-list">
            <div class="col-3">Email</div>
            <div class="col-9">
                <input class="form-control" v-model="user.email">
            </div>
        </div>

        <div class="row item-list">
            <div class="col-3">Password</div>
            <div class="col-9">
                <input class="form-control" v-model="user.password">
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <button class="btn btn-style btn-update-book" v-on:click="updateUser">Update User</button>
            </div>
        </div>
    </div>

</div>

</template>

<script>

export default {
    name: 'EditUser',
    data() {
        return {
            user:[],
            infoMessage: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        getUser() {
            let token = localStorage.getItem('user-token') || '';
            let id = this.$route.params.id;
            this.axios(this.$config.API + '/users/' + id, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            }).then((response) => {
                this.user = response.data;
            })
        },
        updateUser(){

          let token = localStorage.getItem('user-token') || '';
          let id = this.$route.params.id;
          this.axios(this.$config.API + '/users/' + id, {
              method: "PUT",
              headers: {
                  'Authorization': 'Bearer ' + token,
              },
              data:{
                data:this.user
              }
          }).then((response) => {
              this.infoMessage = response.data.message;
              this.getUser();
          })

        },
    },
    created(){
      this.getUser();
    }
}

</script>
