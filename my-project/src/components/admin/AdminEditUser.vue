

<template>

<div>
    <div class="row">
        <div class="col-12">
            <nav-bar></nav-bar>
        </div>
    </div>
    <div class="row item text-center">
        <h1 class="title-current text-center">user id {{$route.params.id}}</h1>
    </div>
    <div class="update-book">
        <div class="row" v-if="infoMessage">
            <div class="col-12 alert alert-info">{{infoMessage}}</div>
        </div>

        <div class="row item-list text-center">
            <div class="col-3">firstName</div>
            <div class="col-6 form-group">
                <input class="form-control" v-model="user.first_name">
            </div>
            <div class="col-3"></div>

        </div>
        <div class="row item-list text-center">
            <div class="col-3">lastName</div>
            <div class="col-6 form-group">
                <input class="form-control" v-model="user.last_name">
            </div>
            <div class="col-3"></div>
        </div>

        <div class="row item-list text-center">
            <div class="col-3">Email</div>
            <div class="col-6 form-group">
                <input class="form-control" v-model="user.email">
            </div>
            <div class="col-3"></div>
        </div>

        <div class="row item-list text-center">
            <div class="col-3 form-group">Password</div>
            <div class="col-6">
                <input class="form-control" v-model="user.password">
            </div>
            <div class="col-3"></div>
        </div>

        <div class="row item-button">
          <div class="col-3 form-group"> </div>
            <div class="col-6 form-group text-right">
                <button class="btn btn-success" v-on:click="updateUser">Update User</button>
            </div>
            <div class="col-3"></div>
        </div>
    </div>

</div>

</template>

<script>

import NavBar from '@/components/NavBar'
export default {
    name: 'AdminEditUser',
    data() {
        return {
            user: [],
            infoMessage: ''
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
            updateUser() {

                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;
                this.axios(this.$config.API + '/users/' + id, {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        data: this.user
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getUser();
                })

            },
    },
    created() {
        this.getUser();
    },
    components: {
        NavBar
    }
}

</script>
