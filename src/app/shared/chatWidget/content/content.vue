<template>
  <div id="maincontentsjsk43384djfdkfjf" class="content" v-if="toggled">
  <ContentHeader v-if="!showingList"   @close="showingList=!showingList" :isTyping="typing" :name="chatName"/>
    <div class="row"  v-if="showingList" >
    <!-- <div class="col-md-8"><h3 align="center">Chat List</h3></div> -->
    <div class="col-md-12" align="center"><i  class="ion-ios-people fa-3x"></i> </div>
  </div>
    <div class="midsect" ref="midsect">
      <!--Real-->
      <!--<Chat :isVisible="toggled" ref="chat" @imageRecvd="val => (image = val)"/>-->
        <!--Dummy-->
        <!-- {{messages}} -->
      <Chat @isTyping="isTyping" @canScrollMe="canScrollMe" @showList="showList" id="chat" :show="showingList" :project_Id="project_Id"  :isVisible="toggled" ref="chat" :msgs="msgs" :recipientId="recipientId"/>
    </div>
    <!--Real-->
    <!--<ContentFoot/>-->
    <!--Dummy-->
    <ContentFoot v-show="!showingList" @reloadStore="reloadStore" 
      :recipientId="recipientId" :showList="showingList"  :project_Id="project_Id" :canScrollMe="yes"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ContentHeader from './header/header.vue'
import Chat from './chat/chat.vue'
import ContentFoot from './footer.vue'
// import Scrollbar from './tinyscroll/scrollbar.vue';

export default {
  name: 'content',
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
    project_Id:{
      type: String
    },
    yes:false
  },
  components: {
    ContentHeader,
    Chat,
    ContentFoot,

  },
  mounted () {
    // alert(this.project_Id)
     this.callWithToken({
        parameters: {
            id: this.user.team_Id, // project id
        },
        action: this.getClientTeam,
    });
  },
  data () {
    return {
      open: true,
      imageIsVisible: false,
      // Dummy Msgs
      msgs: [],
      typing : false,
      showingList:true,
      recipientId:'',
    }
  },
  computed: {
    ...mapGetters('team', [
                'team',
             
            ]),
     ...mapGetters('userCredentials', [
                'user',
            ]),
        ...mapGetters('chat/socket', [
      'messages',
      'loading',
      'loaded',
    ]),
        

    chatName () {
      var self = this;
      var user= this.team.find(m=>m.Id==self.recipientId)
      return user.first_name+ ' ' + user.last_name || 'Anonymous Chat'
    },
  },
  methods: {
    // Dummy
    reloadStore () {
      this.$emit('reloadStore')
    },
    canScrollMe(val){
     this.yes = val;
    },
    showList(val,Id){
      // alert(Id);
      // debugger;
      this.showingList = val;
      this.recipientId = Id;
        if(val==false){
          setTimeout(function(){
            // alert()
            // debugger
             var wtf    = $('#chat');
           var height = wtf[0].scrollHeight;
           wtf.scrollTop(height);
          },200)
        }
    }
    ,
        isTyping(val){
        this.typing=val;
        // alert();
        // alert(val)
     },
       ...mapActions('team', [
                'getClientTeam',
                'clearErrors',
            ]),
          ...mapActions('userCredentials', [
                'callWithToken',
            ]),

  }
}
</script>

<style scoped>


.content {
  width: 300px;
  height: 432px;
  margin: auto;
  /*transition: height 35s;*/
  box-shadow: 0 4px 21px rgba(0, 0, 0, 0.2);
  padding: 5px;
  box-sizing: border-box;
  background:#fff
}

.midsect
{
  /*outline: 1px solid black;*/
  position: relative;
  height: 79%;
  overflow: hidden;
}

/*Phones + Some Tablets*/
@media (max-width: 380px)
{
  .content {
    position: relative;
    box-shadow: 0 0 0 0;
    height: 100%;
    width: 100%;
  }

  .midsect
  {
    height: 85%;
  }
}
</style>
