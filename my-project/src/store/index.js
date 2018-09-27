import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//const vueConfig = require('vue-config')
const vuexConfigs = {
//  API: 'http://booker-rest.test' // It's better to require a config file
  API: 'http://192.168.0.15/~user4/php7/booker'
}




export default  new Vuex.Store({
  state:{
    isAuth: false,

    isAdmin: false,

    idUser:0,
  },
  getters: {
   booksList(state) {
     let booksList = state.booksList

     return booksList;
   }
 },
  mutations:{
    set(state, { type, items }) {
      state[type] = items
    },

  },
  actions: {

    checkAuth({commit}){
     let token = localStorage.getItem('user-token') || '';

      Vue.axios.get(vuexConfigs.API + '/auth', {
              headers: {'Authorization': 'Bearer ' + token,}
          }).then((response) => {
            console.log(response);
            if(response.data.success && response.data.success == 'true'){

              if(response.data.admin == true){

                  commit('set', {type: 'isAdmin', items: true});
              }

                commit('set', {type: 'isAuth', items: true});
                commit('set', {type:'userId', items:response.data.id })
            }

      })
    },

    setAuth({commit}){
      commit('set' ,{type: 'isAuth', items: true});
    },

    setLogout({commit}){
      commit('set' ,{type: 'isAuth', items: false});
      commit('set' ,{type: 'isAdmin', items: false});
    },

  }

})

//export default store
