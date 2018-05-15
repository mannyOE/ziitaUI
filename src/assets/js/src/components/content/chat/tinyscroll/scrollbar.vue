<template>
    <div ref="viewport" class="viewport">
        <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
        <div ref="overview" class="overview">
            <slot/>
        </div>
    </div>
</template>

<script>
import tinyscroll from "../../../../../tinyscrollbar.js";
    
export default {
    props: ['isTriggered', 'isUpdated', 'newMsg', 'container'],
    watch: {
        'isTriggered' (val, old) {
            if (val) {
                let $scrollbar = this.container;
                this.theScrollbar  = tinyscroll($scrollbar);
            }
        },
        'isUpdated' (val, old) {
            this.update();
        },
        'newMsg' (val, old) {
            this.scrollDown();
        }
    },
    methods: {
        scrollDown () {
            // Scroll Down
            this.theScrollbar.update('bottom');
            // console.log(this.$refs.viewport.offsetHeight, 'scrollffset');
            // console.log(this.$refs.overview.scrollHeight, 'scoffset');
            // console.log('updates')
        },
        setViewPortHeight (heightStr) {
        this.$refs.viewport.style.height = heightStr;
        },
        update () {
            // Up date scroll
            this.theScrollbar.update();
            // console.log(this.$refs.viewport.offsetHeight, 'viewport offsetxx');
            // console.log(this.$refs.overview.scrollHeight, 'content sizexx');
            // console.log('updated')
        }
    },
}
</script>

<style>

/* Tiny Scrollbar */
/*#scrollbar1 { width: 100%; height: 100%; outline: 1px solid blue; }*/
.viewport { width: 100%;  height: 100%;  overflow: hidden; position: relative; }
.overview {  width: 100%; list-style: none; position: absolute; left: 0; top: 0; padding: 0; margin: 0; }
/*#scrollbar1 .scrollbar{ background: transparent url('/img/bg-scrollbar-track-y.png') no-repeat 0 0; position: relative; background-position: 0 0; float: right; width: 15px; }*/
/*#scrollbar1 .track { background: transparent url('/img/bg-scrollbar-trackend-y.png') no-repeat 0 100%; height: 100%; width:13px; position: relative; padding: 0 1px; }*/
/*#scrollbar1 .thumb { outline: 1px solid yellow; height: 20px; width: 25px; cursor: pointer; overflow: hidden; position: absolute; top: 0; left: -5px; }
#scrollbar1 .thumb .end { outline: 1px solid yellow; overflow: hidden; height: 5px; width: 25px; }*/
.disable { display: none; }
.noSelect { user-select: none; -o-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; }

/*New*/
.scrollbar {
    position: relative;
    background-position: 0 0;
    float: right;
    /*right: 0;*/
    width: 15px;
    z-index: 9999;
}

.track {
    /* background: transparent url(images/bg-scrollbar-trackend-y.png) no-repeat 0 100%; */
    height: 100%;
    width: 13px;
    position: relative;
    padding: 0 1px;
}

.thumb {
    height: 20px;
    width: 8px;
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    top: 0;
    /* left: -5px; */
    border-radius: 13px;
  background: rgba(0, 0, 0, 0.2);
}
.thumb .end {
    /* background: transparent url(images/bg-scrollbar-thumb-y.png) no-repeat 50% 0; */
    overflow: hidden;
    height: 5px;
    /* width: 25px; */
}
</style>