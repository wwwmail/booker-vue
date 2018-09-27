

<template>

<div>
  <div class="row">
    <div class="col-12">
    <nav-bar></nav-bar>
    </div>
  </div>
    <div class="row">
        <h1 class="title-current text-center">current room {{$route.params.id}}</h1>
    </div>
    <div class="update-book">
        <div class="row">
            <div class="col-12">{{infoMessage}}</div>
        </div>

        <div class="row item-list">
            <div class="col-3">Name</div>
            <div class="col-9">
                <input class="form-control" v-model="room.name">
            </div>

        </div>


        <div class="row">
            <div class="col-12">
                <button class="btn btn-style btn-update-book" v-on:click="updateRoom">Update room</button>
            </div>
        </div>
    </div>

</div>

</template>

<script>
import NavBar from '@/components/NavBar'
export default {
    name: 'AdminEditRoom',
    data() {
        return {
            room:[],
            infoMessage: ''
        }
    },
    methods: {
        getRoom() {
            let token = localStorage.getItem('user-token') || '';
            let id = this.$route.params.id;
            this.axios(this.$config.API + '/rooms/' + id, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            }).then((response) => {
                this.room = response.data;
            })
        },
        updateRoom(){

          let token = localStorage.getItem('user-token') || '';
          let id = this.$route.params.id;
          this.axios(this.$config.API + '/rooms/' + id, {
              method: "PUT",
              headers: {
                  'Authorization': 'Bearer ' + token,
              },
              data:{
                data:this.room
              }
          }).then((response) => {
              this.infoMessage = response.data.message;
              this.getRoom();
          })

        },
    },
    created(){
      this.getRoom();
    },
    components: {
        NavBar
    }
}

</script>
