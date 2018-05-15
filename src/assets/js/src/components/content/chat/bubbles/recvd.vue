<template>
    <div class="chat-bubble-recv">
        <!-- Site bot recvs -->
       <slot/>
    </div>
</template>

<script>

export default {
  name: 'recvdbubble',
}
</script>

<style>

.chat-bubble-recv {
  word-wrap: break-word;
  width: 70%;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  border-top-left-radius: 13px;
  color: #e4e1ff;
  font-size: 12px;
  background-color: #b1a8ff;
  float: left;
  padding: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>
