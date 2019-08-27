import "@babel/polyfill"
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
Vue.component('HelloWorld', HelloWorld)

const app = new Vue({ el: '#app' })
