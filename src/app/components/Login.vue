<template>
  <div class="container ">
    <div class="row my-nav">
      <!-- <div class="col-md-12"> -->
        <div class="col-md-2">
           <!-- <div class="logo">

            <router-link :to="{ name: 'index' }">
                  <img height="45px" width="45px" :src="require('@/assets/img/zeedas-png.png')" />
                  <p class="z">Zeedas</p>
              </router-link>
        </div> -->
        </div>
        <div class="col-md-offset-9 col-md-1">
           <router-link :to="{ name: 'signup' }">
           <button  class="btn btn-started">

          <router-link :to="{ name: 'signup' }"><span class="btn-span">GET STARTED</span></router-link>
              </button>
              </router-link>
        </div>
      <!-- </div> -->
    </div>
    <!-- <div class="row"> -->
      <!-- <div class="col-md-4"></div> -->

      <div class=" animated slideInUp log-in" align="center">
         <p class="title sign-in">SIGN IN </p>
          <p class="sub-title enter-details">Enter your details below
            <!-- <router-link :to="{ name: 'signup' }">Signup</router-link> -->
          </p>
      <!--   <div class="auth-header">
          <img :src="require('@/assets/img/zeedas-png.png')" alt="Zeedas" width="100px" height="100px" class="login-signup-logo" />
          <h4 class="title">Sign in Now</h4>
          <span class="sub-title">I don't have an account?
            <router-link :to="{ name: 'signup' }">Signup</router-link>
          </span>
          <router-link :to="{ name: 'signup' }">
            <div class="sign-up-add-btn">
              <i class="icons ion-android-add"></i>
            </div>
          </router-link>

        </div>
        <div class="spacer">
          <div class="space"></div>
        </div> -->

        <!-- <div class="content auth-form"> -->
          <form @submit.prevent="validateBeforeSubmit">
              <BannerError v-if="autherror" :exempt="true">{{ autherrorMsg }}</BannerError>
              <div align="left" v-if="show_confirmation_link">
                <i><a href="javascript:void(0)" @click="$router.replace('confirmation_sent')">Resend Confirmation Email</a></i>
              </div>

            <div class="row ">
              <div class="col-md-12 email">
                <label class="email-input" align="left" for="email">EMAIL</label>
                  <p :class="{ 'control': true }">
                      <input v-validate="'required|email'"
                        v-model="user.email"
                        class="form-control"
                        :class="{'input': true, 'is-danger': errors.has('email') }"
                        name="email"
                        type="text"
                        >

                      <FieldError>
                          {{ errors.first('email') }}
                      </FieldError>
                  </p>
              </div>
              <br>
              <div class="col-md-12 email" style="margin-top:29px !important">
                <label class="email-input" align="left"  for="password" >PASSWORD</label>
                  <p :class="{ 'control': true ,'search-box':true}">
                    <!-- <div class="search-box "> -->
                     <!-- <i class="fa fa-eye"></i> -->
                                          <i @click="togglePasword()" :class="{'icons':true,'ion-eye':!showingPassword,'ion-eye-disabled':showingPassword,'cursor':true}"></i>
                      <input v-validate="'required|min:6'"
                        v-model="user.password"
                        class="form-control"
                        :class="{'input': true, 'is-danger': errors.has('password') ,'search':true }"
                        name="password"
                        type="password"
                        ref="password"
                        >
                      <!-- </div> -->
                        <FieldError>
                            {{ errors.first('password') }}
                        </FieldError>
                  </p>
              </div>
            </div>
            <div class="text-center" style="width:450px !important">
              <button v-if="!loading" style="margin-top:29px" type="submit" class="btn btn-started">
              <span class="btn-span">SIGN IN</span>
              </button>

              <LoadingButton v-else style="margin-top:29px; background: none !important;" buttonclass="btn  btn-started">SIGNING IN...</LoadingButton>
            </div>
        <!--     <div class="auth-footer">
              <span>Forgot Password?
                <router-link :to="{ name: 'forgot' }">Reset Password</router-link>
              </span>
              <div class="clearfix"></div>
            </div> -->
          </form>
        <!-- </div> -->
      </div>

      <!-- <div class="col-md-4"></div> -->

    <!-- </div> -->
    <!-- <vue-toast ref="toast" /> -->
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { redirectHome } from '@/app/helpers';

export default {
  name: 'login',
  props: ['redirectUrl'],
  components: {
  },
  destroyed () {
    this.clearErrors()
  },
  data() {
    return {
      showingPassword:false,
      user: {
        email: '',
        password: '',
      },
        show_confirmation_link: false
    };
  },
  computed: {
      ...mapGetters('auth', [
          'error',
          'autherrorMsg',
          'autherror',
          'redirectError',
          'loading',
      ]),
  },
  methods: {
        ...mapActions('auth', [
            'login',
            'clearErrors',
        ]),

        redirectHome (type) {
          /**
           * Redirect the user to the appropriate home page based on the user type
           */
            redirectHome(this, type);
        },

        redirectBack () {
            this.$router.replace(this.redirectUrl);
        },
          togglePasword(){
            if(this.showingPassword){
                this.showingPassword = false;
                 this.$refs.password.type = "password";
            }
            else{
                this.showingPassword = true;
                this.$refs.password.type = "text";
                
            }
        },
        checkBack () {
            let url = this.redirectUrl;
            if (url !== undefined) {
                return true;
            } else {
                return false;
            }
        },

        clearFields () {
//            this.user.password = "";
        },

        validateBeforeSubmit() {
          this.show_confirmation_link = false;
          // this.$show_notification("showk d fsd", "error")
            this.$validator.validateAll().then(result => {
                if (result) {
                // eslint-disable-next-line
                // Set arguments for endpoint
                    let args = {
                        Email: this.user.email,
                        Password: this.user.password,
                    }

                    const self = this;
                    this.login(args)
                    .then(function (status) {

                        if (status.state === true) {

                            self.user.password = "";

                            if(status.data.status)
                                self.user.email = "";

                            if (self.checkBack()) {
                                self.redirectBack()
                            } else if (status.data.type == 2){
                                self.redirectHome(status.userType)
                            } else if (status.data.type == 3){
                              self.$show_notification(status.data.message);
                            } else {

                               if(status.data.userStatus && status.data.status){
                                self.redirectHome(status.userType)
                                return;
                                }
                              self.$show_notification(status.data.message, status.data.status?"success":"error", 10000);
                              if(status.data.userStatus == 1)
                                self.show_confirmation_link = true;
                            }
                        } else if (status.state === false) {

                          // BannerError will handle error
                          var error = self.autherror || self.error
                          self.$show_notification(error, "error")

                        }
                    });
                    return;
                }
            });
        },
    },
}

</script>
<style type="text/css" scoped>
  body{
  background-color: #FAFBFF !important;
}
input{
  height: 49px !important;
  width: 450px !important;
  border: 1px solid #D6DAE5 !important;
   border-radius: 3px !important;
   background-color: #FFFFFF !important;
   margin-top: 8px !important;
 }

input[type=password]{

}
/* BaseHeader{
  display:none;
} */
.logo {
    display: inline-block;
    margin-top: 6%;
}
.btn-started:hover{
     background-color: #337ab7 !important;
     box-shadow: 0 13px 30px -17px rgba(50,106,218,0.49);
     /*color:#fff;*/
}
.btn-started:hover .btn-span{
    color: #fff !important
}  
/*.btn-span:hover{
    color: #fff !important
}*/ 
.log-in{
  /*max-width: 450px !important;*/
  width: 100%;
}
.my-nav{
  margin-top: 40px
}
.logo p {
    float: right;
    font-size: 18px;
    font-weight: 900;
    margin-left: 5px;
    margin-top: 6px;
}
.btn-started{
  height: 45px;
  width: 130px;
  border: 1px solid #D6DAE5 !important;
  border-radius: 23px;
  background-color: #FFFFFF;
  box-shadow: unset;
  color: #8C8989;
  font-family: "Halis GR" !important;

}
.sign-in{
height: 23px;
width: 100%;
color: #413E3E;
font-family: "Halis GR" !important;
font-size: 18px;
font-weight: bold;
letter-spacing: 7px;
 line-height: 23px;
 margin-top: 120px;
 text-align: center;
 margin-bottom: unset !important;
 opacity: 100%
}
.enter-details{
  height: 100%;
  width: 100%;
  color: #8C8989;
  font-family: "Gloria Hallelujah" !important;
  font-size: 24px;
   line-height: 48px;
   text-align: center;
   /*opacity: 100%;*/
}
.logo img {
    height: 32px;
    width: 32px;
    float: left;

}
.email {
  height: 77px;
  width: 100%;
}
.email-input{
  height: 16px;
  width: 450px !important;
  color: #453F3F !important;
  font-family: "Halis GR" !important;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 16px;
  text-align: left;
  margin-bottom: -10px !important;
}
.password {
  height: 77px;
  width: 450px;
  margin-top: 29px
}
.sign-up-add-btn i {
    color: #fff;
    font-size: 25px;
}
.btn-span{
    height: 16px;
     min-width: 104px;
     color: #8C8989;
     font-family: "Halis GR" !important;
      font-size: 12px;
      font-weight: bold;
       letter-spacing: 2px;
        line-height: 16px;
}
  .search-box {
    position: relative;
    padding-top: 0px;
  }
  .search-box .search {
    width: 145px;
    /*text-indent: 25px;*/
    transition: width 0.4s;
    -webkit-transition: width 0.4s;
    font-size: 15px;
    height: 50px;
    background-color: inherit;
    border: none;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    border-radius: 4px;

  }

  .search-box .search:focus {
      width: 100%;
      background: #fff;
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
              box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
  }
    .search-box .ion-eye {
     position: absolute;
    top: 13px;
    font-weight: bolder;
    font-size: 20px;
    left: 67%;
  }
     .search-box .ion-eye-disabled {
     position: absolute;
    top: 13px;
    font-weight: bolder;
    font-size: 20px;
    left: 67%;
  }
.sign-up-add-btn {
    position: absolute;
    top: -4%;
    background: #3369da;
    right: -6%;
    box-shadow: 0 2px 15px rgba(0,0,0,0.16);
    border-radius: 50%;
    padding: 12px 21px;
}
.z{
    height: 30px;
    width: 86px;
    color: #000000;
    font-family: "Gloria Hallelujah" !important;
    font-size: 24px;
    line-height: 30px;
}
</style>
