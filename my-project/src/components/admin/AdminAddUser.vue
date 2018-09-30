

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
                <h2 class="title-register text-center">Register New User</h2>
            </div>
        </div>
        <div class="row text-center" v-if="infoMessage">
            <div class="col-2"></div>
            <div class="col-8 alert alert-info">
                <h5>{{infoMessage}}</h5></div>
            <div class="col-2"></div>
        </div>

        <div class="row item text-center">
            <div class="col-2"></div>
            <div class="col-2 field-label-responsive">
                <label for="name">First name</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="user"></icon>
                        </div>
                        <input type="text" name="name" v-model="register.first_name" class="form-control" id="name" placeholder="John" required autofocus>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                            <!-- Put name validation error messages here -->
                            <span v-if="errorFirstName">  {{errorFirstName}} </span>


                    </span>
                </div>
            </div>
        </div>
        <div class="row item text-center">
            <div class="col-2"></div>
            <div class="col-2 field-label-responsive">
                <label for="name">Last name</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="user"></icon>
                        </div>
                        <input type="text" name="lastname" v-model="register.last_name" class="form-control" id="lastname" placeholder="Doe" required>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                              <span v-if="errorLastName">  {{errorLastName}} </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="row item text-center">
            <div class="col-2"></div>
            <div class="col-2 field-label-responsive">
                <label for="email">E-Mail Address</label>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="at"></icon>
                        </div>
                        <input type="text" name="email" v-model="register.email" class="form-control" id="email" placeholder="you@example.com" required autofocus>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                          <span v-if="errorEmail">  {{errorEmail}} </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="row item text-center">
            <div class="col-2"></div>
            <div class="col-2 field-label-responsive">
                <label for="password">Password</label>
            </div>
            <div class="col-6">
                <div class="form-group has-danger">
                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                        <div class="input-group-addon" style="width: 2.6rem">
                            <icon name="key"></icon>
                        </div>
                        <input type="password" name="password" v-model="register.password" class="form-control" id="password" placeholder="Password" required>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="form-control-feedback">
                    <span class="text-danger align-middle">
                          <span v-if="errorPassword">  {{errorPassword}} </span>
                    </span>
                </div>
            </div>
        </div>

        <div class="row item text-center ">
            <div class="col-4"></div>
            <div class="col-6 text-right">
                <span type="submit" v-on:click="sendForm()" class="btn btn-success">
                        <icon name="plus"></icon> Register</span>
            </div>
            <div class="col-2"></div>
        </div>
    </form>

</div>

</template>

<script>

import NavBar from '@/components/NavBar'
export default {
    name: 'AdminAddUser',
    data() {
        return {
            infoMessage: '',
            register: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            },
            errorFirstName: '',
            errorLastName: '',
            errorEmail: '',
            errorPassword: '',
        }
    },
    methods: {
        sendForm: function() {

            if (!this.register.first_name) {
                this.errorFirstName = 'first_name is required';
                return false;
            } else if (!this.register.last_name) {
                this.errorLastName = 'last name is required';
                return false;
            } else if (!this.validEmail(this.register.email)) {
                this.errorEmail = 'email not valid';
                return false;
            } else if (!this.register.password) {
                this.errorPassword = 'pass is required';
                return false;
            }

            let token = localStorage.getItem('user-token') || '';

            this.axios(this.$config.API + '/users', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                data: this.register
            }).then((response) => {
                if (response.data.success == 'true') {
                    this.errorFirstName = '';
                    this.errorLastName = '';
                    this.errorEmail = '';
                    this.errorPassword = '';
                    this.infoMessage = response.data.message;
                } else {
                    this.infoMessage = response.data.message;
                }
            })

        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
    components: {
        NavBar
    }
}

</script>
