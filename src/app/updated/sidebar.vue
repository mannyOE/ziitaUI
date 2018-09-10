<template>
	<div class="sidebar-dashboard">
		<ul>
			<AuthenticatedField>
				<li :class="{'active': routeName === 'projects' || is_dashboard}"><router-link :to="{name: 'projects'}">
					<i class="ion-ios-monitor-outline"></i>
					<span class="link-title">Dashboard</span> </router-link>
				</li>
			</AuthenticatedField>

			<AuthenticatedField >
				<li :class="{'active': routeName === 'clients'}"><router-link :to="{name: 'clients'}">
					<i class="ion-android-people"></i>
					<span class="link-title">Clients</span> </router-link>
				</li>
			</AuthenticatedField>

			<AuthenticatedField >

			<li :class="{'active': routeName === 'staff'}"><router-link :to="{name: 'staff'}">
				<i class="ion-gear-a" style="margin-right: 4px;"></i>
			<span class="link-title">Staff</span> </router-link> </li>
		</AuthenticatedField>

			<AuthenticatedField>
				<li :class="{'active': routeName === 'comms-center'}"><router-link :to="{name: 'comms-center'}">
					<i class="ion-ios-albums-outline"></i>
				<span class="link-title">Communication Center</span></router-link> </li>
			</AuthenticatedField>
			<AuthenticatedField>
				<li :class="{'active': routeName === 'reports'}"><router-link :to="{name: 'reports'}"><i class="ion-ios-albums-outline"></i>
				<span class="link-title">Reporting</span></router-link> </li>
			</AuthenticatedField>
			<AuthenticatedField>
				<li :class="{'active': routeName === 'requests'}"><router-link :to="{name: 'requests'}"><i class="ion-ios-albums-outline"></i>
				<span class="link-title">Client Requests</span></router-link> </li>
			</AuthenticatedField>

			<AuthenticatedField>
				<li :class="{'active': routeName === 'billings'}"><router-link :to="{name: 'billings'}"><i class="ion-ios-chatboxes-outline"></i>
				<span class="link-title">Billings</span></router-link> </li>
			</AuthenticatedField>
		</ul>

	</div>
</template>


<script>
import {
  mapGetters, mapActions
} from 'vuex';
import NewProjectModal from '@/app/components/projectsStructure/modals/newProject.vue'

// import {
//   checkUser
// } from '@/utils';
export default {
  name: 'base-navbar',
    components: {
       // ChooseMemberModal,
        NewProjectModal,

    },
  data(){

    return {
      showNewProject:false,
      showChat:true
    }

  },
  mounted () {

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
    ...mapGetters('team/stats', [
      'stats',
      'loading',
      'error',
    ]),
    ...mapGetters('userCredentials', [
        'user',
        'permissions'
    ]),

     routeName() {
        console.log(this.$route);
       return this.$route.name
     },

	 is_dashboard(){
        return this.$route.path.split("/")[2] == 'project';
	 }


   }
}

</script>
</script>


<style  scoped>

	.sidebar-dashboard {
		background-color: #FFFFFF;
		height: 777px;
		position: fixed;
		padding: 20px 0px 10px 0px;
	}

	.link-title {
		position: relative;
		left: 10px;
		top: -4px;
		height: 19.53%;
		width: 5%;
		color: #453F3F;
		// font-family: "Montserrat";
		font-size: 14px;
		line-height: 30px;
	}
	.logo {
		height: 40px;
		width: 40px;
		margin: 8px 0 8px 36px;
	}
	.zeedas {
		/* font-size: 20px;
		line-height: 40px; */
		color: #000000;
		// font-family: "Gloria Hallelujah";
		font-size: 17px;
		line-height: 30px;

	}
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0 0 0 0px;
		margin-top: 35px;
	}
	li{
		position: relative;
	}
	li a {
		display: block;
		width: 100%;
		padding: 8px 0 8px 36px;
		text-decoration: none;
		color: #000;
	}
	li a i {
		font-size: 20px;
		font-weight: bolder;
		/* width: 150px; */
		padding: 0 5px 0 0;
	}
	li a:hover {
		background-color: #E5E5E5;

	}


	.active:after{
	    content: " ";
	    display: inline-block;
		height: 40px;
		width: 4px;
		border-radius: 0px 100px 100px 0px;
		position: absolute;
		right: 0px;
		top: 50%;
    margin: 0 auto 0 auto;
    margin-top: -20px;
    background: -webkit-gradient(linear, left top, left bottom, from(#61A3EF), to(#326ADA));
    background: linear-gradient(180deg, #61A3EF 0%, #326ADA 100%);
	}
</style>
