

<template>

<a class="float-right nav-link" v-on:click="sendLogout">
    <icon name="sign-out-alt"></icon>
</a>

</template>

<script>

export default {
    name: 'Logout',
    data() {
        return {
            infoMessage: '',
        }
    },
    methods: {
        sendLogout() {

                let token = localStorage.getItem('user-token') || '';
                this.axios(this.$config.API + '/auth', {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    data: {

                    }
                }).then((response) => {
                    if (response.data.success == 'true') {
                        this.setLogout();
                          this.$router.push({ path: '/' });

                        //commit('set', {type: 'isAuth', items: true});
                    }
                })
            },
            setLogout: function() {
                this.$store.dispatch('setLogout');
            }
    }
}

</script>
