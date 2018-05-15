<template>
  <div class="modal-mask" @click="close" v-show="show" transition="modal">
    <!--<div class="modal-container" @click.stop>-->
      <div class="modal-close" @click="close"></div>
      <img :src="pic" ref="modalContent" class="modal-content"></img>
    <!--</div>-->
  </div>
</template>


<script>
// import router from '../router/routes';
// import VueNotifications from 'vue-notifications';

export default {
  name: 'modal',
  props: ['show', 'onClose', 'pic'],
  mounted () {
    this.$emit('content', this.$refs.modalContent)
  },
  methods: {
    close () {
        this.onClose();
    }
  },
}
</script>

<style>

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    transition: opacity .3s ease;
}

.modal-container {
    width: 400px;
    /*background-color: #fff;*/
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-content {
  position: relative;
  /*right: -30px;*/
  /*margin: auto;
  text-align: center;*/
}

.modal-close {
  font-family: "Roboto-Regular", sans-serif;
  float: right;
  cursor: pointer;
  width: 21px;
  height: 21px;
  /*background: url("../../img/close-icon.png") center no-repeat;*/
  background-size: 80%;
}

</style>
