<template>

	<nav class="navbar sidebar-dashboard">
    <div class="row">
    <div class=" col-xs-8">
    </div>
	<div class="col-xs-4">
      <ul class="nav navbar-nav " style="float: right; width: 300px; margin-right: -7px">
				<!-- <Notifications/> -->
				<profile/>
				<!-- {{user}} -->

      </ul>
	</div>
    </div>
    </nav>

</template>

<script>
import {
  mapGetters, mapActions
} from 'vuex';
import Notifications from "../shared/HeaderNotifications";
import profile from "../shared/profile";

// import {
//   checkUser
// } from '@/utils';
export default {
  name: 'base-navbar',
    components: {
       // ChooseMemberModal,
        // NewProjectModal,
				Notifications,
				profile
    },
  data(){

    return {
      showNewProject:false,
      showChat:true
    }

  },
  mounted () {
      this.callWithToken({
        parameters: {
          id: this.user.Id,
        },
        action: this.getTeamStats,
      });



  },
  // destroyed () {
  //   this.$_$destroyedHook()
  // },
  methods: {
      ...mapActions('team/stats', [
        'getTeamStats',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),

       openNewProject () {
          this.showNewProject = true

      },
        closeNewProject () {
          this.showNewProject = false
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

  },
   computed: {
    ...mapGetters('userCredentials', [
        'user',
				'blocked',
        'permissions',
				'isAuth',
    ]),
		isAccountBlocked(){
			return this.blocked;
		},
		isAccountBlockedClient(){
			return this.user.type !== '1'
		},

     routeName() {
       return this.$route.name
     },

   }
}

</script>

<style type="text/css" scoped>

	.icons{
		border: none !important;
		background: none !important;
	}

	.sidebar-dashboard {
		margin-top: 20px;
		/*padding: 0px 50px !important;*/
	}

	.search-box {
		position: relative;
		padding-top: 10px;
	}
	.search-box .search {
		width: 150px;
		margin-left: -10px;
		text-indent: 25px;
		transition: width 0.4s;
		-webkit-transition: width 0.4s;
		font-size: 12px;
		height: 40px;
		/*font-family: Montserrat;*/
		background-color: inherit;
		border: none;
		padding: 6px 12px;
	  line-height: 1.22857143;
	  color: #555;
	  border-radius: 3px;

	}

	.search-box .search:focus {
			width: 300px;
			background: #fff;
			border-color: #66afe9;
		  outline: 0;
		  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
		          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
	}
	.search_img {
        width: 15px;
        position: absolute;
        left: 0px;
		top: 18px;
  }
	.search-box .ion-ios-search {
		position: absolute;
		top: 25px;
		font-weight: bolder;
		font-size: 18px;
		left: 15px;
	}


</style>
