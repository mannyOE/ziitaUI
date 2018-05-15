<template>
  <div class="input">
    <!-- {{user}} -->
         <!-- {{project_Id}} -->
    <textarea @blur="stoppedTyping()" id="typedMsg" 

      ref="prompt"
      class="prompt" 
      placeholder="Send a message..."
      @keydown="handleTextField">
    </textarea>
 
    <div id="sendBtn" class="sendmsg" @click.stop="handleSend"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueSocketio from 'vue-socket.io'; 


export default {
  name: 'content-foot',
  props: ['recipientId','project_Id','showList'],
  mounted () {
    this.textField = this.$refs.prompt;
      this.callWithToken({
          parameters: {
            
          },
          action: this.GetMessages,
        });
     
  },
  components: {
  },
  data () {
    return {
      scrollme: false
    }
  },
  destroyed () {
      // this.$_$destroyedHook()
  },
    watch: {
    messages: function (val) {
      // alert(this.canScrollToBottom())
      if(this.scrollme){
        this.scrollToBottom();
      }
    }
  },
  computed: {
    ...mapGetters('chat/send', [
        'success',
        'error',
        'fieldErrors',
        'loading',
    ]),
    ...mapGetters('userCredentials', {
        userData: 'user',
    }),
    
    ...mapGetters('chat/socket', [
      'messages',
    ]),  
    // this.$socket.emit('init', {user_id: this.userData.Id});
        
  },
    created() {
      // alert(project_Id)
    
       this.callWithToken({
          parameters: {
            
          },
          action: this.GetMessages,
        })
         var self = this;
         this.$socket.on('message', function(data){
          // alert(self.showList)
      // $('#chat').scrollTop($('#chat')[0].scro?llHeight);
            // alert()
              // self.checkUread(data.sender)
              // debugger;
            var msg = self.messages.find(m=>m.Id==data.Id);
            if(!msg){
            
              // debugger;
              // data.status = 2;
              // console.log(self.showList)
               if(self.showList==false){
                 self.updateUnread();
                 // alert()
               } 
                // if(self.canScrollToBottom())
              // self.scrollToBottom()
              // alert(self.canScrollToBottom()?)
               if(self.canScrollToBottom()){
                 self.scrollme = true;
              
              }
                 else
                  self.scrollme = false;
              self.messages.push(data);
               self.messages.sort((x,y)=>{
        return x.time_stamp - y.time_stamp
      });
             
              self.$socket.emit("Delivered", data);
            }
    
        });
    // debugger;

    // this.$socket.on('message', function(data){
    //   console.log(data)
    // })
  },
  methods: {
    ...mapActions('chat/socket', [
      'GetMessages',
    
    ]),
       ...mapActions('userCredentials', [
        'callWithToken',
      ]),
    isTyping(typing){
      var self = this;
      // console.log("rweasasas",this.recipientId)
    this.$socket.emit('Typing', {recipient: this.recipientId})
     var unread = this.messages.filter(m=>m.read==0 && m.sender==self.recipientId);
        for(var x = 0; x<unread.length ; x++){
          self.$socket.emit('Read',unread[x]);
        }

    }
    ,
      updateUnread(){
      var self = this
        var unread = this.messages.filter(m=>m.read==0 && m.sender==self.recipientId);
        for(var x = 0; x<unread.length ; x++){
          self.$socket.emit('Read',unread[x]);
          
        }

    },
     stoppedTyping(){
      console.log("rweasasas",this.recipientId)
    this.$socket.emit('TypingStop', {recipient: this.recipientId})

    },
    
    scrollToBottom(){
        var wtf    = $('#chat');
         var height = wtf[0].scrollHeight;
         wtf.scrollTop(height);
    },
       canScrollToBottom(){
         var wtf    = $('#chat');
         var height =  wtf[0].scrollHeight -  10;
         // alert(height)
         console.log("hefght",height);
         console.log("scrollTop",wtf.scrollTop())
         var y = wtf.scrollTop() + wtf.height() ;
          console.log("y",y)
         if(y >= height){
          console.log(true)
          return true;
         }
         return false;
    },
    send (msg) {
      if(!msg)
        return;
        var id = this.userData.Id+"-"+(Math.floor(Math.random() * 10000)) + "-" + new Date().getTime()+"-" + (Math.floor(Math.random() * 10000));
      let args = {
          recipient: this.recipientId,
          sender: this.userData.Id,
          message: msg,
          time_stamp: new Date().getTime(),
          status: 0,
          Id: id
        }

      this.$socket.emit('message', args);
      // debugger;
      // self = this;
      if(this.canScrollToBottom()){
          this.scrollme =  true;
      }else{
          this.scrollme = false;
      }
      this.messages.push(args);
   
      // this.setMessage(args);


return;
      const self = this;
      this.callWithToken({
        parameters: args,
        action: this.sendMessage,
      })
      .then(function (status) {
          if (status) {
            // Reload pending invites on success
              self.reloadStore()
          } else {
          }
      });
    },
    reloadStore () {
      this.$emit('reloadStore')
    },
    clearTextField () {
      this.textField.value = '';
    },
    handleTextField (e) {
      // console.log('someone is typing')
      this.isTyping();
      let enterKey = 13;
      let msg = this.textField.value;

      if (e.keyCode === enterKey) {
        e.preventDefault();
        this.send(msg);
        this.clearTextField();
        this.stoppedTyping();
       // $('#chat').scrollTop($('#chat')[0].scrollHeight+10);
        
      }
    },

    handleSend (e) {
      this.send(this.textField.value);
      this.clearTextField();
    }
  }
}
</script>

<style scoped>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
