<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-xs-6 header-nav">
          <ul>
            <!-- If the logged in user is a `client`, this link should be seen. -->
            <AuthenticatedField v-show="check_permission('manageProject')">
            <li :class="{'active': routeName === 'projects' || routeName == 'active'}">
              <router-link :to="{ name: 'projects'}">
                <i class="icons ion-ios-monitor-outline">
                  <use xlink:href="#dashboard"></use>
                </i>
                <p class="header-nav-p">Dashboard</p>
              </router-link>
            </li>
          </AuthenticatedField>

            <AuthenticatedField v-show="check_permission('manageTeam')">
             <li :class="{'active': routeName === 'clientteam'}">
              <router-link :to="{ name: 'clientteam'}">
                <i class="icon ion-ios-people-outline">
                  <use xlink:href="#team"></use>
                </i>
                <p class="header-nav-p">People</p>
              </router-link>
            </li>
            </AuthenticatedField>


            <AuthenticatedField v-show="check_permission('manageCategory')">
            <li :class="{'active': routeName === 'category'}">
              <router-link :to="{ name: 'category'}">
                <i class="icons ion-gear-a">
                  <use xlink:href="#dashboard"></use>
                </i>
                <p class="header-nav-p">Category</p>
              </router-link>
            </li>
            </AuthenticatedField>
                 <!-- <AuthenticatedField :client="true">
             <li @click.stop="openNewProject" >
              <router-link :to="{ name: 'project'}">
               <i class="ion-plus">
                  <use xlink:href="#teaxm"></use>
                </i>
                <p class="header-nav-p">Create Project</p>
              </router-link>
            </li>
            </AuthenticatedField> -->

            <AuthenticatedField v-show="check_permission('manageWallet')">
            <li :class="{'active': routeName === 'wallet'}">
              <router-link :to="{ name: 'wallet'}">
                <i class="icon ion-ios-albums-outline">
                  <use xlink:href="#wallet"></use>
                </i>
                <p class="header-nav-p">Wallet</p>
              </router-link>
            </li>
            </AuthenticatedField>


            <!-- <AuthenticatedField>
            <li :class="{'active': routeName === 'subscriptions'}">
              <router-link :to="{ name: 'subscriptions'}">
                <i class="icon ion-ios-albums-outline">
                  <use xlink:href="#subs"></use>
                </i>
                <p class="header-nav-p">Subscriptions</p>
              </router-link>
            </li>
            </AuthenticatedField> -->

             <!-- <li :class="{'active': routeName === 'subs'}">
              <router-link :to="{ name: 'subs'}">
                <i class="icon ion-ios-person">
                  <use xlink:href="#wallet"></use>

        <!--
             <li :class="{'active': routeName === 'profile'}">
              <router-link :to="{ name: 'profile'}">
                <i class="icon ion-ios-person"> -->
                  <!--<use xlink:href="#wallet"></use>

                </i>
                <p class="header-nav-p">Subscriptions</p>
              </router-link>
            </li> -->
          </ul>
        </div>

        <!-- <div class="col-xs-2"></div> -->
        <div class="col-xs-6 header-side" data-removeintro="true" :data-intro="'Click for Quick Navigation<br>Shows:<br>'+stats.people + ' Total Team Members<br>'+stats.active + ' Active Projects<br>'+stats.completed+' Completed Projects'" v-if="stats">
          <ul>
            <li class="active">
              <p>PEOPLE</p>
              <!-- <button class="btn btn-md" v-text="team.length"></button> -->
              <router-link :to="{ name: 'clientteam'}">
              <button class="btn btn-md">{{ stats.people }}</button>
            </router-link>
            </li>
            <li>
              <p>ACTIVE</p>
              <!-- <button class="btn btn-md" v-text="activeProjects.length"></button> -->
                <router-link :to="{ name: 'active',  params: { active: 1 }}">
                    <el-tooltip class="item" effect="dark" content="Active projects" placement="botttom">
              <button  class="btn btn-md">{{ stats.active }}</button>
            </el-tooltip>
            </router-link>
            </li>
            <li class="pr-0">
              <p>COMPLETED</p>
                <router-link :to="{ name: 'active',  params: { active: 0 }}">
                    <el-tooltip class="item" effect="dark" content="Completed projects" placement="botttom">
              <button  class="btn btn-md">{{ stats.completed }}</button>
            </el-tooltip>
            </router-link>
              <!-- <button class="btn btn-md" v-text="completedProjects.length"></button> -->
            </li>
          </ul>
        </div>

      </div>
          <!-- <AuthenticatedField>
            <NewProjectModal :show.sync="showNewProject" @close="closeNewProject"></NewProjectModal>
          </AuthenticatedField> -->


    </div>
  </header>

</template>

<script>
import {
  mapGetters, mapActions
} from 'vuex';
import NewProjectModal from '@/app/components/projectsStructure/modals/newProject.vue'

// import {
//   checkUser
// } from '@/utils';
export default {
  name: 'base-navbar',
    components: {
       // ChooseMemberModal,
        NewProjectModal,

    },
  data(){

    return {
      showNewProject:false,
      showChat:true
    }

  },
  mounted () {
      this.callWithToken({
        parameters: {
          id: this.user.Id,
        },
        action: this.getTeamStats,
      });



  },
  // destroyed () {
  //   this.$_$destroyedHook()
  // },
  methods: {
      ...mapActions('team/stats', [
        'getTeamStats',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),

       openNewProject () {
          this.showNewProject = true

      },
        closeNewProject () {
          this.showNewProject = false
      },
      check_permission(rule){
        var state = false;
        this.permissions.forEach((perm)=>{
          if(perm.Permission === rule){
            state = true;
          }
        })
        return state;
      },

  },
   computed: {
    ...mapGetters('team/stats', [
      'stats',
      'loading',
      'error',
    ]),
    ...mapGetters('userCredentials', [
        'user',
        'permissions'
    ]),

     routeName() {
       return this.$route.name
     },

   }
}

</script>

<style scoped>
header.header .header-side ul li button {
    /* width: 50px; */
    /* height: 35px; */
    box-shadow: 0 2px 15px rgba(0,0,0,0.13) !important;
    color: #fff;
    border-radius: 50px !important;
    padding: 5px 10px !important;
}
header.header .header-side ul li p {
    display: block;
    margin-right: 9px;
    font-size: 11px;
    color: #728eaa;
    letter-spacing: 0;
    margin-top: 8px;
}
</style>
