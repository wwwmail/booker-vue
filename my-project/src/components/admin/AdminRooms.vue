

<template>

<div class="admin">
    <div class="row">
        <div class="col-12">
            <nav-bar></nav-bar>
        </div>
    </div>

    <div>

        <b-modal ref="myModalRef" hide-footer>
            <div class="d-block text-center">
                <h3>Do you really want delete Room?</h3>
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

            <router-link :to="{ name: 'AdminAddRoom'}">
                <button class="btn btn-success">Add new Room</button>
            </router-link>

      </div>
    </div>


    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>


    <div class="row text-center">
        <div class="col-2">#</div>
        <div class="col-4">name</div>
        <div class="col-2 text-center">is active room</div>
        <div class="col-4"></div>
    </div>


    <div class="row text-center" v-for="(room, index) in rooms ">
        <div class="col-2">{{index+1}}</div>
        <div class="col-4">
            <router-link :to="{ name: 'AdminEditRoom', params: {id:room.id} }">{{room.name}}</router-link>
        </div>

        <div class="col-2 text-center">
          <span v-if="room.is_active == 1">yes</span>
          <span v-else>no</span>
        </div>
        <div class="col-2">
            <b-button @click="showModal(room)">
                <icon name="trash-alt"></icon>
            </b-button>
        </div>
        <div class="col-2"><span class="btn btn-success" v-on:click="setActiveRoom(room)">set active</span></div>
    </div>

    <div class="row">

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
            room: [],
        }
    },
    methods: {
        showModal(room) {
                this.room = room;
                this.$refs.myModalRef.show()
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            hideModalAndDelete() {
                let room = this.room;
                this.deleteRoom(room);
                this.$refs.myModalRef.hide()
            },

            deleteRoom(room) {
                let token = localStorage.getItem('user-token') || '';
                room.is_active = 0;
                this.axios(this.$config.API + '/rooms/' + room.id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        data: room,
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getRooms();
                })

            },

            setActiveRoom(room) {
                let token = localStorage.getItem('user-token') || '';
                room.is_active = 1;
                this.axios(this.$config.API + '/rooms/' + room.id, {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {
                        data: room,
                    }
                }).then((response) => {
                    this.infoMessage = response.data.message;
                    this.getRooms();
                })

            },

            getRooms() {
                let token = localStorage.getItem('user-token') || '';
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
