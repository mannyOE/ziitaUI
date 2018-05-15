<template>
  <!-- This Is The Profile Dropdown -->
  <li class="dropdown profile" style="width: 230px">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
      <div class="row">
        <div class="col-xs-3">
          <img :src="imageLink(userData)" class="img" alt="">
        </div>
        <div class="col-xs-9" style="overflow: hidden">
          <div class="user-name">{{userData.first_name +" "+userData.last_name}}</div>
        </div>
      </div>
    </a>
    <ul class="dropdown-menu d-p-m col-md-12" style="">
      <!--<li>-->
      <!--<a href="#">-->
        <!--<router-link :to="{ name: 'perms'}">-->
          <!--Permissions-->
        <!--</router-link>-->
      <!--</a>-->
      <!--</li>-->
      <li>
      <a href="#">
        <router-link :to="{ name: 'profile' }">Profile</router-link> &nbsp;
      </a>
      </li>
      <li>
        <a href="#" @click.stop="logoutUser()">Log out</a>
      </li>
      <!--<div class="profile-email text-left">-->
        <!--<span style="border-bottom: 1px solid rgba(214,218,229,0.34); padding-bottom: 7px;"><i class="ion-ios-email-outline" style="font-size: 17px;"></i>&nbsp; {{ userData.Email }} </span>-->
         <!--<p style="padding-top: 7px;"><i class="ion-ios-person-outline" style="font-size: 18px;" ></i>&nbsp;&nbsp;{{ $_$getUserTypeName(userData.type) }}</p>-->
      <!--</div>-->

        <!-- <AuthenticatedField v-show="check_permission('managePermission')"> -->

        <!-- </AuthenticatedField> -->
      </div>
    </ul>
  </li>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { redirectLoginNoBack } from '@/app/helpers';

export default {
  name: "ProfileComponent",
  data() {
    return {
      openProfile: false,
       user: {
          firstName: 'loading...',
          lastName: '',
          email: 'loading...',
          status: 'loading...',
          image: '',
      },
    };
  },
  computed: {
      ...mapGetters('userCredentials', {
          userData: 'user',
          permissions: 'permissions'
      }),

      isUserUnverified() {
        return this.user.status === 1;
      }

  },
  methods: {
    ...mapActions('userCredentials', [
        'logout',
        'callWithToken',
    ]),
    ...mapActions('auth', [
        'getUser',
    ]),

    logoutUser() {
      /**
       * Logout the user and redirect to login page
       */

      this.logout()
      .then( status => {
        // Redirect to login page
        redirectLoginNoBack(this)
      })
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

    setUserDetails() {
      // Updating component with data from api
      this.user.firstName = this.userData.first_name;
      this.user.lastName = this.userData.last_name;
      this.user.email = this.userData.Email;
      this.user.status = this.userData.status;
      this.userData.profile_photo = "http://178.62.51.68:8000/img/"+this.userData.profile_photo
    },
      imageLink(member){
          if(!member.profile_thumbnail){
              return require('@/assets/img/1.jpeg');
          }
          return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;
      },

    fetchUser() {
      this.callWithToken({
        parameters: {},
        action: this.getUser,
      })
      .then( status => {
        if (status) {
          // Got user

          this.setUserDetails();
        }
      })
    },

    toggleProfileBox() {
      if (!this.openProfile) {
        this.openProfile = true;

        // Get user details everytime profile box is toggled
        this.fetchUser();

        return true;
      }
      this.openProfile = false;
      return false;
    },
  }
}

</script>
<style scoped>
  .aa{
    border-bottom: 1px solid rgba(214,218,229,0.34);
    width: 207px;
    padding: 7px;
    color: #011b;
    font-family: montserrat;
    text-decoration: none;
    font-size: 12px;
  }
  .bb{
    padding: 7px;
    color: #011b;
    font-family: montserrat;
    text-decoration: none;
    font-size: 12px;
  }
  .d-p-m{
    /*padding: 15px 15px !important;*/
    padding: 15px;
    margin-top: 5px !important;
    /*text-decoration: none;*/

    /*font-family: Montserrat;*/
    font-size: 14px;
    font-weight: 500;
    margin-left: 40px;
    border-radius: 0 0 5px 5px ;
    border: none;
    box-shadow: 0 2px 30px 0 rgba(50,106,218,0.1);
    width: 131px;

    text-align: center;
    /*margin: auto;*/
  }
  .d-p-m a{
    color: #9B9B9B;
  }
 .d-p-m a:hover{
   /*color: #FB3640;*/
   text-decoration: none;
 }
.profile-img img {
  width: 40px;
  margin: 5px auto;
  display: block;
  height: 40px;
  border-radius: 100%;
}

.profile-name,
.profile-email{
  font-family:  montserrat;
  width: 207px;
  padding-left: 10px;
  font-size: 12px;
  color: #011b;
  border-bottom: 2px solid rgb(250, 251, 255);
}
.profile-links {
  text-align: center;
  font-family: "Montserrat";
}

.profile {
  background: #ffffff;
  border: 1px solid #e5e7f7;
  border-radius: 5px;
  height: 60px !important;
  width: 60%;
  margin-left: 10px;
  transition: all .4s ease;
  margin-bottom: 10px;
  box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
}
.user-name {
  font-weight: bolder;
  line-height: 30px;
  /*font-family: "Montserrat";*/
  display: inline-block;;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 5px;
  width: 100%;
}
.profile .dropdown-toggle:hover {
  background-color: transparent;
}
.profile .dropdown-toggle {
 height: 50px;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;

}
.profile .dropdown-toggle:focus {
  background-color: #fff;
}
.profile:hover {
  background: #ffffff;
  /*transform: scale(1.03);*/
  /*transition: .05s ease-in-out all;*/
  /* transform: rotate(90deg); */
  /*border-radius: px;*/
  /*border: 1px solid #3469da;*/
}
.img {
  border-radius: 100%;
  height: 30px;
  width: 30px;
}

.profile-content {
  /* border-radius: 5px; */
  border-top: none;
  border-left: none;
  border-right: none;
  height: 200px;
}
.profile-dropdown {
    border-radius: 1px  !important;
    word-break: break-word;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10) !important;
    border: none !important;
    padding: 16px 18px 28px;
}
.profile-dropdown p{
  font-size: 12px;
  font-weight: 500 !important;
 font-family: "Montserrat";
  margin-top: 2%;
}
.profile-dropdown hr{
  margin: 0;
  background: #2370b1;
  height: 2px;
  border-top: none;

}
span{
   font-family: "Montserrat" !important;
}
p{
   font-family: "Montserrat" !important;
}
/*.profile-dropdown:before {
    content: '\F365';
    position: absolute;
    font-size: 20px;
    right: 5%;
    font-size: 29px;
    font-family: Ionicons !important;
    top: -12%;
    color: #3369da;

    box-shadow: 0 2);
}*/
</style>
