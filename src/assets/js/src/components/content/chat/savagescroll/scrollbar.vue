<template>
    <div>
        <div id="scrollbar-container" ref="scrollContainer">
            <div id="scrollbar" @mousedown="onMouseDown" ref="scrollbar"></div>
        </div>
        <!--<slot ref="content"></slot>-->
    </div>
</template>

<script>
    
export default {
  methods: {
    scrollHanle(evt) {
      this.$emit(evt.type, evt)
    },
    initialize () {
        let scroll = this.$refs.scrollbar;
        let container = this.$refs.scrollContainer;
        let content = container.parentNode;
        scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
    },
    update (content) {
        let scroll = this.$refs.scrollbar;
        let container = this.$refs.scrollContainer;
        scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
    },
    destroy (content) {
        let scroll = this.$refs.scrollbar;
        let container = this.$refs.scrollContainer;
        scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
    },
    onMouseDown (start) {
        start.preventDefault();
        var scroll = this.$refs.scrollbar;
        var container = this.$refs.scrollContainer;
        var content = container.parentNode;
        // let widgetY = widget.offsetTop;
        // let widgetX = widget.offsetLeft;
        var y = scroll.offsetTop;

        var onMove = function(end){
            var delta = end.pageY - start.pageY;
            scroll.style.top = Math.min(container.clientHeight - scroll.clientHeight, Math.max(0, y + delta)) + 'px';
            content.scrollTop = (content.scrollHeight * scroll.offsetTop / container.clientHeight);

            // widget.style.top = widgetY + 'px';
            // widget.style.left = widgetX + 'px';
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', onMove);
        });
    },
    onScroll (e) {
        let scroll = this.$refs.scrollbar;
        let container = this.$refs.scrollContainer;
        let content = container.parentNode;
        // container.style.height = content.style.height;
        // Stop scroll container from scrolling with content
        container.style.top = content.scrollTop + 'px';
        container.style.height = content.clientHeight + 'px';

        scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
        scroll.style.top = container.clientHeight * content.scrollTop / content.scrollHeight + "px";
    },
  },
  mounted () {
    let container = this.$refs.scrollContainer;
    let content = container.parentNode;

    this.width = content.offsetWidth;
    this.height = content.offsetHeight;

    // var event = new Event('scroll');

    // window.addEventListener('resize', content.dispatchEvent.bind(content, event));
    // this.dispatchEvent(event);
            window.addEventListener("scroll", function(){
                console.log('scrolling');
            });

    // Update scrollbar on scroll
    content.addEventListener('scroll', this.onScroll);

    this.initialize();
  },
//   beforeDestroy() {
//     scrollBar.destroy(this.$refs.container)
//   },
  updated() {
    let content = this.$refs.content,
      width = content.offsetWidth,
      height = content.offsetHeight
    if (width != this.width || height != this.width) {
      this.update(content)
    }
  }
}
</script>

<style>

#scrollbar-container {
    position: absolute;
    right: 0px;
    bottom: 5px;
    top: 5px;
    width: 8px;
}

#scrollbar {
  position: absolute;
  right: 0;
  height: 30px;
  width: 5px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  -webkit-transition: background-color .15s linear;
  -o-transition: background-color .15s linear;
  -moz-transition: background-color .15s linear;
  transition: background-color .15s linear;
}
</style>