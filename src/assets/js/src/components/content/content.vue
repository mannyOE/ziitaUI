<template>
  <div id="maincontentsjsk43384djfdkfjf" class="content" v-show="toggled">
    <ContentHeader @widgetMoved="$emit('widgetMoved')" @stoppedMoving="$emit('stoppedMoving')" @close="$emit('close')" @viewImage="viewImage" :image="image"/>
    <div class="midsect" ref="midsect">
      <PicDisplay ref="picdisplay" v-if="image" v-show="imageIsVisible" :image="image"/>
      <!--Real-->
      <!--<Chat :isVisible="toggled" ref="chat" @imageRecvd="val => (image = val)"/>-->
        <!--Dummy-->
      <Chat :isVisible="toggled" :imgIsVisible="imageIsVisible" ref="chat" @imageRecvd="val => (image = val)" :msgs="msgs"/>
    </div>
    <!--Real-->
    <!--<ContentFoot/>-->
    <!--Dummy-->
    <ContentFoot @newMsg="val => {newMsge(val)}"/>
  </div>
</template>

<script>
import ContentHeader from './header/header.vue'
import Chat from './chat/chat.vue'
import PicDisplay from './picdisplay.vue'
import ContentFoot from './footer/footer.vue'

export default {
  name: 'content',
  props: ['toggled'],
  mounted () {
  },
  data () {
    return {
      open: true,
      imageIsVisible: false,
      // Dummy Msgs
      msgs: [],
      // Real Img
      // image: null,
      // Dummy Img
      image: '734257355c559d394eb900a70ea03a08.png',
    }
  },
  components: {
    ContentHeader,
    Chat,
    ContentFoot,
    PicDisplay
  },
  methods: {
    // Dummy
    newMsge(msg){
      this.msgs.push(msg);
    },
    viewImage () {
      this.imageIsVisible = !this.imageIsVisible;
      var that = this;
      setTimeout(function () {
        that.resizeMid();
      }, 100)
    },
    resizeMid () {
      if (this.imageIsVisible) {
        // console.log(this.$refs.picdisplay.clientheight, 'picheight');
        // console.log(this.$refs.picdisplay.offsetHeight, 'picheight2');
        // console.log(this.$refs.midsect.offsetHeight, 'sectheight');

        let picHeight = this.$refs.picdisplay.getHeight();
        let containerHeight = this.$refs.midsect.offsetHeight;
        let picPercent = (picHeight/containerHeight)*100;
        let chatPercent = 100 - picPercent;

        this.$refs.chat.setHeight(chatPercent + "%");
      } else {
        this.$refs.chat.setHeight("100%");
      }
    }
  }
}
</script>

<style>


.content {
  width: 300px;
  height: 432px;
  margin: auto;
  /*transition: height 35s;*/
  box-shadow: 0 4px 21px rgba(0, 0, 0, 0.2);
  padding: 5px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.87)
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
