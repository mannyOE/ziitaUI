<!--modules-->

<template>
        <div class="container">
            <!-- <AuthenticatedField v-show="check_permission('manageModules')">
              <div class="new-project-team" data-intro="intro">
                <el-tooltip  class="item" effect="dark" content="Create a new module" placement="left">
                  <i class="ion-android-add" @click="openAddModule"></i>
                </el-tooltip>
              </div>
            </AuthenticatedField> -->
            <div class="row"  v-if="check_permission('manageModules')">
			<div style="padding-right: 30px; margin-top: -35px; margin-bottom: 20px;" class="col-md-12">
				<el-tooltip class="pull-right" effect="dark" content="Create a new module" placement="left">
				<a class="btn-lg btn-circle" style="border-radius: 100%;" data-intro="Create a New Module"
				data-tooltipClass="Create New Module" @click.stop="openAddModule">
						<i class="ion-plus"></i>
				</a>
			</el-tooltip>
			<p class="pull-right new-project" style="margin-top: 10px; margin-right: 15px;">NEW MODULE</p>
			 </div>

		</div>
            <!-- NEW MODULE -->
            <ModuleCard :new="true"
                @reloadstore="reloadstore"
                :moduleObject="newModules"
                @openAddModule="openAddModule"
                :projectId="id"
                @viewModuleModal="viewModuleModal"
                 @openReasonModal="openReasonModal"
                 @openTestModal="openTestModal"/>

            <!-- IN PROGRESS -->
            <ModuleCard :inprogress="true"
                @reloadstore="reloadstore"
                @openAddModule="openAddModule"
                :moduleObject="inprogressModules"
                :projectId="id"
                @viewModuleModal="viewModuleModal"
                 @openReasonModal="openReasonModal"
                 @openTestModal="openTestModal"/>

            <!-- SUBMITTED -->
            <ModuleCard :submitted="true"
                @reloadstore="reloadstore"
                :moduleObject="submittedModules"
                :projectId="id"
                @viewModuleModal="viewModuleModal"
                @openReasonModal="openReasonModal"
                @openTestModal="openTestModal"/>

            <!-- DONE -->
            <ModuleCard :done="true"
                @reloadstore="reloadstore"
                :moduleObject="doneModules"
                :projectId="id"
                @viewModuleModal="viewModuleModal"
                @openReasonModal="openReasonModal"
                @openTestModal="openTestModal"/>



            <AddModuleModal :show.sync="showAddModuleModal" :projectId="id" @close="closeModal" @reloadstore="reloadstore">
            </AddModuleModal>
               <ViewModuleModal  :module="viewModule"
               @closeViewModal="closeViewModal"
               :show_view_module.sync="show_view_module">
        </ViewModuleModal>
        <!-- <Reason  :method="reasonModule" @closeReasonModal="closeReasonModal" 
        :show_reason_modal.sync="show_reason_modal"
                >
        </Reason> -->
        <Test  :testing="testing" :testUrl="testModule" @closeTestModal="closeTestModal" :show_test_modal.sync="show_test_modal"
                >
        </Test>
        <Loading :show="loader" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModuleCard from './moduleCard';
import AddModuleModal from "./createModule/AddModuleModal";
import ViewModuleModal from '@/app/shared/modals/view-module.vue';
import Reason from '@/app/shared/modals/reject-reason.vue';
import Test from '@/app/shared/modals/test_module.vue';
export default {
  name: "modules",
  props: ['id'],
  components: {
    AddModuleModal,
    ModuleCard,
    ViewModuleModal,
    Reason,
    Test
  },
  data() {
    return {
        showAddModuleModal: false,
        show:false,
        viewModule:{},
        reasonModule:{},
        show_view_module: false,
        show_reason_modal: false,
        show_test_modal: false,
        testModule:{},
        loader: false,
    };
  },
  created(){
    if(this.user.type == 2)
        this.fetchProject();
  },

    mounted () {
        this.loader = true;
        this.fetchModules();
        this.callWithToken({
            parameters: {
                teamId: this.user.Id, // project id
            },
            action: this.getCategories,
        });
        // this.fetchTeam();
        this.callWithToken({
            parameters: {
                id: this.user.team_Id, // project id
            },
            action: this.getClientTeam,
        }).then(()=>{
            this.loader = false;
        });
    
    },
    destroyed () {
        this.$_$destroyedHook()
    },
  computed: {
      ...mapGetters('modules', [
        'modules',
        'loading',
        'error',
      ]),
        ...mapGetters('modules', [
        'testing',
        'testUrl',
        'testError',
      ]),
        ...mapGetters('userCredentials', [
            'user','permissions'
        ]),
    ...mapGetters('projects/byid', [
            'project',
        ]),
        newModules () {
            return this.modules.new
        },
        inprogressModules () {
            return this.modules.inprogress
        },
        submittedModules () {
            return this.modules.submitted
        },
        doneModules () {
            return this.modules.done
        },
    },
    methods: {
    ...mapActions('modules/accept', {
            doAcceptModule: 'acceptModule',
            acceptReset: 'resetState',
        }),
    ...mapActions('team', [
            'getClientTeam'
        ]),
    ...mapActions('modules/reject', {
            doRejectModule: 'rejectModule',
            rejectReset: 'resetState'
        }),
    ...mapActions('userCredentials', [
            'callWithToken',
        ]),
    ...mapActions('modules', [
            'getTestUrl'

        ]),
                fetchTeam() {
            // Get client team data
            this.callWithToken({
                parameters: {
                    id: this.projectId, // clients team id
                },
                action: this.getTeam,
            });
        },
    ...mapActions('modules', [
            'getModules',
            'resetState'
        ]),
    ...mapActions('categories', [
            'getCategories'
        ]),

    ...mapActions('modules/all', {
                    allModules:'getModules',
                }
        ),
    ...mapActions('userCredentials', [
            'callWithToken',
        ]),
    ...mapActions('projects/byid', [
            'getProjectById',

        ]),
                fetchModules(){
            this.callWithToken({
                parameters: {
                    id: this.user.Id, // clients team id
                    projectId: this.id, // project id
                },
                action: this.getModules,
            });
        },
        viewModuleModal(module){
            // ;
            this.show_view_module=true;
            this.viewModule=module;

        },
        openTestModal(module){
            // ;
            // alert();
            var self = this;
            self.show_test_modal=true;
            this.callWithToken({
                parameters: {
                    id:module.Id, // clients team id
                },
                action: self.getTestUrl,
            }).
                    then((result)=>{
                if(self.testError)
                    self.$show_notification(self.testError,'error');
                else{

                    self.testModule=result.link;
                }
            })

            // alert(module);

        },
        doRejectModule(){
            self.callWithToken({
                parameters: functionArgs,
                action: self.rejectModule,
            })
                    .then(function (status) {
                        if(status) {
                            self.reloadstore('rejectModule', id);
                        } else {
                        }
                    });
        },
        closeReasonModal(){
            this.fetchModules()
            this.show_reason_modal =false;
        },
        closeTestModal(){
            // this.fetchModules()
            this.show_test_modal =false;
        },

        openReasonModal(module){

            this.show_reason_modal = true;
            this.reasonModule = module.method;
            ;
        },
        closeViewModal(){
            this.show_view_module = false;
            ;

        },

       fetchProject() {
          // Get client team data
          var self = this;
         this.callWithToken({
              parameters: {
                  projectId: self.id // clients team id

              },
              action: this.getProjectById
          }).then(project =>  {

              if(!project.repository_url  && project.repository_url != undefined){
                  this.project.repository_url=null;
                  this.$router.push({ path: 'config' });
              }
          });

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
    openAddModule() {
      this.showAddModuleModal = true;
    },
    closeModal() {
      this.showAddModuleModal = false;
    },
    reloadstore (type, id) {
//          this.$emit("resetStore");
            // const args = {
            //     id: this.user.Id, // clients team id
            //     projectId: this.id, // project id
            // }
            // this.$_$cheekyReloadStore({
            //     vm: this,
            //     type: type,
            //     authenticate: this.callWithToken,
            //     loadId: id,
            //     reloadAction: this.getModules,
            //     reloadArgs: args
            // })

            //   window.location.href = this.$route.fullPath
            this.callWithToken({
                parameters: {
                    id: this.user.Id, // clients team id
                    projectId: this.id, // project id
                },
                action: this.getModules,
            });
        },
    },
    };
</script>
<style scoped>
    .action-row {
        border-radius: 0 0 5px 5px;
        height: 25px;
        margin-top: -43px !important;
        display: flex;
        top: 22px;
        position: relative;
        width: inherit;
        left: 3px;
        right: 0;
    }
    .module-col {
        background: #f0f5f9;
        border-radius: 5px;
        width: 100%;
        min-height: 350px !important;
        overflow-y: overlay !important;
        max-height: 350px !important;
        height: 65vh;
        display: block;
    }
    .module-col:hover::-webkit-scrollbar{
        width: 5px;
        transition: all 1s ease;
    }
    .module-col::-webkit-scrollbar {
        width: 0px;

        transition: all 1s ease;
    }
    .module-col::-webkit-scrollbar-thumb {
        border-radius: 50px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
        background-color: #848484;
        transition: all 1s ease;
        /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
    }
    .module-col::-webkit-scrollbar-track {
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
        border-radius: 50px;

        transition: all 1s ease;
    }

    /*/////////////////////////////////////////////////////////////////*/
    /*//////////////////////////////////////////////////////////////////*/
    /*/////////////////////////////////////////////////////////////////*/



    /* altering materialpapers input textarea & etc */
    textarea, textarea.form-control, input.form-control, input[type="text"], input[type="password"], input[type="email"], input[type="number"], .form-control[type="text"], .form-control[type="password"], .form-control[type="email"], .form-control[type="tel"], .form-control[contenteditable],
    select, select.form-control {;
        width: 100% !important;
        font-size: 14px !important;
    }

    select.form-control {
        -webkit-appearance: none !important;
    }
    .el-dialog__body {
        padding: 30px 0px !important;
    }

    .el-tabs--left .el-tabs__active-bar, .el-tabs--left .el-tabs__nav-wrap::after {
        left: auto !important;
        right: auto !important;
    }

    .el-tabs--left .el-tabs__active-bar, .el-tabs--right .el-tabs__active-bar {
        width: 4px !important;
    }

    .el-tabs--left .el-tabs__item {
        text-align: left !important;
    }

    .el-tabs__active-bar {
        background-color: #409EFF !important;
    }

    .el-tabs__nav-wrap::after {
        background-color: #ffffff !important;
    }

    .module-info-msg p {
        font-size: 11px !important;
    }

    .error-text {
        font-size: 12px !important;
    }

    .creat-modules input {
        border: 1px solid #d0d0d0 !important;
        margin-bottom: 6% !important;
    }


    .creat-modules textarea {
        border: 1px solid #d0d0d0 !important;
        margin-bottom: 6% !important;
    }

    .form-control {
        border: 1px solid #d0d0d0 !important;
    }

    .form-control.methodStructure {
        margin-bottom: 20% !important;
    }

    .btn {
        border-radius: 2px !important;
    }



    .modules-wrppwer-side {
        padding-bottom: 2% !important;
    }

    .el-tabs__content {
        box-shadow: 0 50px 80px rgba(0, 0, 0, 0.10) !important;
        padding-bottom: 2% !important;
    }

    .el-dialog__body {
        padding: 0px 0px 0px 0px !important;
    }

    .fortifift {
        margin-top: 4.5% !important;
        position: absolute !important;
        margin-left: 96% !important;
    }

    .fortifift button {
        background: #439cfa !important;
    }

    textarea.form-control {
        height: 160px !important;
    }

    .el-tabs--left .el-tabs__header {
        margin-top: 50px;
    }

    .steps-orange {
        color: #ff9800 !important;
        margin-top: -25% !important;
        margin-bottom: 50% !important;
    }

    .is-danger {
        color: #bd3b3be6 !important;
    }

    button.close {
        font-weight: 900 !important;
        color: #000 !important;
        font-size: 25px !important;
    }

    .btn-default:after {
        content: "\F125";
        font-family: "Ionicons" !important;
        background: #439cfa !important;
        position: absolute;
        right: 15%;
        /*bottom: 63%;*/
        font-size: 16px;
        font-weight: 100 !important;
        color: #ddd;
    }

    .btn-defaultFinish:after {
        content: "" !important;
        font-family: "Ionicons" !important;
        background: #439cfa !important;
        position: absolute;
        right: 15%;
        /*bottom: 63%;*/
        font-size: 16px;
        font-weight: 100 !important;
        color: #ddd;
    }

    .btn-back {
        color: #439cfa !important;
        margin-top: -3% !important;
        margin-left: 58% !important;
        position: relative !important;
        border: 1px solid #439cfa !important;
        padding: 6px 42px !important;
    }
    .btn-back:after {
        content: "\F124";
        font-family: "Ionicons" !important;
        background: white !important;
        position: absolute;
        right: 75%;
        /*bottom: 20%;*/
        font-size: 16px;
        font-weight: 100 !important;
        color: #439cfa;
    }





    .is-active:after {
        content: "\F120";
        font-family: "Ionicons" !important;
        position: relative;
        left: 20%;
        /*bottom: 20%;*/
        font-size: 16px;
        font-weight: 100 !important;
        color: #409EFF;
    }

    .el-tabs__item {
        margin-right: 80px !important;
        width: 80px !important;
        max-width: 80px !important;
    }

    .fortifift button.btn-back {
        background: white !important;
    }

    .next-buttonone button {
        margin-top: -20% !important;
        padding: 8px 40px !important;
    }

    .next-buttontwo button {
        /*margin-top: -20% !important;*/
        padding: 8px 40px !important;
        margin-right: 28% !important;
    }

    .next-buttonthree button {
        /*margin-top: -20% !important;*/
        padding: 8px 30px !important;
        margin-right: 28% !important;
    }

    .close {
        opacity: .3;
    }

    button {
        box-shadow: none !important;
    }


    .text-center.hide-nomethdf p {
        padding-bottom: 0% !important;
    }






    .el-tabs__item {
        color: #767676 !important;
    }

    .text-center.hide-nomethdf p:before {
        top: 21.3% !important;
    }


    button.add-methods.btn.btn-primary {
        border: 1px solid #439cfa !important;
        color: #439cfa !important;
    }




    .well.methods-well {
        padding: 0px 0px 0px !important;
        width: 250px !important;
    }
    .well {
        border-radius: 2px !important;
        margin-bottom: 40px !important;

    }

    .well.textcase-well {
        background: #f9fcff !important;
        border: 1px solid #439cfa !important;
    }

    .well.textcase-well button[data-v-215a5bb9] {
        background: #439cfa !important;
    }

    .methodsN-header {
        padding: 10px 10px 3% !important;
        border-bottom: 1px dashed rgb(212, 212, 212) !important;
    }

    .methodsN-header button {
        color: #409EFF !important;
        border: 1px solid #409EFF !important;
        margin-top: 0% !important;
        padding: 4px 20px !important;
    }

    button.btn.btn-info.btn-case {
        color: #409EFF !important;
        border: 1px solid #409EFF !important;
    }

    button.btn.btn-info.btn-case b {
        font-size: 9px !important;
        margin-right: 5px !important;
        padding: 1px 5px !important;
    }

    .pretty .state label:before {
        border-color: #409EFF !important;
    }

    .pretty input:checked~.state.p-primary label:after, .pretty.p-toggle .state.p-primary label:after{
        background-color: #409EFF !important;
    }


    .col-md-4.ruller-for-module {
        padding-left: 35px !important;
    }

    .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9{
        padding-right: 40px !important;
    }

    .btn-defaultTwo {
        color: #333;
        background-color: #fff;
        border-color: #ccc;
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

    .btn-defaultTwoTwo {
        color: #8a8989;
        background-color: #f9fcff;
        border-color: #ccc;
        margin-top: -50px;
    }

    p.nonresuable-msg {
        width: 200px !important;
    }

    p.text-right.next-button button {
        color: #409EFF !important;
        border: 1px solid #409EFF !important;
    }

    .col-md-2.step-strange.step-strangeTwo {
        padding-right: 15px !important;
    }


    .el-input-number {
        width: 320px  !important;
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 320px !important;
    }

    .el-date-picker.has-sidebar.has-time {
        width: 334px !important;
        left: 535px !important;
    }

    .el-picker-panel [slot=sidebar], .el-picker-panel__sidebar {
        display: none !important;
    }

    .el-date-picker .el-picker-panel__content {
        width: 334px !important;
    }

    .el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body {
        margin-left: 0px !important;
    }

    .el-picker-panel__content {
        margin: 0px !important;
    }

    .el-popper[x-placement^=bottom] .popper__arrow {
        left: 10.7% !important;
        top: 28% !important;
        border-bottom-color: #fff !important;
    }

    .el-date-picker__time-header {
        display: none !important;
    }

    .well.creat-modulesv {
        padding: 0px 0px 185px 42px !important;
    }


    .el-date-picker.has-sidebar.has-time {
        top: 28% !important;
        left: 63% !important;
        position: fixed !important;
        transform-origin: 0px !important;
    }

    .el-date-picker.has-sidebar.has-time:after {
        content: "\f107";
        font-family: "Ionicons" !important;
        background: transparent !important;
        position: absolute;
        left: -2%;
        top: 3%;
        font-size: 16px;
        font-weight: 100 !important;
        color: transparent;
    }

    .el-date-picker__header-label {
        font-size: 14px;
        font-weight: 900;
    }

    .kolo {
        height: 300px !important;
        overflow-y: auto !important;
        width: 660px !important;
    }

    .kolo .col-md-6 .col-md-12{
        padding-right: 9px !important;
        padding-left: 9px !important;

    }

    .well.proj-type-wellfsd {
        border: 1px solid #ddd !important;
        padding: 0px 0px 0px 0px !important;
        box-shadow: 0px !important;
        width: 250px  !important;
    }

    .well.proj-type-wellfsd .row {
        margin-top: 10px !important;
    }

    .well.proj-type-wellfsd small {
        font-size: 13px !important;
        color: #8a8a8a !important;
        font-weight: 600 !important;
    }

    .well.tebas {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18) !important;
        height: 30px !important;
    }

    .well.fsystem input{
        width: 470px !important;
    }

    .well.fsystem .col-md-8{
        padding-left: 4px !important;
    }

    .well.fsystem .row{
        margin-left: 0px !important;
    }

    .well.fsystem label{
        font-weight: 900 !important;
    }

    .table>thead>tr>th {
        vertical-align: top !important;
    }

    .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
        padding: 0px !important;
        vertical-align: middle !important;
    }

    .table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th{
        width: 100px !important;
    }

    label {
        color: #439cfa !important;
    }

    /* .el-dialog__wrapper {
        background-color: rgba(67, 156, 250, 0.27) !important;
    }
 */


    .el-tabs__item:visited {
        color: red !important;
    }

    td.text-left i {
        font-size: 26px !important;
        color: #409EFF !important;
    }

    p.dedicated-file{
        background: #409EFF !important;
    }

    .well.tebas i{
        color: #409EFF !important;
    }





    .el-picker-panel__icon-btn {
        color: #fff !important;
        background-color: #90949d !important;
        width: 20px !important;
        height: 20px !important;
        display: block !important;
        margin-right: 10px !important;
        line-height: 20px !important;
        /*position: absolute !important;*/
        /*left: 50% !important;*/
        /*-webkit-transform: translateX(-50%) !important;*/
        /*transform: translateX(-50%) !important;*/
        border-radius: 50% !important;
    }


    .modal-body{
        padding: 15px 0px 0px !important;
    }

.form-control:focus {
  border-color: #439cfa !important;
  border: 2px solid #439cfa !important;
}
.new-project-team {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width:2px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.15);

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

.new-project-team i {
    background: #3369da;
    border-radius: 50%;
    padding: 11px 17px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
}

</style>
