<template>
  <div class="container animated slideInUp" >

    
{{setEmail}}
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 loginwell">
        <div class="auth-header text-center" >
          <!-- <img :src="require('@/assets/img/zeedas-png.png')" alt="Zeedas" width="100px" height="100px" class="login-signup-logo" /> -->
          <div v-if="sent">
          <h4 class="title">Confirmation Link Sent</h4>
          <div class="sub-title text-left">
              Please check your mail for confirmation link<br><br>
              Please check your Spam or Junk Folder in case its not in the inbox<br>

            <br><br>
           <i v-if="user.email != ''">
            Didn't Receive? <a v-if="!myloading" style="cursor: pointer" @click="validateBeforeSubmit(user.email)">Resend</a>
               </i>
               <span v-if="myloading" class="fa fa-spinner fa-spin"></span>
               <br>

          </div>
          </div>

            <div v-else >
                <h4 class="title">Email Confirmation</h4>
                <span class="sub-title">Enter email address to resend confirmation link<br></span>
            </div>

        </div>
        <div class="spacer">
          <div class="space"></div>
        </div>
        <div class="content auth-form" v-if="!sent">
          <form @submit.prevent="validateBeforeSubmit">

              <BannerError v-if="(redirectError || error) && !autherror" :exempt="true">
                {{ redirectError || error }}
              </BannerError>
              <BannerError v-if="autherror" :exempt="true">{{ autherrorMsg }}</BannerError>

            <div class="row">
              <div class="col-md-12">
                <label class="label" for="email">Email</label>
                  <p :class="{ 'control': true }">
                      <input v-validate="'required|email'"
                        v-model="user.email"
                        class="form-control" 
                        :class="{'input': true, 'is-danger': errors.has('email') }" 
                        name="email" 
                        type="text" 
                        placeholder="Email">

                      <FieldError>
                          {{ errors.first('email') }}
                      </FieldError>
                  </p>
              </div>
            <div class="text-center">
              <button v-if="!myloading" type="submit" class="btn auth-form-btn">
                Resend
              </button>

              <LoadingButton v-else buttonclass="btn auth-form-btn">Re-Sending...</LoadingButton>
            </div>

            <div class="auth-footer">
            </div>
            </div>
          </form>
        </div>

          <div class="auth-footer">
        <span>Confirmed?
                <router-link :to="{ name: 'login' }">Login</router-link>
              </span>

          <div class="clearfix"></div>
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
  name: 'login',
  props: ['redirectUrl','resendTo'],
  components: {
  },
  destroyed () {
    this.clearErrors()
  },
  data() {
    return {
      myloading: false,
      user: {
        email: '',
        password: '',
      },
      have_sent: false
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
      sent(){
          return this.have_sent?true:this.$route.params.sent == 1;
      },
      setEmail(){
          if(this.resendTo){
              this.user.email = this.resendTo;
          }
      }
  },
  methods: {
        ...mapActions('auth', [
          'resend_confirmation',
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

        checkBack () {
            let url = this.redirectUrl;
            if (url !== undefined) {
                return true;
            } else {
                return false;
            }
        },

        clearFields () {
            this.user = {
                email: '',
                password: '',
            };
        },

        validateBeforeSubmit(trusted, email) {
          // this.$show_notification("showk d fsd", "error")
            this.$validator.validateAll().then(result => {
                if (result) {
                // eslint-disable-next-line
                // Set arguments for endpoint
                    let args = {
                        Email: email || this.user.email
                    }
                    this.myloading = true;
                    const self = this;
                    this.resend_confirmation(args)
                    .then(function (status) {
                        self.myloading = false;

                        if (status.error === undefined) {
                            self.$show_notification(status.data.message);
                            self.have_sent = true;
                        } else {

                            self.$show_notification(status.error, 'error');
                          // BannerError will handle error
                        }
                    });

                }
            });
        },
    },
}

</script>

<style scoped>
/* BaseHeader{
  display:none;
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
.loginwell {
    padding: 25px;
    border: 1px solid #3369da;
    box-shadow: 0 2px 15px rgba(0,0,0,0.16);
    border-radius: 5px;
    margin-top: 150px;
}
</style>
