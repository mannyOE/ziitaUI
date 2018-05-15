<template>
  <div  id="stwidgxx988exxxxt6109" draggable="false" :class="{'hide_my_chat': !toggled, mytransition: true}">
    <MainContent :toggled="true" 
      @close="close" 
      @reloadStore="reloadStore" 
      :recipientId="recipientId"
      :project_Id="project_Id" />
    <Toggle :isToggled.sync="toggled" @toggled="toggle" @chat = "chat"/>
  </div>
</template>

<script>
import MainContent from './content/content.vue'
import Toggle from './toggle.vue'


import { mapGetters, mapActions } from "vuex";
let NchanSubscriber = require("@/assets/js/NchanSubscriber.js");
import { nchanConf } from '@/constants.js';
import VueSocketio from 'vue-socket.io'; 

export default {
  name: 'chat-widget',
  props: ['show', 'directToggle', 'module', 'recipientId','project_Id'],
  data () {
    return {
      toggled: false,
    }
  },
  components: {
    MainContent,
    Toggle,
  },
  // Nchan Subscription

  mounted () {
   
   
         this.loadMessages();
         // alert();
    // let url = nchanConf.subUrl + this.user.Id;
    
    // //options 
    // let opt = {
    //   subscriber: 'websocket',
    //     //or an array of the above indicating subscriber type preference 
    //   reconnect: 'persist',
    //     //if the HTML5 sessionStore or localStore should be used to resume 
    //     //connections interrupted by a page load 
    //   shared: true
    //     //share connection to same subscriber url between browser  
    //     //windows and tabs using localStorage. In shared mode,  
    //     //only 1 running subscriber is allowed per url per window/tab. 
    // }
    
    // var sub = new NchanSubscriber(url, opt);
    
    // sub.on("message", this.onMessage);

    // sub.start(); // begin (or resume) subscribing
    
    // sub.on('connect', this.onFirstConnect);

    // sub.on('Typing',function(data){
    //   console.log(data)
    // })
    
    // sub.on('disconnect', function(evt) {
    //   // when disconnected. 
    // });
    
    // sub.on('error', function(error_code or evt, error_description) {
    //   //error callback 
    // });
  },
  mounted(){
    
    this.$socket.emit('init', {user_id: this.user.Id});
// alert();
  },
  computed: {
    ...mapGetters('userCredentials', [
        'user',
    ]),
     ...mapGetters('chat/socket', [
      'messages',
      'loading',
      'loaded',
    ])
  },
  methods: {
    ...mapActions('chat', [
      'getMessages',
      'resetState'
    ]),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
    chat(){
      // alert();
    },

    loadMessages () {

          this.callWithToken({
            parameters: {
              id: this.user.Id,
              recipient_id: this.user.Id,
            },
            action: this.getMessages,
          });
    },
    onFirstConnect (data) {
      // Parse
      console.log(data, "nchan first");
    },
    onMessage (msg, meta) {
      // Parse
      console.log(msg, 'all', meta, 'meta')

      this.loadMessages()

      // if (meta['content-type'] === "bot-image") {
      //   this.addImage(meta.id, msg);
      // } else if (meta['content-type'] === "bot-msg") {
      //   this.addRecvdMsg(meta.id, msg);
      // } else if (meta['content-type'] === "user-msg") {
      //   this.addSentMsg(meta.id, msg);
      // }
    },
    toggle () {
      this.toggled = !this.toggled;
    },
    close () {
      this.toggled = false;
    },

    reloadStore (type, id) {
        const args = {
          id: this.user.Id,
          recipient_id: this.user.Id,
        }
        this.$_$cheekyReloadStore({
            vm: this,
            type: type,
            authenticate: this.callWithToken,
            loadId: id,
            reloadAction: this.getMessages,
            reloadArgs: args
        })
    },
  }
}
</script>
<style scope>
  .hide_my_chat{
    height: 0px !important;
    transition: height ease 1s;
    overflow:hidden;
  }

  .mytransition{
      -webkit-transition: height ease 1s;
  -moz-transition:  height ease 1s;
  -o-transition:  height ease 1s;
  /*transition: opacity 1s;*/
    transition: height ease 1s;
  }
</style>
