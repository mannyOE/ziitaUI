<template>
  <li class="dropdown notification">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
          <span class="ion-ios-bell-outline"></span>
          <label v-if="notifications.filter(val=>val.status === 1).length > 0">
            <i class="ion-record"></i>
            <h6 class="number-click">{{notifications.filter(val=>val.status === 1).length}}</h6>
          </label>
        </a>
          <ul class="dropdown-menu scrollbar" v-if="notifications.length !== 0">
            {{notifications}}
            <div class="triangle"></div>
            <div class="notification-header">
                <b>Notifications</b>
            </div>
            <div class="notification-list" v-for="content in notifications">
                <div class="notification">
                    <div class="noti-time">
                        <span>{{timeSent(content)}}</span>
                    </div>
  <audio ref="audioElm" src="https://notificationsounds.com/soundfiles/a86c450b76fb8c371afead6410d55534/file-sounds-1108-slow-spring-board.mp3"></audio>

                    <div class="noti-body hov" >
                        <div class="noti-message">
                            {{content.message}}
                        </div>
                    </div>
                </div>

            </div>
          </ul>
          <ul class="dropdown-menu" style="padding-left: 18px;" v-else>
                <b> No notifications</b>
          </ul>
  </li>



</template>
<script>
import VueSocketio from 'vue-socket.io';
import {mapGetters, mapMutations, mapActions} from 'vuex';
import moment from 'moment';
// import VueSocketio from 'vue-socket.io';



    export default {
        name: "NotificationComponent",
        data() {
            return {
                openNotifications: false,
                notifi : [],
                notifications: ["ksjdklsdhf"],
                show: true,
            };
        },

        created:function(){


            // debugger;
        //    this.$socket.emit('init', {user_id: this.userData.Id});
            this.$socket.emit('getStarted', {Id: this.userData.Id});

            // this.$socket.emit('newNotification', {Id: this.userData.Id, message:'now working'});


            this.$socket.on('allNotification', (data)=>{
                console.log('all', data)
                this.notifications = data.reverse()
            })


                this.$socket.on('newevent', (data)=>{
                    let self = this;
                    console.log('data', data)
                    // this.unreadMessages().length = this.unreadMessages().length + 1
                    // this.notifications=data.reverse()
                    this.notifications = data.filter((item)=>{
                    return  item.Id === self.userData.Id
                    }).reverse()
                    this.$refs.audioElm[1].play();
                    // this.show = true;
                    console.log('notificatio', this.notifications)
                })
                this.$socket.on('Done', (data)=>{
                    // this.unreadMessages.length = 0;
                    let self = this;
                    console.log('data', data)
                    this.notifications = data.filter((item)=>{
                    return  item.Id === self.userData.Id
                    }).reverse()
                    console.log('read', this.notifications)
                })
            // this.notification();
        },
        computed:{

            ...mapGetters('userCredentials', {userData: 'user',}),
            ...mapGetters('feedback', ['retrieve']),
            // moment: function (date) {
            //             return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            //         },
            unreadMessages(){
                var filter = this.notifications.filter((item)=>{
                    return item.status === 2 && item.Id === self.userData.Id
                })
                return filter;
            },

        },
        // filters: {
        //             moment: function (date) {
        //                 return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        //             }
        //         },
        methods: {
            ...mapActions('feedback', ['retrieveNotification']),
             readAbleTime(data){
                    console.log(data.time)
                    var t = data.time
                    var x = new Date(t.toString());
                    console.log(x)
                return x
             },
            // updateNotification(data){
            //     return data
            // },
            play: function(event) {
                    return this.$refs.audioElm[1].play();
                    console.log('hi', hi)
                    },
            timeSent(data){
                var time = data.time;
                return this.$moment(parseInt(time)).fromNow()

            },

            toggleNotificationBox() {
                let details = {
                    Id : this.userData.Id,
                     }
                this.$socket.emit('changed', {
                        Id: this.userData.Id
                    })
                if (!this.openNotifications) {
                    this.openNotifications = true;
                    // this.retrieveNotification(details)
                    return true;
                }
                // this.openNotifications = false;
                // return false;
            },
            notification(){
                let details = {
                    Id : this.userData.Id,
                }
                this.retrieveNotification(details)
                // .then((res)=>{
                //     debugger;
                //     if(res.status = true){

                //     }
                // })
            },

        }
    }
</script>

<style scoped>
.triangle {
    left: 221px;

}
.notification {
  border: 1px solid #e5e7f7;
  border-radius: 5px;
  height: 60px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  transition: all .4s ease;
  text-align: center;
  width: 60px;
  background-color: transparent
}
.notification .ion-ios-bell-outline {
  /*padding: 3px;*/
  /*line-height: 32px;*/
  font-size: 25px;
}
.scrollbar{
    height: 300px;
    overflow: scroll;
    overflow-x: hidden;

}
.hov:hover{
    background-color: aliceblue;
    font-size: large;
}
.number-click{
    position: absolute;
    left: 2px;
    bottom: 2px;
    color: #fff;
}
</style>
