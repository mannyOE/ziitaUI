<template>
   <div class="container">
    <div class="row">
  <span class="files">Files</span>
      
    </div>
  <br>
     <div class="row">
      <div class="col-xs-3 line" style="padding-left:unset">
      
       <div  @click.stop="showRepo()" :class="{'active-tab':tab=='repo'}" class="col-xs-12 my-side-nav"
        vertical-align="middle">
        <br>
         <span class="my-side-nav-text" >Repository</span>
         <span v-if="tab=='repo'" class="active-bar"></span>
       </div>
        <div @click.stop="showConfig()" :class="{'active-tab':tab=='config'}" class="col-xs-12 my-side-nav" vertical-align="middle">
          <br>
                  <span class="my-side-nav-text">Server Config</span>
                   <span v-if="tab=='config'" class="active-bar"></span>
       </div>
        <div @click.stop="showSetUp()" :class="{'active-tab':tab=='server'}" class="col-xs-12 my-side-nav" vertical-align="middle">
          <br>
                           <span class="my-side-nav-text">Setup</span>
                            <span v-if="tab=='server'" class="active-bar"></span>
       </div>
      </div>
       <div class="col-xs-8 line" style="padding:15px">
     <!--  -->

         <div  v-if="tab=='repo'">

     
             <form @submit.prevent="validateBeforeSubmit" >



          <!--   <BannerError v-if="error" :exempt="true">{{  error }}</BannerError>
            <BannerSuccess v-if="success" :exempt="true" >{{ successMsg }}</BannerSuccess>
            <BannerSuccess v-if="urlTestMessage != ''" :exempt="true" >{{ urlTestMessage }}</BannerSuccess> -->
           <div style="margin-left:30px !important">
            <!-- {{isTesting}} -->
               <!-- <span class="repo-text"> Edit Repository</span> -->
                      <div class="row" style="width:450px!important">
                <div class="col-xs-6" align="left">
                   <span class="project-name">{{project.project_name}}</span> <br>
                   <span class="project-repo">{{project.repository_url}}</span> 
                    <!-- <p>EDIT <i class="ion-edit"></i></p> -->
                </div>


                <div class="col-xs-6" align="right">
                  <!-- {{saving}} -->
                      <select class="selectpicker master">
  <option data-icon="ion-fork-repo">MASTER</option>
</select>

            
                </div>
            </div>
            <span class="bar"></span>
               <div class="row">

                   <div class="col-xs-12" style="margin-top:29px !important">
                    <label class="repo-text" for="">URL</label>
                       <input type="text" class="form-control"
                       name="url" placeholder="Repository url"
                       v-model="user.url">

                    </div>

                       <div class="col-xs-12" style="margin-top:29px !important">
              
                    <label class="repo-text" for="username">USERNAME</label>
                       <input type="text" class="form-control" v-validate="'required'"
                        v-model="user.username"
                        name="username"
                        placeholder="Username">
  </div>
        

                         <div class="col-xs-12" style="margin-top:29px !important">
                    <label class="repo-text" for="password">PASSWORD</label>
                       <input type="password" class="form-control" v-validate="'required'"
                        v-model="user.password"
                        name="password"
                        placeholder="Password">

                   </div>
            
                     <div class="col-xs-12" style="margin-top:29px !important">
                     <button   v-if="!saving" class="btn my-btn-right pull-left" type="submit">Save</button>
                     <LoadingButton v-else buttonclass="btn my-btn-right pull-left">Saving...</LoadingButton>
                       <!-- <button class="btn btn-default">SAVE</button> -->
                   
                 

                     
                     <button v-if="!isTesting"  @click.prevent="testUrl" class="btn my-btn-left" >Test</button>
                       <LoadingButton v-else buttonclass="btn my-btn-left pull-right">Testing...</LoadingButton>

                   </div>

                     
               </div>
           </div>
           </form>
        </div>

        <!-- SERVER CONFIGURATION SECTION -->
        <!-- data-toggle="collapse" data-target="#personal-details_catego"  -->
         <div v-if="tab=='config'" >
          <div class="row">
            <div class="col-xs-4 docker-side-bar" >
                  <div class="row" style="margin-top:36px;margin-bottom:35px">
                    <div class="col-xs-4 " align="left">
                      <!-- <br> -->
                      <!-- {{docker}} -->
<span class="docker-config-text">CONFIG({{docker.length}})</span>
                    </div>
                       <div class="col-xs-6" align="right">
                         <div class="btn-remove-all">
                          <i class="ion-ios-close-outline pull-left" style="color:#8C8989;margin:5px"></i>
                          <!-- <br> -->
                           <span class="btn-remove-all-text pull-right">REMOVE ALL</span>
                           <!-- <br> -->
                         </div>
                       </div>
                  </div>   
                  <div class="docker-file" @click="editDocker(d)" v-for="d in docker" :class='{"docker-active" :  d.Id==activeDocker}'>
                    <span class="docker-file-text">{{d.name}}</span>
                    <!-- <span class="oval"> -->
                      <img class="oval-trash" @click.stop="remove(d)" :src="require('@/assets/img/trash.svg')">
                    <!-- </span> -->
                    <!-- <span class="oval"> -->
                      <img class="oval-check-mark"  v-show="d.Id !== project.docker" @click.stop="submit(d)"  :src="require('@/assets/img/checkmark.svg')">
                    <!-- </span> -->
                  </div>  
                  <div style="width:100%" align="center">
                    <br>
                    <span class="new-config">NEW CONFIG</span>
                  <br>
                  <br>
                  </div>   
                  
                   <span  class="chat-bubble" @click.stop="newDocker">
        <i class="ion-android-add"></i>
        </span>
            </div>
            <div class="col-xs-8">
               <div style="margin-left:30px !important">
            <!-- {{isTesting}} -->
               <!-- <span class="repo-text"> Edit Repository</span> -->
                      <div class="row" style="width:450px!important">
                <div class="col-xs-6" align="left">
                   <span class="project-name">{{project.name}}</span> <br>
                    <!-- <p>EDIT <i class="ion-edit"></i></p> -->
                </div>


             
            </div>
               <div class="row" v-if="showDockerConfig">

                   <div class="col-xs-12" style="margin-top:29px !important">
                    <label class="repo-text" for="">CONFIG NAME</label>
                       <input type="text" class="form-control"
                       name="docker"
                       v-model="selected.name">

                    </div>
                       <div class="col-xs-12"  style="margin-top:29px !important">
                      <textarea style="width:450px !important; background-color:#000 !important" id="server-config" v-model="selected.content" class="rectangle-4-copy">{{selected.content}}</textarea>
                   </div>
                 
                     <div class="col-xs-12" style="margin-top:29px !important">
                     <button  @click="saveDocker()" v-if="!savingDocker" class="btn my-btn-left pull-right" type="submit">Save</button>
                     <LoadingButton v-else buttonclass="btn my-btn-left pull-right">Saving...</LoadingButton>
                       <!-- <button class="btn btn-default">SAVE</button> -->
                   
                 

                     
                     <!-- <button v-if="!isTesting"  @click.prevent="testUrl" class="btn my-btn-left" >Test</button>
                       <LoadingButton v-else buttonclass="btn my-btn-left pull-right">Testing...</LoadingButton> -->

                   </div>

                     
               </div>
           </div>
            <!-- <serverconfig2 :projectDocker="project.docker" :docker="docker" :projectId="id"></serverconfig2> -->
            </div>
          </div>
        </div>
     
         <!-- <LoadingButton v-if="loading" buttonclass=" well-btn btn btn-default pull-right"></LoadingButton> -->
       <!-- <myterminal :repository_url="project.repository_url" :bash="project.bash" @next="sendFile"></myterminal> -->

        <!-- SERVER SETUP -->
        <!-- start server-setup -->
   

         <div v-if="tab=='server'" >
             <form onsubmit="return false">


            <div class="row">
                <div class="col-md-8">
                    <!-- <h4>Snapcast</h4> -->
                    <!-- <p >{{project.repository_url}}</p> -->
                    <!-- <p>EDIT <i class="ion-edit"></i></p> -->
                </div>
            </div>


            <!-- <BannerError v-if="errorM" :exempt="true">{{  errorDocMsg }}</BannerError>
            <BannerSuccess v-if="successM" :exempt="true" >{{ successDocMsg }}</BannerSuccess> -->
           <div class="server-setup">
              <span class="server-heading">SERVER SETUP</span>
               <div class="row">
                    <div class="col-xs-6"  style="margin-top:29px !important">
                    <label for="username" class="repo-text">SSH HOST</label>
                       <input type="text" class="form-control" v-validate="'required'"
                        v-model="ssh.sshAddress"
                        name="sshAddress"
                      >

                   </div>

                   <div class="col-xs-6"  style="margin-top:29px !important">
                    <label for="" class="repo-text">SSH USERNAME</label>
                       <input type="text" class="form-control"
                       name="sshUsername" 
                       v-model="ssh.sshUsername">

                   </div>

               
                   <div class="col-xs-6"  style="margin-top:29px !important">
                    <label for="username" class="repo-text">SSH PORT</label>
                       <input type="text" class="form-control" v-validate="'required'"
                        v-model="ssh.port"
                        name="sshPort"
                       >

                   </div>

                    <div class="col-xs-6"  style="margin-top:29px !important">
                    <label for="password" class="repo-text">SSH PASSWORD</label>
                       <input type="text" class="form-control" v-validate="'required'"
                        v-model="ssh.sshPassword"
                        name="sshPassword"
                      >

                   </div>
                   <div class="col-xs-12"  style="margin-top:29px !important">
                    <label for="password" class="repo-text">PRIVATE KEY</label>
                       <textarea type="text" class="form-control" v-validate=""
                        v-model="ssh.privateKey"
                        name="privateKey" :rows="3"
                       ></textarea>

                   </div>

                   <div class="col-xs-6"  style="margin-top:29px !important">
                    <label for="password" class="repo-text">PASS PHRASE</label>
                       <input type="text" class="form-control" v-validate=""
                        v-model="ssh.passPhrase"
                        name="passphrase"
                      >

                   </div>
                       <div class="col-xs-6"  style="margin-top:29px !important">
                    <label for="username" class="repo-text">PROJECT PORT</label>
                       <input type="text" class="form-control" v-validate="'required'"
                        v-model="ssh.project_port"
                        name="project_port"
                      >

                   </div>
                   <div class="col-xs-12"  style="margin-top:29px !important">
                     <div v-show="openDial">
                      <div id="server-config" class="rectangle-4-copy">{{result}}</div>
                   <!-- <textarea id="server-config" v-model="result" type="text" class="form-control" ></textarea> -->
                     </div>
                   </div>

                  
                   <div class="col-xs-12"  style="margin-top:29px !important">
                       <label for=""></label>
                     <button v-if="!isTestingSsh"  @click="test" class="btn pull-left my-btn-right" >Test Configuration</button>
                       <LoadingButton v-else buttonclass=" btn pull-left my-btn-right">Testing...</LoadingButton>
                    <button  @click="validateBeforeSubmitSsh" v-if="!saving_ssh" class="btn my-btn-left pull-left" type="submit">Save</button>
                     <LoadingButton v-else buttonclass="btn my-btn-left pull-left">Saving...</LoadingButton>

                  
                   </div>
                    <div class="col-md-1">

                     <label for=""></label>
                     
                       <!-- <button class="btn btn-default">SAVE</button> -->
                   </div>
                   <!-- :class="{'dialog': openDial }" -->
                   <!-- <div class="col-md-8 dialog" v-if="openDial" :class="" >
                      hello
                   </div> -->
               </div>
           </div>
           </form>
        </div>  <!--end server setup-->


        </div>

    <Dialog :show="showDialog"  @close="showDialog = false">
            </Dialog>
       </div>

     </div>

</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import serverconfig2 from "./category";
import myterminal from "./terminal.vue";
import Dialog from '@/app/shared/modals/dialog.vue';

export default {
  name: "Profile",
  components: {
    myterminal,
    serverconfig2,
    Dialog
  },
  data() {
    return {
      result:'',
      bash: "",
      activeDocker: "",
      id: this.$route.params.id,
      openProfile: false,
      openSsh: false,
      openDocker: false,
      openDial: false,
      showDialog:false,
      show:false,
      test_result:'',
      text: '',
      message:'',
      savingDocker:false,
      tab:'repo',
      user: {
        url: "",
        username: "",
        password: ""
      },
      selected:"",
      ssh: {
        sshUsername: "",
        sshPassword: "",
        sshAddress: "",
        privateKey: "",
        passPhrase: "",
        project_port: ""
      },
       
        isTesting: false,
        isTestingSsh: false,
        saving_ssh: false,
        urlTestMessage: ""
    };
  },
  computed: {
    ...mapGetters("projects/byid", ["project",
                  "error", "docker", "errorMsg","success",
                  "dockerError", "successMsg",
                  "sshError", "sshSuccess","configTest"]),
    ...mapGetters("projects/byid",{
      saving:"loading"
    }),
    ...mapGetters("userCredentials", {
      userData: "user"
    }),
    ...mapGetters("projects/sshSetup", ["errorM","loading", "successM", "errorDocMsg", "successDocMsg"]),
    routeName() {
      //            return this.$route.name;
    },
    showDockerConfig(){
      return  typeof(this.selected)=="object";
    }

  },

  mounted() {
    this.fetchDocker();
    this.fetchSsh();
    this.activeDocker  = this.project.docker;
    debugger;
    // (this.user.url = this.project.repository_url),
    // (this.user.username = this.project.repository_username),
    // (this.user.password = this.project.repository_password);
  },
  created(){
      if(this.project.repository_url === null){
          this.showDialog=true;
          // this.$router.push('/user/project/asdsasd/modules')
          this.project.repository_url='';
      }
  },

  methods: {

    ...mapActions("projects/byid", ["updateProject", "getProjectById","setDefaultDocker","getDocker", "updateDocker","removeDocker","testConfig","createDocker","testGitUrl"]),
    ...mapActions("projects/sshSetup", ["updateSshDetails", "getSshDetails"]),
    ...mapActions("userCredentials", ["callWithToken"]),
  openAddModule() {
      this.showAddModuleModal = true;
    },
           remove(item){

            let self = this;
            let args = {
                Id: item.Id,
                team_Id : item.team_Id
            }
            this.$confirm(`Are you sure you want to delete ${item.name}?`, 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
            .then((res)=>{
                 this.callWithToken({
                 parameters: args,
                action: this.removeDocker
                })
                .then((res)=>{
                    self.fetchDocker()
                    self.selected ={};
                })
            })
        },
     test(){
      //  debugger;

      this.result="connecting...";
      this.isTestingSsh=true;
      var self=this;
     let args = {
            Id: this.id,
            ssh_username: this.ssh.sshUsername,
            ssh_password: this.ssh.sshPassword,
            ssh_address: this.ssh.sshAddress,
            ssh_passphrase: this.ssh.passPhrase,
            ssh_privatekey: this.ssh.privateKey,
            ssh_port: this.ssh.port,
            ssh_project_port : this.ssh.project_port

          };
            this.callWithToken({
              parameters: args,
                action: this.testConfig
                })
            .then(function(status) {
                // debugger;
                self.isTestingSsh=false;
                self.result+= "\n"+self.configTest;
                // this.isTesting=this.isTesting;
                // this.result=this.configTest;
                
          });
          // return;

          // alert();

  // debugger;


      this.openDial =true;
    },
    showSetUp(){
       // console.log(this.tab)
      this.tab = 'server'
      // console.log(this.tab)
    },
    showRepo(){
       // console.log(this.tab)
      this.tab = 'repo';
      // console.log(this.tab)
    },
    showConfig(){
       // console.log(this.tab)
      this.tab = 'config';
      // console.log(this.tab)
    },
    testUrl(){
          this.isTesting = true;
          this.urlTestMessage = "";
          var self = this;

          this.callWithToken({
                 parameters: this.user,
                action: this.testGitUrl
                })
          .then(function(result) {
//                self.urlTestMessage = result;
                self.$show_notification(result)
                 self.isTesting=false;
          });
    },
      saveDocker(){
                let self = this;
          
            this.$validator.validateAll()
            .then((result) => {
                    this.savingDocker = true;
                    let params = {};
                    if (result) {
                          params = {      projectId: this.project.Id,
                                    team_Id: this.userData.team_Id,
                                    name: this.selected.name,
                                    content: this.selected.content,
                              }
                        if (this.selected.Id) {
                           params['Id'] = this.selected.Id;
                        } 
                        this.callWithToken({
                                parameters: params,
                                action: this.createDocker
                            })
                            .then(function(status) {


                                if (status.error === undefined) {
                                    if (status.data.status === true) {
                                        debugger;
                                        self.$show_notification(status.data.message)
                                        self.fetchDocker()


                                    } else {
                                        self.$show_notification(status.data.message, "error")
                                    }
                                } else if (status.error) {
                                    self.$show_notification(status.error, "error")
                                    // BannerError will handle error
                                }
                                self.savingDocker = false;

                            });

                    }
                    else{
                       this.savingDocker = false;
                    }
        })
         },
           submit(item){
            // console.log(this.selectedId)
            // debugger;
            let self = this;
            let args = {
                    projectId: this.project.Id,
                    Id : item.Id
            }
            this.$confirm(`Are you sure you want to set ${item.name} as default ?`, 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then((res)=>{
            // console.log(this.selectedId)
            self.
            callWithToken(
            {
              parameters:args,
              action: self.setDefaultDocker
            })
                .then(function(status) {
                    // debugger;
                if(status.error === undefined){
                    if (status.data.status === true) {
                        self.$show_notification("Successfully updated Docker");
                        self.fetchUser()
                        .then((res)=>{
                            self.projectId = project.docker
                        })
                    }
                }

                else if(status.error !== undefined){
                    self.$show_notification(status.error, 'error');
                }
            });
        })
        },
      
    closeModal() {
      this.showDialog = false;
    },
    validateBeforeSubmitSsh(){
          this.saving_ssh = true;
          let args = {
            Id: this.id,
            ssh_username: this.ssh.sshUsername,
            ssh_password: this.ssh.sshPassword,
            ssh_address: this.ssh.sshAddress,
            ssh_passphrase: this.ssh.passPhrase,
            ssh_privatekey: this.ssh.privateKey,
            ssh_port: this.ssh.port ,
            ssh_project_port : this.ssh.project_port

          };

          const self = this;
          this.callWithToken({
              parameters: args,
              action: this.updateSshDetails
          }).then(function(status) {
              self.$show_notification(status);
              self.saving_ssh = false;
          });

    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          // Set arguments for endpoint
          let args = {
            id: this.id,
            Id: this.userData.Id,
            url: this.user.url,
            username: this.user.username,
            password: this.user.password,
            project_name: this.project.project_name
          };
          const self = this;

            this.callWithToken({
                parameters: args,
                action: this.updateProject
            }).then(function(status) {
            if (status.error) {
               self.$show_notification(status.error, "error")
              // alert()
            } else {
              // BannerError will handle error
               self.$show_notification(status.message)
               self.fetchUser()
            }
          });
          return;
        }
      });
    },
    openDialog(){
      this.openDial = !this.openDial
    },

    setUserDetails(){
        this.user.url = this.project.repository_url;
        this.user.username = this.project.repository_username;
        this.user.password = this.project.repository_password;
    },
    setSshDetails(){
        this.ssh.sshUsername = this.project.ssh_username;
        this.ssh.sshAddress = this.project.ssh_address;
        this.ssh.sshPassword = this.project.ssh_password;
        this.ssh.port = this.project.ssh_port;
        this.ssh.privateKey = this.project.ssh_privatekey
        this.ssh.passPhrase = this.project.ssh_passphrase
        this.ssh.project_port = this.project.project_port



    },
    fetchUser() {
          // if(this.project.repository_url !== undefined) {
          //     this.setUserDetails();
          //     return;
          // }


          this.callWithToken({
            parameters: {
              projectId: this.id
            },
            action: this.getProjectById
      })
      .then( status => {
          // Got user
              this.setUserDetails();
      })
    },
    fetchSsh() {
      this.callWithToken({
      parameters: {
        projectId: this.id
      },
      action: this.getProjectById
    })
      .then( status => {
          // Got user
          this.setSshDetails();
      })
    },
    toggleProfileBox() {
      if (!this.openProfile) {
        this.openProfile = true;

        // Get user details everytime profile box is toggled
        this.fetchUser();

        return true;
      }
      this.openProfile = false;
      return false;
    },
    toggleSshBox() {
      if (!this.openSsh) {
        this.openSsh = true;

        // Get user details everytime profile box is toggled
        this.fetchSsh();

        return true;
      }
      this.openSsh = false;
      return false;
    },

     setDocker(){
       this.user.url = this.project.repository_url;
    },
     fetchDocker() {

      this.callWithToken({
      parameters: {
        // Id: this.id,
        team_Id: this.userData.team_Id
      }, 
      action: this.getDocker
    })
      .then( status => {
          // Got docker
          // this.setDocker();
      })
    },
    editDocker(item){
      // alert(item)
      this.selected  = item;
      this.activeDocker = item.Id;
      // console,log(this.selected)
      },
      newDocker(){
        this.selected = {};
      },
    toggleDockerBox() {
      if (!this.openDocker) {
        this.openDocker = true;
        // Get user details everytime profile box is toggled
        this.fetchDocker();
        // this.getDefaultDocker();

        return true;
      }
      this.openDocker = false;
      return false;
    },
  

    sendFile(file) {
      this.callWithToken({
        id: this.projectId,
        content: file
      }).then(function(status) {
        if (status) {
          self.reloadStore("deleteCard", id);
        } else {
        }
      });
    }
  
  }
}
;
</script>

<style scoped>
.well.config-light-well {
  border: none;
  box-shadow: none;
  border-radius: 1px;
}
.well.config-personal {
    background: #fff;
    border: none;
    padding: 30px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
.well.config-personal h4 {
    text-transform: capitalize;
    font-weight: 900;
}
.dialog {
  width: 100%;
  height: 30px;
  background:#3369da;
}

div#personal-details_config {
  background: #fff;
  padding: 36px;
  border: none;
  border-radius: 1px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}
.button-layered-configuration button {
  padding: 7px 66px;
  border-radius: 1px;
}
.button-layered-configuration {
  text-align: center;
  margin-top: 8%;
}
.well.config-well {
  background: #fff;
  border: none;
  padding: 18px 24px 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}
.well{
  background-color: #fff !important
}
.well-btn{
  margin-top: 10px;
  width: 150px;
  margin-left: 10px;
}
.files{
  margin-top: 16px !important;
  margin-left: 96px !important;
  height: 21px;
  width: 37px;
  color: #453F3F;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: bold;
  line-height: 21px;
  margin-bottom: 15px !important;
}
.btn-well{
  margin:20px;
}
.well.config-well i {
  float: right;
  margin-top: -7% !important;
  font-size: 21px;
}
div#personal-details_repo {
  background: #fff;
  border: none;
  padding: 38px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}
textarea#server-config {
    height: 100px !important;
    background: #000;
    color: #04c504;
    font-family: monospace !important;
    font-size: 13px;
    text-align: left !important;
    resize: none;
    border: none !important;
    margin-bottom: 4%;
    padding: 13px;
}

.repo-marg button[data-v-8914b246] {
    /* width: 100%; */
    padding: 8px 40px;
    color: #3369da;
    margin-top: 7%;
    margin-right: 3%;
}
.repo-marg {
  margin-top: 3%;
}
.marg-2 {
  margin-top: 4%;
}
p.text-right.vrtt button {
    padding: 8px 40px !IMPORTANT;
    width: auto !important;
}
.open-config:hover{
cursor: pointer;
color:#316ada;
}
.my-side-nav{
  height: 90px;
  width: 100%;
  padding: 10px;
  text-align: center;
  border: 1px solid #EBECF4;
}
.my-side-nav-text{
  height: 18px;
  /*width: 72px;*/
  color: #453F3F;
  font-family: "Montserrat";
  font-size: 14px;
  line-height: 18px;


}
.my-side-nav:hover{
 background-color: #fff;
 cursor: pointer;


}
  .my-btn-right {
  height: 45px;
  width: 190px;
  border-radius: 3px;
  color: #fff;
  background-color: #FF5C72;
  box-shadow: 0 13px 13px -8px rgba(255,92,114,0.13);
  margin-right: 70px; 
}
.my-btn-left{
  height: 45px;
  width: 190px;
  color: #fff;
  border-radius: 3px;
  background-color: #326ADA;
  box-shadow: 0 13px 22px 5px rgba(50,106,218,0.16);
}

   .server-setup .my-btn-right {
  height: 45px;
  width: 311px;
  border-radius: 3px;
  color: #fff;
  background-color: #FF5C72;
  box-shadow: 0 13px 13px -8px rgba(255,92,114,0.13);
  margin-right: 59px; 
}
 .server-setup .my-btn-left{
  height: 45px;
  width: 311px;
  color: #fff;
  border-radius: 3px;
  background-color: #326ADA;
  box-shadow: 0 13px 22px 5px rgba(50,106,218,0.16);
}
.line {
  /*box-sizing: border-box;*/
  /*height: 3px;*/
  /*width: 100%;*/
  border-top: 1px solid #EBEBEB;
}
input{
  height: 49px !important;
    width: 450px !important;
  border: 1px solid #D6DAE5 !important;
   border-radius: 3px !important;
   background-color: #FFFFFF !important;
   margin-top: 12px !important;
 }
 textarea{
    width: 450px !important;
  border: 1px solid #D6DAE5 !important;
   border-radius: 3px !important;
   background-color: #FFFFFF !important;
   margin-top: 12px !important;
 }
 .server-heading{
  height: 33px;
  width: 154px;
  color: #453F3F;
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  line-height: 33px;
  margin-bottom: 43px;
  margin-top: 57px !important;
 }
 .rectangle-4-copy {
  height: 317px;
  width: 100%;
  border-radius: 3px;
  background-color: #050505;
  word-break: break-all;
  color: green
}
 .server-setup input{
height: 49px !important;
    width: 320px !important;
  border: 1px solid #D6DAE5 !important;
   border-radius: 3px !important;
   background-color: #FFFFFF !important;
   margin-top: 12px !important;
 }
  .server-setup textarea{
     width: 100% !important;
  border: 1px solid #D6DAE5 !important;
   border-radius: 3px !important;
   background-color: #FFFFFF !important;
   margin-top: 12px !important;
 }
 .bar {
  height: 8px;
  width: 40px;
  border-radius: 4.5px;
  background-color: #FFD173;
  margin-top:10px;
  margin-bottom: 15px;
  display: block;
}
.repo-text{
  height: 16px;
  width: 450px !important;
  color: #453F3F !important;
  font-family: "Montserrat" !important;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 16px;
  text-align: left;
  margin-bottom: -10px !important;
}

.nav {
   /* left:50%;
    margin-left:-150px;
    top:50px;
    position:absolute;*/
}
.nav>li>a:hover, .nav>li>a:focus, .nav .open>a, .nav .open>a:hover, .nav .open>a:focus {
    background:#fff;
}
.dropdown {
    background:#fff;
    border:1px solid #ccc;
    border-radius:4px;
    width:300px;    
}
.dropdown-menu>li>a {
    color:#428bca;
}
.dropdown ul.dropdown-menu {
    border-radius:4px;
    box-shadow:none;
    margin-top:20px;
    width:200px;
}
.dropdown ul.dropdown-menu:before {
    content: "";
    border-bottom: 10px solid #fff;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    top: -10px;
    right: 16px;
    z-index: 10;
}
.dropdown ul.dropdown-menu:after {
    content: "";
    border-bottom: 12px solid #ccc;
    border-right: 12px solid transparent;
    border-left: 12px solid transparent;
    position: absolute;
    top: -12px;
    right: 14px;
    z-index: 9;
}
.master{
  height: 49px;
  width: 224px;
  border: 1px solid #D6DAE5;
  border-radius: 3px;
  background-color: #FFFFFF;
}
.project-name{
  height: 33px;
  width: 143px;
  color: #453F3F;
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: bold;
  line-height: 33px;
}
.project-repo{
  height: 18px;
  width: 286px;
  color: #453F3F;
  font-family: "Montserrat";
  font-size: 14px;
  /*line-height: NaNpx;*/
}
.active-tab{
 background-color: #fff
}
.active-bar{
   height: 30px;
  width: 3px;
  border-radius: 100px 0 0 100px;
  background: linear-gradient(180deg, #61A3EF 0%, #326ADA 100%);
  margin-top: 0;
  margin-bottom: 0;
  display: block;
  float: right;
    margin-right: -10px;
}
.my-icon{
  height: 49px;
  width: 56px;
  border: 1px solid #D6DAE5;
  border-radius: 3px 0 0 3px;
  background-color: #FFFFFF;
}
.docker-side-bar{
    background-color: #fff;
    min-height: 270.99px;
    margin-left: -15px;
    margin-top: -15px;


}
.docker-config-text
{
  height: 17px;
  width: 72px;
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 13px;
  font-weight: bold;
  line-height: 17px;
}
.btn-remove-all{
  height: 30px;
  width: 120px;
  border: 1px solid #D6DAE5;
  border-radius: 15px;
  box-shadow: 0 13px 22px 5px rgba(50,106,218,0.06);
}
.btn-remove-all-text{
  /*height: 13px;*/
  /*width: 67px;*/
  color: #8C8989;
  font-family: "Montserrat";
  font-size: 10px;
  font-weight: bold;
  margin:7px;
  /*line-height: 13px;*/
  /*margin-top: 4px;*/
  /*margin-bottom: 3px;*/
}
.docker-file:hover .docker-file-text{
  color:#fff;
}
.docker-file:hover .docker-file-trash-icon{
  color: #fff;
}
.docker-file:hover .docker-file-trash-icon{
  color: #fff;
}
.docker-file:hover{
  height: 50px;
  width: 100%;
  border-radius: 3px;
  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  box-shadow: 0 13px 35px -3px rgba(50,106,218,0.29);
}
.docker-active{
  height: 50px;
  width: 100%;
  border-radius: 3px;

  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  box-shadow: 0 13px 35px -3px rgba(50,106,218,0.29);
  cursor: pointer;
}
.docker-active .docker-file-text{
  color:#fff;
}
.docker-file{
  height: 50px;
  width: 100%;
  cursor: pointer;
}
.oval-trash{
      border: 1px solid #D6DAE5;
    border-radius: 50%;
    height: 27px;
    /* width: 31px; */
    padding: 5px;
    cursor: pointer;
}
.oval-check-mark{
      border: 1px solid #D6DAE5;
    border-radius: 50%;
    height: 27px;
    /* width: 31px; */
    padding: 8px;
    cursor: pointer;

}
.oval-check-mark:hover{
      /*border: 1px solid #fff;*/
    height: 27px;
    color: #fff;
    /* width: 31px; */
    /*padding: 8px;*/
    cursor: pointer;

}
.oval-check-mark:hover{
      /*border: 1px solid #fff;*/
    height: 27px;
    /* width: 31px; */
    /*padding: 8px;*/
    color: #fff;
    cursor: pointer;

}
.docker-file-text {
  height: 18px;
  width: 114px;
  color: #413E3E;
  font-family: "Montserrat";
  font-size: 14px;
  line-height: 18px;
  margin-left: 13px;
  margin-top: 16px;
  overflow: hidden;
  display: inline-block;
}
.new-config {
  height: 16px;
  width: 100%;
  color: #D6DAE5;
  font-family: "Montserrat";
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 16px;
  text-align: center;
}
 .chat-bubble{
       background: #FF5C72;
    border-radius: 50%;
    padding: 11px 17px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);
    margin-left: 40%
}
</style>
