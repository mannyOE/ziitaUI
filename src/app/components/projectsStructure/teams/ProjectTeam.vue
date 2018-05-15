<template>

    <div class="container">
      <!-- dsdsd -->
  <!-- sdsdasa -->
  <!-- {{loading}} -->
  <span class="member-count">Members({{computedTeam.length}})</span>
  <span class="bar"></span>
        <div class="col-md-6"></div>
  <!--   <AuthenticatedField :client="true" :pm="true">
        <div class="new-project-team">
            <i class="ion-android-add" ></i>
        </div>
    </AuthenticatedField> -->
        <div class="col-md-6">
            <!--<router-link :to="{ name: 'add:team:member' }" class="pull-right">
                <div class="btn btn-fab bg-pink plus-button">
                    <i class="ion-plus"></i>
                </div>&nbsp;&nbsp;&nbsp;
            </router-link>-->
        </div>

        <LoadingBar v-if="loading"/>

        <div class="col-md-12">
            <div v-for="(member, index) in computedTeam" :key="index" class="col-md-3 pr-0 " 
            @click.stop="openDevDetail" style="margin-bottom:33px">
              <!-- {{member}} -->
              <MemberCard :member="member" :projectId="id" :project="true" @reloadStore="reloadstore"/>

            </div>
                 <!-- <NoMember> -->
                   <AuthenticatedField>
          <div class="col-md-3">
               <div class="rectangle" @click.stop="openDevDetail">
            <div class="rectangle-inner" align="center">
            <div class="person-img">
            <img class="person-img oval img img-circle" :src="require('@/assets/img/user.svg')" >
           </div>
        <div class="people-card">
            <span class="dev-email" style="margin-top:21px;margin-bottom:35px">Add Member</span>

        </div>
        <span class="chat-bubble" @click.stop="openAddDev">
        <i class="ion-android-add"></i>
        </span>
     </div>
    </div>
          </div>
        </AuthenticatedField>
        <!-- </NoMember> -->
        </div>
        <div>
        </div>

        <ChooseMemberModal :show.sync="showAddDev"
            @close="closeAddDev"
            @reloadStore="reloadstore"
            :developer="{'status':isDeveloper,'team':computedTeam}"
            :members="computedTeam"
            :project="true"
            :projectId="id"

            />
            <Loading :show="loader"/>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import NoMember from "@/app/shared/NoMember";
import ChooseMemberModal from "@/app/shared/modals/chooseMemberModal";

export default {
    name: "projectTeamList",
    props: ['id'],
    components: {
        NoMember,
        ChooseMemberModal,
    },
    data() {
        return {
            showAddDev: false,
            teamMember: {
                user: {}
            },
            members:'',
            isDeveloper:false,
            loader: false,
            currrentProject: null,

        }
    },
    mounted () {
      var self = this;
      this.loader = true;
        this.callWithToken({
        parameters: {
          id: self.user.Id, // clients team id
        },
        action: self.getProjects,

      }).then(()=>{
        this.loader = false;
      });
        this.callWithToken({
          parameters: {
            id: this.user.team_Id, // project id
          },
          action: this.getClientTeam,
        });
       self.isDeveloper = this.user.type==2?true:false
        // alert(this.members)
    },
    destroyed () {
      this.$_$destroyedHook()
    },
    computed: {
        computedTeam(){
            var team = [];
               var member = [];
               this.projects.forEach((project)=>{
                 if(project.Id === this.$route.params.id){
                   team = project.team;
                   var all_team = this.all_team;
                    team.forEach(function(id){
                        all_team.forEach(function(user){
                            if(id == user.Id){
                                member.push(user);
                            }
                        });
                    });
                 }
               })
              //  var team = this.currrentProject[0].team;                           
            return member;
        },
        showBlocked(){
          if (this.error) {
            return true;
          }
        },
      // mix the getters into computed with object spread operator
      ...mapGetters('team/getProjects', [
      'projects',
      'loading',
      'error',
    ]),
    ...mapGetters('team',
            {all_team:'team'}
        ),
    ...mapGetters('userCredentials', [
            'user',
        ]),
    },
    created(){
        // alert(this.team);
    },
    methods: {
      ...mapActions('team/getProjects', [
      'getProjects',
      'resetState'
    ]),
      ...mapActions('team', [
        'getClientTeam'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
        closeAddDev () {
            this.showAddDev = false
        },
        openAddDev () {
            this.showAddDev = true
        },

      reloadstore (type, id) {
          let args = {
            id: this.id,
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getTeam,
              reloadArgs: args
          })
      },
    }
}
</script>

<style scoped>
   .member-card{
        position: relative;
    }
    .member-card img{
        top: -45px !important;
        /*position: absolute;*/
        /*margin-top: -45px;*/
    }
    .oval {
    height: 60px;
    width: 60px;
}
.dev-name{
    height: 22px;
    width: 100%;
    color: #413E3E;
    font-family: "Halis GR" !important;
    font-size: 17px;
    font-weight: bold;
    line-height: 22px;
    text-align: center;
    display: block;
    margin-top:19px;
    overflow: hidden;
}
.dev-email{
    height: 20px;
    width: 100%;
    color: #8C8989;
    font-family: "Halis GR" !important;
    font-size: 15px;
    line-height: 20px;
 overflow: hidden;
    display: block;
}
.rectangle-inner{
    height: 212px;
    width: 100%;
}
.shape {
    /*height: 13.39px;*/
    /*width: 16.36px;*/
    margin: 5px;
}
 .chat-bubble{
       background: #FF5C72;
    border-radius: 50%;
    padding: 11px 17px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);
}
.dev-position {
    height: 20px;
    width: 100px;
    color: #453F3F;
    font-family: "Halis GR";
    font-size: 15px;
    line-height: 20px;
    margin-top: 17px;
    margin-bottom: 23.5px;
    display: block;
}
    .rectangle{
    /*height: 200px;*/
    /*width: 288px;*/
    padding-top:30px;
    padding-bottom: 30px;
    /*padding-left: 58px;*/
    /*padding-right: 58px; */
    border-radius: 8px;
    background-color: #FFFFFF;
    box-shadow: 0 14px 13px -14px rgba(111,150,254,0.1);

}
.rectangle:hover{
        /*box-shadow: 1px 1px 8px rgba(111,150,254,0.1);*/
        box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
}
.member-count{
 height: 17px;
 width: 100%;
 color: #8C8989;
 font-family: "Halis GR" !important;
 font-size: 13px;
 font-weight: bold;
 line-height: 17px;
 text-align: left !important;
 display: block;
 margin-left: 55px !important;
margin-top: 39px !important;


}
.bar {
  height: 8px;
  width: 40px;
  border-radius: 4.5px;
  background-color: #FFD173;
  display: block;
   margin-left: 55px !important;
   margin-top: 11px !important;
   margin-bottom: 29px !important;
}
.plus {
  height: 45px;
  width: 45px;
  background-color: #FF5C72;
  box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);
}
.plus-button {
    width: 35px;
    height: 35px;
    border-radius: 100% !important;
    padding: 7px 0px 0 1px;
}
.new-project-team {
  position: fixed;
  bottom: 5%;
  right: 3%;
  box-shadow: 0 2px 15px rgba(0,0,0,0.15);

}

.new-project-team i {
    background: #3369da;
    border-radius: 50%;
    padding: 11px 17px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
}
</style>
