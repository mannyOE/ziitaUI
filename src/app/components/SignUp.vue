<template>
    <div class="container">
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
        <div  class="col-md-offset-7 col-md-2">
            <br>
             <p class="have-an-account" >HAVE AN ACCOUNT?</p>
        </div>
        <div class="col-md-1">
             <router-link :to="{ name: 'login' }">   
           <button  class="btn btn-started">

              <router-link :to="{ name: 'login' }">  <span class="btn-span">SIGN IN</span></router-link>
              </button>
          </router-link>

        </div>
      <!-- </div> -->
    </div>
        <!-- <div class="row"> -->
            <div class="animated slideInUp  log-in" align="center">
                  <p class="title sign-in">GET STARTED</p>
         
              
                <!-- <div class="content auth-form"> -->
                    <form @submit.prevent="validateBeforeSubmit" autocomplete="off">
                        <input autocomplete="false" name="hidden" type="text" style="display:none;">
                        <BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
                        <BannerError v-else-if="success" :exempt='true'> {{ successMsg}}</BannerError>

                        <div class="row">
                            <!-- This Is where we use the validation with vee validate -->
                         <!--    <div class="col-md-12">
                                  <label class="email-input" for="first name">First Name</label>
                                    <p :class="{ 'control': true }">
                                        <input v-validate="'required|min:2'" 
                                            v-model="user.firstName"
                                            class="form-control" 
                                            :class="{'input': true, 'is-danger': errors.has('first name') }" 
                                            name="first name" 
                                            type="text" 
                                            placeholder="First Name"> -->
                                        <!-- <input v-validate="'required|min:2'" 
                                            v-model="user.firstName"
                                            class="form-control" 
                                            :class="{'input': true, 'is-danger': errors.has('first name') }" 
                                            name="first name" 
                                            type="text" 
                                            placeholder="First Name"> -->

                                 <!--        <FieldError>
                                            {{ errors.first('first name') || fieldErrors.first_name }}
                                        </FieldError>
                                    </p>
                            </div> -->
                            
                              <div class="col-md-12 email">
                                 <label class="email-input" for="email">FIRST NAME</label>
                                    <p :class="{ 'control': true }">
                                        <input v-validate="'required'" 
                                            v-model="user.firstName"
                                            class="form-control login-input"
                                            :class="{'input': true, 'is-danger': errors.has('fname') }" 
                                            name="fname" 
                                            type="text" 
                                            placeholder="FIRST NAME">

                                        <FieldError>
                                            {{ errors.first('fname')  }}
                                        </FieldError>
                                    </p>
                            </div>
                             <div class="col-md-12 email" style="margin-top:29px !important">
                                 <label class="email-input" for="email">LAST NAME</label>
                                    <p :class="{ 'control': true }">
                                        <input v-validate="'required'" 
                                            v-model="user.lastName"
                                            class="form-control login-input"
                                            :class="{'input': true, 'is-danger': errors.has('lname') }" 
                                            name="lname" 
                                            type="text" 
                                            placeholder="LAST NAME">

                                        <FieldError>
                                            {{ errors.first('email')}}
                                        </FieldError>
                                    </p>
                            </div>

                            <div class="col-md-12 email" style="margin-top:29px !important">
                                 <label class="email-input" for="email">EMAIL</label>
                                    <p :class="{ 'control': true }">
                                        <input v-validate="'required|email'" 
                                            v-model="user.email"
                                            class="form-control login-input"
                                            :class="{'input': true, 'is-danger': errors.has('email') }" 
                                            name="email" 
                                            type="text" 
                                            placeholder="Email">

                                        <FieldError>
                                            {{ errors.first('email') || fieldErrors.Email }}
                                        </FieldError>
                                    </p>
                            </div>

                            <!-- <div v-if="!type" class="col-md-12">
                                <div class="form-group">
                                    <label class="label" for="email">
                                        Who are you?
                                    </label>
                                    <select v-validate="'required'"
                                        v-model="user.userType"
                                        class="form-control" 
                                        :class="{'input': true, 'is-danger': errors.has('user type') }" 
                                        name="user type" >
                                         <option v-for="type in $_$userTypes" :value="type.value">{{ type.name }}</option>
                                    </select>

                                    <FieldError>
                                        {{ errors.first('user type') || fieldErrors.type }}
                                    </FieldError>
                                </div>
                               
                            </div> -->

                            <!-- <div v-show="isUserClient" class="col-md-12"> -->
                            
                            <div class="col-md-12 email" style="margin-top:29px !important">
                                <label class="email-input" for="password">PASSWORD</label>
                                <p :class="{ 'control': true ,'search-box':true}">
                                  <!-- <div class="inner-addon left-addon"> -->
                                         <!-- <i class="fa fa-eye"></i> -->
                                          <i @click="togglePasword()" :class="{'icons':true,'ion-eye':!showingPassword,'ion-eye-disabled':showingPassword,'cursor':true}"></i>
                                    <input v-validate="'required|min:6'"  
                                        v-model="user.password"
                                        class="form-control login-input"
                                        :class="{'input': true, 'is-danger': errors.has('password'),'search':true  }" 
                                        name="password" 
                                        type="password" 
                                        placeholder="Password"
                                        ref="password">
                                  <!-- </div> -->

                                    <FieldError>
                                        {{ errors.first('password') || fieldErrors.password }}
                                    </FieldError>
                                </p>
                            </div>

                       <!--      <div class="col-md-12">
                                <label class="email-input" for="cpassword">Confirm Password</label>
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
                            </div> -->

                        </div>
                        <div class="text-center">
                             <button v-if="!loading" style="margin-top:29px;box-shadow: 0 13px 30px -17px rgba(50,106,218,0.49);" type="submit"  class="btn btn-reg">
                              <span class="btn-span" style="color:#fff">GET STARTED</span>
                              </button>
                            <!-- <input v-if="!loading" type="submit" class="btn auth-form-btn" value="Get started"> -->
                            <LoadingButton v-else buttonclass="btn btn-started" style="margin-top:29px; background: none !important"> Registering...</LoadingButton>
                            
                        </div>
                        <div class="proceed" style="margin-top:81px !important">
                            <span>By proceeding, I agree to Zeedas Terms of Service and Privacy Policy
                            </span>
                        </div>
                    </form>
                </div>
            <!-- </div> -->
        <!--     <div class="">
                <div class="well auth-emphasis">
                    <img :src="require('@/assets/img/692.jpg')" alt="Zeedas" width="100px" height="100px" class="img-responsive" />
                </div>
            </div> -->
            <!-- <div class="col-md-3"></div> -->
        <!-- </div> -->
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { redirectLoginNoBack, redirectHome } from '@/app/helpers';

export default {
    name: 'signup',
    props: ['teamId', 'type', 'inviteId'],
    components: {
        // Error,
    }, 
    destroyed () {
        this.$_$destroyedHook()
    },
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                userType: null,
                teamName: null,
                password: '',
               
            },
             showingPassword:false
        };
    },
    created(){
        this.invitedDetail()
    },
    watch:{
        single(){
            this.user.firstName = this.single.first_name
        }
    },
    computed: {
        ...mapGetters('register', [
            'error',
            'fieldErrors',
            'loading',
            'single',
            'successMsg',
            'success'
        ]),

        isUserClient() {
            const clientType = this.$_$userTypesObject.client.id
            return this.user.userType === clientType
        },

    },
    methods: {
        ...mapActions('register', [
            'register',
            'getInvited',
            'resetState',
            'clearErrors',
        ]),
                ...mapActions("userCredentials", ["callWithToken", ]),

        invitedDetail(){
              let  parameters={
                    id: this.inviteId
                }
                this.getInvited(parameters)
            
                 .then( status => {
                        // Got user
                 })
            },

        redirectLogin () {
            redirectLoginNoBack(this)
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
        redirectHome (type) {
          /**
           * Redirect the user to the appropriate home page based on the user type
           */
            redirectHome(this, type);
        },

        clearFields () {
            this.user = {
                firstName: '',
                lastName: '',
                email: '',
                userType: null,
                teamName: null,
                password: '',
            };
        },

        validateBeforeSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) { 
                // eslint-disable-next-line
                // Set arguments for endpoint
                    let args = {
                        first_name: this.user.firstName,
                        last_name: this.user.lastName,
                        Email: this.user.email,
                        Password: this.user.password,
                        // type: this.type || this.user.userType,
                        type: this.type || 1,
                        team_name: this.user.teamName,
                        team_Id: this.teamId,
                        invite_Id: this.inviteId,
                    }
                    const self = this;
                    this.register(args)
                    .then(function (status) {

                        if (status.data && status.data.status) {
                            self.clearFields()
                            if(status.data.type == 2){
                                self.redirectHome(status.userType)
                            }  
                            if(status.data.type == 1){
                                self.$show_notification("Sign up successful. Please check your email to confirm your account");
                                self.$router.push("/confirmation_sent/1");

                            }
                            if(status.data.type == 3){
                                self.$show_notification("Sign up successful. Please download the Desktop App");
                                self.$router.push("/download");
                            }
                        } else {
                            self.$show_notification(status.error || status.data.message, "error");
//                            self.clearFields()
//                            self.redirectLogin()
                        }
                    });
                    return;
                }
            });
        },
    },
};

</script>
<style type="text/css" scoped>
  body{
  background-color: #FAFBFF !important;
}
  .login-input{
      height: 49px !important;
      width: 450px !important;
      border: 1px solid #D6DAE5 !important;
       border-radius: 3px !important;
       background-color: #FFFFFF !important;
       margin-top: 8px !important;
 }

.col-md-4.signup-well.well {
    background: white;
    box-shadow: 0 2px 15px rgba(0,0,0,0.16);
    border-radius: 1px;
    padding: 32px;
}

.logo {
    display: inline-block;
    margin-top: 6%;
}
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
  font-family: "Montserrat" !important;

}
.sign-in{
height: 23px; 
width: 100%; 
color: #413E3E;
font-family: "Montserrat" !important;
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
  font-family: "Montserrat" !important;
  font-size: 12px !important;  
  font-weight: bold;  
  letter-spacing: 2px !important;  
  line-height: 16px !important;
  text-align: left;
  margin-bottom: -10px !important;
}
.proceed{
    height: 16px;
    width: 400px;
    color: rgba(50,106,218,0.47);
    font-family: "Montserrat";
    font-size: 12px;
    line-height: 16px;
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
     font-family: "Montserrat" !important;
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
    /*padding: 6px 12px;*/
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
   .search-box .ion-eye-disabled{
     position: absolute;
    top: 13px;
    font-weight: bolder;
    font-size: 20px;
    left: 67%;
  }
.btn-reg{
    background-color: #337ab7 !important;
    height: 45px;
  width: 130px; 
  border: 1px solid #D6DAE5 !important;
  border-radius: 23px; 
  box-shadow: unset;
  color: #fff; 
  font-family: "Montserrat" !important;
}
.btn-started:hover{
     background-color: #337ab7 !important;
     box-shadow: 0 13px 30px -17px rgba(50,106,218,0.49)
}
.btn-started:hover .btn-span{

    color: #fff !important
}  
.have-an-account {
    height: 16px;
    width: 200px;
    color: #8C8989;
    /*font-family: "Montserrat";*/
    font-size: 12px;
    letter-spacing: 3px;
    line-height: 5px;
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
