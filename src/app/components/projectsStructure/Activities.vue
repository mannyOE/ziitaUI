<template>
    <div class="container" style="margin-left: 220px;">
      <div class="" style="">
        <div class="col-md-3 people stats-card">
  				<div class="col-md-7" style="margin-top: +12px;">
  					<span class="stats-title">Expected Delivery Date</span>
  					<p class="stats-val"> Nos</p>
  				</div>
  				<div class="stats-icon fa-2x col-md-4 img-rounded text-center pull-right" >
  					<i class="ion-android-calendar" style="margin-left: -2px; line-height: 50px;"></i>
  				</div>
  			</div>
        <div class="col-md-3 people stats-card">
  				<div class="col-md-7" style="margin-top: +12px;">
  					<span class="stats-title">Actual Delivery Date</span>
  					<p class="stats-val"> Nos</p>
  				</div>
  				<div class="stats-icon fa-2x col-md-4 img-rounded text-center pull-right" >
  					<i class="ion-android-time" style="margin-left: -2px; line-height: 50px;"></i>
  				</div>
  			</div>
        <div class="col-md-3 people stats-card">
  				<div class="col-md-7" style="margin-top: +12px;">
  					<span class="stats-title">Missed Dealines</span>
  					<p class="stats-val"> Nos</p>
  				</div>
  				<div class="stats-icon fa-2x col-md-4 img-rounded text-center pull-right" >
  					<i class="ion-android-stopwatch" style="margin-left: -2px; line-height: 50px;"></i>
  				</div>
  			</div>
      </div>

      <div class="row">
        <div class="col-xs-7 scro">
          <div class="" v-for="(el,dole) in timeline" :key="dole">
            <div class="" v-for="(item,index) in el" :key="index">
              <div class="time-line" v-for="(module,indie) in item.modules" :key="indie">
                <div class="date-side">
                  <!-- {{setDate(el[0].date)[2]}} -->
                  <p class="day">{{setDate(item.date)[2]}}</p>
                  <p class="month">{{setDate(item.date)[1]}}</p>
                  <p class="year">{{setDate(item.date)[3]}}</p>
                </div>
                <timeCard :module="module" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-5">
          <div class="rectangle-25">TIMELINE LOG</div>
          <div class="scro">
            <div v-for="(log, key) in timeLog" :key="key">
            <div class="text-center col-xs-3" >
              <div class="line"></div>
              <div class="dot"></div>
              <div class="line" v-if="key < timeLog.length-1"></div>
            </div>
            <div class="col-xs-8">
              <div class="people log-card pull-left">
                <span>{{log.time}}</span>
                <p><b>{{log.evt}}</b></p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>



    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex';
import timeCard from '@/app/shared/cards/timeCard';

export default {
    name: "activity",
    props: ['id'],
    components: {
      timeCard
    },
    data() {
        return {
            projectId: this.$route.params.id,
            timeLog: [{evt: 'Deadline Missed', time:'11:00'},
                {evt: 'Deadline Missed', time:'11:00'},
                {evt: 'Deadline Missed', time:'11:00'},
                {evt: 'Deadline Missed', time:'11:00'},
                {evt: 'Deadline Missed', time:'11:00'},
                 {evt: 'Deadline Missed', time:'11:00'},
                  {evt: 'Deadline Missed', time:'11:00'}
              ]
        };
    },
    mounted () {
        this.callWithToken({
          parameters: {
            id: this.id, // clients team id
          },
          action: this.getTimeline
        }).then(()=>{
          this.callWithToken({
            parameters: {
              id: this.$route.params.id, // project id
            },
            action: this.getTeam,
          })
        });
    },
    destroyed () {
      this.$_$destroyedHook()
    },
    methods: {
      ...mapActions('projects/getTimeline', [
        'getTimeline',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
      ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
      ...mapActions('team', [
        'getClientTeam'
      ]),
        isYesterday(date) {
            const dateToday = new Date();
            const activityDate = new Date(date);
            const yesterday = dateToday.getDate() - 1;
            return activityDate.getDate() === yesterday
        },
        isOld(date) {
            const dateToday = new Date();
            const activityDate = new Date(date);
            const yesterday = dateToday.getDate() - 1;
            return activityDate.getDate() > dateToday.getDate()
        },
        setDate(date){
          return date.split(' ');
        },

    },

    computed: {
      ...mapGetters('projects/getTimeline', [
        'timeline',
        'loading',
        'error',
      ]),

        todayActivities() {
            let activities = this.project.activities;
            const dateToday = new Date();
            activities = activities.filter((activity) => {
                const activityDate = new Date(activity.createdAt);
                if (activityDate.getDate() === dateToday.getDate()) {
                    return activity;
                }
            });
            return activities;
        },
        yesterdayActivities() {
            let activities = this.timeline;
            const dateToday = new Date();
            const yesterday = dateToday.getDate() - 1;
            activities = activities.filter((activity) => {
                const activityDate = new Date(activity.day);
                if (activityDate.getDate() === yesterday) {
                    return activity;
                }
            });
            return activities.task;
        },
    },
   created: function(){


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
.btn-rounded {
	border-radius: 6rem !important;
	padding: 5px 30px 5px 30px;
}
.dot {
  margin: auto;
  z-index: 5;
	height: 18px;
	width: 18px;
  border-radius: 100%;
	background: linear-gradient(180deg, #F5515F 0%, #9F041B 100%);
}
.line {
  margin: auto;
  height: 38px;
  z-index: 0;
	width: 2px;
	border: 1px solid #D8D8D8;
}
.line-2 {
	margin: auto;
	width: 2px;
  height: 68px;
  z-index: -2;
	border: 1px solid #D8D8D8;
}


.btn-circle {
	border-radius: 50%;
	background: #FF5C72;
	color: #fff;
	box-shadow: 0 11px 37px 0 rgba(0, 0, 0, 0.13);
}
.btn-circle:hover {
	background-color: #fff;
	color: #EF6375;
}
.img {
	border-radius: 100%;
	height: 40px;
	width: 40px;
}


.stats-icon {
	height: 50px;
	width: 50px;
	text-align: center;
	color: #fff;
	border: 2px solid rgba(50,106,218,0.47);
	border-radius: 8px;
	background: linear-gradient(230.58deg, #61A3EF 0%, #326ADA 100%);
	margin-top: 10px;
	margin-left: -20px;
	/*padding: 8px;*/
}
/*.stats-icon i{*/
	/*margin-top: -10px !important;*/
/*}*/
.stats-title {
	white-space: nowrap;
	color: #8C8989;
	font-family: "Montserrat";
	font-size: 12px;
	line-height: 18px;
}
.stats-val {
	height: 29px;
	color: #413E3E;
	font-family: "Montserrat";
	font-size: 16px;
	font-weight: bold;
	line-height: 29px;
}
.people:hover {
	background: #ffffff;
	/* transform: rotate(90deg); */
	box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
	border-radius: 1px;
	/* margin-top: 27%; */
}
.stats-card {
	height: 100px;
	width: 24%;
	text-align: left;
  margin-right: 30px;
}
.day {
  color: #9B9B9B;
  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
}
.month {
  color: #413E3E;
	font-size: 12px;
	font-weight: bold;
	line-height: 13px;
}
.year {
  color: #413E3E;
	font-size: 12px;
	font-weight: bold;
	line-height: 13px;
}
.log-card {
  height: 80px;
  width: 90%;
  padding: 20px;
}

.time-line {
  width: 100%;
  display: inline-block;
}
.more {
  color: #9B9B9B;
  padding-right: 25px;
  float: right;
  width: 10%;
}
.module {
  padding-left: 20px;
  float: left;
  width: 90%;
}
.more:hover {
  color: #326ada;
}
.date-side {
  width: 10%;
  height: 80px;
  margin-top: 5px;
  float: left;
  text-align: right;
  padding-top: 10px;
  padding-right: 30px;
}
.projects-card {
	height: 265px;
	width: 28%;
	margin-right: 50px;
	text-align: left;
}
.projects-card .tool-box {
	position: absolute;
	bottom: -30px;
	margin: 5px 30px 5px 20px;
	width: 80%;
	height: auto;
}
.heading {
	text-transform: uppercase;
	padding-bottom: 30px;
	height: 17px;
	width: 125px;
	color: #8C8989;
	/*font-family: "Montserrat";*/
	font-size: 12px;
	font-weight: bold;
	line-height: 17px;
}
.scro {
  margin-top: 60px;
  margin-bottom: 40px;
  height: 650px;
  overflow-y: auto;
}
.scro:hover::-webkit-scrollbar{
    width: 5px;
    transition: all 1s ease;
}
.scro::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.scro::-webkit-scrollbar-thumb {
    border-radius: 50px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
    background-color: #848484;
    transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.scro::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.1);

    transition: all 1s ease;
}
.rectangle-25 {
	height: 30px;
	width: 99px;
	border-radius: 3px;
	background-color: #326ADA;
  line-height: 15px;
  color: #ffffff;
  padding: 7px 10px;
  font-size: 11px;
  font-weight: bold; 
	box-shadow: 0 10px 30px 0 rgba(50,106,218,0.2);
  margin-top: 35px;
  margin-bottom: -50px;
}
</style>
