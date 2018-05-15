<template>
  <div class="container">
      <div  style=" margin-left: 56px;" class="people projects-card col-md-4">
       <div class="group-10">
          <div class="col-md-6">
              <p class="pogress">PROGRESS</p>
              <p class="last-activity">Last Activity</p>
              <p class="last-date">{{convert_to_date(project.last_action)}}</p>
          </div>
          <!-- <div class="col-md-6" style="height:100%" align="bottom">
             <div  class="col-md-4 ph-0"><div  class="progress-precentage-1"
              :style="{'background-image': 'linear-gradient(180deg, #84e289 '+progress+'%, #ffff 0%)'}"
              ><span >{{progress}}%</span></div></div>
          </div> -->
          <div class="col-md-6 clearfix">
                <div class="c100 green" :class="'p'+progress">
                    <span>{{progress}}%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>

          </div>
       </div>
      </div>
      <div class="people projects-card col-md-4">
          <div class="group-10">
          <div class="col-md-6">
              <p class="pogress">MODULES</p>
              <p class="last-activity">{{stat.text}}</p>
              <p class="last-date">{{stat.val}} / {{project.all_task}}</p>
          </div>
          <!-- <div class="col-md-6" style="height:100%" align="bottom">
              <div class="col-md-6" style="height:100%" align="bottom">
             <div  class="col-md-4 ph-0"><div  class="progress-precentage-1"
              :style="{'background-image': 'linear-gradient(180deg, #84e289 '+stat.m_progress+'%, #ffff 0%)'}"
              ><span >{{stat.m_progress}}%</span></div></div>
          </div>
          </div> -->
          <div class="col-md-6 clearfix">
                <div class="c100 green" :class="'p'+stat.m_progress">
                    <span>{{stat.m_progress}}%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>

          </div>
          <!-- <div class="col-md-12"> -->
            <!-- <div class="rectangle-7"> -->
         <div class="btn-group" style="width:100%;margin-left:auto;margin-right:auto">
  <button type="button" class="btn btn-default rectangle-7" @click="setProgress()">IN PROGRESS</button>
  <button type="button" class="btn btn-default rectangle-7" @click="setDone()">DONE</button>
  <button type="button" class="btn btn-default rectangle-7" @click="setSubmitted">SUBMITTED</button>
</div>
            <!-- </div> -->
          <!-- </div> -->
       </div>
      </div>
      <div class="people projects-card col-md-4">
        <div class="group-10">
          <div class="col-md-12">
              <p class="pogress">DELIVERY DATE</p>
              <p class="last-activity">Expected</p>
              <p class="d-date">{{convert_to_date(project.last_action)}}</p>
              <span class="rectangle-4"></span>
              <p class="d-date">Actual Date</p>
              <!-- {{project.actual}} -->
              <p class="last-date">{{convert_to_date(project.actual_date)}}</p>
          </div>

       </div>
      </div>
         <div class="row">
          <div class="col-md-12">
            <p class="project">PROJECT TEAM</p>

          </div>
         </div>
      <div class="row">
        <!-- {{computedTeam}} -->
        <div class="col-md-12">
          <table class="table my-table borderless">
            <!--  -->
            <tbody>
                <tr class="my-table-head">
                <td>
                 <span style="margin-left:27px" class="basic-info">Basic Info</span>
                </td>

                <td>
               <span class="basic-info">Id</span>

                </td>
                <td>
                  <span class="basic-info">Role</span>

                </td>
                <td>
                   <span class="basic-info">Date Joined</span>
                </td>
              </tr>
              <tr @click="showDevModal(member)" class="my-table-row" valign="middle" 
              v-for="(member, vin) in computedTeam" :key="vin">
                <td>
                  <div class="ibro-row">
                    <div class="col-ibro-left">
                      <img height="45px" width="45px" class="person-img oval img img-circle" :src="imageLink(member)" >
                        <!-- <img height="45px" width="45px" class="person-img oval i > -->
                    </div>
                    <div class="col-ibro-right">
                      <span class="table-dev-name">{{ member.first_name }} {{ member.last_name }}</span>
                      <span class="table-text">{{member.Email}}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span class="table-text">{{member.Id}}</span>

                </td>
                <td>
                  <span class="table-text">{{ $_$getUserTypeName(member.type) }}</span>

                </td>
                <td> <span class="table-text">{{convert_to_date(member.created_time)}}</span></td>
              </tr>


            </tbody>
          </table>
        </div>
        <Loading :show="loader"/>
            <DeveloperModal
        :member="selectedMember"
        :statistics="activeStat"
        :project="project"
        :projectId="id"
        :show="show"
        @close="closeDevModal"/>

        <othersModal
    :member="selectedMember"
    :statistics="activeStat"
    :project="project"
    :projectId="id"
    :show="showOthers"
    @close="closeDevModal"/>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Devanalysis from "@/app/components/projectsStructure/teams/Devanalysis";
import DevStats from "@/app/shared/cards/memberCard"
import ChooseMemberModal from "@/app/shared/modals/chooseMemberModal";
// import ProjectTeam from "./team";
import DeveloperModal from "@/app/shared/modals/developerDetail";
import othersModal from "@/app/shared/modals/othersDetail";
// import { API } from '../../../../config';
// import Vues
// import VueSocketio from 'vue-socket.io';

export default {
  name: "project-overview",
  props: ['id'],
  components: {
    ChooseMemberModal,
    Devanalysis,
    DeveloperModal,
    othersModal
  },
  data() {
    return {
      date: {
        actual: "",
        expected: ""
      },
      stat:{
        val:"",
        text:"",
        m_progress:""
      },
        selectedMember:'',
        show:false,
        showOthers: false,
        loader: false,
        currrentProject: [],
        activeStat: {},
        // api: API
      // showAssignPM: false,
    };
  },
  created(){

  }
  ,
  watch:{
    project:function(val){
       this.stat.val=this.project.done;
        this.stat.text= "Completed";
        var percent= (this.project.done/this.project.all_task)*100;
        this.stat.m_progress = Math.floor(percent);
    }
  },
    mounted () {
      this.loader = true;
        var self = this;
      this.callWithToken({
        parameters: {
          id: self.user.Id, // clients team id
        },
        action: self.getProjects,

      }).then(()=>{
        this.loader = false;
        this.currrentProject = this.projects.filter(e=>e.Id === this.$route.params.id);
      });
        this.callWithToken({
          parameters: {
            projectId: this.$route.params.id,
          },
          action: this.getProjectOverview,
        });
          this.callWithToken({
          parameters: {
            id: this.user.team_Id, // project id
          },
          action: this.getClientTeam,
        });
        
    },
    destroyed () {
      this.$_$destroyedHook()
    },
  // mounted() {
  //   const expected = new Date(2017, 10, 1, 2, 30);
  //   const actual = new Date(2017, 10, 5, 1, 20);
  //   this.date.actual = actual;
  //   this.date.expected = expected;
  // },
  computed: {
    ...mapGetters('projects/overview', [
      'project',
      'loading',
      'error',
    ]),  ...mapGetters('userCredentials', [
            'user',
        ]),
      ...mapGetters('team/getProjects', [
      'projects',
      'loading',
      'error',
    ]),
     ...mapGetters('team/getDeveloper', {
		tDev: 'developer',
		tLoad: 'loading',
		tError: 'error',
	  }),
      ...mapGetters('projects/getDeveloper', {
		pDev: 'developer',
		pLoad: 'loading',
		pError: 'error',
	  }),
    ...mapGetters('team',
            {all_team:'team'}
        ),
      progress(){
      if(this.project.progress){
          return this.project.progress.toFixed(0);

      }
      return 0;
    },
    percentage(){
      var percent= (this.project.done/this.project.all_task)*100;
    // var num=12.4444;
      return  percent;
    },
      in_progress_percentage(){
          var x = ((this.project.in_progress + this.project.submited + this.project.done)/this.project.all_task) * 100;

          return !x?0:Math.floor(x);
      },
             computedTeam(){
               var team = [];
               var member = [];
               this.currrentProject.forEach((project)=>{
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
  },
  methods: {
    setSubmitted(){
      this.stat.val=this.project.submited;
      this.stat.text = "Submitted";
       var percent= (this.project.submited/this.project.all_task)*100;
        this.stat.m_progress = Math.floor(percent);
    },
      setProgress(){
      this.stat.val=this.project.submited;
      this.stat.text = "Progress";
       var percent= (this.project.submited/this.project.all_task)*100;
        this.stat.m_progress = Math.floor(percent);
    },
       imageLink(member){
            if(!member.profile_thumbnail){
                return require('@/assets/img/user.svg');
            }
            return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;
        },
      setDone(){
      this.stat.val=this.project.done;
      this.stat.text = "Completed";
       var percent= (this.project.done/this.project.all_task)*100;
        this.stat.m_progress = Math.floor(percent);
    },
       closeDevModal(){
          this.show = false;
          this.showOthers = false;
          // this.loader = true;
          //       this.callWithToken({
          //     parameters: {
          //       id: this.id, // project id
          //     },
          //     action: this.getTeam,
          //   }).then(res=>{
          //     this.loader = false;
          //   });
        },

        getDevAnalysis(member) {
          let args = {
            id: member.Id,
            projectId: this.$route.params.id,
          }

          const self = this;

          if (member.type === '3') {
            this.callWithToken({
              parameters: args,
              action: this.getTDev,
            }).then(()=>{
              this.activeStat = this.tDev.statistics;              
              this.loader = false;
              this.show = true;

            });
          } else {
            this.callWithToken({
              parameters: args,
              action: this.getTDev,
            }).then(()=>{
              this.activeStat = this.tDev.statistics;
              this.loader = false;
                this.showOthers = true;              
            });
          }
          
        },
        showDevModal(member){
          this.loader = true;
          this.getDevAnalysis(member);          
          this.selectedMember = member;

        },
      convert_to_date(date){
            if(!date)
                return "--";
          return this.$moment(parseInt(date)).format('LL')
      },
      ...mapActions('projects/overview', [
        'getProjectOverview',
        'resetState'
      ]),
      ...mapActions('team/getProjects', [
      'getProjects',
      'resetState'
    ]),
    ...mapActions('team/getDeveloper', {
		getTDev: 'getDeveloper',
	  }),
      ...mapActions('projects/getDeveloper', {
		getPDev: 'getDeveloper',
	  }),

      ...mapActions('userCredentials', [
        'callWithToken',
      ])
        ,
        ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
      ...mapActions('team', [
        'getClientTeam'
      ]),
      //    ...mapActions('chat/socket', [
      //   'GetMessages',
      // ]),

  }
};
</script>

<style scoped>
.group-10 {
  height: 132px;
  width: 100%;
}
.pogress {
  height: 17px;
  width: 100%;
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 13px;
  font-weight: bold;
  line-height: 17px;
  margin-bottom: 30px;
  display: block;
}
.project {
  height: 17px;
  width: 100%;
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 13px;
  font-weight: bold;
  line-height: 17px;
  margin-bottom: 35px;
  margin-top: 63px;
  display: block;
   margin-left: 56px;
}
.last-activity {
  height: 18px;
  width: 100%;
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 11px;
  line-height: 18px;
  display: block;
}
.borderless td, .borderless th {
    border: none;
}
.my-table{
  width: 100%;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 18px 31px 1px rgba(50,106,218,0.08);
  margin-left: 56px;
 }
.people{
  background: #ffffff;
  border-radius: 5px;
  padding: 13px;
  padding-top: 15px;
  margin-top: 5px;
  transition: all .4s ease;
  margin-bottom: 10px;

}
.last-date {
  height: 58px;
 width: 100%;
  color: #413E3E;
  font-family: "Montserrat";
  font-size: 22px;
  font-weight: bold;
  line-height: 29px;
  word-break: break-all;
}
.d-date {
  height: 20px;
  width: 100%;
  color: #413E3E;
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: bold;
  line-height: 20px;
}
.rectangle-7 {
  height: 40px;
  font-size: 8px;
    font-weight: bold;
    width: 33% !important;


}
.people:hover {
  background: #ffffff;
  /* transform: rotate(90deg); */
  box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
  border-radius: 1px;
  /* margin-top: 27%; */

}
.progress-precentage-1 {
  padding-right: 0px !important;
  /* padding: 15px; */
  width: 100px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  height: 100px;
  margin-top: 20px;
  border-radius: 50%;
  background-image: linear-gradient(180deg, #326ada 5%, #ffff 0%);
  /*box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.10);*/
}

.progress-precentage-1 span {
  font-size: 18px;
  font-weight: bold;
  width: 87px;
  height: 87px;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 28px 45px;
  color: #728eaa;
  /* position: relative; */
  margin-top: -3%;
  border-radius: 70px;
  background: #fff;
  letter-spacing: 0;
  /* right: 16px; */
}
.basic-info {
  height: 20px;
  width: 932px;
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
}
.rectangle-4 {
  height: 8px;
  width: 40px;
  border-radius: 4.5px;
  background-color: #FFD173;
  margin-top: 15px;
  margin-bottom: 25px;
    display: block;
}
.my-table-row:hover{
  height: 70px !important;
  width: 100% !important;
  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
}
.my-table-row:hover .table-text{
 color: #fff;
}
.my-table-row:hover .table-dev-name{
 color: #fff;
}
.my-table-row{
 height: 70px !important;
  width: 100% !important;
  cursor: pointer;
 /* background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);*/
}
.my-table-head{
 height: 70px !important;
  width: 100% !important;
  cursor: pointer;
 /* background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);*/
}
.table-dev-name{
  height: 22px;
  width: 100%;
  color: #413E3E;
  font-family: "Montserrat";
  font-size: 17px;
  font-weight: 500;
  line-height: 22px;
  overflow: hidden;
  display: block;
}
.ibro-row{
  width: 100%;
  height:100%;
}
.team {
  margin-top: 35px;
}
.col-ibro-left{
  /*width: 50%;*/
  margin-right: 24px !important;
  margin-left: 27px;
  float: left;
}
.col-ibro-right{
  width: 50%;
  float: left;
}
thead{
  margin-right: 37px;
}
table{
  border:none;
  border-collapse:collapse;
}
.table > tbody > tr > td {
     vertical-align: middle;
}
.table-text{
  height: 20px;
  width: 100%;
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 15px;
  line-height: 20px;
  overflow: hidden;
}
.ph-0{padding-left:0!important}
.ph-0,.pr-0{padding-right:0!important}
.projects-card {
  height: 265px;
  width: 28%;
  margin-right: 35px;
  text-align: left;
  padding: 34px 22px 112px 22px;
 box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.13);
}
.c100 {
  bottom: 0px;
}
.row100.body:hover {
  background-attachment: fixed;
  background-color: green;
}
.clearfix:before,.clearfix:after {content: " "; display: table;}
.clearfix:after {clear: both;}
.clearfix {*zoom: 1;}

</style>
