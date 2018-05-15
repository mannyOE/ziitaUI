<template>
  <div class="input">
    <Prompt ref="prompt" @keydown.native="handleTextField"/>
    <Send @click.native="handleSend"/>
  </div>
</template>

<script>
import Prompt from './prompt.vue';
import Send from './send.vue';
import { PUBURL } from '../../../config.js';

export default {
  name: 'contentfoot',
  mounted () {
    this.textField = this.$refs.prompt.$el;
  },
  components: {
    Prompt,
    Send,
  },
  data () {
    return {
      pubUrl: PUBURL,
    }
  },
  methods: {
    send (msg) {
      // send
      fetch(this.pubUrl,
      {
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'user-msg'
        },
        method: 'POST',
        body: msg,
      })
      .then(function(response)
      {
        return response.json();
      })
      .then(function(data)
      {
        console.log(data, "nchan response");
      });
    },
    sendDummy (msg) {
      // send
      let cm = {value: msg,
        type: 'sent'};
      this.$emit('newMsg', cm);
    },
    sendImg (img) {
      // send
      fetch(this.pubUrl,
      {
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'bot-image'
        },
        method: 'POST',
        body: img,
      })
      .then(function(response)
      {
        return response.json();
      })
      .then(function(data)
      {
        console.log(data, "nchan response");
      });
    },
    clearTextField () {
      this.textField.value = '';
    },
    handleTextField (e) {
      let enterKey = 13;
      let msg = this.textField.value;

      if (e.keyCode === enterKey) {
        e.preventDefault();
        // Real
        // this.send(msg);
        // Dummy
        this.sendDummy(msg);
        this.clearTextField();
      }
    },

    handleSend (e) {
      //Nchan Test Img
      // let img = "https://www.google.com.ng/search?q=vue+scrollbar&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiYqfCYn5rUAhVRKFAKHV7WANwQ_AUICigB&biw=1093&bih=502#"
      // this.sendImg(img);

      this.sendDummy(this.textField.value);
      this.clearTextField();
    }
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
