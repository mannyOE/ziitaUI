<template>
    <el-dialog :visible="show"
      width="45%" 
      :show-close="false" 
      :before-close="beforeClose">
        <div slot="title">
            <button type="button" class="close" @click.stop="$_$closeModal">×</button>
        </div>
         <div class="chat-box">
            <div class="chat-head">
                
                
                <div class="beside row">
                    <div class="col-md-3">
                        <img :src="require('@/assets/img/1.jpeg')" class="avatar-chat" height="40">
                    </div>
                    <div class="col-md-9 proj-mngr-head">
                        <p class="proj-name">Michael Alade</p>
                        <p class="proj-address">Project Associate</p>
                    </div>
                </div>
                
            </div>
            <div class="proj-mngr-chat">
                <div class="chat-txt">
                    Hello! We are excited to have you on board.
                </div>
                <div class="chat-txt-date">
                    MON, AUG 6, 2017 | 09:12AM
                </div>
            </div>
            <div class="client-chat">
                <div class="chat-txt">
                    Thanks Chioma! Looking forward to a great experience
                </div>
                <div class="chat-txt-date">
                    MON, AUG 6, 2017 | 09:12AM
                </div>
            </div>
            <div class="proj-mngr-chat">
                <div class="chat-txt">
                    Sure! You are going to have a great time working with our talented engineering team.
                </div>
                <div class="chat-txt-date">
                    MON, AUG 6, 2017 | 09:12AM
                </div>
            </div>
                <input type="text" placeholder="Type a message" class="chat-bottom">
            </div>
        </div>
      
    </el-dialog>
</template>

<script>

export default {
    name: 'Modulemessaging',
    props: ['show'],
    
    data () {
        return {
        }
    },
    methods: {
        beforeClose(done) {
            this.$_$closeModal()
            done();
        },
    },
}
</script>


<style scoped>
.chat-box{

  background: #FFFFFF;
  
  margin: 0px auto;
}

.chat-head{
  height: 60px;
  width:100%;
 
}

.chat-bottom{
  height: 40px;
  width:100%;
  border-top: 1px solid #E5E7F7 !important;
  margin-top:50px;
  border-radius: 50px !important;
  padding:10px 20px;
}

.chat-title {
  font-size: 12px;
  color: #326ADA;
  padding-top: 20px;
  font-weight: bold;
  border-top: 2px solid #326ADA;
  width: 72px;
  text-align: center;
}

.beside.row{
  width: 280px;
  margin-left: 5px;
}

.help-title{
  font-size: 12px;
  color: #728EAA;
  font-weight: bold;
  padding: 20px 0px;
  padding-left: 80px;
  cursor:pointer;
}

.help-title:hover{
  font-size:bold;
  color: #326ADA;
  transition:linear 0.5s;
}

.help-icon{
  margin-left: 0px !important;
  padding-top: 20px !important;
  color: #326ADA;
  font-size: 20px !important;
  cursor:pointer;
}
.proj-mngr-chat{
  padding-top:10px;
}

.proj-mngr-chat{
  float:left;
  margin-top: 50px;
  width:315px;
}

.proj-mngr-chat .chat-txt-date{
  float:right;
}

.client-chat{
  float:right;
  margin-top: 50px;
  width:315px;
}

.client-chat .chat-txt-date{
  float:left;
}

.chat-txt{
  background: #FFFFFF;
  border: 1px solid #DEE9F2;
  border-radius: 3px;
  font-size: 14px;
  color: #728EAA;
  letter-spacing: 0;
  line-height: 18px;
  min-height: 40px;
  width:315px;
  padding: 10px;
}

.proj-mngr-chat{
  margin-left: 50px;
}

.client-chat{
  margin-right: 50px;
}

.proj-mngr-head{
  padding:10px 0px;
}

.client-chat .chat-txt{
  margin-right: 50px;
  background: #F0F5F9;
}

.chat-txt-date{
  font-size: 10px;
  color: #728EAA;
  letter-spacing: 0;
}

</style>