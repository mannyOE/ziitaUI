<template>
    <form  @submit.prevent="validateBeforeSubmit" class="personal-password well collapse" id="personal-password">
        <div class="form-group">
        <div>OLD PASSWORD</div>

        <BannerError v-if="error" :exempt="true">{{ errorMsg }}</BannerError>

        <BannerSuccess v-else-if="success" :exempt="true">{{ successMsg }}</BannerSuccess>

        <input v-validate="'required'"   
            v-model="user.password"
            class="form-control" 
            :class="{'input': true, 'is-danger': errors.has('password') }" 
            name="password" 
            type="password">

        <FieldError>
            {{ errors.first('password') }}
        </FieldError>

        </div>
        <div class="form-group">
        <div>NEW PASSWORD</div>
        <input v-validate="'required|min:6'"  
            v-model="user.newPassword"
            class="form-control" 
            :class="{ 'input': true, 'is-danger': errors.has('newPassword') }" 
            name="newPassword" 
            type="password" >

        <FieldError>
            {{ errors.first('newPassword'|| fieldErrors.password) }}
        </FieldError>
        

        </div>

        <div class="form-group">
        <div>CONFIRM PASSWORD</div>
        
        <input v-validate="'required|min:6|confirmed:newPassword'"  
            
            class="form-control" 
            :class="{ 'input': true, 'is-danger': errors.has('confirm password') }" 
            name="confirm password" 
            type="password">

        <FieldError>
            {{ errors.first('confirm password') }}
        </FieldError>
        

        </div>


        <p class="text-right">
            <button v-if="!loading"  class="btn btn-default" type="submit">Save</button>
            <LoadingButton v-else buttonclass="btn btn-default">Saving...</LoadingButton>
        </p>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { redirectLoginNoBack } from "@/app/helpers";

export default {
  name: "update-password-form",
  computed: {
    routeName() {
      return this.$route.name;
    },
    ...mapGetters("users/updatePassword", [
      "error",
      "errorMsg",
      "success",
      "successMsg",
      "loading" 
    ]),
    ...mapGetters("userCredentials", {
      userData: "user"
    })
  },
  data() {
    return {
      user: {
        password: "",
        newPassword: ""
      }
    };
  },
  destroyed() {
    this.$_$destroyedHook();
  },
  watch:{
      success: function(){
          if(this.success){
              return this.logoutUser()
          }
      }
  },

  methods: {
    ...mapActions("users/updatePassword", ["updatePassword", "resetState"]),
    ...mapActions("userCredentials", ["callWithToken", "logout"]),
    clearFields() {
      this.user = {
        password: "",
        newPassword: ""
      };
    },
    logoutUser() {
      /**
             * Logout the user and redirect to login page
             */
      let self = this;
    //   if (this.success) {
        setTimeout(function() {
          self.logout().then(status => {
            return redirectLoginNoBack(self);
          });
        }, 5000);
    //   }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          // Set arguments for endpoint
          let args = {
            Id: this.userData.Id,
            password: this.user.password,
            new_password: this.user.newPassword
          };

          const self = this;
          this.callWithToken({
            parameters: args,
            action: this.updatePassword
          }).then(function(status) {
            if (status) {
              //Success
            } else {
            }
          });
          return;
        }
      });
    }
  }
};
</script>

<style>

</style>
