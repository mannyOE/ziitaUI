<template>
  <div id="App">
    <!-- <BaseHeader id="header" /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import $ from 'jquery';
// window.jQuery = $;
import BaseHeader from '@/app/shared/BaseHeader';
import ChatModal from '@/app/shared/chatWidget/chatWidget';
import style from '@/assets/css/introjs.min.css'
import VueSocketio from 'vue-socket.io';
import { mapGetters, mapActions } from "vuex";


//introJs.introJs().start();

// require('bootstrap');
export default {
  name: 'App',


  components: {
    BaseHeader,
     ChatModal
  },mounted(){
     // alert()

  }, computed: {
    ...mapGetters('userCredentials', [
        'user',
    ]),
  }
}
</script>
<style type="text/css">
  button{
    font-family: "Montserrat" !important;
  }
</style>

