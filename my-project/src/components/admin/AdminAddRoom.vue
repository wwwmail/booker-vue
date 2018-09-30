

<template>

<div class="hello">

    <div class="row">
        <div class="col-12">
            <nav-bar></nav-bar>
        </div>
    </div>

    <form class="form-horizontal" role="form">
        <div class="row text-center">
          <div class="col-12">
            <h2 class="title-register text-center">Add New Room</h2>
          </div>
        </div>
        <div class="row text-center" v-if="infoMessage">
          <div class="col-2"></div>
          <div class="col-8 alert alert-info text-center">
            <h5>{{infoMessage}}</h5>
          </div>
          <div class="col-2"></div>
        </div>

        <div class="row text-center">
            <div class="col-2"></div>
            <div class="col-2 field-label-responsive">
                <label for="name">name</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <!-- <icon name="user"></icon> -->
                        </div>
                        <input type="text" name="name" v-model="add.name" class="form-control" id="name" placeholder="room #" required autofocus>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                            <!-- Put name validation error messages here -->
                            <span v-if="errorName">  {{errorName}} </span>


                    </span>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-4"></div>
            <div class="col-6 text-right">
                <span type="submit" v-on:click="sendForm()" class="btn btn-success">
                        <icon name="plus"></icon> Add</span>
            </div>
            <div class="col-4"></div>
        </div>
    </form>

</div>

</template>

<script>

import NavBar from '@/components/NavBar'
export default {
    name: 'AddRoom',
    data() {
        return {
            infoMessage: '',
            add: {
                name: '',
                is_active: 1,
            },
            errorName: '',
        }
    },
    methods: {
        sendForm: function() {
            if (!this.add.name) {
                this.errorName = 'name is required';
                return false;
            }

            let token = localStorage.getItem('user-token') || '';

            this.axios(this.$config.API + '/rooms', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                data: this.add
            }).then((response) => {
              if (response.data.success == 'true') {
                  this.errorName = '';
                  this.infoMessage = response.data.message;
              } else {
                  this.infoMessage = response.data.message;
              }
            })

        },

    },
    components: {
        NavBar
    }
}

</script>
