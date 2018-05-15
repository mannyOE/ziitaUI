<template id="">
  <span>

               <div class="col-xs-12 eachUpload"  >
                <div class="row" >
                  <!--<div class="col-xs-2" style="padding: 17px;" >-->

                      <!--<i v-if="type" @click="deleteFile(setUploads[file].file_Id)" class="ion-ios-close-outline" style="margin:auto; font-size: 30px;color: #8C8989;"></i>-->

                  <!--</div>-->
                  <div class="col-xs-11 col-xs-offset-1 uploaded" >
                    <div class="row" >
                      <div class="col-xs-1" @click="closeContent()" style="padding: 20px;">
                        <i class="ion-document on-style" ></i>
                      </div>
                      <div class="col-xs-8" @click="openModal" style="padding-top: 30px; cursor: pointer;">
                        <p class="doc"><b class="text-left">{{setUploads[file].file_original}}</b></p>
                      </div>

                        <div class="dropdown1" >
                            <div class="col-xs-1" @click="DropContent()" style="padding: 20px;">
                                    <span><i class="ion-android-more-vertical more-details text-left" ></i></span>
                                        <div class="dropdown-content1" v-if="dropCon">
                                                <a :href="api+setUploads[file].file_Id+'/download'">
                                                    <div class="row">
                                                    <div class="col-xs-1"><i class="ion-ios-download-outline dd-mg"></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Download File</p></div>
                                                    </div>
                                                </a>
                                                <!-- <a href="#" >
                                                    <div class="row">
                                                    <div class="col-xs-1"><i class="ion-share dd-mg"></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Share File</p></div>
                                                    </div>
                                                </a> -->
                                                <a href="" v-if="type" @click.prevent="deleteFile(setUploads[file].file_Id)">
                                                    <div class="row">
                                                    <div class="col-xs-1"><i class="ion-ios-trash-outline dd-mg"></i></div>
                                                    <div class="col-xs-10"><p class="drp-txt">Delete File</p></div>
                                                    </div>
                                                </a>
                                        </div>
                            </div>
                        </div>
                      <!--<div class="col-xs-1" style="padding: 16px;">-->
                        <!--<a name="button" :href="api+setUploads[file].file_Id+'/download'">-->
                              <!--&lt;!&ndash;<el-tooltip class="item" effect="light" id="my_show_help"  content="Download File" placement="top">&ndash;&gt;-->
                                <!--<i class="ion-ios-download-outline on-style" ></i>-->
                              <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
                        <!--</a>-->
                      <!--</div>-->

                    </div>
                  </div>
                </div>
              </div>


    <!--<div class="tower">-->
      <!--<div class="wrapper">-->
        <!--<div class="navi" @click="openModal" style="padding-top: 50px; text-align: center;">-->
          <!--<div class="file-name">{{setUploads[file].file_original}}</div>-->
          <!--<el-tooltip class="item" effect="dark" id="my_show_help"  content="File Details" placement="bottom">-->
            <!--<i class="fa fa-file fa-4x img-class"></i>-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="crul">-->
          <!--<a v-if="type" class=" btn tooler" name="button" @click="deleteFile(setUploads[file].file_Id)">-->
            <!--<el-tooltip class="item" effect="dark" id="my_show_help"  content="Delete File" placement="top">-->
              <!--<i class="ion-ios-trash"></i>-->
            <!--</el-tooltip>-->
          <!--</a>-->
          <!--<a class="btn tooler" name="button" :href="api+setUploads[file].file_Id+'/download'">-->
            <!--<el-tooltip class="item" effect="dark" id="my_show_help"  content="Download File" placement="top">-->
              <!--<i class="ion-code-download"></i>-->
            <!--</el-tooltip>-->
          <!--</a>-->

          <!--<div class="dropdown" >-->
            <!--<a class="btn tooler dropbtn" name="button" @click="dropDown = !dropDown">-->
              <!--<el-tooltip class="item" effect="dark" id="my_show_help"  content="Share File" placement="top">-->
                <!--<i class="ion-share"></i>-->
              <!--</el-tooltip>-->
            <!--</a>-->
            <!--<div class="dropdown-content" v-if="dropDown">-->
              <!--<span>-->
                <!--<input class="toggle" type="checkbox" :checked="general"-->
                <!--@change="toggleShareAll">-->
                  <!--Share All/Some-->
              <!--</span>-->
              <!--<span v-for="t in team"-->
               <!--v-if="!setUploads[file].isGeneral">-->
                <!--<input class="toggle" type="checkbox"-->
                 <!--@change="share(t.Id)"-->
                <!--:checked="show_share(t.Id)">{{t.first_name}} {{t.last_name}}</input>-->
              <!--</span>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->
      <!--</div>-->
    <!--</div>-->



    <FileModal @reloadStore="reloadStore"
        :file="setUploads[file]"
        :show.sync="jari"
        @share="share"
        @delete="deleteFile"
        @close="closeDev"/>



  </span>
</template>


<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex';
import FileModal from "@/app/shared/modals/fileViewModal";
import { API } from '../../../config';


  export default {
    props: ['file','type'],
    components: {FileModal},
    data() {
        return {
          jari: false,
          api: API,
          confirm: false,
          pop_message: '',
          load_msg: '',
          dialog_action: '',
          share_with: true,
          dropDown: false,
            dropCon: false,
        };
    },
    mounted () {
    },
    methods: {
      ...mapActions('projects/FileShare', [
        'fetchUploads',
        'fetchShared',
        'shareThisFile',
        'deleteUploaded',
        'clearErrors',
        'downloader',
        'updateThisFile'
    ]),
      ...mapActions('userCredentials', [
      'callWithToken',
    ]),
    DropContent(){
          this.dropCon = !this.dropCon;
},
    closeContent(){
    this.dropCon = false;
},
    toggleShareAll(){
      var status = 3;
      if(!this.setUploads[this.file].isGeneral){
         status = 2;
      }

      const self = this;

      this.callWithToken({
          parameters: {
            Id: this.setUploads[this.file].file_Id, // clients team id
            devId: "",
            status: status // clients team id
          },
          action: this.updateThisFile,
      }).then(function(){
        self.$emit('refresh');
      });
    },

      deleteFile(id){
       const self = this;

        this.$confirm('Are you sure you want to delete this file?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          this.uploads.splice(this.file, 1);
            var t = self.callWithToken({
                parameters: {
                  file: id, // clients team id
                  user: self.user.Id, // clients team id
                  team: self.user.team_Id,
                },
                action: self.deleteUploaded,
            });
            // self.$emit('refresh');
            self.$show_notification("Success");

        }).catch(()=>{

        });
      },
      share(id){
        var status = 0;
        if(this.setUploads[this.file].shared_with.filter(e=>e === id).length === 0){
            status = 1;
        };

        const self = this;

       this.callWithToken({
                parameters: {
                  Id: this.setUploads[this.file].file_Id, // clients team id
                  devId: id,
                  status: status
                },
                action: this.updateThisFile,
            }).then(function(){
            self.$emit('refresh');
       });



      },
      show_share(id){
        if(this.setUploads[this.file].shared_with.filter(e=>e === id).length > 0){
          return true;
        }
      },
      closeConfirm() {
          this.pop_message = '';
          this.load_msg = "";
          this.confirm = false;
          this.closeDev();
      },

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
      closeDev() {
          this.jari = false;
      },
      openModal() {
          this.jari = true;

      },
      reloadStore(type, id) {
          this.$emit('reloadStore', type, id)
      },
      download(id){
        this.$emit('download',id);
      },

      checkMyFile(){
        if(this.file.source !== this.user.Id){
          return false;
        }else{
          return true;
        }
      }

    },
    computed: {
      ...mapGetters('team', [
        'team',
        'loading',
        'error',
      ]),
      ...mapGetters('userCredentials', ['user',]),
      ...mapGetters('projects/FileShare', ['uploads','files','error']),
      popup(){
        return this.pop_message;
      },
      setUploads: function(){
        return this.uploads;
      },
      setFiles: function(){
        return this.files;
      },
      general(){
        if(this.setUploads[this.file].isGeneral === true){
          return true;
        }
      }

    }
  }
</script>


<style scoped>

    .drp-txt{
        padding-top: 5px;
    }
    .dd-mg{
        font-size: 20px;
    }
    .more-details{
        margin-top: +20px !important;
        color: inherit;
        font-size: 30px;
        font-weight: bold;
        /*margin-left: 35px;*/
    }
    .dropdown1 {
        position: relative;
        display: inline-block;
    }
    .dropdown-content1{
        display: block;
        position: absolute;
        /*margin-left: -90px;*/
        background-color: #fff;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 5px;
        margin-left: -150px;

    }
    /*.dropdown1:hover .dropdown-content1 {*/
        /*display: block;*/
    /*}*/
    .dropdown-content1 a {
        padding-left: 10px;
        padding-top: 10px;
        font-size: 11px;
        font-family: montserrat;
        color: #011b;
        border-bottom: 1px solid rgba(214,218,229,0.34);
        /*padding: 12px 16px;*/
        /*text-decoration: none;*/
        display: block;

    }
    .dropdown-content1 a:hover{
        background: linear-gradient(225.5deg, #326ADA 0%, #84E289 100%);
        font-weight: bold;
        text-decoration: none;
        color: #fff;
    }

  .on-style{
    text-decoration: none;
    font-size: 28px;
    color: inherit;
    vertical-align: center;
  }
  .dwn-img{
    height: 15px;
  }
  .uploaded{
    /*height: 50px;*/
    /*padding: 16px;*/
    color: #453F3F;
    font-family: Montserrat;
    font-size: 12px;
    margin: auto;
    /*line-height: 18px;*/
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
  }
  .files-container {
    height: 420px;
    border-right: 1px solid rgba(214,218,229,0.34);
    border-bottom: 1px solid rgba(214,218,229,0.34);
    margin-top: -2px;
  }
  .top {
    border-bottom: 1px solid rgba(214,218,229,0.34);
    width: 97.5%;
  }
  .upload-container {
    margin-left: -30px;
    margin-bottom: -2px;
    height: 418px;
    border-bottom: 1px solid rgba(214,218,229,0.34);
  }

  .partial{
    border: 1px solid #3469da;
  }

  .tooler {
    color: #fff;
    font-size: 18px;
  }

  .img-class{
    color: #3469da;
  }

  .wrapper {
  position: relative;
  height: 100%;
  width: 100%
}

/*
*  The .navi properties are for styling only
*  These properties can be changed or removed
*/
.navi {
  height: 100%;
}


/*
*  Position the #infoi element in the top-right
*  of the .wrapper element
*/
#infoi {
  position: absolute;
  top: 30%;
  right: 45%;

  /*
  *  Styling only, the below can be changed or removed
  *  depending on your use case
  */
  height: 20px;
  padding: 10px 10px;
}
.crul{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 30%;
  background-color: #3469da;
  text-align: center;
  color: #fff;
}

.tower {
  background: #ffffff;
  border: 1px solid #e5e7f7;
  border-radius: 5px;
  height: 155px !important;
  margin-top: 45px;
  text-align: center;
}


.tower:hover {
  background: #ffffff;
  /* transform: rotate(90deg); */
  box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
  border-radius: 1px;
  border: 1px solid #3469da;
  text-align: center;
  /* margin-top: 27%; */
}



/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {

    position: absolute;
    background-color: #f1f1f1;
    z-index: 1;
    width: 200px;
}

.dropdown-content span {
    padding: 12px 12px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    background: #000;
    color: #fff;
}

/* Change color of dropdown links on hover */
.dropdown-content span:hover {background-color: #ddd}

/* Show the dropdown menu on hover */
/* .dropdown:hover .dropdown-content {
    display: block;
} */
.file-name{
  overflow: hidden;
  width: inherit;
  height: 20px;
}
input[type="checkbox"]{
  border: 20px;
}

.toggle {
-webkit-appearance: none;
appearance: none;
margin: -4px -4px;
width: 45px;
height: 28px;
display: inline-block;
position: relative;
border-radius: 50px;
overflow: hidden;
outline: none;
border: none;
cursor: pointer;
background-color: #707070;
transition: background-color ease 0.3s;
float: left;
}

.toggle:before {
content: "On Off";
display: block;
position: absolute;
z-index: 2;
width: 18px;
height: 18px;
background: #fff;
left: 2px;
top: 6px;
border-radius: 50%;
font: 9px/18px Helvetica;
text-transform: uppercase;
font-weight: bold;
text-indent: -18px;
word-spacing:25px;
color: #fff;
text-shadow: -1px -1px rgba(0,0,0,0.15);
white-space: nowrap;
box-shadow: 0 1px 2px rgba(0,0,0,0.2);
transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.toggle:checked {
background-color: #4CD964;
}

.toggle:checked:before {
left: 22px;
}
</style>
