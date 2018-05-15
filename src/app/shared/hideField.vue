<template>
    <span v-show="false">
        <slot/>
    </span>
</template>
<script>

export default {
  name: "hidden-field",
  props: [],
  data() {
    return {
    };
   
  },
  computed: {
  },
  methods: {
  }
}

</script>
<style scoped>
</style>
