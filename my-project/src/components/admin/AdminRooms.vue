

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
                <h3>Do you really want delete Room?</h3>
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
        <div class="col-6">name</div>
        <div class="col-3"></div>
    </div>


    <div class="row" v-for="(room, index) in rooms ">
        <div class="col-3">{{index+1}}</div>
        <div class="col-6">
            <router-link :to="{ name: 'AdminEditRoom', params: {id:room.id} }">{{room.name}}</router-link>
        </div>

        <div class="col-3">
            <b-button @click="showModal(room.id)">
                <icon name="trash-alt"></icon>
            </b-button>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <router-link :to="{ name: 'AdminAddRoom'}">
                <button class="btn">Add new Room</button>
            </router-link>
        </div>
    </div>




</div>

</template>

<script>
import NavBar from '@/components/NavBar'
export default {
    name: 'AdminRooms',
    data() {
        return {
            rooms: [],
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
                this.deleteRoom(id);
                this.$refs.myModalRef.hide()
            },

            deleteRoom(id) {
                let token = localStorage.getItem('user-token') || '';
                this.axios(this.$config.API + '/rooms/' + id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        id: id,
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getRooms();
                })

            },

            getRooms() {
                let token = localStorage.getItem('Room-token') || '';
                this.axios.get(this.$config.API + '/rooms', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }).then((response) => {
                    this.rooms = response.data;

                })
            },


    },

    created() {
        this.getRooms();
    },
    components: {
        NavBar
    }

}

</script>
