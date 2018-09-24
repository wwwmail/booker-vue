

<template>

<div class="admin">

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

    <h1>Admin</h1>

    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>


    <div class="row">
        <div class="col-3">#</div>
        <div class="col-3">name</div>
        <div class="col-3">Email</div>
        <div class="col-3"></div>
    </div>


    <div class="row" v-for="(user, index) in users ">
        <div class="col-3">{{index+1}}</div>
        <div class="col-3">
            <router-link :to="{ name: 'EditUser', params: {id:user.id} }">{{user.first_name}} {{user.last_name}}</router-link>
        </div>
        <div class="col-3">{{user.email}}</div>
        <div class="col-3">
          <b-button @click="showModal(user.id)">
            <icon name="trash-alt"></icon>
          </b-button>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <router-link :to="{ name: 'AddUser'}">
                <button class="btn">Add new user</button>
            </router-link>
        </div>
    </div>




</div>

</template>

<script>

export default {
    name: 'Admin',
    data() {
        return {
            users: [],
            infoMessage:'',
            id:0,
        }
    },
    methods: {
      showModal (id) {
      this.id = id;
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    hideModalAndDelete () {
      let id = this.id;
      this.deleteUser(id);
      this.$refs.myModalRef.hide()
    },
      test(){
        alert('df');
      },
        deleteUser(id) {
          let bookId = '33';
            let token = localStorage.getItem('user-token') || '';
            this.axios(this.$config.API + '/users/'+id, {
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
                console.log(response);
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
    }

}

</script>
