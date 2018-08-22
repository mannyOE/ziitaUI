<template>
	<div class="sidebar-dashboard">
		<div class="row" style="margin-right: 35px;">
			<div class="col-md-3" style="padding-top: 40px;">
				<div class="heading">Quick Statistics</div>
			</div>
			<div class="col-md-3 pull-right people stats-card">
				<div class="col-md-6" style="margin-top: +12px;">
					<span class="stats-title">Active Clients</span>
					<p class="stats-val">{{stats.clients}} Nos</p>
				</div>
				<div class="stats-icon fa-2x col-md-4 img-rounded text-center pull-right" @click="invite('2')">
					<i class="fa fa-plus" style="margin-left: -2px;margin-top: +5px !important;"></i>
				</div>
			</div>
			
			<div class="col-md-3 pull-right people stats-card">
				<div class="col-md-6" style="margin-top: +12px;">
					<span class="stats-title">Your Staff</span>
					<p class="stats-val">{{stats.staff}} Nos</p>
				</div>
				<div class=" stats-icon  fa-2x col-md-4 img-rounded text-center pull-right" @click="invite('3')">
					<i class="fa fa-plus" style="margin-left: -5px;margin-top: +5px !important;"></i>
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 20px;">
      <div class="col-lg-12 col-md-12 col-xs-12">


        <!-- tasks -->
       <div class="col-md-3 people task-card" style="margin-left: 40px;">
        <div class="col-md-12" style="margin-top: +12px;">
          <div class="header">Tasks Overview</div>
          <div class="col-md-12 clearfix" style="margin-left: 40px;">
                <div class="c100 blue" :class="'p40'">
                    <span>45%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>

          </div>
          <div class="row text-center">
            <label class="label label-success">Completed</label>
          </div>
          <div class="row">
            <button class="btn all-btn">Add Task</button>
          </div>

        </div>
      </div>

      <!-- mail box -->
        <div class="col-md-3 people task-card">
        <div class="col-md-12" style="margin-top: +12px;">
          <div class="header">Mailbox</div>
        </div>
      </div>



      <!-- upcoming evemts -->
        <div class="col-md-3 people task-card">
        <div class="col-md-12" style="margin-top: +12px;">
          <div class="header">Upcoming Deadlines</div>
        </div>

         <div class="row">
            <button class="btn all-btn">View All Tasks</button>
          </div>
      </div>



      </div>
		</div>

    <div class="row" style="margin-top: 20px;">
      <div class="col-lg-12 col-md-12 col-xs-12">


        <!-- tasks -->
       <div class="col-md-3 people chart-card" style="margin-left: 40px;">
        <div class="col-md-12" style="margin-top: +12px;">
          <div class="header">Earnings</div>
          <growthChart :chart-data.sync="fillData" :width="200" :height="35"/>
        </div>
      </div>

      </div>
    </div>
     <Loading :show="!loader"/>
     <inviteForm :show="showInvite" @close="showInvite = false" :inviteDetail="invites"/>

	</div>
</template>

<script>
import ChooseMemberModal from "@/app/shared/modals/chooseMemberModal";
import { mapGetters, mapActions } from "vuex";
import VueSocketio from 'vue-socket.io';
import { FullCalendar } from 'vue-full-calendar'
import growthChart from '@/app/shared/charts/growth.js';
import inviteForm from '@/app/shared/modals/sendInvite';


export default {
  name: 'Projects',
  props: ['id'],
  components: {
     ChooseMemberModal,
      FullCalendar,
      growthChart,
      inviteForm
  },
  data() {
      return {
          loader: false,
           showAssignPM: false,
          deleteInfo: {
              id: null,
              index: null,
          },
          activeId: null,
          activeTab: true,
          completedTab: false,
          showNewProject:false,
          pTeam:[],
          chartData: {
              labels: ['January', 'February', 'March', 'April','May','JJune','July','August','September'],
            },
          invites: {
            type: null,
            Email: null,
          },
          showInvite: false,
      };
  },
  mounted () {
    this.loader = true;
  },
  created(){
     // this.$socket.emit('init', {user_id: this.user.Id});
       // if(this.$route.params.active)
       //  alert(this.$route.params.active)
       //  switch(this.$route.params.active){
       //    case 0:
       //    this.enableCompleted();
       //  break;
       //  case 1:
       // this.enableCompleted();
       //  break;
       //  // default:
       //  }
  },
     watch:{
'$route' (to, from) {
    // react to route changes...
      switch(this.$route.params.active){
          case 0:
          this.enableCompleted();
        break;
        case 1:
       this.enableActive();
        break;
        // default:
        }
  }
},
  destroyed () {

  },
  computed: {
    // activeTab(){
    //   if(this.$route.params.id )
    // },
    // mix the getters into computed with object spread operator
    ...mapGetters('team/getProjects', [
      'projects',
      'loading',
      'error',
    ]),
      ...mapGetters('userCredentials', [
          'user',
          'permissions'
      ]),
      fillData () {
       var dc= {
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
       return dc;
     },
    ...mapGetters('projects/remove', {
      deleteLoading: 'loading',
    }),
    ...mapGetters('team/stats', [
      'stats',
      'loading',
      'error',
    ]),
     ...mapGetters('team',
                {all_team:'team'}
        ),
  },
  methods: {
    filterDesc(description){
       // var description = "his is to store information about different types of butterflies. It will have butterfly effects.";
          var max = 30;
      if(description.length > max){

       description=description.substring(0,max-4)+" ...";
      }
      return description;
    },

    invite(type){
     this.invites.type = type;
      this.showInvite = true;
    },

    ...mapActions('team/getProjects', [
      'getProjects',
      'resetState'
    ]),
    ...mapActions('team',[
             'getClientTeam'
        ]),

    ...mapActions('projects/remove', {
      deleteProject: 'deleteProject',
      remResetState:  'resetState',
    }),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
    check_permission(rule){
      var state = false;
      this.permissions.forEach((perm)=>{
        if(perm.Permission === rule){
          state = true;
        }
      })
      return state;
    },

    enableCompleted () {
      // alert("helloe")
        this.activeTab = false
        this.completedTab = true
    },
    day_click(date, jsEvent, view){
      console.log(this.$format_time(date)+'\n'+jsEvent.pageX+'\n'+view.name);
      
    },
    goOverview(id){
      
      this.$router.push("/user/project/"+id+"/overview")
    },
    enableActive () {
        this.activeTab = true
        this.completedTab = false
    },

    filterProject (project) {

        if (this.activeTab) {
            return project.status === this.$_$projectStatus.active.id
        } else if (this.completedTab) {
            return project.status === this.$_$projectStatus.completed.id
        }
    },

    countProject () {
        var count = 0;
        var self = this;
        if (self.activeTab) {
            self.projects.forEach(function(project){
              if(project.status === self.$_$projectStatus.active.id)
                count++;
          })
        } else if (self.completedTab) {
              self.projects.forEach(function(project){
              if(project.status === self.$_$projectStatus.completed.id)
                count++;
          })
        }

        return count;
    }
    ,
    openNewProject () {
        // this.showNewProject = true

    },
     openAssignPM (id) {
      this.pTeam = this.projects.find(p=>p.Id==id).team
      this.activeId = id
      this.showAssignPM = true
    },
    closeAssignPM(){
      this.showAssignPM = false
    },
    closeNewProject () {
        this.showNewProject = false
    },


    removeProject (id, index) {
      const functionArgs = {
          id: id, // project id
          index: index, // project index in array
        }
      const self = this;

      this.$confirm('Are you sure you want to delete this project?', 'Warning', {
        confirmButtonText: 'Yes, I\'m sure',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
      .then(() => {
          self.callWithToken({
          parameters: functionArgs,
          action: self.deleteProject,
          })
          .then(function (status) {
              if(status) {
                  self.reloadstore('deleteProject', id);
              } else {
              }
          });
      })
      .catch(() => {});
    },

    reloadstore (type, id) {
        const args = {
          id: this.user.Id, // clients team id
        }
        this.$_$cheekyReloadStore({
            vm: this,
            type: type,
            authenticate: this.callWithToken,
            loadId: id,
            reloadAction: this.getProjects,
            reloadArgs: args
        })
    },
      // openNewProject() {
      //     this.showNewProject = true
      // },
  },
};
</script>

<style type="text/css" scoped>
 @import '~fullcalendar/dist/fullcalendar.css';
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

.new-project {
	height: 20px;
	width: 167px;
	color: #D6DAE5;
	font-family: "Montserrat";
	font-size: 12px;
	font-weight: bold;
	letter-spacing: 5px;
	line-height: 35px;
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
  cursor: pointer;
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
	margin-right: 10px;
	text-align: left;
}

.task-card {
  height: 340px;
  width: 280px;
  margin-right: 20px;
}
.chart-card {
  height: 250px;
  width: 92%; 
  margin-bottom: 30px;
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
.all-btn {
  background: linear-gradient(230.58deg, #61A3EF 0%, #326ADA 100%);
  font-size: 12px;
  color: #fff;
  margin: 30px auto;
  position: relative;left: 90px;bottom: 0px;
  border: 2px solid #fff;
}
.header {
  text-transform: uppercase;
  color: #fff;
  /*font-family: "Montserrat";*/
  font-size: 12px;
  background: linear-gradient(230.58deg, #61A3EF 0%, #326ADA 100%);
  height: 35px;
  padding-top: 8px;
  line-height: 55px;
  text-align: center;
  font-weight: bold;
  line-height: 17px; 
  margin-bottom: 35px;
}
.heading {
	text-transform: uppercase;
	color: #8C8989;
	/*font-family: "Montserrat";*/
	font-size: 12px;
	font-weight: bold;
	line-height: 17px;
}
</style>
