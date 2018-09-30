

<template>

<div>
    <div class="row">
        <div class="col-12">
            <nav-bar></nav-bar>
        </div>
    </div>
    <div class="row text-center">
      <div class="col-12">
        <h1 class="title-current">current room {{$route.params.id}}</h1>
      </div>
    </div>
    <div class="update-book">
        <div class="row " v-if="infoMessage">
          <div class="col-2"></div>
            <div class="col-8 alert alert-info text-center">{{infoMessage}}</div>
            <div class="col-2"></div>
        </div>

        <div class="row item-list text-center">
            <div class="col-3">Name</div>
            <div class="col-6">
                <input class="form-control" v-model="room.name">
            </div>
            <div class="col-3"></div>

        </div>


        <div class="row">
          <div class="col-3"></div>
            <div class="col-6 text-right item-button">
                <button class="btn btn-success" v-on:click="updateRoom">Update room</button>
            </div>
            <div class="col-3"></div>
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
            room: [],
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
            updateRoom() {

                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;
                this.axios(this.$config.API + '/rooms/' + id, {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        data: this.room
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getRoom();
                })

            },
    },
    created() {
        this.getRoom();
    },
    components: {
        NavBar
    }
}

</script>
