<template>
      <div class="primo">
        <div id="togglexx9fdfdf9er8" class="toggle open-toggle  chat-icon" @click="toggle" :class="closeToggleObj">
        <label class="message-count" v-if="getUnread()>0 && !isToggled">{{getUnread()}}</label>
        <!-- {{isToggled}} -->
        
        </div>
      </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'toggle',
  props: ['widgetMoved', 'isToggled'],
  data () {
    return {
      // openIcon: !this.isToggled,
    }
  },
  computed: {
    closeToggleObj () {
        return {
            'close-toggle': this.isToggled
        }
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
    ...mapGetters('userCredentials', [
        'user'
  ])
},

  methods: {
      getUnread(){
        var self = this;
      return this.messages.filter(m=>m.read==0 && (m.recipient==self.user.Id)).length;
    },
    toggle (e) {
        if (!this.widgetMoved) {
            this.$emit("toggled");
            // if(isToggled){
            //   alert()
            //      this.$emit("canChat",false);
            // }
            // this.open = !this.open;
            // chatPreHeight = scrollcontent.offsetHeight + "px";

            // //Set Scrollbar height after chat is toggled
            // scroll.style.height = scrollcontent.clientHeight * scrollcontent.clientHeight / scrollcontent.scrollHeight + "px";
            // console.log( scrollcontent.clientHeight / scrollcontent.scrollHeight, 'myheigh');
        }
    }
  }
};
</script>
<style type="text/css">
.message-count{
  position: absolute;
    right: 0px;
    color: #f5eeee !important;
    /* font-size: large !important; */
    border: 20px;
    background: red;
    border-radius: 40px;
    padding: 0px 3px;
    color: white;
    min-width: 15px;
    text-align: center
}
  .chat-icon { right: 107px !important; bottom: 28px  !important;
    height: 49px !important;
    background-color: #3369da !important;
    width: 46.5px !important;
  }
</style>