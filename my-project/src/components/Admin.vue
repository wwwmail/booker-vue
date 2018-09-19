

<template>

<div class="admin">
<h1>Admin</h1>

</div>

</template>

<script>

export default {
    name: 'Admin',
    data() {
        return {
            infoMessage: '',
            login: {
                email: '',
                password: '',
            },
            errorEmail: '',
            errorPassword: '',
        }
    },
    methods: {
        sendForm: function() {
            if (!this.validEmail(this.login.email)) {
                this.errorEmail = 'email not valid';
                return false;
            } else if (!this.login.password) {
                this.errorPassword = 'pass is required';
                return false;
            }
            fetch(this.$config.API + '/auth', {
                method: 'post',
                body: JSON.stringify(this.login)
            }).then(function(response) {
                return response.json();
            }).then((data) => {
                console.log(data);
                if (data.success == 'true') {
                    this.errorEmail = '';
                    this.errorPassword = '';
                    this.infoMessage = data.message;
                    localStorage.setItem('user-token', data.auth);
                    this.setAuth();
                } else {
                    this.infoMessage = data.message;
                }
                console.log(333);
            });
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        setAuth: function() {
            this.$store.dispatch('setAuth');
            this.$store.dispatch('checkAuth');
        }
    }
}

</script>
