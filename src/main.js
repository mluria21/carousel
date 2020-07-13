import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import imageLoad from './directives/ImageLoad'
Vue.directive('image-load',imageLoad)

import customLet from './directives/let'
Vue.directive('let',customLet)

new Vue({
  render: h => h(App),
}).$mount('#app')
