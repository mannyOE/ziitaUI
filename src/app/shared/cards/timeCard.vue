<template >
  <div class="people time-card">
    <div class="module">
      <img :src="developer(module.developerId)" class="img" alt="">
      <div class="module-dets">
        <p class="mod-name">{{module.module_name}}</p>
        <p>
          	<i class="ion-android-calendar ic"></i>
            <span class="assi">Assigned: </span>
            <span style="color: #9B9B9B;font-size: 10px;">{{date(module.start_time)}}</span>
            <i class="ion-android-stopwatch ic" style="margin-left: 20px;"></i>
            <span class="assi">Duration</span>
            <span style="color: #9B9B9B;font-size: 10px;">{{date(module.start_time)}}</span>
        </p>

      </div>
    </div>
    <!-- <div class="more pull-right dropdown text-center">
      <i class="ion-android-more-vertical dropdown-toggle fa-3x"
      data-toggle="dropdown"></i>
      <ul class="dropdown-menu">
        <li class="text-center"><a href="#">Assign</a></li>
        <li class="text-center"><a href="#">Edit</a></li>
        <li class="text-center"><a href="#">Delete</a></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {API} from "@/config";


  export default {
    components: {

    },
    props:['module'],
    data(){
      return {
        api: API,
        months: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
      }
    },
    mounted(){


    },
    methods: {
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
      ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
      developer(id){
         var dev = {};
         this.team.forEach((user)=>{
           if(user.Id===id){
             dev = user;
           }
         });
         // if(dev.profile_thumbnail){
         //   return this.api+dev.profile_thumbnail;
         // }else{
         // }
         return require('@/assets/img/1.jpeg');
       },
       date(date){
         var d = new Date(date);
         var date = d.getDate()+' '+this.months[d.getMonth()]+', '+d.getFullYear();
         return date;
       }

    },
    computed: {
      ...mapGetters('userCredentials', {
        userData: 'user',
    }),
    ...mapGetters('projects/getTeam', [
      'team',
      'loading',
      'error',
    ]),
    ...mapGetters('team',
          {all_team:'team'}
      ),
    },
  }
</script>


<style scoped>
.people{
  background: #ffffff;
  border-radius: 5px;
  padding: 13px;
  padding-top: 15px;
  margin-top: 5px;
  transition: all .4s ease;
  margin-bottom: 10px;
}
.img {
  border-radius: 100%;
  height: 40px;
  width: 40px;
  float: left;
}
.people:hover {
  background: #ffffff;
  /* transform: rotate(90deg); */
  box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
  border-radius: 1px;
  /* margin-top: 27%; */
}
.time-card {
  height: 80px;
  width: 90%;
  float: right;
  display: inline-block;
}
.more {
  color: #9B9B9B;
  padding-right: 25px;
  float: right;
  width: 10%;
}
.ic {
  color: #9B9B9B;
  font-size: 17px;
  line-height: 22px;
  margin-right: 10px;
}
.assi {
  font-weight: bolder;
  font-size: 14px;
  line-height: 22px;
}
.module {
  padding-left: 20px;
  float: left;
  width: 90%;
  display: inline-block;
}
.module-dets {
  margin-left: 65px;
}
.mod-name{
  font-weight: 1000;
  font-size: 14px;
  line-height: 19px;
}

.more:hover {
  color: #326ada;
}
</style>
