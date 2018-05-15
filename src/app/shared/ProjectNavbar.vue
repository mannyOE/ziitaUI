<template>
  <header class="header col-xs-10 col-xs-offset-2" style="margin-bottom: 50px;">
    <div class="containerrrr">
      <div class="rows">

        <div class="col-md-12 header-nav">
          <ul>
            <div class="flynow">
              {{projectName}}
            </div>
            <li :class="{'active': routeName === 'project-overview'}" v-show="check_permission('manageProject')">
              <router-link :to="{ name: 'project-overview'}">
                <p class="header-nav-p">overview</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'project-overview'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'arectangle-3-copyct': routeName === 'project-overview'}"> -->
            </li>
            <li :class="{'active': routeName === 'modules'}" v-show="check_permission('manageModules')">
              <router-link :to="{ name: 'modules'}">
                <p class="header-nav-p">modules</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'modules'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'act': routeName === 'modules'}"> -->
            </li>


            <li :class="{'active': routeName === 'project-team'}" v-if="check_permission('manageTeam')">
              <router-link :to="{ name: 'project-team'}">
                <p class="header-nav-p">Team</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'project-team'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'rectangle-3-copy': routeName === 'project-team'}"> -->
            </li>
            <li :class="{'active': routeName === 'share-files'}" v-if="check_permission('manageFiles')">
              <router-link :to="{ name: 'share-files'}">
                <p class="header-nav-p">files</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'share-files'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'rectangle-3-copy': routeName === 'share-files'}"> -->
            </li>
            <li :class="{'active': routeName === 'configuration'}"
            v-show="check_permission('manageConfiguration')">
              <router-link :to="{ name: 'configuration'}">
                <p class="header-nav-p">Configuration</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'configuration'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'rectangle-3-copy': routeName === 'configuration'}"> -->
            </li>
            <li :class="{'active': routeName === 'activity'}"
            >
              <router-link :to="{ name: 'activity'}">
                <p class="header-nav-p">TIMELINE</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'activity'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'rectangle-3-copy': routeName === 'activity'}"> -->
            </li>
            <li :class="{'active': routeName === 'qa'}" style="margin-left: 10px; margin-right: 20px">
              <router-link :to="{ name: 'qa'}">
                <p class="header-nav-p">qa</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'qa'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'rectangle-3-copy': routeName === 'qa'}"> -->
            </li>
              <li :class="{'active': routeName === 'ea'}">
              <router-link :to="{ name: 'ea'}">
                <p class="header-nav-p">Code Review</p>
              </router-link>
              <div :class="{'rectangle-3-copy': routeName === 'ea'}">

              </div>
              <!-- <hr class="active-stroke" :class="{'rectangle-3-copy': routeName === 'ea'}"> -->
            </li>
          </ul>
          <hr style="position: relative; top: -34px; left: 0px; width: 110%;">
        </div>


        <!-- <div class="col-md-2"></div> -->
        <!-- <div class="col-md-6 header-side">
              <ul>
                <li class="active">
                  <p>PEOPLE</p>
                  <button class="btn btn-md ">5</button>
                </li>
                <li>
                  <p>people</p>
                  <button class="btn btn-md ">1/5</button>
                </li>
                <li class="pr-0">
                  <p>activity</p>
                  <button class="btn btn-md ">2/5</button>
                </li>
              </ul>
            </div> -->
      </div>
    </div>
  </header>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';

export default {
  name: 'project-navbar',
  props: ['id'],
  data() {
    return {
      projectName: '',
    }
  },
  mounted(){
    // this.projectName = this.projects.filter(e=>e.Id === this.$route.params.id)[0].project_name;
    var self = this;
      this.callWithToken({
        parameters: {
          id: self.user.Id, // clients team id
        },
        action: self.getProjects,

      }).then(err=>{
        // alert();
        this.projectName = this.projects.filter(e=>e.Id === this.$route.params.id)[0].project_name;
      });
  },
  computed: {
    // ...mapGetters("projects/byid", [
    //   'project'
    // ]),
    // ...mapGetters("auth", [
    //   'userType'
    // ]),

    routeName() {
//  console.log("route", this.$route.name)
      return this.$route.name
    },

    hide() {
      // const userType = this.userType;
      // hide from project manager
      // if (userType === 1) {
      //   return true;
      // }
      return false;
    },
...mapGetters('userCredentials', [
  'user',
  'permissions',
]),
...mapGetters('team/getProjects', [
  'projects',
  'loading',
  'error',
]),
  },
  methods: {
    check_permission(rule){
      var state = false;
      this.permissions.forEach((perm)=>{
        if(perm.Permission === rule){
          state = true;
        }
      })
      return state;
    },
    ...mapActions('team/getProjects', [
      'getProjects',
      'resetState'
    ]),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
  }
}

</script>

<style scoped>
.header-nav ul {
  list-style-type: none;
  margin-left: 30px;
}
.header-nav ul li {
  position: relative;
  display: inline-block;
  margin-right: 20px;

}
.header-nav ul li a {
  height: 17px;
  width: 94px;
  color: #8C8989;
  /*font-family: "Montserrat";*/
  font-size: 13px;
  line-height: 17px;
  text-align: center;
  text-decoration: none;
}
.header-nav {
  text-transform: uppercase;
	height: 38px;
	width: 80%;
  margin-bottom: 50px;
  margin-left: -80px;
}
.active {
  color: #000;
  font-weight: bolder;
}
.rectangle-3-copy {
	height: 30px;
	width: 3px;
	transform: rotate(-90deg);
	border-radius: 100px 0 0 100px;
	background: linear-gradient(180deg, #61A3EF 0%, #326ADA 100%);
  margin: 0 auto 0 auto;
}


.flynow {
  margin-bottom: 15px;
	height: 26px;
	width: 100%;
	color: #453F3F;
  text-transform: capitalize;
	font-family: "Montserrat";
	font-size: 18px;
	font-weight: bold;
	line-height: 26px;
}

</style>
