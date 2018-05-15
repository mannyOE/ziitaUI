<template>
    <!-- Generic MODULE -->
    <div  class="col-md-3" style="padding: 0px !important;">

        <div class="module-col">
            <div class="heading" :class="moduleAttributes.headerClass">
                <div class="row" >
                    <div class="col-xs-10" >
                        <span class="module-title">{{ moduleAttributes.title }} </span>
                    </div>
                    <div class="col-xs-2" >
                        <AuthenticatedField >
                            <span class="module-title" >
                                <!-- <el-tooltip class="item" effect="dark" content="Search module" placement="left"> -->
                                <i class="ion-ios-search-strong" :key="Math.random * 10000" data-introa="show_help('search','Search for Modules by Module Name, Description and Assigned Developer Name')" data-toggle="modal" @click="openSearch"></i>
                                <!-- </el-tooltip> -->

                            </span>
                        </AuthenticatedField>
                    </div>
                </div>



                <div class="bar-1" ></div>
                <div v-if="search"  class="together">
                    <span class="space"><i class="ion-close-circled"  @click="showSearch" ></i></span>
                    <span><input class="search" type="text"   v-model="filteredText"></span>
                </div>
                <!-- <div v-if="moduleAttributes.headerClass == 'inprogress'">
                    <span v-if="search">
                    <span><i class="ion-close-circled" style="position: relative; right: 75px" @click="showSearch"></i></span>
                    <span><input class="search-yellow" type="text"  v-model="filteredText"></span>
                </span>
                </div> -->



            </div>


            <span>
                <LoadingBar v-if="loading"/>
                <FetchError v-else-if="error">{{ error }}</FetchError>

                <NoContentError v-else-if="!modules.length">
                    No modules.
                </NoContentError>

                 <NoContentError v-else-if="modules==undefined && !loading">
                    Network Error                </NoContentError>
                <div class="col-xs-12 module-card " v-else
                    v-for="(module, i) in searchFiltered"
                    :key="i"
                    :class="moduleAttributes.cardClass">

                   <div class="row" >
                        <div class="col-xs-12" style="padding: 10px;">
                        <div class="row" >
                            <div class="col-xs-9" >
                                <p class="module-name" style="margin-top: +10px;">
                                    {{ module.module_name }}
                                </p>
                            </div>
                            <div class="dropdown" >
                                <div class="col-xs-2" >
                                    <span><i class="ion-android-more-vertical more-details text-left" @click="drop"></i></span>
                                            <div class="dropdown-content" v-if="dropIt" >
                                                <a href="#" @click="viewModuleModal(module)">
                                                    <div class="row">
                                                        <div class="col-xs-1"><i class="ion-eye dd-mg"></i></div>
                                                        <div class="col-xs-10"><p class="drp-txt">View Module</p></div>
                                                    </div>
                                                </a>
                                                <a href="#" data-introa="show_help('edit_module', 'Edit Module here')" data-introd="Edit Module" @click.stop="editAddModule(module)">
                                                    <div class="row">
                                                        <div class="col-xs-1"><i class="ion-compose dd-mg"></i></div>
                                                        <div class="col-xs-10"><p class="drp-txt">Edit Module</p></div>
                                                    </div>
                                                </a>
                                                <a href="#" v-if="isModuleNew && !module.developer_Id" @click.stop="openAssignDev(module)">
                                                   <div class="row">
                                                       <div class="col-xs-1"><i class="ion-ios-briefcase-outline dd-mg" ></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Assign Developer</p></div>
                                                       </div>
                                                </a>
                                                <a href="#" @click.stop="showTestModal(module)" v-if="isModuleSubmitted">
                                                    <div class="row">
                                                        <div class="col-xs-1"><i class="ion-ios-flask-outline dd-mg" ></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Test Module</p></div>
                                                        </div>
                                                </a>

                                                <a href="#" @click.stop="reject_module(module, i)" v-if="submitted">
                                                    <div class="row">
                                                    <div class="col-xs-1"><i class="ion-ios-eye dd-mg" ></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Access Submission</p></div>
                                                        </div>
                                                </a>
                                                <a href="#" @click.stop="removeModule(module.Id, i)" >
                                                    <div class="row">
                                                    <div class="col-xs-1"><i class="ion-ios-trash-outline dd-mg"></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Delete Module</p></div>
                                                    </div>
                                                </a>
                                                <a href="#"  @click.stop="chatUp(module)">
                                                    <div class="row">
                                                    <div class="col-xs-1"><i class="ion-ios-email-outline dd-mg"></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Message Developer</p></div>
                                                        </div>
                                                </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="col-xs-12" >
                            <p class="text-left" style="font-size: 9px;" >
                                REQUESTED<br>
                                 {{developer_name(module.developer_Id)}}<br>

                                {{ module.end_date | savageMoment("calendar") }}
                            </p>
                    </div>
                    <div class="col-xs-12 " style="border-top: 2px solid rgb(250, 251, 255); padding:5px;" >
                            <img :src="dev_imageLink(module.developer_Id)"
                                 class="module-avatar"
                                 height="30">
                    </div>

                   </div>
                    <!--<ul   >-->
                        <!--<li>-->
                           <!--<div class="row">-->
                              <!--<div class="col-md-8"><p class="module-name">-->

                                 <!--{{ module.module_name }}-->
                              <!--</p>-->

                              <!--</div>-->
                              <!--<div class="col-md-4">-->
                                <!--<img :src="dev_imageLink(module.developer_Id)"-->
                                    <!--class="module-avatar"-->
                                    <!--height="30">-->
                              <!--</div>-->
                            <!--</div>-->

                        <!--</li>-->
                        <!--<li>-->
                           <!--&lt;!&ndash;  <h6>-->
                                <!--{{newModule.developer.user.firstName}} {{newModule.developer.user.lastName}}<br> &nbsp;-->
                                <!--<!<i class="fa fa-clock"></i>&nbsp;30 June 2017 &ndash;&gt;-->
                            <!--&lt;!&ndash; </h6> &ndash;&gt;-->
                            <!--<h6 align="center">-->

                                <!--{{developer_name(module.developer_Id)}}<br>-->
                                <!--<i class="fa fa-clock"></i>-->
                                <!--{{ module.end_date | savageMoment("calendar") }}-->
                            <!--</h6>-->
                        <!--</li>-->
                    <!--</ul>-->
                    <br>
                    <!-- <div class="action-row" v-if="!checkUser(userType, 'project-manager')">
                        <i class="fa fa-eye"></i>&nbsp;
                        <i class="fa fa-pencil" v-if="checkUser(userType, 'project-manager')"></i>&nbsp;
                        <i class="fa fa-trash-o" v-if="checkUser(userType, 'project-manager')" @click.stop="delModule({ id: newModule.id })"></i>&nbsp;
                        <i class="fa fa-comment" @click.stop="openChatModal(newModule.developer.user.id)"></i>
                    </div> -->
                    <div class="action-row" data-introa="show_help('top','Good to know')">
                        <AuthenticatedField v-show="check_permission('manageModules')">
                          <!--<el-tooltip class="item" effect="dark" data-intro="false"  content="View Module"  placement="bottom">-->

                            <!--<i class="ion-ios-eye" @click="viewModuleModal(module)" ></i>-->

                          <!--</el-tooltip>&nbsp;-->
                          <!--<el-tooltip class="item" effect="dark" content="Edit Module"  placement="bottom">-->
                            <!--<i class="ion-ios-compose-outline" data-introa="show_help('edit_module', 'Edit Module here')" data-introd="Edit Module" @click.stop="editAddModule(module)"></i>-->
                          <!--</el-tooltip>&nbsp;-->
                            <!--<el-tooltip class="item" effect="dark" content="Assign a developer" placement="bottom">-->
                                <!--<i class=" ion-person-stalker" v-if="isModuleNew && !module.developer_Id" @click.stop="openAssignDev(module)"></i>&nbsp;-->
                            <!--</el-tooltip>-->
                            <!--<el-tooltip class="item" effect="dark" content="Test This Module" placement="bottom">-->
                                <!--<img :src="require('@/assets/img/exam.svg')"  @click.stop="showTestModal(module)"  alt="Zeedas" width="10px" height="10px" v-if="isModuleSubmitted" style="margin:0px 6px; cursor:pointer;" />&nbsp;-->
                            <!--</el-tooltip>-->
                          <!--&lt;!&ndash;   <el-tooltip class="item" effect="dark" content="Accept this submission" placement="bottom"> &ndash;&gt;-->
                                <!--&lt;!&ndash; <i class="ion-ios-checkmark-outline">-->
                                <!--</i> &ndash;&gt;-->
                           <!--&lt;!&ndash;      <img :src="require('@/assets/img/accept-file-or-checklist.svg')" alt="Zeedas" width="10px" height="10px" v-if="isModuleSubmitted" @click.stop="acceptModule(module.Id, i)" style="margin:0px 6px; cursor:pointer;" />&nbsp;-->
                            <!--</el-tooltip> &ndash;&gt;-->
                            <!--<el-tooltip class="item" effect="dark" content="Access this submission" placement="bottom">-->
                                <!--<i style="color:red"  @click.stop="reject_module(module, i)" v-if="submitted"  class="ion-information-circled" >-->
                                <!--</i>-->
                                <!--&lt;!&ndash; <img :src="require('@/assets/img/edit.svg')" alt="Zeedas" width="10px" height="10px"  v-if="isModuleSubmitted" @click.stop="rejectModule(module.Id, i)" style="margin:0px 6px; cursor:pointer;" / > &ndash;&gt;&nbsp;-->
                            <!--</el-tooltip>-->
                               <!--<el-tooltip class="item" effect="dark" content="Delete Module" placement="bottom">-->
                            <!--<i class="ion-ios-trash" @click.stop="removeModule(module.Id, i)"></i>-->
<!--</el-tooltip>-->
                            <!--&nbsp;-->
                            <!--<el-tooltip class="item" effect="dark" content="Message This Developer" placement="bottom">-->
                                <!--<i class="ion-ios-chatbubble" @click.stop="chatUp(module)"></i>-->
                            <!--</el-tooltip>-->
                        </AuthenticatedField>
                    </div>
                </div>
            </span>
        </div>


        <AssignDevModal :show.sync="showAssignDev" @close="closeAssignDev"
            :moduleId="activeModule.Id"
            :module="activeModule"
            :projectId="projectId"
            @reloadStore="reloadstore">
        </AssignDevModal>
      <!--   <ChatModal :directToggle.sync="showChat" :show.sync="showChat" @close="closeChat"
            :module="activeChatModule" :recipientId="isChattingWith"
            @reloadStore="reloadstore">
        </ChatModal> -->
    </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AssignDevModal from '@/app/shared/modals/assignDevToModule'
import ChatModal from '@/app/shared/chatWidget/chatWidget'

export default {
  name: "module-card",
  props: ['done', 'new', 'submitted', 'inprogress','show_reason_modal', 'moduleObject', 'projectId','help_shown'],
  components: {
      AssignDevModal,
      ChatModal,
  },
  data:function(data) {
    return {
        showAssignDev: false,
        showChat: false,
        activeModule: {},
        activeChatModule: {},
        isChattingWith: String,
        search: false,
        filteredText: '',
        dropIt: false,
        intro: "Create a new module<br>he"
    };
  },
  computed: {
      ...mapGetters('projects/getTeam', [
              'team',
      ]),
        ...mapGetters('modules/reject', [
              'loading',
      ]),
         ...mapGetters('userCredentials', {
          userData: 'user',
          permissions: 'permissions'
      }),
             ...mapGetters('team',
                {all_team:'team'}
        ),

        searchFiltered(){
            console.log(this.filteredText)
            if(this.filteredText.length !==  0){
                    var self = this;
                    var s = this.filteredText.toLowerCase();
                    console.log(s)
						return this.modules.filter(function(element){
							// if(self.selectedFilter === 'Email'){

                                if(element.module_name.toLowerCase().match(s))
                                   return true;
                                // console.log(self.developer_name('000030'))
                                if(self.developer_name(element.developer_Id).toLowerCase().match(s))
                                    return true;



                                return false;
							// }else if(self.selectedFilter === 'Name'){
								// return element.name.match(self.filteredText)
                            })


					// })
                    }
            else{
                return this.modules;
            }
        },

      loading () {
          return this.moduleObject.loading
      },
      error () {
          return this.moduleObject.error
      },
      modules () {
          return this.moduleObject.modules
      },
      moduleAttributes () {
          if (this.done) {
              return {
                  headerClass: 'received',
                  title: 'RECEIVED',
                  cardClass: 'green',
              }
          } else if (this.new) {
              return {
                  headerClass: 'backlog',
                  title: 'BACKLOG',
                  cardClass: 'yellow',
              }
          } else if (this.submitted) {
              return {
                  headerClass: 'delivered',
                  title: 'DELIVERED',
                  cardClass: 'blue2',
              }
          } else if (this.inprogress) {
              return {
                  headerClass: 'inprogress',
                  title: 'IN PROGRESS',
                  cardClass: 'blue',
              }
          }
      },

      isModuleNew () {
          return this.new === true
      },
      isModuleSubmitted () {
          return this.submitted === true
      },

      // isModuleRegected () {
      //     return this.regected === true
      // }
  },
    mounted(){

},
  methods: {
      drop(){
          this.dropIt = true ;
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
      show_help(val, help){
          if(!this.help_shown[val] || this.help_shown[val]){
              var x = this.help_shown[val] | 0;
              this.help_shown[val] = x+1;
              return help;
          }else{
              debugger;
              return false;
          }
      },
    viewModuleModal(module){
     this.$emit('viewModuleModal',module);
     // debugger;
    },
      showTestModal(module){
     this.$emit('openTestModal',module);
     // debugger;
    },
    showReasonModal(module){
      debugger;
      this.$emit('openReasonModal',module)
    },
    openSearch(){
        this.search = true
    },
    showSearch(){
       this.search = false
       this.filteredText = ''
    },
      dev_imageLink(dev_id){
          if(dev_id) {
              var all_team = this.all_team;
              for (var i = 0; i < all_team.length; i++) {
                  if (dev_id == all_team[i].Id) {
                      if(!all_team[i].profile_thumbnail)
                        break;
                      return this.$API + 'img/thumbnails/'+ all_team[i].profile_thumbnail;
                  }
              }
          }

          return require('@/assets/img/1.jpeg');
      },
      developer_name(id){

          var all_team = this.all_team;
            // this.team.forEach(function(id){
              for(var i = 0 ; i < all_team.length ; i++){
                   if(id == all_team[i].Id){
                    // console.log(user)

                       return all_team[i].first_name + " " + all_team[i].last_name;
                    }
              }

            return ''

      },
        ...mapActions('userCredentials', [
        'callWithToken',
      ]),
      ...mapActions('modules/remove', [
          'deleteModule',
          'resetState',
      ]),
        ...mapActions('modules/reject', [
          'rejectModule',

      ]),
      ...mapActions('modules', [
          'setModule',
           'resetModule',
           'getModules'

      ]),

  ...mapActions('projects/getTeam', [
          'getTeam',
      ]),


      endDate (module) {
          let date = new Date(parseInt(module.end_date))
          return date
      },
      openAddModule () {
        console.log('skd');
          this.resetModule();
          this.$emit('openAddModule');
      },
      editAddModule(module){
          this.setModule(module);
          // debugger;
          this.$emit('openAddModule');
      },
      openAssignDev (module) {
          this.activeModule = module;
          this.showAssignDev = true
      },
      closeAssignDev () {
          this.showAssignDev = false
      },
      chatUp (module) {
          // console.log(module)
          this.$emit("chat");
          this.activeChatModule = module
          this.isChattingWith = module.developer_Id
        //   this.getMessages(isChattingWith)
},
      closeChat () {
          this.showChat = false
      },
      removeModule (id, index) {
        const functionArgs = {
            id: id, // module id
            index: index, // index in array
          }
        const self = this;

        this.$confirm('Are you sure you want to delete this module?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
            self.callWithToken({
                parameters: functionArgs,
                action: self.deleteModule,
            })
            .then(function (status) {
               // debugger;
                if(status) {
                    self.$show_notification("Deleted successfully!")
               self.callWithToken({
                    parameters: {
                    id: self.userData.Id, // clients team id
                    projectId: self.projectId, // project id
                    },
                    action: self.getModules,
                });
                } else {
                    self.$show_notification("Error deleting module",'error')
                }
            });
        })
      },
      acceptModule (id, index) {
        const functionArgs = {
            id: id, // module id
            index: index, // index in array
          }
        const self = this;

        this.$confirm('Are you sure you want to accept this module?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
            self.callWithToken({
                parameters: functionArgs,
                action: self.doAcceptModule,
            })
            .then(function (status) {
                if(status) {
                    self.reloadstore('acceptModule', id);
                } else {
                }
            });
        })
      },
      reject_module (module, index) {
        // const functionArgs = {
        //     id: id, // module id
        //     index: index, // index in array
        //   }
      this.showReasonModal(module)
      },
      reloadstore (type, id) {
          this.$emit('reloadstore', type, id)
      },
  },
};
</script>

<style scoped>
    .dd-mg{
        font-size: 14px;
    }

    .module-avatar {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        /*border: 2px solid #fff;*/
        margin-left: 10px;
        margin-bottom: -25px !important;

        /*box-shadow: 1px 3px 5px 2px #eee;*/
    }
    .more-details{
        color: #a7a7a7;
        font-size: 30px;
        font-weight: bold;
        margin-left: 10px;
    }
    .down-part{
        border-top: 2px solid rgb(250, 251, 255);
        padding: 5px;
    }
    .dropdown-content{
        display: none;
        position: absolute;
        margin-left: -90px;
        background-color: #fff;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 5px;

    }
    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown-content a {
        padding-left: 10px;
        padding-top: 10px;
        font-size: 11px;
        /*font-family: montserrat;*/
        color: #011b;
        border-bottom: 1px solid rgba(214,218,229,0.34);
        /*padding: 12px 16px;*/
        /*text-decoration: none;*/
        display: block;

    }
    .dropdown-content a:hover{
        background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
        font-weight: bold;
        text-decoration: none;
        color: #fff;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .heading{
        font-size: 10px;
        text-transform: uppercase;
        font-weight: bold;
        color: #8d929a;
        /*font-family: Montserrat;*/

    }
    .bar-1{
        height: 7px;
        width: 40px;
        margin-top: 10px;
        margin-bottom: 20px;
        background: #326ada;
         border-radius: 8px;
        /*border: 1px solid #0a2463;*/
    }
    .bar-2{
        height: 5px;
        width: 40px;
        margin-top: 10px;
        margin-bottom: 20px;
        background: #a02622;
         border-radius: 8px;
        border: 1px solid #a02622;
    }
    .bar-3{
        height: 5px;
        width: 40px;
        margin-top: 10px;
        margin-bottom: 20px;
        background: #728eaa;
        border-radius: 8px;
        /*border: 1px solid #0a6ebd;*/
    }
    .bar-4{
        height: 5px;
        width: 40px;
        margin-top: 10px;
        margin-bottom: 20px;
        background: #7ed321;
        border-radius: 8px;
        /*border: 1px solid #4ae650;*/
    }
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
.new-project-team {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width:2px;
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

.search {
    /* position: relative; */
    top: -25px;
    width: 100px;
    float: right;
    border-radius: 20px !important;
    height: 25px;
    color: black;
}

.together{
    position: absolute;
    top: 8px;
    color: #fff;
    width: 125px;
    right: 10px;
}

.module-card {
    /*border-top: 2px solid #f5a623;*/
    border-radius: 5px;
    /*padding-bottom: 20px;*/
    /*min-height: 100px;*/
    height: auto;
    background: #fff;
    box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
    margin-bottom: 15px;
    padding-bottom: 1px !important;
}

.module-name{
    word-break: break-all;
    word-wrap: break-word;
    font-weight: bold;
    /*font-family: Montserrat;*/
    font-size: 11px;
    color: #011b;
}
col-md-3{
    padding: 0px !important;
}
.module-col {
    background: transparent;
    /*border-radius: 5px;*/
    width: 100%;


    min-height: 300px !important;
    overflow-y: scroll !important;
    /*max-height: 350px !important;*/
    height: 64vh;
    display: block;
    padding: 20px;
    margin: 0px;
    border-right: 1px solid rgba(214,218,229,0.34);
    border-left: 1px solid rgba(214,218,229,0.34);

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
</style>
