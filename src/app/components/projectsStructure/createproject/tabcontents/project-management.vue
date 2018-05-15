<template>
    <div class="">
      <div class="container-fluid text-center">
        <!-- <HideField>
        <div class="col-md-10">
            <input type="text" class="form-control" placeholder="search">
        </div>

        <div class="col-md-4">
            <button class="btn btn-primary btn-block">Search</button>
        </div>
         </HideField> -->
        <!-- <div :class="{'active dactive': s_team == pm.Id}" class="people stats-card"
        v-for="pm in filteredTeam" style="vertical-align: middle;" @click.prevent="createProject(pm.Id)">
          <div>
              <div class="person-img" >
                  <img :src="require('@/assets/img/1.jpeg')" class="image">
              </div>
              <div class="people-card">
                  <h3 class="name">{{pm.first_name}} {{pm.last_name}}</h3>
                  <h3 class="title">Project Manager</h3>
              </div>
          </div>
        </div> -->
        <ul style="list-style-type:none;white-space:nowrap; overflow-x:auto;">
          <li :class="{'active dactive': s_team == pm.Id}" class="people stats-card"
          v-for="pm in filteredTeam" style="vertical-align: middle;" @click.prevent="createProject(pm.Id)">
          <div>
              <div class="person-img" >
                  <img :src="require('@/assets/img/1.jpeg')" class="image">
              </div>
              <div class="people-card">
                  <h3 class="name">{{pm.first_name}} {{pm.last_name}}</h3>
                  <h3 class="title">Project Manager</h3>
              </div>
          </div>
          </li>
          
        </ul>
        <i v-if="filteredTeam.length == 0" class="icon ion-person"></i>
        <h4 v-if="filteredTeam.length == 0" >No Team Member Yet</h4>

        <!-- <div class="col-md-6">
            <InviteUserForm :project-manager="true" class="invite-sec"/>
        </div> -->
      </div>
    </div>
</template>

<script>
    import TabPane from './tabpane'
    import InviteUserForm from '@/app/shared/forms/inviteUserForm'
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'choose-project-manager',
        props: ['show'],
		components: {
            TabPane,
            InviteUserForm
		},
		data () {
			return {
                s_team: 0
			}
		},
    mounted () {
        this.callWithToken({
            parameters: {
                 id: this.user.Id
            },
            action: this.getClientTeam,
        });
    },
        computed:{
            ...mapGetters("team",[
                "team"
            ]),
            ...mapGetters("userCredentials",[
                "user"
            ]),
                ...mapGetters('projects/add', [
                'error',
                'loading',
            ]),
            filteredTeam(){
                return this.team.filter((team)=>{return team.type == 2});
            }
        },
		methods: {
        ...mapActions('team', [
                        'getClientTeam',
                            ]),
        ...mapActions('userCredentials', [
                'callWithToken'
            ]),
            goBack () {
                this.$emit('back')
            },
            sendPM () {
                var id = this.s_team || "";
                this.$emit('next', id)
            },
            createProject(id){
                  // createProject () {
                this.s_team = id;

                this.$emit('set', id);
            // },
            }
		},
    }
</script>


<style scoped>
/* .dactive:before {
    content: "\f382";
    position: fixed;
    font-family: Ionicons;
    color: green;
    border: 1px solid green;
    font-size: 20px;
    padding: 3px 6px;
    margin: 0;
    border-radius: 50%;

} */
.name {
	height: 25px;
	color: #4A4A4A;
	font-family: "Avenir Next";
	font-size: 18px;
	font-weight: 600;
	letter-spacing: 0.14px;
	line-height: 25px;
	text-align: center;
  margin-bottom: 8px;
}
.title {
  margin-top: 0;
	height: 22px;
	color: #4A4A4A;
	font-family: "Avenir Next";
	font-size: 16px;
	font-weight: 500;
	letter-spacing: 0.12px;
	line-height: 22px;
	text-align: center;
}
.active {
  background: #ffffff;
	/* transform: rotate(90deg); */
	box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
	border-radius: 1px;
	/* margin-top: 27%; */
}
.people:hover {
	background: #ffffff;
	/* transform: rotate(90deg); */
	box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
	border-radius: 1px;
	/* margin-top: 27%; */
}
.people{
	background: #ffffff;
	border-radius: 5px;
	padding: 13px;
	padding-top: 15px;
	margin-top: 5px;
	transition: all .4s ease;
	/* margin-bottom: 10px; */
}
.stats-card {
	height: 22.06%;
	width: 20.78%;
  display: inline-block;
	margin-right: 3.47%;
	text-align: center;
  margin-top: 40px;
  border-right: 1px solid rgba(0, 0, 0, 0.13);
}
.image{
  height: 100px;
  width: 100px;
  border-radius: 100%;
  margin-bottom: 22px;
  margin-top: 20px;
}
.pm2 {
  width: 100%;
  overflow-x: scroll;
}
</style>
