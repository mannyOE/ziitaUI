<template>
<span id="nav-links-holder">
  <BaseNavbar/>
    <div class="container">
      <div class="row">

        <div class="col-md-12">
          <div class="profile-settings-nav">
              <ul class="nav profile-nav-group">
                  <li :class="{'active': routeName === 'profile'}">
                      <router-link :to="{name: 'profile'}">
                          Profile
                      </router-link>
                  </li>
                  <li :class="{'active': routeName === 'manage-account'}">
                      <router-link :to="{name: 'manage-account'}">
                          Manage Account
                      </router-link>
                  </li>
                  
        <HideField>
                  <li :class="{'active': routeName === 'reviews'}">
                      <router-link :to="{name: 'reviews'}">
                          Work Review
                      </router-link>
                  </li>
                   <li  :class="{'active': routeName === 'organisation'}">
                      <router-link :to="{name: 'organisation'}">
                          Organisation
                      </router-link>
                  </li>
                  <li :class="{'active': routeName === 'wallet'}" >
                      <router-link :to="{name: 'wallet'}">
                          Wallet
                      </router-link>
                  </li>
        </HideField>


              </ul>
          </div>
          <br>
          <div class="tab-content profile-settings-content" :class="{'profile-settings-content': (routeName !== 'organisation'), 'organisation-class': (routeName === 'organisation')}">
              <div class="col-md-4"  >
                  <div class="well profile-well">
                      <h3 class="text-center ">Profile</h3>
                      <div class="output-image">
                          <img :src="imageLink(userData)"
                            alt="" class="img-responsive picture_src" id="picture_preview">
                      </div>
                      <div class="picture">
                          <i class="icon ion-ios-camera-outline step-size18"></i>
                          <input v-on:change="onFileChange" :disabled="loading" type="file" class="img_container" id="upload" name="file">
                      </div>
                      <div align="center">
                          <LoadingButton v-if="loading" buttonclass="btn btn-primary">Uploading..</LoadingButton>
                      </div>

                      <h5 class="text-center f-weight-6" >{{ userData.first_name }} {{ userData.last_name }}</h5>
                      <hr>
                      <div class="setters">
                        <p class="text-center email" >{{ userData.Email }}</p>
                        <AuthenticatedField :developer="true">
                            <p class="text-center"><b>Phone:</b> <span>{{ userData.phone || 'Not added' }}</span></p>
                        </AuthenticatedField>
                        <AuthenticatedField :client="true">
                            <p class="text-center"><b>Team:</b> <span>{{ userData.team_name || 'Not added' }}</span></p>
                        </AuthenticatedField>
                            <p class="text-center"><b>{{ $_$getUserStatusMessage(userData.status) }}</b></p>

                      </div>
                  </div>
                  <!-- Availability Filter -->
                  <div class="well profile-well" >
                      <div class="row">
                        <AuthenticatedField :pm="true" :developer="true">
                            <div class="col-md-4">
                                <label class="switch">
                                    <input type="checkbox" checked="">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </AuthenticatedField>
                          <div class="col-md-8">
                              <p class="text-right available">
                                  <button class="btn btn-default">{{ $_$getUserStatusName(userData.status) }}</button>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
              </div>

              <router-view></router-view>
          </div>
        </div>
       </div>

    </div>
    </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import { checkUser } from "@/utils";
import BaseNavbar from '@/app/shared/BaseNavbar';
import { API } from '../../../config';

export default {
  name: "ProfileLayout",
  components: {
        BaseNavbar,
    },
 data(){
        return {
            organisation: {
                name: 'Natterbase Limited',
                address: 'No 70, Alagomeji Yaba Lagos',
                email:'natterbase@gmail.com',
                phone:'08082323423'
            },
            api: API,
            loading: false
        }
    },
    destroyed () {
        this.$_$destroyedHook()
    },
  computed: {
    routeName() {
      return this.$route.name;
    },
    ...mapGetters('userCredentials', {
        userData: 'user',
        permissions: 'permissions'
    }),
  },
  methods: {
    ...mapActions('userCredentials', [
        'logout',
        'callWithToken',
    ]),
    ...mapActions('auth', [
        'getUser',
    ]),
    ...mapActions('users/uploadPicture', [
        'uploadPicture',
        'resetState',
    ]),
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
      } else {

        const picture = files[0];
        let formData = new FormData();

        formData.append('image', picture);

        this.sendPicture(formData);
      }
    },
      imageLink(member){
          if(!member.profile_thumbnail){
              return require('@/assets/img/1.jpeg');
          }
          return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
      },
      check_permission(rule){
        var state = false;
        this.permissions.forEach((perm)=>{
          if(perm.Permission === rule){
            state = true;
          }
        })
        return state;
      },

    sendPicture(formData) {
        let args = {
            image: formData,
        }
        this.loading = true;
        const self = this;
        this.callWithToken({
            parameters: args,
            action: this.uploadPicture,
        })
        .then(function (status) {
            self.loading = false;
                    // debugger;
            if (status) {
                // Refresh user
                self.callWithToken({
                    parameters: {},
                    action: self.getUser,
                })
                .then( status => {
                    if (status) {
                    // Got user
                    }
                })
            } else {
            }
        });
    }

  }
};
</script>

<style >
.profile-settings-nav {
    /* height: 50px; */
        margin-top: 4%;
    border-radius: 6px;
    background: #326ada;
    padding: 2px;
    margin-bottom: 2%;
    /* position: fixed; */
    /* right: 35px; */
    z-index: 90;
}
.well.profile-well h3 {

    font-weight: 100 !important;
    color: #000000;
    font-size: 27px;
}
.well.profile-well h5 {

    color: #000;
}
.profile-settings-content {
  position: relative;
  /* top: 100px; */
}
.nav>li>a:hover, .nav>li>a:focus {
    text-decoration: none;
    background-color: #00DDFF;

}

.well.profile-well.orgsnizati h4 {
    font-size: 20px;
    color: #000;
}
ul.nav.profile-nav-group {
  display: block;
  margin: 0 auto;
  position: relative;
  float: none;
}
.profile-nav-group li a {
    display: inline;
    float: left;
    padding: 10px 29px;
    text-align: center;
    border-radius: 3px;
     font-family: raleway !important;
    margin: 5px;
    color: #fff;
    background-color: transparent;
}

.profile-nav-group li a img {
  max-width: 26px;
  margin-top: -5px;
  display: inline-block;
  border-radius: 50%;
}
.well.profile-well {
  background: white;
      word-break: break-word;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border: 0px solid white;
}
.well.personal-well p{
  font-size: 14px;
  font-weight: 100;
}
.personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.wallet {
  background: #fff;
  padding: 41px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.well.earns {
  background: white;
  border: 0px solid white;
  padding: 13px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}
.balance {
  background: #fff;
  z-index: -1;
  padding: 9px 30px 0px;
  margin-bottom: 13%;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.txt-small {
  font-size: 13px;
  margin-left: 3px;
  font-weight: 100;
}
.naiar-divider {
  margin-top: 20px;
}
.text-right {
    text-align: right;
}
.float-left-second {
  border: 2px solid #39cc39;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}
.float-right {
  float: right;
}
.f-weight-6 {
  font-weight: 400;
}
.person {
  display: inline-block;
  font-weight: 600;
}


.well.personal-well {
  background: white;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 16px 32px;
  color:#000 !important;
}
.float-left {
    border: 2px solid #3484F5;
    border-radius: 50%;
    padding: 13px 18px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
.naiar-divider {
    margin-top: 20px;
}
.work-profile {
  background: #fff;
  padding: 41px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.work_testimonial_blue {
  background: #e5e7f7;
  z-index: 1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08) !important;
}
.float-left-second {
    border: 2px solid #39cc39;
    border-radius: 50%;
    padding: 13px 18px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.12);
    font-size: 14px !important;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
div#work-profile b {
    font-weight: 500;
}
div#work-profile p {
    color: #000;
    font-weight: 100;
    font-size: 14px;
    line-height: 1.7em;
}
div.work-profile h5 {
    font-weight: 100 !important;
    font-family: raleway;
}
.work_testimonial_white {
  background: #fff;
  z-index: 1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08) !important;
}
.skill-set {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.f-weight-7 {
  font-weight: 500;
}
.text-center {
  text-align: center;
}
.output-image {
    display: block;
    margin-bottom: 9%;
    margin-top: 5%;
    text-align: -webkit-center;
}

img#picture_preview {
  border-radius: 50%;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  /* display: flex; */
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.07);
  background-position: center center;
  border: 4px solid #fff;
}
.picture {
    width: 30px;
    height: 30px;
    position: relative;
    cursor: pointer;
    /* top: 58%; */
    left: 55%;
    margin-top: -17%;
    margin-bottom: 8%;
}
.person {
    display: inline-block;
    font-weight: 600;
    padding: 6px;
}
.picture i {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  padding: 2px 5px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.64);
  color: white;
  font-size: 21px !important;
  background: rgba(0, 0, 0, 0.87);
}
.well.personal-well {
    background: white;
    border: 0px solid white;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.10);
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
    padding: 13px 37px 0px;
}
.personal-details input {
    margin-bottom: 12px;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.personal-details {
    background: white;
    padding: 60px;
    margin-top: -2%;
    z-index: -1;
    border: 0px solid white;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10) !important;
}
.personal-password {
    background: white;
    padding: 60px;
    margin-top: -2%;
    z-index: -1;
    border: 0px solid white;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10) !important;
}
.picture input {
  cursor: pointer;
  position: absolute;
  display: block;
  top: 0px;
  left: 0px;
  opacity: 0;
  height: 100%;
  width: 100%;
}
.text-right.earns-text h4 {
    font-size: 14px !important;
    color: #000;
}
.text-right.earns-text p {
    font-size: 13px !important;
    color: #000;
    font-family: raleway;
}
.switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 26px;
}
.switch input {
  display: none;
}
input:checked + .slider {
  background-color: #4ae650;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider.round {
  border-radius: 50px;
}
.well.balance h4 {
    font-size: 19px;
    color: #000;
}
.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 4px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round:before {
  border-radius: 50%;
}
.f-weight-6 {
  font-weight: 400;
}
.available button {
  background: #3eca44;
  padding: 8px 28px;
  font-size: 11px;
  color: white;
  outline: none;
  border: none;
}
.personal-password {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.deactivate-acc {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.setters p {
    font-family: raleway;
    color: #000;
    font-weight: 100;
    margin-bottom: 3%;
}
.float-right {
    float: right;
}
.step-size18 {
    font-size: 23px !important;
}
.personal-password input {
    margin-bottom: 12px;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.form-control:focus {
    border-color: #326ADA;
    border: 2px solid #326ADA !important;
    outline: 0;
    box-shadow: none !important;
}
.personal-password button {
    padding: 8px 50px;
    margin-top: 2%;
    color: #6A86A5;
    font-weight: 600;
}
.deactivate-acc input {
    margin-bottom: 12px;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.deactivate-acc button {
    padding: 8px 50px;
    margin-top: 7%;
    color: #fff;
    font-weight: 600;
}
.personal-details button {
    padding: 8px 50px;
    margin-top: 2%;
    color: #6A86A5;
    font-weight: 600;
}
.col-blue {
    color: #728EAA;
    font-weight: 100;
    font-size: 14px;
}

</style>
