<template>
<div class="" v-if="isNotLoginPage">
  <nav class="navbar navbar-default header navbar-static-top" >
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="logo">

            <router-link :to="{ name: 'index' }">
                  <img :src="require('@/assets/img/zeedas-png.png')" />
                  <p>Zeedas</p>
              </router-link>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <!-- <div class="col-xs-7 nav-input">
              <input type="text" placeholder="Search">
          </div> -->

            <!--<input type="text"  v-if="isAuth && isNotLoginPage" class="form-control" placeholder="Search In Zeedas">-->

        </ul>
        <ul class="nav navbar-nav navbar-right tour-notif">
          <li>
            <router-link :to="{ name: 'login' }" v-if="!isAuth && isNotLoginPage">Sign in</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'signup' }" v-if="!isAuth && isNotLoginPage">Sign up</router-link>
          </li>
       <!--    <li>
            <el-tooltip v-show="false" class="item" effect="dark" content="Dashboard" placement="bottom">
              <router-link :to="{ name: 'projects' }" v-if="isAuth ">
                <i class="icons ion-ios-monitor-outline">
                </i>  <el-tooltip class="item" effect="dark" content="Overall progress of the project" placement="top">
              </router-link>
            </el-tooltip>
          </li> -->



            <li v-if="isAuth">

                    <a href="javascript:void(0)" @click="showHelp()" >
                        <el-tooltip class="item" effect="dark" id="my_show_help"  content="Help" placement="bottom">
                            <i class="icons ion-help-circled">
                                <use xlink:href="#dashboard"></use>
                            </i>
                        </el-tooltip>
                    </a>
                    <!-- <p class="header-nav-p">Dashboard</p> -->

            </li>

            <li v-if="isAuth">
                <router-link :to="{ name: 'projects'}">
                    <a href="#" >
                        <el-tooltip class="item" effect="dark" content="Dashboard" placement="bottom">
                            <i class="icons ion-ios-monitor-outline">
                                <use xlink:href="#dashboard"></use>
                            </i>
                        </el-tooltip>
                    </a>
                    <!-- <p class="header-nav-p">Dashboard</p> -->
                </router-link>
            </li>
            <li>
              <a href="#" v-if="isAuth && isNotLoginPage">
                  <el-tooltip class="item" effect="dark" content="Notifications" placement="bottom">
                <Notifications/>
              </el-tooltip>
              </a>
            </li>
            <li>
              <a href="#" v-if="isAuth && isNotLoginPage">
                  <el-tooltip class="item" effect="dark" content="Feedback" placement="top">
                <Feedback/>
              </el-tooltip>
              </a>
            </li>

          <li>
            <a href="#" v-if="isAuth && isNotLoginPage">
                <el-tooltip class="item" effect="dark" content="Profile" placement="bottom">
              <ProfileComponent  v-if="isNotLoginPage"/>
            </el-tooltip>
            </a>
          </li>
        </ul>
      <div class="col-12">
        <div class="col-xs-4"></div>
        <div class="col-xs-4" >
          <div id="fixed">
            <BannerSuccess  v-if="error" >{{ errorMsg }}</BannerSuccess>
            <BannerSuccess  v-else-if="success" >{{ successMsg }}</BannerSuccess>
          </div>
        </div>
        <div class="col-xs-4"></div>
      </div>

      </div>
    </div>

  </nav>
  <div class="row">
    <!-- lsldkuweowei -->
  <div class="row text-center" v-if="isAuth">
    <p v-if="user.type === '1' && isAccountBlocked" class="bg-danger text-danger" style="padding: 20px; font-size: 20px;">
      Your Account has been blocked from your team members. Fund your <router-link :to="{name: 'wallet'}">wallet here</router-link>
    </p>
    <Blocked :show="isAccountBlocked" :label="'Account Blocked'"
    v-else-if="user.type !== '1'"></Blocked>
  </div>
</div>
</div>
</div>
</template>

<script>
// ../../../..
// C:\Users\HP\NatterBase\zeedas_ui\src\app\shared\BaseHeader.vue
// C:\Users\HP\NatterBase\zeedas_ui\src\app\components\clientDashboard\configuration\Configuration.vue
// C:\Users\HP\NatterBase\zeedas_ui\src\main.js

import { eventBus } from '../../main';
import { mapGetters } from "vuex";
import Notifications from "./HeaderNotifications";
import ProfileComponent from "./profile";
import Feedback from './Feedback'
import Blocked from '@/app/shared/blocked.vue'

export default {
  name: "baseheader",
  data() {
    return {
      success: false,
      successMsg: '',
      error: false,
      errorMsg: '',
    }
  },
  // created(){
  //   eventBus.$on('success', (data)=>{
  //     this.success = data.success
  //     this.successMsg = data.successMsg
  //   })
  //   eventBus.$on('error', (data)=>{
  //     this.error = data.error
  //     this.errorMsg = data.errorMsg
  //   })
  // },
  components: {
    Notifications,
    ProfileComponent,
    Feedback,
    Blocked
  },
   computed: {
      ...mapGetters('userCredentials', [
          'isAuth',
          'blocked',
          'user',
      ]),
      isNotLoginPage() {
           console.log("Route Name", this.$route.name);
        if (this.$route.name === "login" || this.$route.name === "signup") {
          return false;
        }
        return true;
      },
      isAccountBlocked(){
        return this.blocked;
      },
      isAccountBlockedClient(){
        return this.user.type !== '1'
      }
    },
    methods:{
        showHelp(){
            $("[data-intro]").each(function(){
                if(!$(this).is(":visible")) {
                    $(this).attr("data-intro2", $(this).attr("data-intro"));
                    $(this).removeAttr("data-intro");
                }
            });
           var intro = this.$introJs.introJs();
            intro.setOption("showProgress", true);
            intro.onafterchange(function () {
                if($(this._introItems[this._currentStep].element).data("removeintro")){
                    $(this._introItems[this._currentStep].element).removeAttr("data-intro")
                }
            });
            intro.onexit(function(){
               $("[data-intro2]").each(function(){
                    $(this).attr("data-intro", $(this).attr("data-intro2"));
                    $(this).removeAttr("data-intro2");
               });
            });
            intro.setOption("showStepNumbers", false);
            intro.start();
//            $("")
//            document.getElementById("my_show_help").removeAttribute("data-intro");
        }
    }
};
</script>

<style>
    .navbar-right i{
        font-size: 20px !important;;
        color: #3369da !important;;
    }
</style>
<style scoped>

#fixed {
  position: fixed;
}
.logo {
    display: inline-block;
    margin-top: 6%;
}

.logo p {
    float: right;
    font-size: 18px;
    font-weight: 900;
    margin-left: 5px;
    margin-top: 6px;
}

.logo img {
    height: 32px;
    width: 32px;
    float: left;

}
span.nav-notif.ion-asterisk {
    position: absolute;
    font-size: 7px;
    top: -29%;
    color: white;
    left: 60%;
    background: #ef57b7;
    border-radius: 50%;
    padding: 0px 5px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.24);
    max-height: 17px;
}

ul.nav.navbar-nav.navbar-right.tour-notif i {
    font-size: 20px !important;
}
</style>
