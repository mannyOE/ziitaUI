<template>
	<div class="sidebar-dashboard">
		<div class="row">
			<div class="col-md-3" style="padding-top: 40px;">
				<div class="heading">Quick Statistics</div>
			</div>
			<div class="col-md-3 pull-right people stats-card">
				<div class="col-md-6" style="margin-top: +12px;">
					<span class="stats-title">Active Clients</span>
					<p class="stats-val">{{stats.completed}} Nos</p>
				</div>
				<div class="stats-icon fa-2x col-md-4 img-rounded text-center pull-right" >
					<i class="ion-connection-bars" style="margin-left: -2px;margin-top: +10px !important;"></i>
				</div>
			</div>
			
			<div class="col-md-3 pull-right people stats-card">
				<div class="col-md-6" style="margin-top: +12px;">
					<span class="stats-title">Your Staff</span>
					<p class="stats-val">{{stats.people}} Nos</p>
				</div>
				<div class=" stats-icon  fa-2x col-md-4 img-rounded text-center pull-right" >
					<i class="ion-person-stalker" style="margin-left: -5px;margin-top: +10px !important;"></i>
				</div>
			</div>
		</div>
		<div class="row">
			<div style="padding-right: 30px; margin-top: 30px;" CLASS="col-md-12">
				<span class="heading">CLIENTS</span>
				<el-tooltip class="pull-right" effect="dark" content="Add a new Client" placement="left">
				<a class="btn btn-lg btn-circle" data-intro="Add a New Client"
				data-tooltipClass="Add New Client" @click.stop="openNewProject">
						<i class="ion-plus"></i>
				</a>
			</el-tooltip>
			<p class="pull-right new-project" style="margin-top: 10px; margin-right: 15px;">NEW CLIENT</p>
			 </div>

		</div>
		<div class="row" style="margin-top: 10px;">

			<div class="col-md-4" style="margin-top: 10px" v-for="(project, index) in projects">
			<ProjectCard  @assign="openAssignPM"

			@overview="goOverview" @delete="removeProject" :index="index" :key="index" 
      :clienTeam="all_team" :project="project"/>
			</div>
		</div>
	      <NewProjectModal :show.sync="showNewProject" @close="closeNewProject"></NewProjectModal>
	  <ChooseMemberModal
	  :developer="{'status':false,'team':pTeam}"
	   :show.sync="showAssignPM" @close="closeAssignPM" :projectId="activeId"/>
     <Loading :show="loader"/>

	</div>
</template>

<script>
import NewProjectModal from './modals/newProject'
import ChooseMemberModal from "@/app/shared/modals/chooseMemberModal";
import ProjectCard from "@/app/shared/cards/projectCard";
import { mapGetters, mapActions } from "vuex";
import VueSocketio from 'vue-socket.io';

export default {
  name: 'Projects',
  props: ['id'],
  components: {
     ChooseMemberModal,
      NewProjectModal,
      ProjectCard
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
          pTeam:[]
      };
  },
  mounted () {
    this.loader = true;
    var self = this;
      this.callWithToken({
        parameters: {
          id: self.user.Id, // clients team id
        },
        action: self.getProjects,

      });
    this.callWithToken({
        parameters: {
            id: this.user.team_Id, // project id
        },
        action: this.getClientTeam,
    }).then(()=>{
      this.loader = false;
    });



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
	color: #8C8989;
	/*font-family: "Montserrat";*/
	font-size: 12px;
	font-weight: bold;
	line-height: 17px;
}
</style>
