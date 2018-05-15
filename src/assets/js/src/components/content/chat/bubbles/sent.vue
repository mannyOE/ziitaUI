<template>
    <div class="chat-bubble-sent">
        <!-- Site bot sends -->
        <slot/>
    </div>
</template>

<script>

export default {
  name: 'sentbubble',
}
</script>

<style>

.chat-bubble-sent {
  word-wrap: break-word;
  width: 70%;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  border-bottom-left-radius: 13px;
  color: #8280B4;
  font-size: 12px;
  background-color: #F5F4FF;
  float: right;
  padding: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
