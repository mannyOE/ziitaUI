<template>
  <span>
    <Spinners :show="loader"></Spinners>
      <section class="content-body" v-if="check_permission('manageProject')">
          <div class="container">
              <div class="col-md-6 main-title">
                  <h3 class="projects-overview-title">All Project{{projects.length > 1?"s":""}} <span>({{ projects.length }})</span></h3>
                  <!-- {{projects}} -->
              </div>
              <div class="col-md-6 main-tool">
                  <div class="pull-right">
                      <!--<div class="together-btn">-->
                        <!--   <a @click.stop="enableActive" class="btn btn-md" :class="{ 'active-projectd': activeTab }">active
                          </a>
                          <a @click.stop="enableCompleted" class="btn btn-md" :class="{ 'active-projectd': completedTab }">completed
                          </a> -->
                      <!--</div>-->
<!-- {{pTeam}} -->
                      <!-- Trigger the modal with a button -->
                      <AuthenticatedField v-show="check_permission('manageProject')">
                          <el-tooltip class="item" effect="dark" content="Create a new project" placement="left">
                            <a class="btn btn-fab btn-lg bg-pink" data-intro="Create a New Project" data-tooltipClass="Create New Project" @click.stop="openNewProject">
                                <i class="ion-plus"></i>
                            </a>
                          </el-tooltip>
                      </AuthenticatedField>

                  </div>
              </div>
          </div>
<!-- sds -->
          <div class="container">
              <div class="row" align="center">

                  <LoadingBar v-if="loading"/>
                  <FetchError v-else-if="error">{{ error }}</FetchError>

                  <h3 v-else-if="countProject() === 0|| !projects.length && !loading"
                      class="text-center no-projects"
                      style="margin-top: 100px;" >
                      <i class="icon ion-ios-list-outline"></i>
                      <br/>No projects.<br><br>
                      <button v-show="check_permission('manageProject')" style="background-color: #3469da;border-color: #3469da;" class="btn btn-primary" data-intro="Create a New Project"  @click.stop="openNewProject">
                          Create Project
                      </button>
                  </h3>

                  <div v-else v-for="(project, index) in projects" :key="index"
                      v-show="filterProject(project)">

                      <div class="col-md-3">

                          <div class="projects" >
                              <router-link :to="{ name: 'project-overview', params: { id: project.Id } }">
                              <h3 >{{ project.project_name }}</h3>
                              <h5  id="proj-dis">
                                  {{ filterDesc(project.project_description) }}</h5>
                            </router-link>
                              <div  @click="goOverview(project.Id)" class="together-img">
                                  <!-- <router-link :to="{ name: 'project-overview', params: { id: project.Id } }"> -->
                                  <img :src="require('@/assets/img/1.jpeg')" alt="User Image">
                                  <img :src="require('@/assets/img/1.jpeg')" alt="User Image">
                                  <img :src="require('@/assets/img/1.jpeg')" alt="User Image">
                                <!-- </router-link> -->
                                  <!-- <p>
                                    {{ !project.team ? 0 : project.team.length }}
                                    -Team Member{{ project.team.length === 1 ? '' : 's' }}
                                      {{ !project.team ? 0 : project.team.length }}
                                     Team Member{{ project.team.length === 1 ? '' : 's' }}

                                  </p> -->
                                  <p>
                                      {{ !project.team ? 0 : project.team.length }}
                                      Team Member{{ project.team && project.team.length > 1 ? 's' : '' }}
                                  </p>
                                  <div class="tools">
                                  <router-link :to="{ name: 'project-overview', params: { id: project.Id } }">
                                      <el-tooltip class="item" effect="dark" content="View" placement="bottom">  <i class="ion-eye"></i>
                                      </el-tooltip>
                                    </router-link>
                                      <!--Delete button-->

                                      <i v-if="deleteLoading(project._id)"
                                          class="fa fa-spinner fa-spin"
                                          aria-hidden="true">
                                      </i>
                                      <AuthenticatedField v-show="check_permission('manageProject')">
                                          <el-tooltip class="item" effect="dark" content="Delete" placement="bottom">
                                      <i  @click.stop="removeProject(project.Id, index)"
                                          class="ion-ios-trash-outline">
                                      </i>
                                    </el-tooltip>
                                       <el-tooltip class="item" effect="dark" content="Add members to team" placement="bottom">
                                      <i @click.stop="openAssignPM(project.Id)"
                                          class="ion-fork-repo">
                                      </i>

                                     </el-tooltip>
                                      </AuthenticatedField>


                                  </div>
                              </div>
                          </div>
                            <!-- </router-link> -->
                      </div>
                  </div>


              </div>
          </div>
      </section>
      <section v-else>
        <h3
            class="text-center no-projects"
            style="margin-top: 100px;" >
            <i class="icon ion-ios-list-outline"></i>
            <br/>You do not have the permission to view this content.<br><br>

        </h3>
      </section>

  <AuthenticatedField :client="true">
      <NewProjectModal :show.sync="showNewProject" @close="closeNewProject"></NewProjectModal>
  </AuthenticatedField>
  <ChooseMemberModal
  :developer="{'status':false,'team':pTeam}"
   :show.sync="showAssignPM" @close="closeAssignPM" :projectId="activeId"/>

      </span>
</template>

<script>
import NewProjectModal from './modals/newProject'
import ChooseMemberModal from "@/app/shared/modals/chooseMemberModal";
import { mapGetters, mapActions } from "vuex";
import VueSocketio from 'vue-socket.io';

export default {
  name: 'Projects',
  props: ['id'],
  components: {
     ChooseMemberModal,
      NewProjectModal,
  },
  data() {
      return {
          loader: true,
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
    this.loading = true;
    var self = this;
      this.callWithToken({
        parameters: {
          id: self.user.Id, // clients team id
        },
        action: self.getProjects,

      }).then(res=>{
        self.loader = false;
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
        ...mapGetters('projects/getTeam', [
      'team',
      'loading',
      'error',
    ]),
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
    ...mapActions('projects/remove', {
      deleteProject: 'deleteProject',
      remResetState:  'resetState',
    }),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
        ...mapActions('projects/getTeam', [
      'getTeam',
      'resetState'
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
        this.showNewProject = true

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

<style scoped>
.no-projects i {
  font-size: 60px;
}

h3.projects-overview-title {
  margin-top: 10px;
}


.projects {
  background: #ffffff;
  border-radius: 5px;
  height: 250px;
  cursor: pointer;
  text-align: center;
  width: 250px;
  padding-top: 10px;
}

.projects h3{
  overflow: hidden; white-space: nowrap;
  text-overflow: ellipsis;
}
.modal-content {
  border-radius: 1px;
  border: none;
  padding: 22px;
  margin-top: 11%;
}
div#myModal button {
  box-shadow: 0 2px 15px rgba(0,0,0,0.32);
  border: none;
  border-radius: 50px;
  text-transform: uppercase;
  font-family: 'Open Sans';
}

div#myModal textarea {
  resize: none;
  margin-bottom: 4%;
}
div#myModal input {
  margin-bottom: 3%;
}
.modal-header {
  padding: 13px;
  border-bottom: 0px solid #e5e5e5;
}
.active-projectd {

  outline: 0;
  background: #3369da;
  color: #fff;
  /* -webkit-box-shadow: inset 0 3px 5px rgba(0,0,0,.125); */
  /* box-shadow: inset 0 3px 5px rgba(0,0,0,.125); */
}
</style>
