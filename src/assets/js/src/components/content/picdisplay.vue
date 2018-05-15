<template>
  <span>
    <Modal :show="showModal" :onClose="closeModal" :pic="image" @content="val => (modalContent = val)"/>
    <img ref="pic" @click="onClick" :src="image" id="vxhggpicdisplayxxx932" class="vxhggpicdisplayxxx932" draggable="false"/>
  </span>
</template>

<script>
import Modal from "./picmodal.vue";

export default {
  name: 'picdisplay',
  props: ['image'],
  components: {
    Modal
  },
  data () {
    return {
      showModal: false,
      // image: '/src/img/react.png',
      modalContent: null,
    }
  },
  methods: {
    openModal () {
      this.showModal = true;
    },
    closeModal () {
      this.showModal = false;
    },
    getHeight () {
      function pxToInt(px) {
        px = px.split("px").join("");
        return parseInt(px);
      }
      let pic = this.$refs.pic;
      
      let picStyle = window.getComputedStyle(pic) || pic.currentStyle;
      let picHeight =  pic.height + (pxToInt(picStyle.marginBottom) + pxToInt(picStyle.marginTop)) + (pxToInt(picStyle.paddingBottom) + pxToInt(picStyle.paddingTop));
      // console.log(pic.height);
      // console.log((pxToInt(picStyle.marginBottom) + pxToInt(picStyle.marginTop)));

      return picHeight;

    },
    calculateAspectRatioFit (srcWidth, srcHeight, maxWidth, maxHeight) {

        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        return { width: srcWidth*ratio, height: srcHeight*ratio };
    },
    getDimensions (width, height) {
      let dime = {};
      let bodyWidth = document.body.offsetWidth;
      let bodyHeight = document.body.offsetHeight;
      let margin = 55;
      let maxWidth = bodyWidth - margin;
      let maxHeight = bodyHeight - margin;

      dime = this.calculateAspectRatioFit(width, height, maxWidth, maxHeight)
      return dime;
    },
    getPosition (width, height) {
      let pos = {};
      let bodyWidth = document.body.offsetWidth;
      let bodyHeight = window.innerHeight;
      let horizontalMargin = bodyWidth - width;
      let verticalMargin = bodyHeight - height;

      return {left: horizontalMargin/2, top: verticalMargin/2};
    },
    onClick () {
      if (true) {
        var img = new Image();
        var that = this;
        
        img.onload = function () {
          var modalImg = that.modalContent;

          let height = img.height;
          let width = img.width;

          let dimen = that.getDimensions(width, height);
          modalImg.style.width = dimen.width + 'px';//;
          modalImg.style.height = dimen.height +'px';

          let pos = that.getPosition(dimen.width, dimen.height)
          modalImg.style.left = pos.left + 'px';
          modalImg.style.top = pos.top +'px';
          console.log(pos.top, 'yoo');
        }

        img.src = this.image;
        this.openModal();
      }
    }
  }
}
</script>

<style>
.brace {
  width: 100%;
  height: 45%;
}

.vxhggpicdisplayxxx932 {
  /*outline: 1px solid black;*/
  width: 100%;
  height: 45%;
  padding-bottom: 21px;
  box-sizing: border-box;
  object-fit: cover;
  -webkit-transition: background-color .15s linear;
  -o-transition: background-color .15s linear;
  -moz-transition: background-color .15s linear;
  transition: height .50s linear;
}

/*Phones + Some Tablets*/
@media (max-width: 380px)
{
  /*.vxhggpicdisplayxxx932 {
    display: none;
    height: 27%;
  }*/
}
</style>
