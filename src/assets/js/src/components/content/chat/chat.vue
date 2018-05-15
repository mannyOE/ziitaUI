<template>
    <div id="chat" ref="chat" class="chatxxxxhhdgsdsd09978">
      <Scrollbar ref='scrollbar' :container="$el" :isTriggered="isVisible" :isUpdated="isUpdated" :newMsg="newMsg">
          <!--DUmmy Chat-->
          <div v-for="i in 12">
            <SentBubble>Dope</SentBubble>
            <RecvdBubble>Doper</RecvdBubble>
          </div>

        <!--Real Nchan Chat-->
          <div v-for="msg in msgs">
            <SentBubble v-if="msg.type === 'sent'">{{ msg.value }}</SentBubble>
            <RecvdBubble v-else-if="msg.type === 'recvd'">{{ msg.value }}</RecvdBubble>
          </div>
          
      </Scrollbar>
    </div>
</template>

<script>
import Scrollbar from './tinyscroll/scrollbar.vue';
import SentBubble from './bubbles/sent.vue';
import RecvdBubble from './bubbles/recvd.vue';
import { PUBURL, SUBURL } from '../../../config.js';

export default {
  name: 'chat',
  // Dummy msgs prop
  props: ['isVisible', 'imgIsVisible', 'msgs'],
  components: {
    Scrollbar,
    SentBubble,
    RecvdBubble
  },
  data () {
    return {
        // Real msgs data
        // msgs: [],
        image: {},
        isUpdated: true,
        domUpdated: false,
        newMsg: true,
        pubUrl: PUBURL,
        subUrl: SUBURL,
    }
  },
  watch: {
      'msgs' (val, old) {
        var that = this;
        setTimeout(function () {
          that.newMsg = !that.newMsg;
        }, 100)
      },
      'imgIsVisible' (val, old) {
        this.triggerUpdate(0);
        this.triggerUpdate(300);
      },
      '$refs.chat.offsetHeight' (val, old) {
        this.triggerUpdate();
      }
  },
  // updated () {
  //   console.log('chat updated')
  //   this.domUpdated = true;
  //   console.log('dom up1')    
  //   setTimeout(function () {
  //     this.domUpdated = false;
  //     console.log('dom down1', this.domUpdated);    
  //   }, 500);
  // },
  // Nchan Subscription

  // mounted () {
  //   let NchanSubscriber = require("../../../../NchanSubscriber.js");
    
  //   // you can also include the NchanSubscriber.js script directly in the browser. 
  //   // This will export NchanSubscriber as a global variable. 
    
  //   let url = this.subUrl;
    
  //   //options 
  //   let opt = {
  //     subscriber: 'websocket',
  //       //or an array of the above indicating subscriber type preference 
  //     reconnect: 'persist',
  //       //if the HTML5 sessionStore or localStore should be used to resume 
  //       //connections interrupted by a page load 
  //     shared: true
  //       //share connection to same subscriber url between browser  
  //       //windows and tabs using localStorage. In shared mode,  
  //       //only 1 running subscriber is allowed per url per window/tab. 
  //   }
    
  //   var sub = new NchanSubscriber(url, opt);
    
  //   sub.on("message", this.onMessage);

  //   sub.start(); // begin (or resume) subscribing
    
  //   sub.on('connect', this.onFirstConnect);
    
  //   // sub.on('disconnect', function(evt) {
  //   //   // when disconnected. 
  //   // });
    
  //   // sub.on('error', function(error_code or evt, error_description) {
  //   //   //error callback 
  //   // });
  // },
  methods: {
    triggerUpdate (time) {
      var that = this;
      setTimeout(function () {
        that.isUpdated = !that.isUpdated;
      }, time)
    },
    addImage (id, img) {
      this.$emit('imageRecvd', img);
    },
    addSentMsg (id, msg) {
      this.msgs.push({id: id, value: msg, type: "sent"});
    },
    addRecvdMsg (id, msg) {
      this.msgs.push({id: id, value: msg, type: "recvd"});
    },
    onFirstConnect (data) {
      // Parse
      // console.log(data, "nchan first");
    },
    onMessage (msg, meta) {
      // Parse
        console.log(msg, 'all', meta, 'meta')

      if (meta['content-type'] === "bot-image") {
        this.addImage(meta.id, msg);
      } else if (meta['content-type'] === "bot-msg") {
        this.addRecvdMsg(meta.id, msg);
      } else if (meta['content-type'] === "user-msg") {
        this.addSentMsg(meta.id, msg);
      }
    },
    setHeight (heightStr) {
      this.$el.style.height = heightStr;
    },
  }
}
</script>

<style>
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}

.chatxxxxhhdgsdsd09978 {
  /*overflow-y: scroll;*/
  height: 100%;
  /*outline: 1px solid blue;*/
  position: relative;
  -webkit-transition: background-color .15s linear;
  -o-transition: background-color .15s linear;
  -moz-transition: background-color .15s linear;
  transition: background-color .15s linear;

  -moz-transition:width 0.01s, height 0.01s;
   -webkit-transition:width 0.01s, height 0.01s;
   -o-transition:width 0.01s, height 0.01s;
   transition:width 0.01s, height 0.01s;
}

/*The Wrapper*/
.my-scrollbar{
  width: 35%;
  min-width: 300px;
  /*max-height: 450px;*/
  height: 50px;
}

/*Phones + Some Tablets*/
@media (max-width: 380px)
{

  /*.chatxxxxhhdgsdsd09978 {
    height: 83%;
}*/
}
</style>
