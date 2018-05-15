<template>

<el-dialog style="margin-top: -100px; paddig-bottom: -20px;" :visible="show" v-if="show"
      :show-close="false" width="45%"
      :before-close="beforeClose" class="person-crd" >

	<!-- {{devstats}} -->
        <div slot="title">
          <button type="button" class="close" @click.stop="beforeClose">&times;</button>
        </div>
    <!-- Modal content-->
		<BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
		<BannerError v-if="suspendError" :exempt="true">{{ suspendError }}</BannerError>

      <div>

		  <div class="row" >
			  <div class="col-xs-12" style="padding: 0px 40px;" >
				  <div class="row" >
					  <div class="col-xs-3" >
						  <img :src="imageLink(member)" class="img-pm" >
					  </div>
					  <div class="col-xs-5" >
						  <p class="text-left" ><b class="pm-name">{{ member.first_name }} {{ member.last_name }}</b><br>
							  <div class="pm-email" >{{member.Email}}</div>
							  <div class="quality" >{{ $_$getUserTypeName(member.type) }}</div>
						  </p>
					  </div>
					  <div class="col-xs-4" >
						  <div class="row" >
							  <div class="col-xs-10 col-xs-offset-2" >
								  <div class="offline" >
									  <div class="row" >
										  <div class="col-xs-8" >
											  <p class="online">{{ $_$getUserStatusName(member.status) }}</p>
										  </div>
										  <div class="col-xs-4" >
											  <div class="oval" ></div>
										  </div>
									  </div>
								  </div>
							  </div>
							  <div class="col-xs-10 col-xs-offset-2" style="margin-top: 17px;">
								  <div class="row" >

									  <div class="col-xs-4" >
										  <el-tooltip class="item" effect="light" content="remove developer" placement="bottom">
											  <div class="oval-1" @click="remove(member.Id)">
												  <i class="ion-close-round" ></i>
											  </div>
										  </el-tooltip>
									  </div>
									  <div class="col-xs-3" >
										  <el-tooltip class="item" effect="light" content="Message developer" placement="bottom">
											  <div class="oval-1">
												  <i class="ion-ios-email-outline"></i>
											  </div>
										  </el-tooltip>
									  </div>
								  </div>
							  </div>
						  </div>
					  </div>
				  </div>
			  </div>

			  <div class="col-xs-12" style="margin-top: 20px;">
				  <div class="row" >
					  <div class="col-xs-6" style=" padding: 0px;" @click="tabs(0)" >
						  <div class="part pull-right" :class="{'active': tab === 0}" >
							  <p>WORK SUMMARY</p>
						  </div>
					  </div>
					  <div class="col-xs-6" @click="tabs(1)" >
						  <div class="part" style="margin-left: -15px;" :class="{'active': tab === 1}" >
							  <p>HOURS SPENT</p>
						  </div>
					  </div>
				  </div>
			  </div>
<!-- {{pDev}} -->

			  <div class="col-xs-12 font-size-13" v-if="tab===0">
				  <div class="row" >
					  <div class="col-xs-12" style="border-bottom: 1px dashed #d6dae5; padding: 25px 60px 0px 60px;">
						  <div class="row" >
							  <div class="col-xs-4" >
								  <p class="text-center">
									  <i class="ion-ios-paper-outline" style="color: #e2ac2d; font-size: 30px; margin-bottom: 20px;" ></i><br>
								  <b class="no" >{{stat.modulesAssigned}}</b><br>
									  <small class="task" >TASKS ASSIGNED</small></p>
							  </div>
							  <div class="col-xs-4" >
								  <p class="text-center">
									  <i class="ion-android-checkbox-outline" style="color: #84E289; font-size: 30px; margin-bottom: 20px;" ></i><br>
								  <b class="no" >{{stat.modulesCompleted}}</b><br>
									  <small class="task" >TASKS COMPLETED</small></p>
							  </div>
							  <div class="col-xs-4" >
								  <p class="text-center">
									  <i class="ion-ios-timer-outline" style="color: #e25444; font-size: 30px; margin-bottom: 20px;" ></i><br>
								  <b class="no" >{{stat.deadlinesMissed}}</b><br>
									  <small class="task" >TASKS CREATED</small></p>
							  </div>
						  </div>
					  </div>
            <div class="col-xs-12" style="padding: 25px 60px 0px 60px;">
						  <div class="row" >
							  <div class="col-xs-4 col-xs-offset-2" >
								  <p class="text-center">
									  <i class="ion-ios-paper-outline" style="color: #e2ac2d; font-size: 30px; margin-bottom: 20px;" ></i><br>
								  <b class="no" >{{stat.modulesAssigned}}</b><br>
									  <small class="task" >MISSSED DEADLINES</small></p>
							  </div>
							  <div class="col-xs-4" >
								  <p class="text-center">
									  <i class="ion-android-checkbox-outline" style="color: #84E289; font-size: 30px; margin-bottom: 20px;" ></i><br>
								  <b class="no" >{{stat.modulesCompleted}}</b><br>
									  <small class="task" >TOTAL REJECTIONS</small></p>
							  </div>

						  </div>
					  </div>
				  </div>
			  </div>

			  <div class="col-xs-12" style=""  v-if="tab===1">
          <div style="height: 95px">

          </div>
				  <div class="row" style="padding: 50px 0px 30px 0px; margin-top: 15px;">
            <div class="col-xs-4 text-center">
              <!-- <b>{{stat.timeSpent.total.toFixed(0)}}</b> -->
              <p>HOURS SPENT</p>
            </div>
            <div class="col-xs-4 text-center">
              <p class="ion-android-alarm-clock fa-4x"></p>
            </div>
            <div class="col-xs-4 text-center">
              <b>{{stat.timeSpent.today.toFixed(0)}}</b>
              <p>HOURS SPENT TODAY</p>
            </div>
          </div>

			  </div>

		  </div>



      </div>
    </div>




</el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { API } from '../../../config';
import taskSummary from '@/app/components/projectsStructure/teams/taskSummary';
import growthChart from '@/app/shared/charts/growth.js';
import hoursChart from '@/app/shared/charts/hours.js';
export default {
  name: 'developer-detail',
  props: ['show', 'member', 'statistics', 'devAnalysis', 'project', 'projectId'],
  components: {taskSummary, growthChart,hoursChart},
  data(){
	  return {
		  api: API,
		  deleting: false,
      tab: 0,
      datacollection:{},
      chartData: {
              labels: ['January', 'February', 'March', 'April','May','JJune','July','August','September'],
            },

	  }
  },
 
  mounted () {

	  // this.getDevAnalysis()
  },
  computed: {
    fillData () {
     this.datacollection = {
       labels: this.chartData.labels,
       datasets: [
         {
           backgroundColor: [
              '#FFFFFF',
            ],
            borderColor: 'red',
           data: [2,5,87,22,109,86,99,102]
         },

       ]
     };
     return this.datacollection;
   },
   fillData2 () {
    this.datacollection = {
      labels: this.chartData.labels,
      datasets: [
        {
           borderColor: 'red',
          data: [20,15,87,76,46,70,12,120]
        },

      ]
    };
    return this.datacollection;
  },
      ...mapGetters('team/removeUser', [
          'error',
          'loading',
      ]),
      ...mapGetters('team/suspendUser', {
          suspendError: 'error',
		  suspendLoading: 'loading',
		  activating:'activating'
		}),
        ...mapGetters('userCredentials', ['user',]),
      
		isDeveloper () {
			return this.member.type === this.$_$userTypesObject.developer.id
		},
		devstats () {
			if (this.project) {
				return this.pDev
			}
			return this.tDev
		},
		stat(){
			// if(this.statistics){
				return this.statistics;
			// }
			// else{
			// 	console.log(this.statistics);
				
			// 	return this.stats;
			// }			
		}
  },
  methods: {
      tabs(g){
        this.tab = g;
      },
      getPercentage(speed){
      	 var color = "green"
      	if(speed>70){
      		color = "green"
      	}
      	else if(speed > 50){
      		color = "blue"
      	}
      	else if(speed <50){
      		color = "red"
      	}
      	return color;
      },
	  imageLink(member){
		  if(!member.profile_thumbnail){
			  return require('@/assets/img/1.jpeg');
		  }
		  return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
	  },
	  format_time(time){
		  if(!time)
		  return "--";
		  return this.$format_time(time);
	  },
      ...mapActions('team/removeUser', [
          'removeUser',
          'deleteUser',
          'resetState',
      ]),
  ...mapActions('team',[
		  'getClientTeam'
	  ]),
      ...mapActions('team/suspendUser', [
          'suspendUser','unsuspendUser'
			]),
      ...mapActions('team/suspendUser', {
          suspendReset: 'resetState',
			}),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      
	     ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
    beforeClose() {
    	this.$emit("close")
    },
    cleanse(num){
      if(num === '--'){
        return 0;
      }
      return Number(num);
    },
    reloadStore(type, id) {
	//   this.$emit('reloadStore', type, id);
	 const args = {
            Id: this.member.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.gtDev,
              reloadArgs: args
		  })

    },
	
	suspend(id) {
		let args = {
			id: id,
		}

		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.suspendUser,
		})
		.then(function (status) {
				if (status) {
					// Reload pending invites on success
						self.member.status=0;
					// self.reloadStore('suspendUser',id)
				} else {
				}
		});
	},
	unSuspend(id) {
		this.isActivating=true
		let args = {
			id: id,
		}
		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.unsuspendUser,
		})
		.then(function (status) {
				if (status) {
					self.member.status=2;
				} else {
				}
		});


	},
	getColor(val){
		if(val>=5 && val<=7)
			return '#326ada';
		if(val>7)
			return 'green';
		if(val<=4)
			return 'red'
	},

  remove(id) {
		this.$emit('delete', id);
	},
	delete_user(id) {


		this.deleting = true;
		let args = {
			developer_Id : id
		}
		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.deleteUser,
		})
		.then(function (status) {
				self.deleting = false;
				if (status) {
					self.$show_notification("Deleted Successfully");
					self.callWithToken({
						parameters: {
							id: self.user.team_Id, // project id
						},
						action: self.getClientTeam,
					});
					// Reload pending invites on success
					// self.reloadStore('removeUser')
					// self.$emit("reloadList");



				}else{
					self.$show_notification("Error Deleting", "error");
				}
		});
	},
  showSummary(){
    this.activeTab = 1;
  },
  showTimechart(){
    this.activeTab = 2;
  },
  closeMod(){
    this.$emit('close');
  }
  }
};
</script>


<style scoped>

	.d-b-c{
		font-family: Montserrat;
		font-size: 12px;
	}
	.b-c{
		height: 150px;
		margin-top: 20px;
		padding-right:80px;
		padding-left:80px;
		margin-bottom: 25px;
	}
	.b-c-inner{
		height: 120px;
		border-bottom: 1px solid rgba(157,157,163,0.25);
		padding-left: 15px;
		padding-right: 15px;
	}
	.b-c-bars{
		height: 110px;
		margin-bottom: 10px;
	}
	.bars{
		width: 7px;
		background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
		border: none;
		border-radius: 3px;
		position: absolute;
		bottom: 10px !important;
		margin-bottom: -110px !important;
	}
	.donut-pie{
		height: 100px;
		width: 100px;
		border-radius: 100%;
		border: 25px solid #f3f3f3;
		margin: auto;

	}
	.donut-pie-inner{
		height: 80px;
		width: 80px;
		border-radius: 100%;
		padding: 20px;
		border: 15px solid #f3f3f3;
		border-right: 18px solid #326ada;
		margin-top: -15px;
		margin-left: -15px;


	}
	.lining{
		border: 1px solid #D6DAE5;
		margin-top: 20px;
	}
	.select-time{
		height: 40px;
		width: 156px;
		border: 1px solid #D6DAE5;
		border-radius: 30px;
		background-color: rgba(255,255,255,0.47);
		font-family: Montserrat;
		font-size: 12px;
		font-weight: bold;
		line-height: 13px;
		margin-left: 80px;
		padding: 10px 15px;
	}
	.person-crd{
		border-radius: 3px;

		box-shadow: 0 22px 20px 8px rgba(111,150,254,0.1);
	}
	.offline{
		height: 44px;
		/*width: 130px;*/
		border-radius: 3px;
		padding: 15px 25px;
		background-color: #FF5C72;
		box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.13), 0 4px 9px 0 rgba(255,92,114,0.39);
	}

	.task{
		margin-bottom: 20px;
		color: #8C8989;
		font-family:Montserrat;
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
		text-align: center;
	}
	.no{
		margin-top: 20px;
		color: #453F3F;
		font-family: Montserrat;
		font-size: 24px;
		font-weight: 500;
		line-height: 31px;
		text-align: center;
	}
	.ico-img{
		height: 20px;
		/*margin-left: 77px;*/
		margin-bottom: 20px;
	}
	.person-c{
		box-shadow: 0 22px 20px 8px rgba(111,150,254,0.1);
		border-radius: 3px;
		padding: 35px;
	}
	.img-pm{
		height: 80px;
		width: 80px;
		border: 1px solid grey;
		border-radius : 100%;
	}
	.pm-name{
		height: 22px;
		width: 134px;
		color: #413E3E;
		font-family: Montserrat;
		font-size: 17px;
		font-weight: bold;
		line-height: 22px;
    text-transform: capitalize;
	}
	.pm-email{
		height: 20px;
		width: 212px;
		color: #8C8989;
		font-family: Montserrat;
		font-size: 15px;
		line-height: 20px;
		margin-top: -10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	.quality{

		width: 128px;
		color: #453F3F;
		font-family: Montserrat;
		font-size: 15px;
		line-height: 20px;
    margin-top: 10px;
	}
	.status{
		background-color: #84E289;
		border: 1px solid #84e289;
		border-radius: 3px;
		height: 44px;
		width: 130px;
		padding: 14px 27px;
		box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.1), 0 4px 9px 0 rgba(132,226,137,0.4);
	}
	.offline:hover{
		box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
		transform: scale(1.005);
		transition: .2s ease-in-out all;
		cursor: pointer;
	}
	.online {
		height: 16px;
		width: 47px;
		color: #FFFFFF;
		font-family: Montserrat;
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
	}
	.oval{
		box-sizing: border-box;
		border-radius: 100%;
		height: 11.89px;
		width: 11.89px;
		border: 3px solid #FFFFFF;
		box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);

	}
	.oval-1{
		border: 1px solid #D6DAE5;
		border-radius: 100%;
		height: 30px;
		width: 30px;
		padding: 3px;
		font-size: 18px;
		color: #7a7a7a;
		text-align: center;
		margin: auto;
	}
	.top-2{
		margin-top: 55px;
		border-top: 1px solid rgba(214,218,229,0.34);
		border-bottom: 1px solid rgba(214,218,229,0.34);
	}
	.part{
		color: #453F3F;
		font-family: Montserrat;
		font-size: 12px;
		font-weight: 500;
		line-height: 1px;
		text-align: center;
		height: 44px;
		width: 262px;
		border-radius: 3px;
		padding: 24px;
    cursor: pointer;
	}
	.part:hover, .active{
		background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
		box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
		color: #fff;
	}

	/*.top-3{*/
		/*margin-top: 60px;*/
		/*margin-bottom: 40px;*/
	/*}*/
	.clock{
		width: 47px;
		height: 50px;
	}
	.number{

		color: #453F3F;
		font-family: Montserrat;
		font-size: 28px;
		font-weight: bolder;
		/*line-height: 31px;*/
		text-align: center;
	}
	.hrs {

		color: #326ada;
		font-family: Montserrat;
		font-size: 14px;
		font-weight: bold;
		line-height: 16px;
		text-align: center;
	}
	.m-hrs{
		color: #8c8989;
		font-family: Montserrat;
		font-size: 12px;
	}
  .font-size-13 {
      font-size: 13px;

  }
</style>
