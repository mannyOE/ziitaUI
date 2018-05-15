<template>
  <div class="header" draggable="false">
    <HeaderClose @close="close" />
    <!-- <div > -->
         <div class="chat-name">{{ name  }} <label  v-show="isTyping" for="" style="text-align:center">  typing ...</label></div>
    <!-- </div> -->
   
    <!-- <div style="height:10px"> -->
     
    <!-- </div> -->
  
    
  </div>
</template>

<script>
import HeaderClose from './close.vue'

export default {
  name: 'content-header',
  props: {
    name: {
      type: String,
      default: 'Anonymous Chat',
    },
    isTyping:{
      type:Boolean
    }
  },
  components: {
    HeaderClose,
  },
  // computed()
  data () {
    return {
      widgetMoving: false,
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    close () {
      this.$emit('close');
    },
  }
}
</script>

<style scoped>
.chat-name {
  position: relative;
  text-align: center;
  color: #8280B4;
}

</style>
