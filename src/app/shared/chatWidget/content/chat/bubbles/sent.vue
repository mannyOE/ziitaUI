<template>
    <div class="chat-bubble-sent">
        <!-- Other user sends -->
        <!-- {{msg.time_stampcha}} -->
        <slot/>
        <div class="msg-status-sent">  {{readAbleTime(msg) | moment("L, h:mm a")}}
        <i v-if="msg.status==2 || msg.status==3" class="ion-android-done-all"></i>
         <i v-if="msg.status==1" class="ion-android-done"></i>
          <i v-if="msg.status==4 || msg.status==5" class="ion-android-done-all" style="color:green"></i>
         <i v-if="msg.status==0" class="ion-ios-circle-outline"></i>
        <!-- <label v-show="msg.status==0" @click="tryAgain(msg)">try again</label> -->
        </div>
    </div>
</template>

<script>

export default {
  name: 'sentbubble',
   props: ['msg','socket'],
     methods:{
      tryAgain(msg){
        this.$emit('tryAgain',msg);
      },
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
label{
  cursor: pointer;
}
.chat-bubble-sent {
  word-wrap: break-word;
  width: 70%;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  border-bottom-left-radius: 13px;
  color: #000000;
  font-size: 12px;
  background-color: #F5F4FF;
  float: right;
  padding: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  position: relative;
}

.msg-status-sent{
  position: absolute;
  right: 20px;
  font-size: 10px;
  color: #8280B4 !important
}
</style>
