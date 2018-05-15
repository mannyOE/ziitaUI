<template>
  <div class="container animated slideInUp" style="margin-top: 50px">

    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 well loginwell">
        <div class="auth-header">
          <img :src="require('@/assets/img/zeedas-png.png')" alt="Zeedas" width="100px" height="100px" class="login-signup-logo" />
          <h4 class="title">Forgot Password</h4>
          <span class="sub-title">I Know My Password Already
            <router-link :to="{ name: 'login' }">Login</router-link>
          </span>
          <router-link :to="{ name: 'signup' }">
            <div class="sign-up-add-btn">
              <i class="icons ion-android-add"></i>
            </div>
          </router-link>

        </div>
        <div class="spacer">
          <div class="space"></div>
        </div>
        <div class="content auth-form">
          <form @submit.prevent="validateBeforeSubmit" >

              <!-- <BannerError v-if="(redirectError || error) && !autherror" :exempt="true">
                {{ redirectError || error }}
              </BannerError>
              <BannerError v-if="autherror" :exempt="true">{{ autherrorMsg }}</BannerError> -->
       <!--  <BannerError v-if="error" :exempt="true">{{ errorMssg }}</BannerError>

        <BannerSuccess v-else-if="success" :exempt="true">{{ successMsg }}</BannerSuccess> -->
            <div class="row">
              <div class="col-md-12">
                <label class="label" for="email">Email</label>

                  <p :class="{ 'control': true }">
                      <input v-validate="'required|email'"
                        
                        class="form-control" 
                        :class="{'input': true, 'is-danger': errors.has('email') }" 
                        name="email" 
                        type="text" v-model="user.email"
                        placeholder="Email">

                      <FieldError>
                          {{ errors.first('email') }}
                      </FieldError>
                  </p>
              </div>
             
            </div>
            <div class="text-center">
              <button v-if="!loading" type="submit" class="btn auth-form-btn">
                Send Link
              </button>

              <LoadingButton v-else buttonclass="btn auth-form-btn">Sending...</LoadingButton>
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
import { mapActions, mapGetters } from 'vuex';
import { redirectHome } from '@/app/helpers';

export default {
  name: 'Forgot-Password',
  // props: ['redirectUrl'],
  components: {
  },
  destroyed () {
    this.clearErrors()
  },
  data() {
    return {
      user: {
        email: '',
       
      },
    };
  },
  computed: {
      ...mapGetters('forgotPassword', [
           'error',
           'errorMssg',
           'success',
            'successMsg',
            'loading',
      ]),
  },
  methods: {
        ...mapActions('forgotPassword', [
            'forgotPassword',
            'resetState',
        ]),
        
 
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

        clearFields () {
            this.user = {
                email: '',
                
            };
        },

        validateBeforeSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) {
                // eslint-disable-next-line
                // Set arguments for endpoint
                    let args = {
                        email: this.user.email,
                        // Password: this.user.password,
                    }
                    
                    const self = this;
                    this.forgotPassword(args)
                    .then(function (status) {
                      debugger;
                        if (status.status === 200) {
                            if(status.data.status == true){
                            self.$show_notification(status.data.message, "success")
                            self.clearFields()
                            } else{
                          self.$show_notification(status.data.message, "error")
                            }
                          
                            if (self.checkBack()) {
                                self.redirectBack()
                            } else {
                                self.redirectHome(status.userType)
                            }
                        } 
                        if (status.status !== 200) {
                          // BannerError will handle error
                          debugger;
                          self.$show_notification(status.message, "error")
                        }
                    });
                    return;
                }
            });
        },
    },
}

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
    box-shadow: 0 2px 15px rgba(0,0,0,0.16);
    border-radius: 50%;
    padding: 12px 21px;
}
</style>
