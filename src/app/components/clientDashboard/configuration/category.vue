<template>
	<span>


        <!-- item.Id == selectedId || -->

	<div class="well  creat-modules" >

        <!-- id="personal-details_catego" -->
	     <div class="row">
            <!-- {{docker}} -->
	       <div @click="mySelect(item)" class="col-md-6 demo"
                style="cursor: pointer;" :class='{"blue" :  item.Id==projectDocker}'
                v-for="item in docker" :key="item.Id" >
	       	<!-- <div class="media"  >
	       				  <div class="media-left">
	       				    <img :src="require('@/assets/img/zeedas-png.png')" class="media-object" style="width:50px, border-radius:50%;">
	       				  </div>
	       				  <div class="media-body">
	       				    <h4>{{item.name}}</h4>
	       				    <p>June 24 2017</p>

	       				  </div>
	       				</div> -->
	       			<div class="media">
					  <div class="media-left">
					    <img :src="require('@/assets/img/zeedas-png.png')" class="media-object" style="width:40px; height:40px; border-radius:50%;">
					  </div>
					  <div class="media-body" >
					    <h5><b>{{item.name}}</b>

					    <small style='float: right'>
                            <el-tooltip class="item" effect="dark" content="View Docker" placement="top">
                                <i class="ion-eye" @click="viewDocker(item)" type="a"></i>
                            </el-tooltip>
                        &nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="Edit Docker" placement="top">
                                <i class="ion-edit" @click="editDocker(item)"  type="a"></i>
                            </el-tooltip>
                        
                            &nbsp;&nbsp;
                            <el-tooltip class="item" effect="dark" content="Delete Docker" placement="top">
                                <i class="ion-ios-trash"  @click="remove(item)" type="a"></i>
                            </el-tooltip>
                        
                        &nbsp;&nbsp;

                        <el-tooltip class="item" effect="dark" content="Mark As Default" placement="top">
                        <i class="ion-checkmark-circled" v-show="item.Id !== projectDocker"  @click="submit(item)" type="a"></i>
                            </el-tooltip>
                        

                         </small>
                         </h5>
					  </div>
					</div>
	       </div>


	     </div>


        <!--view Docker detail-->
<el-dialog :visible="view"
      width="40%"
      :show-close="false"
        class="ele_Dialogue">
        <div slot="title">
          <button type="button" class="close" @click.stop="closemodal">×</button>
					<h4 class="modal-title" id="myModalLabel2"> Docker Detail</h4>
        </div>

         <!--Modal content-->
        <div class="container-fluid">
					<div class="">
                    <label for="password">Docker Name</label>
                       <input readonly class="form-control" v-model="selectedName" type="text" name="" id="">
                    </div>
					<div class="">

                    <label for="password"> Docker Content </label>
                    <textarea readonly id="" class="form-control server-config" v-model="selectedContent"  type="text" name="" > </textarea>

                   </div>
                   <div class="">
                    <div class="fortifift">

                    </div>
				</div>
        </div>



    </el-dialog>


<el-dialog :visible="show"
      width="40%"
      :show-close="false"
        class="ele_Dialogue">
        <div slot="title">
          <button type="button" class="close" @click.stop="closemodal">×</button>
					<h4 class="modal-title" id="myModalLabel2">Edit Docker Detail</h4>

      <!--     <BannerSuccess v-if="successNewDocker" >{{ successNewDockerMsg }}</BannerSuccess>
          <BannerError v-else-if="errorNewDocker" >{{ errorNewDockerMsg }}</BannerError> -->
        </div>


         <!--Modal content-->
        <div class="container-fluid">
					<div class="">
                    <label for="password">Docker Name</label>
                       <input class="form-control" v-model="selectedName" type="text" name="" id="">
                    </div>
					<div class="">

                    <label for="password"> Docker Content </label>
                       <textarea id="" class="form-control server-config" v-model="selectedContent"  type="text" name="" id=""></textarea>

                   </div>
                   <div class="">
                    <div class="fortifift">
                        <p class="text-right next-button">
                            <button style="display:none"></button>
                            <button class="btn btn-default" v-if="!loading" @click="editSave" style="color:#fff !important;">
                                Save
                            </button>
                            <LoadingButton v-else buttonclass="btn btn-default"> Saving...</LoadingButton>
                        </p>
                    </div>
				</div>
        </div>



    </el-dialog>

    <el-dialog :visible="showNew"
      width="40%"
      :show-close="false"
        class="ele_Dialogue">
        <div slot="title">
          <button type="button" class="close" @click.stop="closemodal">×</button>
					<h4 class="modal-title" id="myModalLabel2">New Docker Detail</h4>

<!--           <BannerSuccess v-if="successNewDocker" >{{ successNewDockerMsg }}</BannerSuccess>
          <BannerError v-else-if="errorNewDocker" >{{ errorNewDockerMsg }}</BannerError> -->
        </div>


         <!--Modal content-->
        <div class="container-fluid">
					<div class="">
                     <label for="dockerName">Docker Name</label>
                       <input v-validate="'required'"  class="form-control"
                       v-model="dockerName" type="text" name="dockerName" id=""
                       :class="{'input': true, 'is-danger': errors.has('dockerName') }">
                       <i v-show="errors.has('dockerName')" class="fa fa-warning"></i>
                        <span v-show="errors.has('dockerName')" class="help is-danger">{{ errors.first('dockerName') }}</span>
                    </div>

					<div class="">
                    <label for="password">Docker Content</label>
                       <textarea style="height:300px!important" id="" class="form-control server-config" v-model="dockerContent"  type="text" name="" id=""></textarea>
                   </div>

                <div class="">
                 <div class="fortifift">
                    <p class="text-right next-button">
                        <button style="display:none"></button>
                        <button class="btn btn-default" v-if="!loading" @click="newSave" style="color:#fff !important;">
                            Save
                        </button>
                        <LoadingButton v-else buttonclass="btn btn-default">Saving...</LoadingButton>
                    </p>
                </div>
				</div>
        </div>
    </el-dialog>

            <div class="fortifift">
                <!-- <p class=" next-button">
                    <button style="display:none"></button>
                    <button class="btn btn-default" v-if="!loading" @click="submit" style="color:#fff !important;">
                        Set as Default
                    </button>
                    <LoadingButton v-else buttonclass="btn btn-default"> Saving...</LoadingButton>
                </p> -->
                <p class=" next-button">
                    <button style="display:none"></button>
                    <button class="btn btn-default" v-if="!loading" @click="newDocker" style="color:#fff !important;">
                        New Docker
                    </button>
                    <LoadingButton v-else buttonclass="btn btn-default"> Saving...</LoadingButton>
                </p>
            </div>

	   </div>
	<serverconfig2 v-show="serverconfig"></serverconfig2>
	<RepoView v-show="serverconfig2"></RepoView>
</span>
</template>
<script>
import { mapGetters , mapActions, mapMutations} from 'vuex';
import serverconfig2 from './launchterminal';
import RepoView from './serverconfig'

export default {
    name: 'config2repo',
    props: ['docker', 'projectId','projectDocker'],
    components: {
        serverconfig2,
        RepoView,
    },
    data(){
    	return{
            show: false,
            showNew: false,
            view: false,
            category:true,
            selectedId: "",
            selectedName: "",
            selectedContent: "",
    		serverconfig2:false,
            serverconfig: false,
            //  isClicked: false,
             dockerId: '',
             dockerName: '',
             dockerContent: '',
    	}
    },
    mounted(){
        
       
    },
     watch:{
    success(){
      var self = this;
    self.$show_notification(self.successDocker)


    },
    errorNewDocker(){
       let self = this;
     self.$show_notification(self.errorNewDockerMsg || self.successDocker,'error');

    },
    successNewDocker(){
      let self = this;
     self.$show_notification(self.successNewDockerMsg);
  }
},
    // destroyed () {
    //     this.$_$destroyedHook(['resetState'])
    //   },
    computed: {

         ...mapGetters("projects/byid", ["error", "success", 'successMsg', "errorNewDocker", "project",
                    "successNewDocker", "errorDocker", "successDocker", "loading", 'loadings',
                    // "successUpdateDocker", "successUpdateDockerMsg", "errorUpdateDocker", "errorUdateDockerMsg"
                ,"errorNewDockerMsg","successNewDockerMsg",]),
    ...mapGetters("userCredentials", {
      userData: "user"
    }),
         routeName() {
            return this.$route.name;
         },
    },
methods: {
        // ...mapActions({editUser: "auth/editUser"}),
        ...mapActions("projects/byid",["updateDocker", "setDefaultDocker", "getProjectById", "getDocker", "resetState", "createDocker","updateDocker", "removeDocker"]),
        ...mapActions("userCredentials", ["callWithToken", ]),

        fetchUser() {
         
          this.callWithToken({
            parameters: {
                projectId: this.projectId
            },
            action: this.getProjectById
            })
                .then( status => {
                    // Got user
                })
            },
        openserver_config(){
        	this.serverconfig = true;
        	this.category = false;
        },
        openserver_newrepo(){
        	this.serverconfig2 = true;
        	this.category = false;
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
                this.removeDocker(args)
                .then((res)=>{
                    self.fetchDocker()
                })
            })
        },

        // isClicked(){
        //     this.clicked = !this.clicked
        // },
        mySelect (docker){
            // this.isClicked = !this.isClicked
            this.selectedId = docker.Id,
            this.selectedName =docker.name,
            this.selectedContent = docker.content;
            // this.projectDocker=null;
            console.log('projectDocker', this.projectDocker)
            console.log('docerId', docker.Id)

        },
        // edit(){
        //     if(this.isClicked){

        //     }
        // },
        submit(item){
            console.log(this.selectedId)
            debugger;
            let self = this;
            let args = {
                    projectId: this.projectId,
                    Id : item.Id
            }
            this.$confirm(`Are you sure you want to set ${item.name} as default ?`, 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then((res)=>{
            console.log(this.selectedId)
            self.setDefaultDocker(args)
                .then(function(status) {
                    debugger;
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
            // if(this.selectedId.length !== 0){
          return;

            // }


        },
        newSave(){
            let self = this;
            // let args = {
            //     // projectId: this.projectId,
            //     team_Id: this.userData.team_Id,
            //     name: this.dockerName,
            //     content: this.dockerContent,
            // }
            this.$validator.validateAll()
            .then((result )=> {
                if(result){
                     this.callWithToken({
                parameters: {
                    projectId: this.id,
                    team_Id: this.userData.team_Id,
                    name: this.dockerName,
                    content: this.dockerContent,
                },
                action: this.createDocker
                })
            .then(function(status) {
                debugger;


                    if(status.error === undefined){
                if (status.data.status === true) {
                    debugger;
                    self.$show_notification(status.data.message)
                    self.closemodal()

                    self.fetchDocker()
                    self.dockerName = '';
                    self.dockerContent= '';
                    self.clearFields();

                }
                else {
                    self.$show_notification(status.data.message, "error")
                }
            }
             else if (status.error) {
                self.$show_notification(status.error, "error")
              // BannerError will handle error
            }

           });
          return;
                }
            })



        },
        fetchDocker() {
            debugger;
            this.callWithToken({
            parameters: {
                // Id: this.id,
                team_Id: this.userData.team_Id
            },
            action: this.getDocker
            })
                .then(result=>{
                    debugger;
                })

        },
        editDocker(edit){
            this.show = true
        },
        viewDocker(){
            this.view = true
        },
        closemodal(){
            this.show = false;
            this.showNew = false;
            this.view = false;
        },
        newDocker(){
            this.showNew = true;
        },
        editSave(){
            let self = this;
            // let args = {
            //     // projectId: this.projectId,
            //     Id: this.selectedId,
            //     team_Id: this.userData.team_Id,
            //     name: this.selectedName,
            //     content: this.selectedContent,
            // }
            this.callWithToken({
               parameters: {
                    Id: this.selectedId,
                    team_Id: this.userData.team_Id,
                    name: this.selectedName,
                    content: this.selectedContent,
                },
                action: this.createDocker
                })
            .then(function(status) {
                debugger;
            if(status.error === undefined){
                if (status.data.status === true) {
                    debugger;
                    self.$show_notification(status.data.message)
                    self.fetchDocker()
                    self.closemodal()
                    self.clearFields();
                }
                else {
                    self.$show_notification(status.data.message, "error")
                }
            }
             else if (status.error) {
                self.$show_notification(status.error, "error")
              // BannerError will handle error
            }
          });
          return;
        }
      }
    }




</script>

<style scoped>
.demo {
    margin-bottom: 20px;
    padding: 10px;
    /*max-height: 75px;*/
    word-break: break-all;
    border: 1px white solid;
}
.blue {
  /* background-color: red; */
    border: 1px blue solid
}
.well.config-light-well {
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
.newcategory i {
    font-size: 39px;
    color: #3369da;
}

.newcategory {
    text-align: center;
    margin-top: 24%;
}


div#personal-details_config {
    background: #fff;
    padding: 36px;
    border: none;
    border-radius: 1px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
textarea.server-config {
    height: 200px !important;
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
.button-layered-configuration button {
    padding: 7px 66px;
    border-radius: 1px;
}
.next-button button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}
.fortifift button {
    background: #3369da;
    color: #fff !important;
    font-size: 13px;
    font-weight: 900 !important;
}
.button-layered-configuration {
    text-align: center;
    margin-top: 8%;
}
.well.config-well {
    background: #fff;
    border: none;
    padding: 18px 24px 10px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
.well.category-personal {
    background: #fff;
    border: none;
    padding: 18px 24px 10px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
.creat-modules textarea{
     max-width: 100%;
    margin-bottom: 3%;
    height: 115px;
    resize: none;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}

.well.config-well i{
    float: right;
    margin-top: -1% !important;
    font-size: 21px;
}
div#personal-details_repo {
    background: #fff;
    border: none;
    padding: 38px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
.repo-marg button {
    width: 100%;
    color: #3369da;
}
.repo-marg{
    margin-top: 3%;
}
.media-object {
    display: block;
    height: 50px;
}

.person-selected {
    box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
    border-radius: 1px;
    border: 1px solid #3469da;
    text-align: center;
}


.creat-modules textarea{
     max-width: 100%;
    margin-bottom: 3%;
    height: 115px;
    resize: none;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.modules{
     background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
.modules hr {
    background: #326ADA;
    height: 2px;
    border-top: none;
    width: 50%;
}
.modules h3{
    font-weight: 500;
    margin-top: -2%;
}
.modules p{
    font-size: 10px;
}

.modal-header {
    padding: 30px;
    border-bottom: 1px solid rgba(229, 229, 229, 0);
}
button.btn.btn-default.grp-btn {
    border-radius: 50%;
    margin-left: 10px;
    color: #326ada !important;
    border: 1px solid #326ada;
}
.templ {
    position: relative;
    margin-top: 5%;
    margin-bottom: 10%;
}

.creat-modules {
    background: transparent;
    border: 0px !important;
    -webkit-box-shadow: none;
    box-shadow: none;
    margin-top: 3%;
    border-radius: 1px;
}
.well.proj-type-well.active {
    border: 2px solid #3369da !important;
    margin-top: -18% !important;
}
.well.proj-type-well:hover {
    border: 1px solid #3369da !important;
}
.well.proj-type-well h4 {
    font-weight: 900;
}
.well.proj-choose-well h4 {
    font-weight: 900;
}

.well.proj-type-well i {
    color: #3369da;
    font-size: 63px;
}

.well.proj-choose-well i {
    color: #3369da;
    font-size: 40px;
}

.well.proj-type-well p {
    font-size: 11px;
}

.well.proj-type-well {
    background: white;
    cursor: pointer;
    border: 0px solid #ddd !important;
    border-radius: 1px;
    transition: all .5s ease;
    padding: 30px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}
.assing-dev-butt-jam {
    padding: 7px 48px;
    border: 1px solid #ddd !important;
}
.well.proj-choose-well {
    background: white;
    cursor: pointer;
    min-height: 358px;
    max-height: 357px;
    border: 0px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    -webkit-box-shadow: none !important;
    box-shadow:none !important;
}
.well.proj-reach-well {
    background: white;
    border: 1px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}
.ovrf{
    overflow-y: overlay;
    overflow-x: hidden;
}
.ovrf:hover::-webkit-scrollbar{
     width: 5px;
     transition: all 1s ease;
}
.ovrf::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.ovrf::-webkit-scrollbar-thumb {
    border-radius: 50px;
   /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
   background-color: #848484;
   transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.ovrf::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
}
.dactive:before {
    content: "\f382";
    position: absolute;
    font-family: Ionicons;
    color: green;
    top: 7%;
    right: 7%;
    border: 1px solid green;
    font-size: 20px;
    padding: 3px 6px;
    border-radius: 50%;
}
.well.proj-choose-well input{
   /* margin-bottom: 9%; */
}
button{
    font-family: 'Open Sans' !important;
}
</style>
