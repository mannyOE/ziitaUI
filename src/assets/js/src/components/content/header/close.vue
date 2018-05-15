<template>
    <div class="mobileClose" draggable="false" @click="$emit('close')"></div>
</template>

<script>

export default {
  name: 'headerclose',
}
</script>

<style>

.content .header .mobileClose {
  /*font-family: "Roboto-Thin", sans-serif;
  font-size: 34px;*/
  color: black;
  background: url("../../../img/close_icon_black2.png") center no-repeat;
  background-size: 95%;
  width: 14px;
  height: 14px;
  /*text-align: center;*/
  /*font-weight: 200;*/
  display: inline-block;
  /*vertical-align: top;*/
}
</style>
