<template>
  <div class="seived-module">
  <!--<p class="steps-modules">Step 1 0f 5</p>-->
    <div class="creat-modules">
      <!-- <label for="">MODULE TEST CASES</label> -->
      <!-- {{testCases}} -->
      <!-- <div class="row" align="right"> -->
      <!-- </div> -->
        <div class="row">

            <div class="col-md-4">
							<FileUpload @refresh="refreshList"></FileUpload>
			 </div>
			 <div class="col-md-8 file-list">
								<NoFile v-if="uploads.length === 0 && files.length === 0">You do not have any Files</NoFile>
								<div class="" v-for="d in uploads">
									<FileCard class="col-md-4" :file="d" @selected="fileShare" @removed="removeFile" @refresh="refreshList"/>
								</div>
								<div class="" v-for="c in files" >
									<FileCard class="col-md-4" :file="c" @selected="fileShare" @removed="removeFile" @refresh="refreshList"/>
								</div>
					</div>
            </div>

           </div>

      <div class="row" style="">
          <div class="col-xs-9" >
              <button class="btn btn-back" @click="goBack" style="">
                  BACK
              </button>
          </div>
          <div class="col-xs-2" >
              <p class="text-right next-buttontwo">
                  <button class="btn btn-default but" @click="nextStep" style=" ">
                      NEXT
                  </button>
              </p>
          </div>
      </div>
     <!--<div class="fortifift" style="">-->

       <!--<div class="dotbar">-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
         <!--<span class="dotbar-item&#45;&#45;filled"></span>-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
          <!--<button class="btn btn-back" @click.stop="goBack" style="color:#439cfa !important; margin-top: -21%">-->
            <!--BACK-->
          <!--</button>-->
       <!--</div>-->

         <!--<p class="text-right next-buttontwo">-->


          <!--<button style="display:none"></button>-->

          <!--<button class="btn btn-default" @click="nextStep" style="color:#fff !important; margin-top: -59%">-->
            <!--NEXT-->
          <!--</button>-->
        <!--</p>-->
     <!--</div>-->
  </div>
</template>


<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex';
import FileUpload from '@/app/shared/fileUpload';
import FileCard from './FileCard';
import NoFile from '@/app/shared/noContentError';

	export default {
		data(){
			return {
				upload: true,
				selectedFiles: [],
			}
		},
		components: {FileUpload,FileCard, NoFile},
		mounted () {
	      this.getUploads();
	      this.getShared();
	      this.clearErrors();
	    },
	    methods: {

	      getUploads() {
	        // Get client team data
	        // debugger;
	          this.callWithToken({
	          parameters: {
	            team: this.user.team_Id, // clients team id
	            user: this.user.Id, // clients user id
	          },
	          action: this.fetchUploads,
	        });
	      },
	      getShared() {
	        // Get client team data
	        // debugger;
	          this.callWithToken({
	          parameters: {
	            team: this.user.team_Id, // clients team id
	            user: this.user.Id, // clients user id
	          },
	          action: this.fetchShared,
	        });
	      },

	      deleteFiles(id){
	        // console.log(id);
	        this.callWithToken({
	        parameters: {
	          file: id, // clients team id
	          user: this.user.Id, // clients team id
	          team: this.user.team_Id,
	        },
	        action: this.deleteUploaded,
	      });
	      },
	      fileShare(files){
	        this.selectedFiles.push(files);
	      },
	      removeFile(file){

	      	var index = this.selectedFiles.indexOf(file);
	      	if(index > -1){
	      		this.selectedFiles.splice(index, 1);
	      	}
	      },
	      refreshList(){
	      	this.getUploads();
	      	this.getShared();
	      },
	      nextStep(){
					this.$emit('next',this.selectedFiles);
				},
				goBack(){
					this.$emit('back');
				},
	      ...mapActions('userCredentials', [
	        'callWithToken',
	      ]),
	      ...mapActions('team', [
	        'getClientTeam',
	      ]),
	      ...mapActions('projects/FileShare', [
	          'fetchUploads',
	          'fetchShared',
	          'shareThisFile',
	          'deleteUploaded',
	          'clearErrors',
	          'downloader'
	      ]),

	    },
	    computed: {
	      ...mapGetters('team', [
	        'team',
	        'loading',
	        'error',
	      ]),
	      ...mapGetters('userCredentials', ['user',]),
	      ...mapGetters('projects/FileShare', ['uploads','files','error']),



	    },

	}
</script>

<style type="text/css">
    .btn.btn-default.but{
        border: none;
        background: #326ada;
        color: #fff;
        border-radius: 3px;
        /*font-family: Montserrat;*/
        /*border-radius: 8px !important;*/
        padding: 8px 40px;
    }
    .btn-back{
        border: 1px solid #326ada !important;
        color: #326ada !important;
        background: #fff !important;
        padding: 8px 40px;
    }
	 .fortifift {
      margin-top: 4.5% !important;
      position: absolute !important;
      margin-left: 96% !important;
    }

    /*.fortifift button {*/
      /*background: #439cfa !important;*/
    /*}*/
		.file-list {
			height: 300px;
			overflow-y: scroll;
		}
</style>
