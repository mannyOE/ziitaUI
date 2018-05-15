<template>
    <!--<div class="col-md-5">-->
        <div class="text-center invite-primary invitee">
            <h3>Invite {{ projectManager ? 'Project Manager' : '' }}</h3>
            <p v-if="!projectManager">Please Invite a Talent </p>
            <form @submit.prevent="validateBeforeSubmit">
              <BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
              <BannerSuccess v-else-if="success" :exempt="true">Invite Sent</BannerSuccess>

              <div class="row">
                <div class="col-md-3">
                  <p :class="{ 'control': true }">
                <input name="first name"
                  v-model="user.firstName"
                  v-validate="''"
                  type="text" 
                  class="form-control" 
                  :class="{'input': true, 'is-danger': errors.has('first name') }" 
                  placeholder="First Name">

                  <FieldError>
                      {{ errors.first('first name') || fieldErrors.first_name }}
                  </FieldError>
              </p>

                </div>
                <div class="col-md-3">
                   <p :class="{ 'control': true }">
                <input name="last name"
                  v-model="user.lastName"
                  v-validate="''"
                  type="text" 
                  class="form-control" 
                  :class="{'input': true, 'is-danger': errors.has('last name') }" 
                  placeholder="Last Name">
                
                  <FieldError>
                      {{ errors.first('last name') || fieldErrors.last_name }}
                  </FieldError>
                              </p>
                
                </div>
                <div class="col-md-3">
                  <p :class="{ 'control': true }" v-if="!projectManager">
                <select v-validate="'required'"
                    v-model="user.userType"
                    class="form-control" 
                    :class="{'input': true, 'is-danger': errors.has('user type') }" 
                    name="user type" >
                    <option selected="selected" value="">User type</option>
                      <option v-for="type in $_$userTypes" 
                        v-if="type.name != 'Client'" 
                        :value="type.value">{{ type.name }}</option>
                </select>

                <FieldError>
                    {{ errors.first('user type') || fieldErrors.type }}
                </FieldError>
              </p>

                </div>
                <div class="col-md-3">
                  <p :class="{ 'control': true }">
                  <input v-validate="'required|email'" 
                      v-model="user.email"
                      class="form-control"
                      :class="{'input': true, 'is-danger': errors.has('email') }" 
                      name="email" 
                      type="text" 
                      placeholder="E-mail">

                  <FieldError>
                      {{ errors.first('email') || fieldErrors.Email }}
                  </FieldError>
              </p>
                </div>
                <div class="col-md-3">
                  <button v-if="!loading" class="btn btn-primary" type="submit">Send Invite</button>
              <LoadingButton v-else buttonclass="btn btn-primary">Sending...</LoadingButton>
                </div>
              </div>
             
              
              
              <!-- <router-link :to="{ name: 'client-hire-team'}"> -->
              
            </form>

            <!-- </router-link> -->
            <p class="col-red text-center">
            <b>NOTE:</b> This {{ projectManager ? 'Project Manager' : 'Talent' }} will recieve an email prompting him / her about an invitation to your team
            on zeedas.
            </p>
        </div>
    <!--</div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { modalShow } from '@/app/helpers'

export default {
  name: 'invite-user-form',
  props: ['modalVisible', 'projectManager'],
  data() {
      return {
          user: {
              firstName: '',
              lastName: '',
              email: '',
              userType:"",
              teamName: null,
              password: '',
          },
      };
  },
    destroyed () {
      this.user.userType="";
        this.$_$destroyedHook()
    },
    mounted(){
       this.user.userType="";

    },
  watch: {
    success(){
        debugger;
        if(this.success){
        let self = this
        setTimeout(function(){
           self.$store.state.team.inviteUser.sub.success = false
        //    self.success = false
         
      },10000)
        }
      },
      error(){
        debugger; 
        let self = this
        if(this.error){
        let self = this
        setTimeout(function(){
           self.$store.state.team.inviteUser.sub.error = false
         
      },10000)
        }
          
      },
    'modalVisible': {
        handler: function (val, old) {
            if (val === true) {
              // handle the modal opening
                modalShow.true(this)
            } else {
              // handle modal closing
              modalShow.false(this);
            }
        },
        deep: true
    },
  },
  computed: {
      ...mapGetters('team/inviteUser', [
          'success',
          'error',
          'successMsg',
          'fieldErrors',
          'loading',
      ]),
      ...mapGetters('userCredentials', {
          userData: 'user',
      }),
  },
  methods: {
      ...mapActions('team/inviteUser', [
          'inviteUser',
          'resetState',
      ]),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      clearFields() {
          this.user = {
              firstName: '',
              lastName: '',
              email: '',
              userType: '',
              teamName: null,
              password: '',
          }
      },

    validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
            if (result) {
            // eslint-disable-next-line
            // Set arguments for endpoint
            const projectManagerType = this.$_$userTypesObject.projectManager.id
                let args = {
                    first_name: this.user.firstName,
                    last_name: this.user.lastName,
                    Email: this.user.email,
                    team_Id: this.userData.Id,
                    type: !this.projectManager ? this.user.userType : projectManagerType,
                }

                const self = this;
                this.callWithToken({
                  parameters: args,
                  action: this.inviteUser,
                })
                .then(function (status) {
                  // if(self.success)
                    
                   if(self.error)
                     self.$show_notification(self.error,"error")
                    if (status) {
                       self.$show_notification("Invite Sent Successfully");
                       self.$emit("close");
                      // Reload pending invites on success
                        self.reloadStore()
                    } else {
                    }
                    self.clearFields();
                    // self.user.userType="";

                });
                // return;
            }
        });
    },
    reloadStore() {
      this.$emit('reloadStore', 'inviteUser')
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

.invite-primary {
  margin-top: 0%;
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
.invitee{
  margin-top: -6% !important;
  padding: 35px !important;
}
</style>
