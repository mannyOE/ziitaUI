<template>
    <div class="chat-bubble-recv">
  <!-- {{msg.time_stamp}} -->
       <slot/>
       <div class="msg-status-recieved">
       <!--  <i v-if="msg.status==2" class="ion-android-done-all"></i>
         <i v-if="msg.status==1" class="ion-android-done"></i> -->
         {{readAbleTime(msg) | moment("L, h:mm a")}}
      </div>
    </div>
</template>

<script>

export default {
  name: 'recvd-bubble',
  props:['msg'],
  methods:{
       readAbleTime(data){
        var t;
        if(data.status == 1 || data.status == 0)
          t=data.time_stamp 
        else if(data.status == 2 || data.status == 3 || data.status == 4 || data.status == 5)
          t=data.updated_stamp 
         var x = new Date(t);
    var time = x.toDateString();
    return x
    }
  }
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
  position: relative;
}
.msg-status-recieved{
  position: absolute;
  left: 20px;
  font-size: 10px;
  color: #8280B4 !important
}

</style>
