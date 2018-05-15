<template>

    <div >
      <div class="progress-head m-t-0 top lh-2-9">Files</div>

      <div class="row">
        <div class="col-md-4">
          <div class="files-container p-t-35 js-pscroll">

            <div class="row" >

                <div class="col-xs-12" >
                    <div class="row" >
                        <NoFile v-if="setUploads.length === 0 && setFiles.length === 0" 
                        >
                          <span style="font-size: 16px">You do not have any Files</span></NoFile>
                        <div class="" v-for="(d, index) in setUploads">
                            <FileCard class="col-xs-12" :file="index" @shareFile="fileShare"
                                      :type="upload" @refresh="refresh"/>
                        </div>
                        <div class="" v-for="c in setFiles" >
                            <FileCard class="col-xs-12" :file="c" @shareFile="fileShare" @refresh="getShared"/>
                        </div>
                    </div>
                </div>

              <!--<div class="col-xs-12 eachUpload" @click="viewFile()">-->
                <!--<div class="row" >-->
                  <!--<div class="col-xs-3" style="padding: 17px;" >-->
                    <!--<div v-if="removeFile" class="oval-1" style="margin:auto;" >-->
                      <!--<i class="ion-close-round"></i>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="col-xs-8 uploaded" >-->
                    <!--<div class="row" >-->
                      <!--<div class="col-xs-2" >-->
                        <!--<i class="ion-document-text" ></i>-->
                      <!--</div>-->
                      <!--<div class="col-xs-10" >-->
                        <!--<p class="doc"><b class="text-left">Docker file</b> <b class="pull-right">2.09 KB</b></p>-->
                      <!--</div>-->

                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

            </div>

          </div>

        </div>

        <div class="col-md-8">
          <div class="upload-container p-t-50 js-pscroll">
            <ul>
                <FileUpload @refresh="getUploads"></FileUpload>
            </ul>
          </div>
        </div>

    <!--<div class="zeedas-project-actitity">-->

        <!--<div class="container">-->
           <!--<div class="col-md-12">-->
             <!--<h1>Upload Files-->
              <!--</h1>-->
            <!--<FileUpload @refresh="getUploads"></FileUpload>-->
            <!--&lt;!&ndash; Create Table           &ndash;&gt;-->


          <!--</div>-->

           <!--<div class="col-md-12">-->
            <!--&lt;!&ndash; <BannerError v-if="error">Failed to Delete, Please Try again...</BannerError> &ndash;&gt;-->
            <!--&lt;!&ndash; <BannerSuccess v-else>Deleted Successfully...</BannerSuccess> &ndash;&gt;-->
               <!--<NoFile v-if="setUploads.length === 0 && setFiles.length === 0">You do not have any Files</NoFile>-->
               <!--<div class="" v-for="(d, index) in setUploads">-->
                   <!--<FileCard class="col-xs-12" :file="index" @shareFile="fileShare"-->
                             <!--:type="upload" @refresh="refresh"/>-->
               <!--</div>-->
               <!--<div class="" v-for="c in setFiles" >-->
                   <!--<FileCard class="col-xs-12" :file="c" @shareFile="fileShare" @refresh="getShared"/>-->
               <!--</div>-->
           <!--</div>-->
        <!--</div>-->

      <!--</div>-->


        <FileView :show.sync="showFile"  @close="closeFile"></FileView>


    </div>
    </div>

</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex';
import FileUpload from '../../shared/fileUpload';
import FileCard from '../../shared/cards/FileCard';
import NoFile from '../../shared/noContentError';
import FileView from '../../shared/modals/fileViewModal';



export default {
    name: "file-share",
    props: ['id'],
    components: {
      FileUpload,
      FileCard,
      NoFile,
      FileView,
    },
    data() {
        return {
          allFiles: [],
          recentFiles: [],
          selectedFiles: [],
          upload: true,
          removeFile: false,
            showFile: false,
        }
    },
    mounted () {
      this.getUploads();
      this.getShared();
      this.fetchTeam();
      this.clearErrors();
    },

    destroyed () {
    },
    methods: {
      viewFile(){
          this.showFile = true;
          this.removeFile = true;
      },
      closeFile(){
          this.showFile = false;
      },
      fetchTeam() {
        // Get client team data
        // debugger;
          this.callWithToken({
          parameters: {
            id: this.user.team_Id, // clients team id
            // id: this.user.Id, // clients team id
          },
          action: this.getClientTeam,
        });
        this.callWithToken({
        parameters: {
          id: this.user.Id, // clients team id
        },
        action: this.getProjects,

      }).then(()=>{
        this.currrentProject = this.projects.filter(e=>e.Id === this.$route.params.id);
      });
      },
      refresh(){
        this.getUploads();
        this.getShared();
      },
      getUploads() {
        // Get client team data
        // debugger;
          this.callWithToken({
          parameters: {
            team: this.$route.params.id, // clients team id
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
            team: this.$route.params.id, // clients team id
            user: this.user.Id, // clients user id
          },
          action: this.fetchShared,
        });
      },

      deleteFiles(id){
        console.log(id);
// koirw
      //   this.callWithToken({
      //   parameters: {
      //     file: id, // clients team id
      //     user: this.user.Id, // clients team id
      //     team: this.user.team_Id,
      //   },
      //   action: this.deleteUploaded,
      // });
      },
      fileShare(file,id){
            this.callWithToken({
              parameters: {
                file: file, // clients team id
                user: id, // clients team id
              },
              action: this.shareThisFile,
            });
            this.getUploads();
            this.getShared();

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
      ...mapActions('team/getProjects', [
      'getProjects',
      'resetState'
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
      setUploads: function(){
        return this.uploads;
      },
      setFiles: function(){
        return this.files;
      },


    },

}
</script>
<style scoped>
    .files-container:hover::-webkit-scrollbar{
        width: 5px;
        transition: all 1s ease;
    }
    .files-container::-webkit-scrollbar {
        width: 0px;

        transition: all 1s ease;
    }
    .files-container::-webkit-scrollbar-thumb {
        border-radius: 50px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
        background-color: #848484;
        transition: all 1s ease;
        /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
    }
    .files-container::-webkit-scrollbar-track {
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
        border-radius: 50px;

        transition: all 1s ease;
    }

  .uploaded{
    height: 50px;
    padding: 16px;
    color: #453F3F;
    font-family: Montserrat;
    font-size: 14px;
    line-height: 18px;
  }
  .uploaded:hover{
    transition: 0.3s ease-in-out;
    border-radius: 3px;
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    box-shadow: 0 13px 35px -3px rgba(50,106,218,0.29);
    color: #fff;
  }
  .eachUpload{
    padding: 18px;

    border-bottom: 1px solid rgba(214,218,229,0.42);
  }
  .rem{
    color: #8C8989;
    font-family: Montserrat;
      font-size: 10px;
  }

  .oval{
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 1px solid #D6DAE5;

    color: #d6dad5;
    font-size: 14px;
    font-family:  Montserrat;
    text-align: center;
  }
  .oval:hover {
    box-shadow: 0 13px 22px 5px rgba(50, 106, 218, 0.06);
    cursor: pointer;
  }
  .oval-1{
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 1px solid #D6DAE5;

    color: #d6dad5;
    font-size: 14px;
    font-family:  Montserrat;
    text-align: center;
  }
  .oval-1:hover{
    box-shadow: 0 13px 22px 5px rgba(50,106,218,0.06);
    cursor: pointer;
    transform: scale(1.005);
    transition: 0.3s ease-in;
  }

  .bar{
    height: 30px;
    width: 120px;
    border-radius: 15px;

    border: 1px solid #d6dae5;
    margin-left: +53px;
    padding: 4px;
  }
  .bar:hover{
    transform: scale(1.005);
    transition: 0.3s ease-in-out;
    cursor: pointer;
    box-shadow: 0 13px 22px 5px rgba(50,106,218,0.06);
  }
  .file{
  color: #8C8989;
  font-size: 13px;
  font-family: Montserrat;
  font-weight: bold;
  }
.progress-head {
  font-size: 13px;
  font-weight: bolder;
  font-family: Montserrat;
  padding-left: 70px;
    padding-bottom: 15px;
    color: #453F3F;
}
.files-container {
  height: 420px;
  border-right: 1px solid rgba(214,218,229,0.34);
  border-bottom: 1px solid rgba(214,218,229,0.34);
  margin-top: -2px;
  overflow-y: overlay !important;
}
.top {
  border-bottom: 1px solid rgba(214,218,229,0.34);
  width: 97.5%;
}
.upload-container {
  padding: 50px;
  margin-left: -30px;
  margin-bottom: -2px;
  height: 418px;
  border-bottom: 1px solid rgba(214,218,229,0.34);
}

  .toolbar {
    width: 100%;
    border-radius: 5px;
    background: #f5f5f5;
    align-content: center;
    box-shadow: 5px 10px #888888;
    padding-right: 20px;

  }

</style>
