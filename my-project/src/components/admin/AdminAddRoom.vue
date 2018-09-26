

<template>

<div class="hello">
  <div class="row">
    <div class="col-12">
      <router-link :to="{ name: 'MainApp'}"><button class="btn">Back</button></router-link>
    </div>
  </div>

    <div class="container  main-container register-container">
        <form class="form-horizontal" role="form">
            <div class="row">
                <h2 class="title-register text-center">Add New Room</h2>
            </div>
            <h3>{{infoMessage}}</h3>
            <div class="row">
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
                        <span class="text-danger align-middle" >
                            <!-- Put name validation error messages here -->
                            <span v-if="errorName">  {{errorName}} </span>


                        </span>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-4"></div>
                <div class="col-8">
                    <span type="submit" v-on:click="sendForm()" class="btn btn-style btn-register">
                        <icon name="plus"></icon> Add</span>
                </div>
            </div>
        </form>
    </div>
</div>

</template>

<script>
export default {
    name: 'AddRoom',
    data() {
        return {
            infoMessage: '',
            add: {
                name: '',
            },
            errorName: '',
        }
    },
    methods: {
        sendForm: function() {
            if (!this.add.name){
                this.errorName = 'name is required';
                return false;
            }

            fetch(this.$config.API + '/rooms', {
                method: 'post',
                body: JSON.stringify(this.add)
            }).then(function(response) {
                return response.json();
            }).then((data) => {
              if(data.success == 'true'){
                this.errorName = '';
                this.infoMessage = data.message;
              }else{
                this.infoMessage = data.message;
              }
            });
        },

    }
}
</script>
