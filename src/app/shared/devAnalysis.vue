<template>
    <div class="container">
        <div class="col-md-6"></div>
        <div class="col-md-6">
            <!--<router-link :to="{ name: 'add:team:member' }" class="pull-right">
                <div class="btn btn-fab bg-pink plus-button">
                    <i class="ion-plus"></i>
                </div>&nbsp;&nbsp;&nbsp;
            </router-link>-->
        </div>

        <LoadingBar v-if="loading"/>
        <FetchError v-else-if="error">{{ error }}</FetchError>

        <NoMember v-else-if="!team || !team.length && !loading">
            No team member yet
        </NoMember>
        <div v-else class="col-md-12">
            <div v-for="(member, index) in team" :key="index" class="col-md-3 pr-0">
              <!-- <MemberCard :member="member" :project="true" @reloadStore="reloadstore"/> -->
              <div class="row">
                <div class="col-md-5">
                  <img src="require('@/assets/img/1.jpeg')" alt="" class="img-circle img-responsive">
                </div>
                <div class="col-md-7"></div>
              </div>
            </div>
        </div>
        <div>
        </div>
        <ViewTeamMember></ViewTeamMember>
        <addTeamMember :show.sync="showTeams" @close="closeTeams"></addTeamMember>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ViewTeamMember from '@/app/shared/TeamMemberModal';
import NoMember from "@/app/shared/NoMember";
import addTeamMember from "./AddPeopleToProj"

export default {
    name: "projectTeamList",
    props: ['id'],
    components: {
        ViewTeamMember,
        NoMember,
        addTeamMember,
    },
    data() {
        return {
            showTeamViewModal: false,
            showTeams: false,
            teamMember: {
                user: {}
            }
        }
    },
    mounted () {
        this.callWithToken({
          parameters: {
            id: this.id, // project id
          },
          action: this.getTeam,
        });
    },
    destroyed () {
      this.$_$destroyedHook()
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters('projects/getTeam', [
        'team',
        'loading',
        'error',
      ]),
    },
    methods: {
      ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
        'user',
      ]),
        openTeamViewModal(team) {
            console.log(team);
            this.teamMember = team;
            this.showTeamViewModal = true;
        },
        closeTeamViewModal() {
            this.showTeamViewModal = false;
        },
        openTeams () {
          this.showNewProject = true
      },
       closeTeams () {
          this.showNewProject = false
      },

      reloadstore (type, id) {
          let args = {
            id: this.id,
            token: this.token
          }
          cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getClientTeam,
              reloadArgs: args
          })
      },
    }
}
</script>

<style scoped>
.plus-button {
    width: 35px;
    height: 35px;
    border-radius: 100% !important;
    padding: 7px 0px 0 1px;
}
</style>
