<template>
  <div class="container">
      <div class="row">
        <div class="col-md-12">


        </div>
      </div>

    <div class="row" data-hint="This is mz">
      <div class="col-md-12 ph-0 mb-md">
        <div class="i-box">
          <div class="row" >
            <!-- Percentage Progress -->
            <div class="col-md-4 b-r" data-intro="Overall progress of the project">
              <!-- <h3>Progress
                <i class="ion-arrow-up-a text-green"></i>
              </h3> -->
                 <el-tooltip class="item" effect="dark"  content="Overall progress of the project" placement="top">
              <h3>Progress

                <i class="ion-arrow-down-a text-red"></i>
              </h3>
</el-tooltip>
              <div class="row hack-1">
                <div class="col-md-4 ph-0" >
                  <div class="progress-precentage-1" :style="{'background-image': 'linear-gradient(180deg, #326ada '+progress+'%, #ffff 0%)'}"  >
                    <span> {{ progress }}% </span>
                  </div>
                </div>
                <div  class="col-md-8">
                  <h4>Progress</h4>
                  <h5>{{ progress }}% done</h5>
                  <br/>
                  <h4>Last activity</h4>
                  <h5>{{convert_to_date(project.last_action)}}</h5>
                </div>
              </div>
            </div>

            <!-- Modules Progress Overview -->
            <div class="col-md-4 b-r" data-intro="Overall progress of the Module">
               <el-tooltip class="item" effect="dark" content="Overall progress of the modules" placement="top">
              <h3>Modules
                <i class="ion-arrow-up-a text-green"></i>
              </h3>
            </el-tooltip>
              <div class="row hack-1">
                <div class="col-md-4 ph-0">
                  <div :style="{'background-image': 'linear-gradient(180deg, #7ed322 '+(in_progress_percentage || 0)+'%, #ffff 0%)'}"  class="progress-precentage-1">

                    <span>{{in_progress_percentage}}%</span>

                  </div>
                </div>
                <!-- <div class="col-md-8">
        <div class="progress-bars-holder">
          <div class="progress">
            <div class="progress-bar progress-bar-success active progress-bar-striped" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
              <span class="sr-only">70% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar progress-bar-danger active progress-bar-striped" role="progressbar" aria-valuenow="70" aria-valuemin="0" :aria-valuemax="modules.length" style="width:70%">
              <span class="sr-only">70% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" :aria-valuenow="modules.inprogress.length" aria-valuemin="0" :aria-valuemax="modules.inprogress.length" style="width:70%">
              <span class="sr-only">{{ modules.inprogress.length | percentage }} Complete</span>
            </div>
          </div>
        </div>
      </div> -->

                <div class="col-md-8 progress-stats-btn ph-0">
                  <ul style="margin-top: -14px;">
                    <li>
                      <button class="btn btn-md" >{{ project.done }} / {{ project.all_task }}</button>
                      <p>done</p>
                    </li>
                    <li>
                      <button class="btn btn-md" >{{ project.in_progress }} / {{ project.all_task }}</button>
                      <p>in progress</p>
                    </li>
                    <li>
                      <button class="btn btn-md">{{ project.submited }} / {{ project.all_task }}</button>
                      <p>submitted</p>
                    </li>

                  </ul>
                </div>
              </div>

            </div>
            <!-- Delivery Dates -->
            <div class="col-md-4" data-intro="Time Line Delivery Date">
              <h3>Delivery dates
                <i class="ion-arrow-up-a text-green"></i>
              </h3>
              <div class="row" style="margin-top: 25px">
                <div class="col-md-12">
                  <h4>Expected Delivery Date (EDD)</h4>
                  <h5>{{ date.expected || '-- -- --' }}</h5>

                  <h4 class="clickable" data-toggle="popover" data-trigger="hover">Actual Delivery Date (ADD)</h4>
                  <h5>{{ date.actual || '-- -- --' }}</h5>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div class="col-md-12 ph-0 mb-md">
        <div class="i-box hack-height">
          <Devanalysis :id="id"></Devanalysis>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Devanalysis from "@/app/components/projectsStructure/teams/Devanalysis";
import DevStats from "@/app/shared/cards/memberCard"
import ChooseMemberModal from "@/app/shared/modals/chooseMemberModal";
import ProjectTeam from "@/app/components/projectsStructure/teams/ProjectTeam";
// import Vues
// import VueSocketio from 'vue-socket.io';

export default {
  name: "project-overview",
  props: ['id'],
  components: {
    ChooseMemberModal,
    Devanalysis,
    ProjectTeam,
  },
  data() {
    return {
      date: {
        actual: "",
        expected: ""
      },
      // showAssignPM: false,
    };
  },
  created(){

  }
  ,
    mounted () {
        this.callWithToken({
          parameters: {
            projectId: this.id,
          },
          action: this.getProjectOverview,
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
    ]),
      progress(){
      if(this.project.progress){
          return this.project.progress.toFixed(2);
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
      }
  },
  methods: {
      convert_to_date(date){
            if(!date)
                return "--";
          return new Date(date).toGMTString();
      },
      ...mapActions('projects/overview', [
        'getProjectOverview',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ])
      //    ...mapActions('chat/socket', [
      //   'GetMessages',
      // ]),

  }
};
</script>

<style scoped>
.add-dev-from-village {
    border: none;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.10);
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
    color: #728eaa;
    padding: 8px 45px;
    margin-top: 12%;
}
/* .progress-precentage-1{
  background-image: linear-gradient(180deg, #326ada {{percentage}}%, #ffff 0%) !important;
} */
</style>
