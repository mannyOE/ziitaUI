<template>
  <div class="header" draggable="false" @mousedown="mouseDown" >
    sd
    <HeaderClose @mousedown.native="dontMove" @close="close"/>
    <ViewImage @mousedown.native="dontMove" @viewImage="viewImage" v-if="image"/>
  </div>
</template>

<script>
import HeaderClose from './close.vue'
import ViewImage from './viewimg.vue'

export default {
  name: 'contentheader',
  data () {
    return {
      widgetMoving: false,
    }
  },
  watch: {
      'widgetMoving' (val, old) {
          if (val) {
            this.$emit('widgetMoved');
            var that = this;
            setTimeout(function () {
              that.widgetMoving = false;
            }, 150);
          } else {
              this.$emit('stoppedMoving');
          }
      }
  },
  props: ['image'],
  components: {
    HeaderClose,
    ViewImage,
  },
  mounted () {
    let diffY,
      diffX,
      widgetHeight,
      widgetWidth,
      containerHeight,
      containerWidth,
      outOfBoundsCounter,
      moveMe = document.getElementById("stwidgxx988exxxxt6109"),
      isMouseDown = false;

    this.cArgs = {diffY,
      diffX,
      widgetHeight,
      widgetWidth,
      containerHeight,
      containerWidth,
      outOfBoundsCounter,
      isMouseDown,
      moveMe
    };
    // Put the Listener
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  },
  beforeDestroy() {
    // Remove the Listener
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
  },
  methods: {
    viewImage () {
      if (!this.widgetMoving)
      {
        this.$emit('viewImage');
      }
    },
    close () {
      if (!this.widgetMoving)
      {
        this.$emit('close');
      }
    },
    moveWidget (widget, yPos, xPos) {
      var that = this;
      function pxToInt(px) {
        px = px.split("px").join("");
        return parseInt(px);
      }
      function makePositive(number) {
        if (number < 0) {
            number = -number;
            return number;
        }
        return number;
      }

      (function (newX, newY, oldX, oldY) {
        if (makePositive(newX - oldX) > 1 || makePositive(newY - oldY) > 1) {
          that.widgetMoving = true;
        } else {
          that.widgetMoving = false;
        }
      })(xPos, yPos, pxToInt(widget.style.left), pxToInt(widget.style.top));

      let yPerc = (yPos/document.body.offsetHeight)*100;
      let xPerc = (xPos/document.body.offsetWidth)*100;
      widget.style.top = yPerc + '%';
      widget.style.left = xPerc + '%';
    },
    dontMove (e) {
      let left = 1;
      let that = this;

      setTimeout(function () {
        if (e.which === left) {
          that.cArgs.isMouseDown = false;
        }
      }, 0.1);
    },
    mouseDown (e) {
      let left = 1;
      if (e.which === left) {
        this.cArgs.isMouseDown = true;
        this.cArgs.outOfBoundsCounter = 0;
        // get initial mousedown coordinated
        const mouseY = e.clientY;
        const mouseX = e.clientX;

        // get element top and left positions
        const widget = this.cArgs.moveMe;
        const widgetY = widget.offsetTop;
        const widgetX = widget.offsetLeft;

        // get widget dimensions
        this.cArgs.widgetWidth = widget.offsetWidth;
        this.cArgs.widgetHeight = widget.offsetHeight;

        // get container dimensions
        const container = widget.offsetParent;
        this.cArgs.containerWidth = container.offsetWidth;
        this.cArgs.containerHeight = container.offsetHeight;

        // get diff from (0,0) to mousedown point
        this.cArgs.diffY = mouseY - widgetY;
        this.cArgs.diffX = mouseX - widgetX;
      }
    },
    mouseMove (e) {
      if (!this.cArgs.isMouseDown) return;
      const widget = this.cArgs.moveMe;

      let widgetHeight = this.cArgs.widgetHeight;
      let widgetWidth = this.cArgs.widgetWidth;
      let containerHeight = this.cArgs.containerHeight;
      let containerWidth = this.cArgs.containerWidth;

      // get new mouse coordinates
      const newMouseY = e.clientY;
      const newMouseX = e.clientX;

      // calc new top, left pos of widget
      let newWidgetTop = newMouseY - this.cArgs.diffY,
          newWidgetLeft = newMouseX - this.cArgs.diffX;

      // calc new bottom, right pos of widget
      let newWidgetBottom = newWidgetTop + widgetHeight,
          newWidgetRight = newWidgetLeft + widgetWidth;

      if ((newWidgetTop < 0) || (newWidgetLeft < 0) || (newWidgetTop + widgetHeight > containerHeight) || (newWidgetLeft + widgetWidth > containerWidth)) {
        // if widget is being dragged off top of the container...
        if (newWidgetTop < 0) {
          newWidgetTop = 0;
        }

        // if widget is being dragged off left of the container...
        if (newWidgetLeft < 0) {
          newWidgetLeft = 0;
        }

        // if widget is being dragged off bottom of the container...
        if (newWidgetBottom > containerHeight) {
          newWidgetTop = containerHeight - widgetHeight;
        }

        // if widget is being dragged off right of the container...
        if (newWidgetRight > containerWidth) {
          newWidgetLeft = containerWidth - widgetWidth;
        }
      }

      this.moveWidget(widget, newWidgetTop, newWidgetLeft);
    },
    mouseUp () {
      this.cArgs.isMouseDown = false;
      setTimeout(function () {
          this.widgetMoving = false
        }, 1000);
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
