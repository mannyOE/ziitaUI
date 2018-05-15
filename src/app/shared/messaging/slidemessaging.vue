<template>
    <div class="sidebar-messaging" id="messaging-all">
      <div class="messaging-header">
        <p>Modulename <span><i class="ion-minus-round" @click="minimized"></i><i class="ion-close"></i></span></p>
      </div>
      <div class="module_messages">
          <div class="message_intro_module">
            <div class="media">
              <div class="media-left">
                <img :src="require('@/assets/img/1.jpeg')" class="media-object" >
              </div>
              <div class="media-body">
                <h4 class="media-heading">Code Wonders</h4>
                <p>Developer For This {moduleName}</p>
              </div>
            </div>
          </div>
         <div class="messageIn_module">
            <p>Code Wonders How Are You Doing</p>
          </div>
          <div class="moduleOut_module">
            <p>This Module Is Giving Me Problem</p>
          </div>
          <div class="moduleOut_module">
            <p>Kill me Na</p>
          </div>
           <div class="messageIn_module">
            <p>How Many Thing Do u Wnat Me To Do</p>
          </div>
          <div class="moduleOut_module">
            <p>Okay .... </p>
          </div>
           <div class="messageIn_module">
            <p>....lmaoooo</p>
          </div>
      </div>
     
      <div class="writemessage">
        <input type="text" placeholder="Write Your Message" class="form-control">
      </div>
    </div>
</template>

<script>

export default {
    name: 'slidemessaging',
     data () {
        return {
          
        }
    },
    method:{
      minimized (){
        console.log('red Done ..... ')
        // var messaging = document.getElementById('messaging-all');
        // messaging.classList.toggle('closeitNow');
      },
    },
}
</script>


<style scoped>
 .sidebar-messaging {
    position: fixed;
    height: 50%;
    bottom: 0%;
    right: 4%;
    width: 19%;
    background: #fff;
    border-radius: 8px 8px 1px 1px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
    z-index: 1000;
}
.closeitNow{
   height: 6% !important;
}

 .messaging-header {
    color: #fff;
    padding: 6px 9px;
    border-radius: 8px 8px 1px 1px;
    background: #3369da;
    width: 100%;
    height: 28px;
}
.messaging-header p {
    font-size: 12px;
}
.messaging-header i {
    margin: 6px;
}
.module_messages:hover::-webkit-scrollbar{
     width: 5px;
     transition: all 1s ease;
}
.module_messages::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.message_intro_module p {
    font-size: 11px;
}

.message_intro_module h4 {
    font-size: 14px;
}

.message_intro_module {
    margin: 7px 0px 21px;
    border-bottom: 1px solid #efefef;
}
.message_intro_module img {
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin: 0px 0px 14px 9px !important;
}
.module_messages::-webkit-scrollbar-thumb {
    border-radius: 50px;
   /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
   background-color: #848484;
   transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.module_messages::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
}
.messaging-header span {
    float: right;
}
  .messageIn_module {
    background: #c2e8c5;
    padding: 4px 7px 1px;
    width: 68%;
    font-size: 12px;
    margin: 9px 6px;
    border-radius: 1px 12px 12px 12px;
}
.writemessage input {
    font-size: 12px !important;
}
.moduleOut_module {
    text-align: right;
    background: #eaeaea;
    width: 68%;
    margin: 9px 76px;
    font-size: 12px;
    /* float: right; */
    /* right: 0% !important; */
    padding: 4px 7px 1px;
    border-radius: 8px 1px 8px 8px;
}
.writemessage {
    position: fixed;
    bottom: 0% !important;
    width: 19%;
    /* font-size: 12px !important; */
}
.module_messages {
    padding: 2px;
    min-height: 242px;
    max-height: 242px;
    overflow-y: overlay;
    background: #ff000000;
    transition: all 1s ease;
}
</style>