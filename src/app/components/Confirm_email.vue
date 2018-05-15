<template>
  <div class="container animated slideInUp" style="margin-top: 50px">

    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 well loginwell">
        <div class="auth-header" >
          <img :src="require('@/assets/img/zeedas-png.png')" alt="Zeedas" width="100px" height="100px" class="login-signup-logo" />

          <h4 class="title">Confirmation</h4>
          <span class="sub-title">Please wait as we confirm your email address<br>

           <br>

          </span>

            <LoadingButton buttonclass="btn auth-form-btn">Confirming..</LoadingButton>

        </div>
        <div class="spacer">
          <div class="space"></div>
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
  props: ['redirectUrl'],
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
      ])
  },
    mounted(){
    let args = {
        token: this.$route.params.token
    };
    const self = this;

    this.confirm_email(args)
            .then(function (status) {
//                debugger;
                if(status.error === undefined) {
                    self.$show_notification(status.data.message);
                    self.$router.push("/login");
                }else {
                    self.$show_notification(status.error, "error");
                    self.$router.push("/confirmation_sent");
                }
            });
},
  methods: {
        ...mapActions('auth', [
            'confirm_email',
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
</style>
