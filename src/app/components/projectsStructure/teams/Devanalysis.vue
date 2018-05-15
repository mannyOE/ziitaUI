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
            <div v-for="(member, index) in computedTeam" :key="index" class="col-md-3 pr-0">
              <Devstats :member="member" :project="true" :projectId="id" @reloadStore="reloadstore"/>
            </div>
        </div>
        <div>
        </div>
        <ViewTeamMember></ViewTeamMember>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ViewTeamMember from '@/app/shared/TeamMemberModal';
import Devstats from '@/app/shared/cards/devanalysisCard';
import NoMember from "@/app/shared/NoMember";

export default {
    name: "projectTeamList",
    props: ['id'],
    components: {
        ViewTeamMember,
        NoMember,
        Devstats,
    },
    data() {
        return {
            showTeamViewModal: false,
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

    this.callWithToken({
        parameters: {
            id: this.user.team_Id, // project id
        },
        action: this.getClientTeam,
    });
    },
    destroyed () {
      this.$_$destroyedHook()
    },
    computed: {
        computedTeam(){
            var member = [];
            var all_team = this.all_team;
            this.team.forEach(function(id){
                all_team.forEach(function(user){
                    if(id == user.Id){
                        member.push(user);
                    }
                });
            });
            return member;
        },
      // mix the getters into computed with object spread operator
      ...mapGetters('projects/getTeam', [
        'team',
        'loading',
        'error',
      ]),
    ...mapGetters('team',
                {all_team:'team'}
        ),
    ...mapGetters('userCredentials', [
            'user',
        ]),
    },
    methods: {
      ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
    ...mapActions('team', [
            'getClientTeam'
        ]),
      ...mapActions('userCredentials', [
        'callWithToken'
      ]),
        openTeamViewModal(team) {
            console.log(team);
            this.teamMember = team;
            this.showTeamViewModal = true;
        },
        closeTeamViewModal() {
            this.showTeamViewModal = false;
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

<style>
.plus-button {
    width: 35px;
    height: 35px;
    border-radius: 100% !important;
    padding: 7px 0px 0 1px;
}
</style>
