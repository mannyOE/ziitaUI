<template>
      <div class="primo">
        <div id="togglexx9fdfdf9er8" class="toggle open-toggle" @click="toggle" :class="closeToggleObj">
        </div>
      </div>
</template>

<script>

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
    }
  },

  methods: {
    toggle (e) {
        if (!this.widgetMoved) {
            this.$emit("toggled");
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