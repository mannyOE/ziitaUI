<template>

    <div id="menu2" class="tab-pane fade animated fadeInUp" :class="{'active in': routeName === 'manage-account'}">
        <div class="col-md-8">
            <div class="well personal-well opned" data-toggle="collapse" data-target="#personal-password">
                <p class="person f-weight-6">Manage Password</p>
                <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
            </div>
            <UpdatePasswordForm/>

            <HideField>
              <div class="well personal-well opned" data-toggle="collapse" data-target="#deactivate-acc">
                  <p class="person f-weight-6">Deactivate Account</p>
                  <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
              </div>
              <div class="deactivate-acc well collapse" id="deactivate-acc">
                  <p class="col-blue">You are about to deactivate your account. This action once taken cannot be reversed.</p>
                  <hr>
                  <label for="">PASSWORD</label>
                  <input type="text" class="form-control" >
                  <button class="btn btn-danger btn-block" @click="deactivateAccount()">DEACTIVATE</button>
              </div>
            </HideField>
        </div>
    </div>

</template>

<script>
import { mapActions , mapGetters } from 'vuex';
import UpdatePasswordForm from '@/app/shared/forms/updatePassword'

export default {
  name: "ManageAccount",
  components: {
      UpdatePasswordForm,
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    // ...mapGetters('auth',[
    //   'id',
    //   'user',
    //   'userType'
    // ])
  },

  data() {
    return {
      thisUser: {
        name:"",
        password: ""
      },
      account: {

      }
    };
  },
  methods: {
    // checkUser,
    deactivateAccount() {
      console.log(this.thisUser);
    },
    updatePassword() {

    }
  }
};


</script>

<style>

</style>
