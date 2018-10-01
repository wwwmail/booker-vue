// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)
Vue.config.productionTip = false
import store from './store'

Vue.use(require('vue-moment'));


import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);


const vueConfig = require('vue-config')
const configs = {
  //API: 'http://booker-rest.test',
  API: 'http://192.168.0.15/~user4/php7/booker',
//  expiresCookie: '1h' // It's better to require a config file
}

Vue.use(vueConfig, configs)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
