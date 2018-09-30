

<template>

<div class="admin">
    <div class="row">
        <div class="col-12">
            <nav-bar></nav-bar>
        </div>
    </div>

    <div>
        <!-- <b-button @click="showModal(id)">
       Open Modal
     </b-button> -->
        <b-modal ref="myModalRef" hide-footer>
            <div class="d-block text-center">
                <h3>Do you really want delete user?</h3>
            </div>
            <b-btn class="mt-1" variant="danger" block @click="hideModalAndDelete">Yes</b-btn>
            <b-btn class="mt-3" variant="primary" block @click="hideModal">No</b-btn>
        </b-modal>
    </div>

    <div class="row">
      <div class="col-6">
        <h1>Admin</h1>
      </div>
      <div class="col-6 text-right">
            <router-link :to="{ name: 'AdminAddUser'}">
                <button class="btn btn-success">Add new user</button>
            </router-link>

      </div>
    </div>
    <div class="row" v-if="infoMessage">
        <div class="col-12 alert alert-info">{{infoMessage}}</div>
    </div>


    <div class="row text-center">
        <div class="col-2">#</div>
        <div class="col-2">name</div>
        <div class="col-2">Email</div>
        <div class="col-2">Is active</div>
        <div class="col-2"></div>
        <div class="col-2"></div>
    </div>


    <div class="row text-center" v-for="(user, index) in users ">
        <div class="col-2">{{index+1}}</div>
        <div class="col-2">
            <router-link :to="{ name: 'AdminEditUser', params: {id:user.id} }">{{user.first_name}} {{user.last_name}}</router-link>
        </div>
        <div class="col-2">{{user.email}}</div>
        <div class="col-2">
          <span v-if="user.isActive == 1">yes</span>
          <span v-else>no</span>
        </div>
        <div class="col-2">
            <b-button @click="showModal(user.id)">
                <icon name="trash-alt"></icon>
            </b-button>
        </div>
        <div class="col-2">
            <span class="btn btn-success" @click="setActiveUser(user)">
            set active
        </span>
        </div>
    </div>

    <div class="row">

    </div>




</div>

</template>

<script>

import NavBar from '@/components/NavBar'
export default {
    name: 'AdminUsers',
    data() {
        return {
            users: [],
            infoMessage: '',
            id: 0,
        }
    },
    methods: {
        showModal(id) {
                this.id = id;
                this.$refs.myModalRef.show()
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            hideModalAndDelete() {
                let id = this.id;
                this.deleteUser(id);
                this.$refs.myModalRef.hide()
            },
            setActiveUser(user) {
                let token = localStorage.getItem('user-token') || '';
                user.is_active = 1;
                this.axios(this.$config.API + '/users/' + user.id, {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        data: user,
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getUsers();
                })
            },
            test() {
                alert('df');
            },
            deleteUser(id) {
                let bookId = '33';
                let token = localStorage.getItem('user-token') || '';
                this.axios(this.$config.API + '/users/' + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        book_id: bookId,
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getUsers();
                })

            },

            getUsers() {
                let token = localStorage.getItem('user-token') || '';

                this.axios.get(this.$config.API + '/users', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.users = response.data;

                })
            },
            validEmail: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },

    },

    created() {
        this.getUsers();
    },

    components: {
        NavBar
    }

}

</script>
