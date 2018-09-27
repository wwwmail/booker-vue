<style>
</style>

<template>

<div >
  <div class="row">
    <h1 class="title-current-order text-center">current order {{$route.params.id}}</h1>
  </div>

    <div class="row">
        <div class="col-12">{{infoMessage}}</div>
    </div>

<div class="row item-list">
  <div class="col-3">User name</div>
  <div class="col-9">{{event}}</div>

</div>

<div class="row item-list top-title">
  <div class="col-1">#</div>
  <div class="col-2">order_id</div>
  <div class="col-3">book_id</div>
  <div class="col-3">book_price</div>
  <div class="col-2">title_book</div>
  <div class="col-1">count</div>

</div>




</div>

</template>

<script>

export default {
    name: 'EditEvent',
    data() {
        return {
          infoMessage:'',
          event:{}
        }
    },
    methods: {
        getEvent() {
                let token = localStorage.getItem('user-token') || '';
                let id = this.$route.params.id;
                this.axios(this.$config.API + '/events/'+ id, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                }).then((response) => {
                  this.event = response.data;
                })
            },


    },
    computed: {
    },
    created() {
        this.getEvent();
    },
     components: { },
}
</script>
