<!-- addmodulemodal -->

<template>
    <el-dialog :visible="show"
      width="80%" style="padding: 0px !important; "
      :show-close="false" class="my-module-modal"
      :before-close="beforeClose">
          <div slot="title">
            <button type="button" class="close" @click="beforeClose">&times;</button>
          </div>

            <div class="modal-body">

              <!-- {{permissions}}; -->

    <el-tabs v-model="activeTabName"
        tab-position="left"
        @tab-click="handleTabClick"
        style="height: 70%; padding-top: 0px !important;">
        <div class="row">
            <div class="col-xs-4 col-xs-offset-7" >
                <span class="pull-right" style="margin-left:5px"> EA Input Required</span>


                <label class="switch pull-right">

                    <input type="checkbox" :checked="module.ea==1" @change="passThroughEa()">

                    <span class="slider round"></span>

                </label>
            </div>
        </div>
      <el-tab-pane name="details"
        :disabled="disableDetails"
        label="Module Details">
        <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-10 col-md-offset-1 step-strange step-strangeTwo">
            <p class="steps-orange">STEP 1 0f 6</p>
             <div class="module-info-msg">
               <p>Setup Basic Information About This Module Here</p>
             </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
              <!--Tab content-->
              <ModuleDetails @next="handleDetails"/>
           </div>
         </div>

     </div>
      </el-tab-pane>
       <el-tab-pane name="testCases"
        :disabled="disableTestCases"
        label="Test Cases">
        <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-11 col-md-offset-1 step-strange step-strangeTwo">
            <p class="steps-orange">STEP 2 0f 6</p>
             <div class="module-info-msg">
               <p>Add Module Test Cases</p>
             </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
            <!-- sdsd -->
              <!--Tab content-->
              <ModuleTest :module="module" @next="handleTestCases" @back="goToDetails"/>
           </div>
         </div>

     </div>
      </el-tab-pane>

      <el-tab-pane name="methods"
        :disabled="disableMethods"

        label="Methods"  v-if="check_permission('manageEa')">
        <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-10 col-md-offset-1 step-strange">
            <p class="steps-orange">Step 3 0f 6</p>
               <div class="module-info-msg">
                   <p>Add Module Methods</p>
               </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
              <!--Tab content-->
              <ModuleMethods @next="handleMethods" @back="goToTestCases" @eaSave="eaSave"/>
           </div>
         </div>
        <!--Tab content-->

      </div>
      </el-tab-pane>

      <el-tab-pane name="dependencies"
        :disabled="disableDependencies"
        label="Dependencies">
        <!--Tab content-->
        <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-10 col-md-offset-1 step-strange step-strangeTwo">
            <p class="steps-orange">Step 3 0f 6</p>
             <div class="module-info-msg">
               <p>Select Dependencies And Blockers</p>
             </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
              <!--Tab content-->
               <ModuleDependencies :projectId="projectId" @next="handleDependencies" @back="backup"/>
           </div>
         </div>

     </div>

      </el-tab-pane>

      <el-tab-pane name="deadlines"
        :disabled="disableDeadlines"
        label="Deadlines">
        <!--Tab content-->
         <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-10 col-md-offset-1 step-strange step-strangeTwo">
            <p class="steps-orange">Step 4 0f 6</p>
             <div class="module-info-msg">
               <p>Setup Basic Information About This Module Here</p>
             </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
              <!--Tab content-->
                <ModuleDeadlines @next="handleDeadlines" @back="goToDependencies"/>
           </div>
         </div>

     </div>

      </el-tab-pane>
      <el-tab-pane name="fileshare"
        :disabled="disableFileShare"
        label="File Share">
        <!--Tab content-->
        <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-10 col-md-offset-1 step-strange step-strangeTwo">
            <p class="steps-orange">Step 5 0f 6</p>
             <div class="module-info-msg">
               <p>Setup Basic Information About This Module Here</p>
             </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
              <!--Tab content-->
                 <FileShare :category="module.category" :saving="loading" :selected="selected" :projectId="projectId" @next="handleFileShare" @back="goToDeadlines"/>
           </div>
         </div>

     </div>

      </el-tab-pane>
      <el-tab-pane name="filesystem"
        :disabled="disableFilesystem"
        label="File System">
        <!--Tab content-->
        <div class="modules-wrppwer-side">
         <div class="row">
           <div class="col-md-10 col-md-offset-1 step-strange step-strangeTwo">
            <p class="steps-orange">Step 6 0f 6</p>
             <div class="module-info-msg">
               <p>Setup Basic Information About This Module Here</p>
             </div>
           </div>
           <div class="col-md-11 col-md-offset-1">
              <!--Tab content-->
                 <ModuleFilesystem :category="module.category" :saving="loading" :selected="selected" :projectId="projectId" @next="handleFilesystem" @back="goToFileShare" />
           </div>
         </div>

     </div>

      </el-tab-pane>
    </el-tabs>

          </div>

        </div>
   </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ModuleDeadlines from './moduleDeadlines'
import ModuleDetails from './moduleDetails'
import ModuleMethods from './methods/moduleMethods'
import ModuleDependencies from './moduleDependencies'
import ModuleTest from './moduletest'
import ModuleFilesystem from './filesystem'
import FileShare from './AddFiles'

export default {
  name: "add-module",
  props: ["show", "projectId"],
  components: {
    ModuleDeadlines,
    ModuleDetails,
    ModuleMethods,
    ModuleDependencies,
    ModuleFilesystem,
    FileShare,
    ModuleTest
  },
    created: function(data){
//
    },
  data() {
    return {
        activeTabName: 'details',
        selected: []
     ,
      newMethod: {
        name: "",
        description: "",
        parameters: []
      },
      methodParams: {
        paramsIn: "",
        paramsOut: ""
      },
      disableDetails: false,
      disableMethods: true,
      disableDependencies: true,
      disableDeadlines: true,
      disableFilesystem: true,
      disableFileShare: true,
      disableTestCases:true,
      savingModule: false
    };
  },
  computed: {
      ...mapGetters('modules', {
          module: "module",
             }),
      ...mapGetters('modules/add', [
          'error',
          'fieldErrors',
          'loading',
          'errorMsg'
      ]),
         // ...mapGetters('userCredentials', ['user','permissions']),
      ...mapGetters('userCredentials', {
          userData: 'user',
          permissions: 'permissions'
      }),
      moduleTestCase(){
        return this.module.test || [];
      }

  },
  methods: {
    showErrors(){
      if(this.error){
        this.$show_notification(this.error)
      }

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
  ...mapActions(  'modules', {
          resetState: "resetState"      }),
      ...mapActions('modules/add', [
          'createModule',
          'resetState',
      ]),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
        ...mapActions('modules', [
        'getModules',
        'resetState'
    ]),
          passThroughEa(){
            this.module.ea = !this.module.ea;
            return
      if(this.module.ea==0){
        this.module.ea = 1;
      }
      else if(this.module.ea==1){
        this.module.ea = 0;
      }

    },
    beforeClose(done) {

      var self = this;
                   self.callWithToken({
            parameters: {
                id: self.userData.Id, // clients team id
                projectId: self.projectId, // project id
            },
            action: self.getModules,
        });
          this.disableDetails = false;
          this.activeTabName = 'details'
          this.selected = [];
          this.$emit("reloadStore");
          this.$_$closeModal();
          this.$emit("resetStore");
    },
    eaSave(){

    },
    handleTabClick(tab, event) {
        // if (tab.name === 'invites') {
        // this.fetchInvites();
        // } else if (tab.name === 'team') {
        // this.fetchTeam();
        // }
    },
    goToDetails (type) {
        /**
         * enable details tab and navigate to it
        */

        this.disableDetails = false;
        this.activeTabName = 'details'
        this.saveModule();
    },
    goToMethods (id) {
        /**
         * disable details,
         * enable methods tab and navigate to it
        */
        if(this.check_permission('manageEa')){
        this.disableDetails = true
        this.disableMethods = false
        this.activeTabName = 'methods'
      }
      else{
        this.goToTestCases();
      }
           this.saveModule();
    },
    goToDependencies (id) {
        /**
         * disable methods,
         * enable dependencies tab and navigate to it
        */
        this.disableMethods = true
        this.disableDependencies = false
        this.activeTabName = 'dependencies'
           this.saveModule();
    },
    goToTestCases(){
        this.disableDetails = true
        this.disableTestCases = false
        this.activeTabName = 'testCases'
           this.saveModule();
    },
    goToFileShare (id) {
        /**
         * disable methods,
         * enable dependencies tab and navigate to it
        */
        this.disableFileShare = false
        this.disableDeadlines = true
        this.activeTabName = 'fileshare'
           this.saveModule();
    },
    goToDeadlines (id) {
        /**
         * disable methods,
         * enable deadlines tab and navigate to it
        */
        this.disableDependencies = true
        this.disableDeadlines = false
        this.activeTabName = 'deadlines'
           this.saveModule();
    },
    goToFilesystem (id) {
        /**
         * disable methods,
         * enable deadlines tab and navigate to it
        */
        this.disableFileShare = true
        this.disableFilesystem = false
        this.activeTabName = 'filesystem'
           this.saveModule();
    },
    handleDetails (details) {
        /**
         * Store module name and description
         * enable next tab(methods) and navigate
        */
//        this.module.name = details.name
//        this.module.description = details.description
//
        this.goToTestCases()
           this.saveModule();
    },
    handleMethods (methods) {
        /**
         * Save methods and got to dependencies
        */
//        this.module.methods = methods;
// alert();
           this.saveModule();
        this.goToDependencies()
    },
    handleDependencies (deps) {
        /**
         * Save dependencies and got to deadlines
        */

//        this.module.dependencies = deps;

        this.goToDeadlines();
           this.saveModule();
    },

    handleDeadlines () {
        /**
         * Save deadlines and add module
        */

//        this.module.category
        //
        this.selected = this.module.files;

        this.goToFileShare()
           this.saveModule();


    },
    handleFileShare(sharedFiles){
      if(sharedFiles.length > 0){
        this.module.access_files = sharedFiles;
      }
      this.goToFilesystem();
           this.saveModule();
    },
    handleFilesystem(data){

      this.module.files = data;
      this.addModule()
         // this.saveModule();
    },
    handleTestCases(data){
      // this.module.test = data

      if(this.check_permission('manageEa')){
          this.goToMethods();
      }else{
        this.goToDependencies();
      }

    },
    backup(){
      if(this.check_permission('manageEa')){
          this.goToMethods();
      }else{
        this.goToTestCases();
      }
    },
    redo_selected(selected){

    },

    saveModule(){
        if(this.savingModule)
            return false;

           this.savingModule = true;
           this.module.project_Id = this.projectId;
           // if(finished){
           //  this.module.finished = true;
           // }
           var self = this;

        this.callWithToken({
          parameters: this.module,
          action: this.createModule,
        })
        .then(status => {
          self.savingModule = false;
           self.$show_notification("Saved!",'success',1000)
          if (status.state) {
            self.module.Id = status.Id;
          }
        })
    },


    addModule() {
            this.module.project_Id = this.projectId;
            this.module.finished = true;
				var self = this;
        this.saving=true;
				this.callWithToken({
					parameters: this.module,
					action: this.createModule,
				})
				.then(status => {

					if (status.state) {
            // this.error;

            if(self.module.Id)
             self.$show_notification("Module updated successfully")
           else
                   self.$show_notification("Module saved successfully")

            //



                           // showErrors()

					}
          else{
            self.$show_notification(self.errorMsg, "error")
          }
          self.beforeClose();
          self.saving=false;
				})
    },

    reloadstore(type, id) {
      this.$emit('reloadstore', type, id)
    },
  },
//   computed: {
//     ...mapGetters("projects/byid", ["project"]),
//     developers() {
//           console.log("developers");
//       return this.project.team.developers;
//     },
//     ...mapGetters("clients/team", ["team"]),
//     ...mapGetters("projects", ["modules"])
//   }
};
</script>

<style>
    .my-module-modal .el-dialog{
        height: 600px !important;
        margin-top: 20px !important;;
        overflow-y: hidden;
        margin-bottom: 30px;
        /*height: 400px;;*/
    }
    .el-tabs--left .el-tabs__active-bar, .el-tabs--left .el-tabs__nav-wrap::after {
        left: auto !important;
        right: auto !important;
    }

    .el-tabs--left .el-tabs__active-bar, .el-tabs--right .el-tabs__active-bar {
        width: 4px !important;

    }

    /*.el-tabs--left .el-tabs__item {
      text-align: left !important;
    }*/

    .el-tabs__active-bar, .el-tabs--right{
        /*background-color: linear-gradient(225.5deg, #326ada 0%, #84E289 100%) !important;*/
        background-color : #326ada;
    }

    .el-tabs__nav-wrap::after {
        background-color: #ffffff !important;
    }
    .el-tabs__content {
        /*box-shadow: 0 50px 80px rgba(0, 0, 0, 0.10) !important;*/
        padding-bottom: 2% !important;

    }
    .el-tabs--left .el-tabs__header {
        margin-top: 50px;
    }
    .el-tabs.el-tabs--card>.el-tabs__header .el-tabs__nav {
        width: 100%;
    }
    .el-tabs.el-tabs--card>.el-tabs__header .el-tabs__nav {
        width: 100%;
    }

    /*remove tabs height*/
    .el-tabs__item {
        height: auto;
    }
    /*remove tabs height*/
    .el-tabs__item {
        height: auto;
    }

    /*Make nav tabs 50%*/
    #tab-team.el-tabs__item {
        width: 50%;
    }
    #tab-invites.el-tabs__item {
        width: 50%;
    }

</style>


<style scoped>
    .sidey{
        height: 100% !important;
        box-shadow: 5px 0 20px 0 rgba(50,106,218,0.1);
    }
.module-info-msg {
    /*border-right: 1px solid #ddd;*/
    /*padding-right: 9px;*/
    line-height: 1.7em;
    /*margin-top: 24%;*/
    color: #9B9B9B;
    /*font-family: Montserrat;*/
    font-size: 14px;
    font-weight: 500;

}

.steps-orange{
    color: #326ADA;
    /*font-family: Montserrat;*/
    font-size: 14px;
    font-weight: bold;

    /* position: absolute; */
    /* margin-top: 15%; */
    z-index: 1000 !important;
}
.module-info-msg p {
    font-size: 12px;
    font-weight: 900;
}
.step-strange{
    padding-left: 33px !important;
    /*margin-bottom: -25px !important;*/
}
/*.col-md-2.step-strange {*/
    /*margin-left: 2%;*/
    /*margin-right: -1%;*/
    /*!* padding-right: 0px; *!*/
    /*!* border-right: 1px solid #ddd; *!*/
/*}*/
.developer-in-list .profile-picture img {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  border: solid 1px #326ada;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2) !important;
}
#myModald .modal-dialog {
    width: 880px !important;
}

input#test-input {
  width: 100%;
  float: left;
  margin-right: 5px;
}


.nav-wrap {
  background: #326ada;
  padding: 11px 0px;
  border-radius: 8px;
  margin-bottom: 3%;
}


.btn.btn-md.bg-pink.btn-input-params {
    border-radius: 50%;
}
.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.float-right {
  float: right;
}

.person {
  display: inline-block;
  font-weight: 600;
}


.col-blue {
  color: #728eaa;
}

.personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.well.filter button {
  color: #728eaa;
  font-weight: 500;
}

/*.allItems{
    display: none;
}*/

.well.filter input {
  margin-bottom: 7%;
}

.filter {
  background: #326ada;
  margin-top: 13%;
  color: white;
  border-radius: 1px;
  font-weight: 300 !important;
  z-index: 1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.client-personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.personal-password {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.deactivate-acc {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.form-control:focus {
  border-color: #326ada;
  border: 2px solid #326ada;
  outline: 0;
  box-shadow: none !important;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 2px solid #dee9f2;
  border-radius: 4px;
  /* -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
  /* box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.personal-details button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.client-personal-details button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.personal-password button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}
.tab-pane ul.nav {
  margin-top: 1% !important;
}
.tab-content {
    margin-top: 9%;
}

td.text-center.option i {
  margin-left: 11px;
}

.output-table {
  margin-top: 14%;
}

.filled {
  color: #6a86a5;
}
.el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 12px !important;
    font-weight: 900 !important;
    color: #2d2f33;
    position: relative;
}
.el-dialog__body {
    padding: 0px !important;
    color: #5a5e66;
    line-height: 24px;
    font-size: 14px;
}
/*.module-info-msg:after {*/
    /*content: "\f3d3";*/
    /*font-family: "Ionicons" !important;*/
    /*background: white;*/
    /*position: absolute;*/
    /*right: 4%;*/
    /*top: 56%;*/
    /*font-size: 26px;*/
    /*font-weight: 100 !important;*/
    /*color: #ddd;*/
/*}*/
.modal-body {
    /*position: relative;*/
    /*padding: 10px 4px;*/
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 10px;
  line-height: 1.42857143;
  vertical-align: to;
  border-top: 1px solid #eaeaea;
}



.float-left {
  border: 2px solid #3484f5;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}

.float-left-second {
  border: 2px solid #39cc39;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}



.txt-small {
  font-size: 13px;
  margin-left: 3px;
  font-weight: 100;
}



.f-s-12 {
  font-size: 12px;
}


.icon-change {
  /*animation: turndeg;
    animation-duration: 2px;*/
  transform: rotate(90deg);
  transition: all 0.3s ease;
}

/*@keyframes turndeg{
    from{transform: rotate(90deg)};
    to{transform: rotate(180deg)};
}*/

.switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 26px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 4px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4ae650;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 50px;
}

.slider.round:before {
  border-radius: 50%;
}

.available button {
  background: #3eca44;
  padding: 8px 28px;
  font-size: 11px;
  color: white;
}


.btn-danger {
  background: #ff0000;
}

.f-weight-3 {
  font-weight: 300;
}

.f-weight-6 {
  font-weight: 400;
}

.f-weight-7 {
  font-weight: 500;
}






.creat-modules {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.creat-modules input {
  margin-bottom: 12px;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2 !important;
}

.creat-modules textarea {
  max-width: 100%;
  margin-bottom: 3%;
  height: 115px;
  resize: none;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2 !important;
}

.modules {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.modules hr {
  background: #326ada;
  height: 2px;
  border-top: none;
  width: 50%;
}

.modules h3 {
  font-weight: 500;
  margin-top: -2%;
}

.modules p {
  font-size: 10px;
}

.nav-module > li > a {
  background: transparent;
  border-right: 1px solid #dee9f2;
  color: black;
  font-size: 12px;
  font-weight: 400;
}

.next-button button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.nav-module > li.active > a,
.nav-module > li.active > a:focus,
.nav-module > li.active > a:hover {
  border-right: 3px solid #326ada !important;
  font-weight: 500;
}

.modal-header {
  /*padding: 30px;*/
  border-bottom: 1px solid rgba(229, 229, 229, 0);
}

button.btn.btn-default.grp-btn {
  border-radius: 50%;
  margin-left: 10px;
  color: #326ada !important;
  border: 1px solid #326ada;
}

.output-depend {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.f-size-12 {
  font-size: 12px;
}

.hr {
  background: #326ada;
  height: 2px;
  margin-top: 0.6%;
  border-top: none;
  width: 7%;
}

.output-text-click {
  border-bottom: 1px solid #ccc;
  text-align: justify;
  margin-top: 0.321em;
  width: 100%;

  /* IE special */
  width: 100%;
  -ms-text-justify: distribute-all-lines;
  text-justify: distribute-all-lines;
}

.output-text-click:after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 0;
  font-size: 0;
  line-height: 0;
}

.output-text-click p {
  display: inline-block;
  margin-top: 0.321em;
  margin-bottom: 0% !important;
  padding-bottom: 0px !important;

  /* ie 7*/
  *display: inline;
  *zoom: 1;
  *text-align: left;
}

.text-nav {
  display: inline-block;
  vertical-align: baseline;

  /* ie 7*/
  *display: inline;
  *zoom: 1;
  *text-align: right;
}

.text-nav i {
  color: red;
}
.float-icon-add-module {
    position: fixed;
    bottom: 5%;
    left: 35%;
    font-size: 25px !important;
    cursor: pointer;
    /* height: 50px; */
    background: #326ada;
    font-weight: 900;
    padding: 5px 16px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.23);
    box-shadow: 0 2px 15px rgba(0,0,0,0.23);
    border-radius: 100%;
    color: white;
    z-index: 1000;
    /* width: 50px; */
}

button.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

button.accordion.active,
button.accordion:hover {
  background-color: #ccc;
}
.btn-fab {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.17);
    border-radius: 60px !important;
    position: fixed;
    bottom: 24%;
    right: 2%;
}
button.accordion:after {
  content: "\002B";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

button.accordion.active:after {
  content: "\2212";
}

.asing {
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0);
  border: 0px solid white;
  border-radius: 1px;
  color: black;
}

.asing i {
  font-size: 24px;
  font-weight: 900;
  border-radius: 50%;
  padding: 6px 12px;
  color: black;
  border: 2px solid #326ada;
}

.asing h4 {
  margin-top: 6%;
  font-weight: 300;
}

.asing p {
  font-size: 13px;
}

.asing button {
  border-radius: 1px;
  font-weight: 300;
  padding: 9px 45px;
}

.outsource-dev-modal {
  position: fixed;
  max-height: 500px;
  height: 500px;
  overflow-y: scroll;
  width: 70%;
  z-index: 1000 !important;
  background: white;
  display: none;
  border-radius: 1px;
  padding: 19px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
  top: 10%;
  left: 20%;
}

.outsource-dev-modal img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.outsource-dev-modal button {
  border-radius: 1px;
  font-weight: 300;
}

.outsource-dev-modal i {
  cursor: pointer;
}

.media i {
  border-radius: 50%;
  font-weight: 300;
  background: white;
  color: #326ada;
  font-size: 20px;
}

.f-size-13 {
  font-size: 13px;
  font-weight: 100;
}

.nav-module hr {
  background: #326ada;
  height: 2px;
  border-top: none;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 15px;
}

/* .nav-side-nav {
    /* position: fixed; */

/* left: 20px;
    height: 200px;
} */
</style>
