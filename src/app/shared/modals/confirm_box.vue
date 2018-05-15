<template>
<el-dialog :visible="show" v-if="show" width="18%"
      :show-close="false"
      :before-close="beforeClose" class="person-card" >

	<!-- {{devstats}} -->

    <!-- Modal content-->

     <div align=center>
        <div v-if="initial">
          <p style="margin: 10px;" v-html="message"></p>
          <button type="button" class="btn btn-primary laus" @click="deleteFile(file.file_Id)" name="button">Confirm</button>
          <button type="button" class="btn btn-warning laus" @click="close" name="button">Deny</button>
        </div>
        <div  v-if="deleting" >
          <img :src="require('@/assets/img/loading.gif')" alt="" width="80" class="img-responsive laus">
          <div class="laus">
            {{loadMsg}}
          </div>
        </div>

        <div  v-if="completed" >
          <img :src="require('@/assets/img/Tasks.png')" alt="" width="80" class="img-responsive laus">
          Completed<br>
          <div class="laus">
            <button type="button" class="btn btn-warning laus" @click="close" name="button">Close</button>
          </div>
        </div>


    </div>

</el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { API } from '../../../config';
export default {
  name: 'developer-detail',
  props: ['show', 'message','file','loadMsg','action','share'],
  data(){
	  return {
      zinc: false,
		  api: API,
		  deleting: false,
      completed: false,
      initial: true,

	  }
  },
  watch: {

  },
  mounted () {


  },
  computed: {
    ...mapGetters('roles', ['success','error','roles','more']),
    ...mapGetters('team', [
        'team',
        'loading',
        'error',
      ]),
    ...mapGetters('userCredentials', ['user','permissions']),
    isClient(){
      if(this.member.type === '1'){
        return true;
      }
    }

  },
  methods: {


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

      deleteFile(id){
        var self = this;
          self.deleting = true;
          self.initial = false
          if(self.action === 'delete'){
              setTimeout(function(){
              self.callWithToken({
                parameters: {
                  file: id, // clients team id
                  user: self.user.Id, // clients team id
                  team: self.user.team_Id,
                },
                action: self.deleteUploaded,
            });
            self.deleting = false;
            self.completed = true;
          }, 2000);
          }
          if(self.action === 'share'){
                setTimeout(function(){
                  self.callWithToken({
                  parameters: {
                    file: id, // clients team id
                    user: self.share, // clients team id
                  },
                  action: self.shareThisFile,
                });
              self.deleting = false;
              self.completed = true;
            }, 2000);

          }

      },

      close(){
        this.getUploads();
        this.completed = false;
        this.initial = true;
        this.$emit('close');
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




    beforeClose(done) {
      // emit('reloadStore');
      this.$_$closeModal();
      	//   done();
      	// this.$router.reload();

    },
    reloadStore(type, id) {
	//   this.$emit('reloadStore', type, id);
      	 const args = {
            Id: this.member.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.gtDev,
              reloadArgs: args
		  })

    },

  }
};
</script>



<style scoped>
.laus{
  margin-bottom: 20px;
}
</style>
