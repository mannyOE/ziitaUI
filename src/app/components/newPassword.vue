<template>
  <div class="container animated slideInUp" style="margin-top: 50px">

    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 well loginwell">
        <div class="auth-header">
          <img :src="require('@/assets/img/zeedas-png.png')" alt="Zeedas" width="100px" height="100px" class="login-signup-logo" />
          <h4 class="title">Change Password</h4>
         <!--  <span class="sub-title">I Know My Passwor Already
            <router-link :to="{ name: 'login' }">Login</router-link>
          </span> -->
          <router-link :to="{ name: 'signup' }">
            <div class="sign-up-add-btn"> 
              <i class="icons ion-ios-close-empty"></i>
            </div>
          </router-link>

        </div>
        <div class="spacer">
          <div class="space"></div>
        </div>
        <BannerError v-if="error" :exempt="true">{{ errorMsg }}</BannerError>

        <BannerSuccess  v-if="success" :exempt="true">{{ successMsg }}</BannerSuccess>
        <div class="content auth-form">
          <form @submit.prevent="validateBeforeSubmit">

              <!-- <BannerError v-if="(redirectError || error) && !autherror" :exempt="true">
                {{ redirectError || error }}
              </BannerError>
              <BannerError v-if="autherror" :exempt="true">{{ autherrorMsg }}</BannerError> -->

            <div class="row">
              <div class="col-md-12">
                    <label class="label" for="password">New Password</label>
                    <p :class="{ 'control': true }">
                        <input v-validate="'required|min:6'"  
                           v-model="user.password"
                            class="form-control" 
                            :class="{'input': true, 'is-danger': errors.has('password') }" 
                            name="password" 
                            type="password" 
                            placeholder="Password">

                        <FieldError>
                            {{ errors.first('password') }}
                        </FieldError>
                    </p>
                </div>

                <div class="col-md-12">
                    <label class="label" for="cpassword">Confirm Password</label>
                    <p :class="{ 'control': true }">
                        <input v-validate="'required|min:6|confirmed:password'"
                            class="form-control" 
                            :class="{'input': true, 'is-danger': errors.has('password confirmation') }" 
                            name="password confirmation" 
                            type="password" 
                            placeholder="Confirm Password">

                        <FieldError>
                            {{ errors.first('password confirmation') }}
                        </FieldError>
                    </p>
                </div>
            </div>
            <div class="text-center">
              <button v-if="!loading" type="submit" class="btn auth-form-btn">
                Change 
              </button>

              <LoadingButton v-else buttonclass="btn auth-form-btn">Changing...</LoadingButton>
            </div>
            <!-- <div class="auth-footer">
              <span>Forgot Password?
                <router-link :to="{ name: 'index' }">Recover</router-link>
              </span>
              <div class="clearfix"></div>
            </div> -->
          </form>
        </div>
      </div>

      <div class="col-md-4"></div>

    </div>
    <!-- <vue-toast ref="toast" /> -->
  </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { redirectHome } from "@/app/helpers";
import { redirectLoginNoBack } from "@/app/helpers";

export default {
  name: "Forgot-Password",
  // props: ['redirectUrl'],
  components: {},
  destroyed() {
    this.clearErrors();
  },
  data() {
    return {
      user: {
        password: "",
        token: this.$route.params.token
      }
    };
  },
   watch:{
      success: function(){
          if(this.success){
              return this.redirectUser()
          }
      }
  },
  computed: {
    ...mapGetters("users/updatePassword", [
      "error",
      "autherrorMsg",
      "autherror",
      "redirectError",
      "loading",
      "success",
      "successMsg",
      "errorMsg"
    ])
  },
  methods: {
    ...mapActions("users/updatePassword", ["confirmPassword", "clearErrors"]),

    // redirectHome (type) {
    //   /**
    //    * Redirect the user to the appropriate home page based on the user type
    //    */
    //     redirectHome(this, type);
    // },

    // redirectBack () {
    //     this.$router.replace(this.redirectUrl);
    // },

    // checkBack () {
    //     let url = this.redirectUrl;
    //     if (url !== undefined) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // },

    clearFields() {
      this.user = {
        password: ""
      };
    },
    redirectUser() {
      /**
             * Logout the user and redirect to login page
             */
      let self = this;
    //   if (this.success) {
        setTimeout(function() {
        //   self.logout().then(status => {
            return redirectLoginNoBack(self);
        //   });
        }, 5000);
    //   }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          // Set arguments for endpoint
          let args = {
            // Email: this.user.email,
            Password: this.user.password,
            token: this.user.token
          };

          const self = this;
          this.confirmPassword(args).then(function(status) {
            if (status.state === true) {
              self.clearFields();
              if (self.checkBack()) {
                self.redirectBack();
              } else {
                self.redirectHome(status.userType);
              }
            } else if (status.state === false) {
              // BannerError will handle error
            }
          });
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
/* BaseHeader{
  display: none;
} */
.sign-up-add-btn i {
  color: #fff;
  font-size: 25px;
}

.sign-up-add-btn {
  position: absolute;
  top: -4%;
  background: #3369da;
  right: -6%;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.16);
  border-radius: 50%;
  padding: 12px 21px;
}
</style>
