<template>
  <!-- <div> -->
 
    <div  ref="chat" class="chatxxxxhhdgsdsd09978" style="overflow-x:hidden" v-scroll="loadMessages">
      <!--DUmmy Chat-->
      <!-- <div v-for="i in 12">
        <SentBubble>Dope</SentBubble>
        <RecvdBubble>Doper</RecvdBubble>
      </div> -->
      <!--Real Nchan Chat-->
       <!--&& !loading-->

       <!-- sdsd -->
       <!-- {{team}} -->
       <!-- <i class="ion-chatbubbles" v-if="showList"></i> -->
        <div v-if="showList"  class="row chat-row" @click="chatUp(user)" v-for="user in filteredTeam">
          <div v-if="userData.Id!=user.Id" class="col-md-3 col-xs-3">
          <!-- {{user}} -->
          <div class="msg-listed">
            <img  :src="imageLink(user)" class="img-responsive img-circle" :class="{'isOnline':user.isOnline=='1'}">
            <!-- <i class="fa fa-circle text-success"></i> -->
          </div>
        </div>
        <div class="col-md-7 col-xs-7" v-if="userData.Id!=user.Id">
          <h6>{{user.first_name}} {{user.last_name}}
          <!-- {{}} -->
        </h6>
        </div>

        <div   v-if="messages.filter(m=>m.sender==user.Id && m.read==0).length>0"  class="col-md-2 col-xs-2">
            <h6 class="chat-count"> {{messages.filter(m=>m.sender==user.Id && m.read==0).length}}</h6> <i style="color:#3369da" class="ion-chatbox fa-2x"></i>
            </div>
      </div>
      <!-- </div> -->
      <NoContentError  v-if="filteredMessages.length == 0 && !showList">
          No Messages.
      </NoContentError> 
       <!-- <p align="center" @click="more" v-if="filteredMessages.length>0">Load more..</p>  -->
       <!-- <div  ></div> -->
       <div align="center">
       <label style="text-align:center" v-if="isLoadingMessages && !showList">Loading..</label>
         
       </div>
        <audio ref="audioElm" :src="playSound()"></audio>
      <div  v-for="msg in filteredMessages" v-if="!showList">
        <SentBubble v-if="msg.is_sender" :msg="msg">{{ msg.message }}</SentBubble>
        <RecvdBubble v-else-if="true" :msg="msg" >{{ msg.message }}</RecvdBubble>
      </div>
      <!-- <button @click="clickButton">click me</button> -->
    </div>
     <!-- </div> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VueSocketio from 'vue-socket.io'; 
import SentBubble from './bubbles/sent.vue';
import RecvdBubble from './bubbles/recvd.vue';
import { API } from '../../../../../../src/config';
export default {
  name: 'chat',
  // Dummy msgs prop
  props: ['isVisible', 'imgIsVisible', 'recipientId','project_Id','show'],
  components: {
    SentBubble,
    RecvdBubble
  },
  data () {
    return {
        // Real msgs data
        msgs: [],
        messags:[],
        image: {},
        mssg: null,
        isUpdated: true,
        domUpdated: false,
        newMsg: true,
        isTyping: false,
        showList: true,
        scrollme:false,
        isLoadingMessages:false,

    }
  },
  mounted(){
     // this.callWithToken({
     //        parameters: {},
     //        action: this.GetMessages,
     //        })
     // alert(this.project_Id)

  }
  ,
  watch: {
      'show' (val, old) {
        this.showList = val
       
       
      },
      // '$refs.chat.offsetHeight' (val, old) {
      //   this.triggerUpdate();
      // }
  },
  computed: {
    chatList(){
      return self.team;
    },
     
    checkUread(id){
    var unread = this.filteredMessages.filter(m=>m.sender==id && m.read==0);
    return unread.length;
    
    }
,
filteredTeam(){
  var self = this;
return this.team.filter(t=>t.Id!=self.userData.Id)
},
    filteredMessages(){
      // 
      // return ["adsfsdaf","eafsdf"];
      // 
        // var msg = this.messages;
          var self = this;
          var _messages;
         _messages =  this.messages.filter(function(message){


            if(typeof(message) == "object"){
              if(message.sender == self.recipientId || message.recipient == self.recipientId ){
                if(message.sender == self.recipientId){
                    message.is_sender = false;
                }else{
                    message.is_sender = true;
                }
                return true;
            }
          }
            return false;
              // 
          });
       // if(!self.showList){
       //    var wtf    = $('#chat');
       //   var height = wtf[0].scrollHeight;
       //   wtf.scrollTop(height);
       // }
        _messages.sort((x,y)=>{
        return x.time_stamp - y.time_stamp
      });
         return _messages;
    },
    ...mapGetters('chat/socket', [
      'messages',
      'loading',
      'loaded',
    ]),

     ...mapGetters('team/getProjects', [
                'projects'
         
            ]),
        ...mapGetters('team', [
                'team',
                'loading',
                'error',
            ]),
    ...mapGetters('userCredentials', {
        userData:'user',
    }),
  },
  methods: {
    ...mapActions('userCredentials', [
      'callWithToken',
    ])
    ,   ...mapActions('team/getProjects', [
        'getProjects',
        'resetState'
      ]),
       ...mapActions('chat/socket', [
      'GetMessages',
      
    ]),
       loadMessages(e,position){
        var topMessage;
       if(position.scrollTop==0 && this.filteredMessages.length>0){
        if(this.isLoadingMessages==false){
         topMessage = this.filteredMessages[0];
         topMessage.sender = this.userData.Id;
         this.$socket.emit('more',topMessage);
         // console.log(topMessage.time_stamp);
         this.isLoadingMessages=true;

       }
       }
       },
       playSound(){
         return require('@/assets/js/fb_chat_2011.mp3');
       },
       tryAgain(){
        var self = this;
       var failed =  this.messages.filter(m=>m.status==0 && m.sender == self.userData.Id
        && m.recipient==self.recipientId);
       console.log(failed);
       for(var x = 0; x < failed.length ; x++){
        self.$socket.emit('message',failed[x]);
       }
       },
        canScrollToBottom(){
         var wtf    = $('#chat');
         var height =  wtf[0].scrollHeight -  10;
         // alert(height)
         // console.log("hefght",height);
         // console.log("scrollTop",wtf.scrollTop())
         var y = wtf.scrollTop() + wtf.height() ;
          // console.log("y",y)
         if(y >= height){
          console.log(true)
          return true;
         }
         return false;
    },
         imageLink(member){
       
      if(!member.profile_photo){
        return require('@/assets/img/1.jpeg');
      }
      return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;

          // return require('@/assets/img/1.jpeg');
    },
    chatUp(user){
        this.$emit("showList",false,user.Id);
        //find all unread messages and emit read
        var self = this;
        self.updateUnread();
      
      
    },
    scrollToBottom(){
        var wtf    = $('#chat');
         var height = wtf[0].scrollHeight;
         wtf.scrollTop(height);
    }

    // ,
 
    //    more(){
    //     var last_message = this.filteredMessages[this.filteredMessages.length - 1];
    //     last_message.user_id = this.userData.Id;
    //     this.$socket.emit('more',last_message);
    //    }
    ,
    triggerUpdate (time) {
      var that = this;
      setTimeout(function () {
        that.isUpdated = !that.isUpdated;
      }, time)
    },
    updateUnread(){
      var self = this
        var unread = this.messages.filter(m=>m.read==0 && m.sender==self.recipientId);
        for(var x = 0; x<unread.length ; x++){
          self.$socket.emit('Read',unread[x]);
          
        }

    }
   

    ,
    updateMessage(data){
      var self = this;
      
      var msgs =  self.filteredMessages.find(m=>m.Id==data.Id)
             var index = self.filteredMessages.indexOf(msgs);
             // alert(index)
                if(index!=-1){
              self.filteredMessages[index].status = data.status;
                self.filteredMessages[index].time_stamp = data.time_stamp;
               self.filteredMessages[index].updated_stamp = data.updated_stamp;
               // alert(data.status)
               if(!self.showList){
               if(data.status==4 || data.status == 5){
                self.filteredMessages[index].read = 1;
               }
             }


            }
             
            // 
            // console.log(self.filteredMessages);
    }


    ,
    isMessageSent(message) {
      return true
    },
    isMessageRecvd(message) {
      return true
    },
  },
    created: function(){
  // $socket is socket.io-client instance
        let self = this
        var container = $("#chat");
        if(this.loaded == false){
          
        this.$store.state.chat.socket.sub.loaded = true;
        this.$socket.on('userOffline',function(data){
          self.team.find(user=>user.Id==data.user_id).isOnline=0
           console.log(data)
        })
          this.$socket.on('userOnline',function(data){
            // console.log(data)
            if(data.user_id==self.userData.Id)
              return;
          self.team.find(user=>user.Id==data.user_id).isOnline=1
        })
          this.$socket.on('Read',function(data){
            // alert();
            self.updateMessage(data);
            self.$socket.emit('Acknowledged',data);
          })
        this.$socket.on('message', function(data){

      // $('#chat').scrollTop($('#chat')[0].scro?llHeight);
            // alert()
              // self.checkUread(data.sender)
              // debugger;
              // alert(self.showList)
            var msg = self.messages.find(m=>m.Id==data.Id);
            if(!msg){
              // alert(self.showList)
              // debugger;
              // data.status = 2;
              
                // if(self.canScrollToBottom())
              // self.scrollToBottom()
              // alert(self.canScrollToBottom()?)
              // console.log( self.$refs.audioElm)
              self.$refs.audioElm.play();
              self.messages.push(data);
              // debugger;
              if(self.showList==false){
                 self.updateUnread();
               } 
              
              
              self.$socket.emit("Delivered", data);
            }
    
        });
        this.$socket.on('more',function(data){
              var wtf    = $('#chat');
              var before = wtf.scrollTop();
              var height = wtf[0].scrollHeight;
              self.scrollme = false;
              if(self.filteredMessages.length<1)
                return;
              if(self.filteredMessages.find(m=>m.time_stamp==data.time_stamp))
                return;
              var topMessage = self.filteredMessages[0];
              var newMessage = data[data.length-1];
              if(topMessage.time_stamp==data.time_stamp)
                return;
             for(var i =0; i <data.length;i++){
              self.messages.push(data[i]);
             // $this.print(data[i])
             }
             // console.log("tp[ me",topMessage)
                self.messages.sort((x,y)=>{
                  return x.time_stamp - y.time_stamp
                });
              // self.scrollme = false;
              var after = wtf[0].scrollHeight;
              self.isLoadingMessages = false;

                wtf.scrollTop(after-height);
        })
        this.$socket.on('reconnect',function(data){
          // console.log("recoonected")
          self.$socket.emit('init', {user_id: self.userData.Id});
            self.tryAgain();
        })
        this.$socket.on('Typing', function (data){
           self.isTyping = true
           self.$emit("isTyping",self.isTyping)
          console.log("hello from the other",self.isTyping)
          // alert();
        })
        this.$socket.on('recieved',function(data){
          // 
         // console.log(data)
         // alert();
          self.updateMessage(data);
        })
          this.$socket.on('TypingStop', function (data){
           self.isTyping = false;
            self.$emit("isTyping",self.isTyping)
          // console.log("hello from the other",self.isTyping)
          // alert(); 
        })
          this.$socket.on('Delivered',function(data){
            // var message_Id = data.Id;
            // if(typeof(data)=="object"){
              // alert();
             self.updateMessage(data)

             self.$socket.emit('Seen',data);

          // } 

          })
         
        

        }

  }

}
</script>

<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}

.chatxxxxhhdgsdsd09978 {
  overflow-y: scroll;
  height: 100%;
  outline: 1px solid blue;
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

.chat-row{
  padding: 10px;
  border:1px solid #ccc;
}
.isOnline{
     border: 2px solid green;
    padding: 2px;
}
.chat-count{
    position: absolute;
    right: 15px;
    top:4px;
    font-size: 10px;
    color: #fff;
    text-align: center !important;
}
/*The Wrapper*/
.my-scrollbar{
  width: 35%;
  min-width: 300px;
  /*max-height: 450px;*/
  height: 50px;
}
#isTyping{
  /* display: none; */
  text-align: center;
  margin-left: 50px;
  font-style:italic
}

/*Phones + Some Tablets*/
@media (max-width: 380px)
{

  /*.chatxxxxhhdgsdsd09978 {
    height: 83%;
}*/
}
</style>
