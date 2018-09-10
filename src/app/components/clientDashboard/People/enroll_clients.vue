<template>
  <section class="content-body">
    <div class="row">
      <h3>Enroll Client</h3>
    </div>
    <div class="row">
      <ul class="nav-ul">
        <li>
          <span :class="{'active': tab===1}">Personal Details</span>
          <div :class="{'rectangle-3-copy': tab === 1}">

              </div>
          </li>

          <li>
          <span :class="{'active': tab===2}">Credit Monitoring Service</span>
          <div :class="{'rectangle-3-copy': tab === 2}">

              </div>
          </li>

          <li>
          <span :class="{'active': tab===3}">Preview Client Details</span>
          <div :class="{'rectangle-3-copy': tab === 3}">

              </div>
          </li>
         
      </ul>
      <hr style="position: relative; top: -34px; left: -20px; width: 90%;">
    </div>
    
    <div >
      <div v-if="tab === 1">
        <section class="row">
          <div class="col-xs-6">
            <div class="col-md-12 email">
                 <label class="email-input" for="email">Client First Name</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.first_name" placeholder="CLIENT FIRST NAME"></el-input>
                    </p>
            </div>

             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Phone Number</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.phone" placeholder="CLIENT PHONE NUMBER"></el-input>
                    </p>
            </div>

             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client SSN</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.ssn" placeholder="CLIENT SSN"></el-input>
                    </p>
            </div>
          </div>


          <div class="col-xs-6">
           <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Last Name</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.last_name" placeholder="CLIENT LAST NAME"></el-input>
                    </p>
            </div>

            <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Email Address</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.Email" placeholder="CLIENT EMAIL"></el-input>
                    </p>
            </div>

            <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Mailing Address</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.mail_addr" placeholder="CLIENT MAILING ADDRESS"></el-input>
                    </p>
            </div>
            <div class="col-xs-12 text-right">
              <span class="btn btn-success email" @click="switchTab(2)">Save and Proceed</span>
            </div>
          </div>
          
        </section>
      </div>

      <div v-if="tab === 2">
          <section class="row">
          <div class="col-xs-6">
            <div class="col-md-12 email">
                 <label class="email-input" for="email">Credit Monitoring Service Username</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.cms_username" placeholder="Credit Monitoring Service Username"></el-input>
                    </p>
            </div>

             <div class="col-md-12 email">
                 <label class="email-input" for="email">CMS Program Type</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.cms_type" placeholder="CMS Program Type"></el-input>
                    </p>
            </div>
            

          </div>


          <div class="col-xs-6">
           <div class="col-md-12 email">
                 <label class="email-input" for="email">Credit Monitoring Service Password</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.cms_password" placeholder="Credit Monitoring Service Password"></el-input>
                    </p>
            </div>

            <div class="col-md-12 email" style="margin-top: 20px !important;">
                 <label class="email-input" for="email">Registered Through an Affiliate?</label>
                    <p :class="{ 'control': true }">
                        <el-radio-group v-model="client.affiliated" size="mini">
                          <el-radio-button label="Yes"></el-radio-button>
                          <el-radio-button label="No"></el-radio-button>
                        </el-radio-group>
                    </p>
            </div>


            <div class="col-md-12 email" v-if="client.affiliated == 'Yes'">
                 <label class="email-input" for="email">Affiliate Name</label>
                    <p :class="{ 'control': true }">
                        <el-input type="text" v-model="client.affiliate" placeholder="Affiliate Name"></el-input>
                    </p>
            </div>


            <div class="col-xs-12 text-right">
              <span class="btn btn-primary email" @click="switchTab(1)">Back</span>
              <span class="btn btn-success email" @click="switchTab(3)">Preview Client Details</span>
            </div>
          </div>
          
        </section>
      </div>

      <div v-if="tab === 3">
          <section class="row">
          <div class="col-xs-6">

             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client First Name</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.first_name}}</span>
                    </p>
            </div>


             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Phone Number</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.number}}</span>
                    </p>
            </div>


             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client SSN</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.ssn}}</span>
                    </p>
            </div>


            <div class="col-md-12 email">
                 <label class="email-input" for="email">Credit Monitoring Service Username</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.cms_username}}</span>
                    </p>
            </div>

             <div class="col-md-12 email">
                 <label class="email-input" for="email">CMS Program Type</label>
                    <p :class="{ 'control': true }">
                        <span class="label label-success">{{client.cms_type}}</span>
                    </p>
            </div>

             <div class="col-md-12 email" v-if="client.affiliated == 'Yes'">
                 <label class="email-input" for="email">Affiliate Name</label>
                    <p :class="{ 'control': true }">
                        <span class="label label-success">{{client.affiliate}}</span>
                    </p>
            </div>
            

          </div>


          <div class="col-xs-6">

             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Last Name</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.last_name}}</span>
                    </p>
            </div>

             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Email Address</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.email}}</span>
                    </p>
            </div>

             <div class="col-md-12 email">
                 <label class="email-input" for="email">Client Mailing Address</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.mail_addr}}</span>
                    </p>
            </div>


           <div class="col-md-12 email">
                 <label class="email-input" for="email">Credit Monitoring Service Password</label>
                    <p :class="{ 'control': true }">
                        <span class="label label-success">{{client.cms_password}}</span>
                    </p>
            </div>

            <div class="col-md-12 email" style="margin-top: 20px !important;">
                 <label class="email-input" for="email">Registered Through an Affiliate?</label>
                    <p :class="{ 'control': true }">
                       <span class="label label-success">{{client.affiliated}}</span>
                    </p>
            </div>


           


            <div class="col-xs-12 text-right">
              <span class="btn btn-primary email" @click="switchTab(2)">Back</span>
              <span class="btn btn-success email" @click="switchTab(4)">Complete Enrollment</span>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  </section>

</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  

export default {
    name: "client-people",
    components: {
      
    },
    // watch:{
    //   team_Id(){
    //     if(this.team_Id){
    //       this.fetchTeam()
    //     }
    //   }
    // },
    mounted () {
      this.fetchTeam();
      // this.fetchInvites();
      // this.handleTabClick()
    },
    data() {
        return {
          activeTabName: 'team',
          showHireModal: false,
          loader: false,
          tab: 1,
          client: {

          }
        }
    },
    // destroyed () {
    //   this.$_$destroyedHook(['teamResetState'])
    // },
    // created() {
    //   // this.getTeamId();
    //   this.handleTabClick();
    //   this.fetchTeam()
    // },
    computed: {
      ...mapGetters('userCredentials', ['user','token']),
      ...mapGetters('team/getPendingInvites', ['team_Id']),
      ...mapGetters('team', ['team',]),
      routeId() {
          //  console.log("route", this.$route.name)
          return this.$route.params.id
        },
    },
    methods: {
        ...mapActions('team', [
          'getClientTeam',
        ]),
        ...mapActions('team', {
          teamResetState: 'resetState'
        }),
        ...mapActions('team/getPendingInvites', [
          'getPendingInvites',
          // 'getTeamByUserId',
          'resetState'
        ]),
        ...mapActions('userCredentials', [
          'callWithToken',
        ]),
        ...mapMutations('team', [
          'setTeam',
        ]),
        // getTeamId(){
        //   let args = {
        //     Id : this.user.Id
        //   }
        //   let self = this;
        //   this.getTeamByUserId(args)
        //   .then(function(status) {
        //     // self.fetchTeam()

        //   });
        //   return;

        // },
        handleTabClick(tab, event) {
          if (tab.name === 'invites') {
            this.fetchInvites();
          } else if (tab.name === 'team') {
            this.fetchTeam();
          }

        },
        switchTab(tab){
          if(tab===4){
            // save the client to database
            this.blackAxios.post('save-clients', this.client,
            {
              'headers': { 'x-access-token': this.token }
            })
              .then(function (response) {
                alert("success");
              })
              .catch(function (error) {
                alert("failed");
              });
              return;
          }
          this.tab = tab;
        },
        addClient() {
            this.showHireModal = true;
        },
        closeHire() {
            this.showHireModal = false;
        },
        fetchTeam() {
          // Get client team data
          // debugger;
          this.loader = true;
            this.callWithToken({
            parameters: {
              id: this.user.team_Id, // clients team id
              // id: this.user.Id, // clients team id
            },
            action: this.getClientTeam,
          }).then(()=>{
            this.loader = false;
          });

        },
        
        fetchInvites() {
          // Get client pending invites data(

          this.callWithToken({
            parameters: {
              id: this.user.Id, // clients team id
            },
            action: this.getPendingInvites,
          });
        },
        reloadStore(type, id) {
            // Reload pending invites and team
          let args = {
            id: this.user.Id,
          }
          // Reload Invites
          this.$_$cheekyReloadStore({
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getPendingInvites,
              reloadArgs: args
          })
          // Reload Team
          this.$_$cheekyReloadStore({
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getClientTeam,
              reloadArgs: args
          })
        }
    }
};
</script>
<style scoped>
.email {
  margin-top: 10px;
}
.empty-state {
  padding-top: 5%;
}

.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.empty-state i {
  font-size: 60px;
}

/*div#hireModal {
  background: #00003b !important;
  opacity: 1 !important;
}*/

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

.invite-primary {
  margin-top: 12%;
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
  height: 500px;
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

.modal-dialog.modal-lg {
    width: 80%;
    top: 9px;
}

.modal-dialog.modal-lg .modal-content.hire-dev {
  border-radius: 1px !important;
  box-shadow: none !important;
  transition: all 120ms ease-in-out;
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
.nav-ul{
  list-style-type: none;
}
.nav-ul li {
    float: left;
    padding: 20px;
}

.nav-ul li a {
    display: block;
    text-align: center;
    text-decoration: none;
    color: #8C8989;
}
.rectangle-3-copy {
	height: 30px;
	width: 3px;
	transform: rotate(-90deg);
	border-radius: 100px 0 0 100px;
	background: linear-gradient(180deg, #61A3EF 0%, #326ADA 100%);
  margin: 0 auto 0 auto;
}
.active {
  color: #000;
  font-weight: bolder;
}
</style>
