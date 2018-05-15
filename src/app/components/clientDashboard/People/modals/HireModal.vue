<template>
    <el-dialog :visible="show"
      width="80%" 
      :show-close="false" 
      :before-close="beforeClose"  class="ele_Dialogue">
        <div slot="title">
          <button type="button" class="close btn" @click.stop="closeInviteModal()">x
          </button>
        </div>
         <!--Modal content-->
        <div class="hire-dev">
            <!-- Centered Tabs -->
          <!--   <ul class="nav nav-filter nav-justified">
              <li class="active">
                <a data-toggle="tab" href="#home" @click="hireaTalent">Hire A Talent</a>
              </li> -->
              <!-- <li class="filter-modal-btn active">
                <a data-toggle="tab" href="#menu1" @click="inviteTalent">Invite A Talent</a>
              </li>


            </ul> -->
            <!-- <div class="tab-content marg-20"> -->
              <!-- <div id="home" class="tab-pane fade active in" v-show="hire">
                <HireTalentForm/>
              </div> -->
              <div id="menu1" v-show="invite">
            
                  <InviteUserForm @close="closeInviteModal()" @reloadStore="reloadStore" :modal-visible="show" />
                </div>
             <!--    <HideField>
                  <UploadCSV @reloadStore="reloadStore"/>
                </HideField> -->
                  <!-- <div class="col-md-3"></div> -->
            
            </div>
          <!--<div slot="footer">
            <button class="btn btn-primary pull-right">Done</button>
          </div>-->
        </div>
    </el-dialog>
</template>

<script>
import InviteUserForm from '@/app/shared/forms/inviteUserForm'
import UploadCSV from '@/app/shared/forms/uploadCSV'
import HireTalentForm from '@/app/shared/forms/hireTalent'
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'hire-modal',
  props: ['show'],
  data(){
    return{
      hire:false,
      invite:true,
    }
  },
  components: {
    InviteUserForm,
    UploadCSV,
    HireTalentForm,
  },
  watch: {
    'show': {
        handler: function (val, old) {
            if (val === true) {
              // handle the modal opening
			        this.fetchData()
            } else {
              // handle modal closing
				      this.$_$destroyedHook(['hresetState'])
            }
        },
        deep: true
    },
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('users/unhired', [
      'getHireables',
      'resetState'
    ]),
    ...mapActions('categories/skills', [
        'getSkills',
    ]),
    ...mapActions('team/hireUser', {
      hresetState:  'resetState',
    }),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
    fetchData () {
      this.getUnhired()
      this.fetchSkills()
    },
    closeInviteModal(){
    this.$_$closeModal()
    },
    fetchSkills () {
      this.callWithToken({
          parameters: {
          },
          action: this.getSkills,
      });
    },
    beforeClose(done) {
      this.$_$closeModal()
      done();
    },
    getUnhired () {
      this.callWithToken({
        parameters: {
        },
        action: this.getHireables,
      });
    },
    reloadStore(type, id) {
      this.$emit('reloadStore', type, id)
    },
    hireaTalent(){
      this.hire = true;
      this.invite = false;
    },
     inviteTalent(){
      this.hire = false;
      this.invite = true;
    }
  }
};
</script>

<style scoped>
.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.el-dialog__wrapper {
    /* background-color: rgba(0,0,59, 0.5); */
    background-color: #fff;
}

/*.el-dialog__wrapper .el-dialog {
    width: 80% !important;
    top: 9px;
    overflow-x: hidden;
    overflow-y: auto;
}*/
.inviters{
  margin-top: 12% !important;
}
.el-dialog__body .hire-dev {
  border-radius: 1px !important;
  box-shadow: none !important;
  transition: all 120ms ease-in-out;
}
.el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
     -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.0) !important; 
     box-shadow: 0 1px 3px rgba(0,0,0,.0) !important; 
    box-sizing: border-box;
    width: 50%;
}
.ele_Dialogue{
  -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.0) !important; 
     box-shadow: 0 1px 3px rgba(0,0,0,.0) !important; 
}
.el-dialog__wrapper.ele_Dialogue .el-dialog {
    box-shadow: none !important;
}
.well.filter input {
  margin-bottom: 7%;
  color: white !important;
  font-size: 12px;
  transition: all 300ms ease-in-out;
}

.well.filter select {
  margin-bottom: 7%;
  color: white !important;
}

.well.filter input:focus {
  transition: all 300ms ease-in-out;
  margin-bottom: 7%;
  color: #000 !important;
  background: white;
}

.well.filter select:focus {
  margin-bottom: 7%;
  color: #000 !important;
  background: white;
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

.f-weight-3 {
  font-weight: 300;
}

.f-weight-6 {
  font-weight: 400;
}

.f-weight-7 {
  font-weight: 500;
}

.hire-dev {
  position: relative;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  width: 100% !important;
  border: 1px solid transparent !important;
  border: 1px solid rgba(0, 0, 0, 0) !important;
  border-radius: 1px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.filter-modal-btn {
  background: transparent;
}

.nav-filter > li.active > a,
.nav-filter > li.active > a:focus,
.nav-filter > li.active > a:hover {
  color: #fff;
  background-color: #ffffff;
  font-weight: 500;
  border-bottom: 2px solid #326ada;
  border-radius: 1px;
  color: #000 !important;
  font-size: 13px;
}

.nav-filter > li > a {
  color: #fff !important;
  font-weight: 600;
  padding: 12px 21px !important;
  font-size: 13px;
  border-bottom: 2px solid #dee9f2;
  border-radius: 1px;
  margin-left: 11px;
  color: #000 !important;
}

.nav-filter > li > a:hover {
  color: #fff;
  background-color: #ccc;
  opacity: 0.7;
  font-weight: 300;
  font-size: 11px;
}
.ele_Dialogue{
  box-shadow: none !important;
  -webkit-box-shadow:none !important;
}
/*.invite-primary {
  margin-top: 12%;
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
  height: 500px;
  border-radius: 1px;
}*/
.invite-primary {
    margin-top: 12%;
    background: white;
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
    height: 500px;
    width: 80%;
    margin: 0px auto;
    border-radius: 1px;
}

.invite-primary h3 {
  color: #000;
  font-weight: 100;
}

.invite-primary p {
  color: #000;
  font-size: 13px;
  font-weight: 100;
  font-family: raleway;
  text-align: center;
}

.invite-primary input {
  margin-bottom: 6%;
  font-size: 14px;
}

.invite-primary button {
  border-radius: 50px;
  padding: 7px 45px;
  font-size: 13px;
}

.invite-primary input[type="file"] {
  padding: 1px;
}

span.btn-hire {
    background: #3369da;
    padding: 9px 14px;
    /* min-width: 30% !important; */
    text-align: center;
    position: fixed;
    font-size: 18px;
    bottom: 6%;
    right: 3%;
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.13);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.13);
    color: white;
    border-radius: 50%;
}

.col-red {
    color: #9c27b0 !important;
    /* margin-top: 5%; */
    text-align: left !important;
    /* position: absolute; */
    /* bottom: 20px; */
    /* word-break: break-word; */
    /* width: 420px; */
    text-align: center !important;
    margin: 3% 5%;
}

.well.filter {
  border-radius: 10px !important;
}

.well.filter label {
  color: white !important;
}

.input-file-csv {
  opacity: 0;
}

span.input-file-csv-icn-group {
  font-size: 35px;
  position: relative;
  top: 36px;
  pointer-events: none;
  cursor: pointer;
}
.com-son img{
  height: 45px;
  width: 45px;
  margin-top: 7%;
}
.redsa{
  z-index: 10000;
}
.invitee {
    margin-top: -6% !important;
    /* margin-left: 0px !important; */
    /* margin-right: 0px !important; */
    box-shadow: none !important;
    height: auto !important;
    padding: 0px !important;
} 
</style>
