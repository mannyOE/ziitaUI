<template id="">
  <span>
    <div class="tower">
      <div class="wrapper">
        <div class="navi " :class="{partial: jari}" @click="openModal" style="padding-top: 50px; text-align: center;">
          <div class="file-name">{{file.file_original}}</div>
          <el-tooltip class="item" effect="dark" id="my_show_help"  content="Select File" placement="bottom">
            <i class="fa fa-file fa-4x img-class"></i>
          </el-tooltip>
        </div>
        <div class="crul">
          <a class=" btn tooler" name="button" @click="deleteFile(file.file_Id)">
            <el-tooltip class="item" effect="dark" id="my_show_help"  content="Delete File" placement="top">
              <i class="ion-ios-trash"></i>
            </el-tooltip>
          </a>

        </div>
      </div>
    </div>    

        <confirmBox @reloadStore="reloadStore"
            :file="file"
            :show.sync="confirm"
            :message="popup"
            :loadMsg="load_msg"
            :action="dialog_action"
            @close="closeConfirm"
            :share="share_with"
            />

  </span>
</template>


<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex';
import FileModal from "@/app/shared/modals/fileViewModal";
import confirmBox from "@/app/shared/modals/confirm_box";
import { API } from '@/config';


  export default {
    props: ['file','type'],
    components: {confirmBox},
    data() {
        return {
          jari: false,
          api: API,
          confirm: false,
          pop_message: '',
          load_msg: '',
          dialog_action: '',
          share_with: '',
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
        'downloader'
    ]),
      ...mapActions('userCredentials', [
      'callWithToken',
    ]),

      deleteFile(id){
        // this.pop_message = "Are you sure you want to delete this file?";
        // this.load_msg = "Deleting File...";
        // this.dialog_action = 'delete';
        // this.confirm = true;

        const self = this;

        this.$confirm('Are you sure you want to delete this module?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
            self.callWithToken({
                parameters: {
                  file: id, // clients team id
                  user: self.user.Id, // clients team id
                  team: self.user.team_Id,
                },
                action: self.deleteUploaded,
            })
            
                    self.$show_notification("Deleted successfully!")
                   self.$emit('refresh');
              
        })
      },
      closeConfirm() {
          this.pop_message = '';
          this.load_msg = "";
          this.confirm = false;
          this.closeDev();
      },
      closeDev() {
          this.jari = false;
      },
      openModal() {
          this.jari = !this.jari;
          if(this.jari){
            this.$emit('selected', this.file.file_Id);
          }else{
            this.$emit('removed', this.file.file_Id);
          }
      },
      reloadStore(type, id) {
          this.$emit('reloadStore', type, id)
      },
      download(id){
        this.$emit('download',id);
      },
      imageLink(file){
          if(file.type === 'image/jpeg'){
              return require('@/assets/img/img-icon.png');
          }
          if(file.type === 'code'){
              return require('@/assets/img/code-icon.png');
          }
          if(file.type === 'docs'){
              return require('@/assets/img/docx-icon.png');
          }

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
      popup(){
        return this.pop_message;
      }

    }
  }
</script>


<style scoped>
  .partial{
    border: 1px solid #3469da;
    box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
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




.dropbtn {

}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    z-index: 1;
    width: 200px;
}

.dropdown-content span {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content span:hover {background-color: #ddd}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
    display: block;
}
.file-name{
  overflow: hidden;
  width: inherit;
  height: 20px;
  margin-bottom: 25px;
}





</style>
