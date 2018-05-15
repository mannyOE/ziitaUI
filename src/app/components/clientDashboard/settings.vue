<template>
  <section>
    <!-- <div class="col-md-8 tab-pane fade animated fadeInUp"> -->
          <NoMember v-if="team.length === 0">
            No team member found
          </NoMember>
          <div class="col-md-4" style="cursor: pointer;">
            <PermCard :member="user"></PermCard>
          </div>
          <div v-for="(member, index) in team" :key="index" class="col-md-4"  style="padding-bottom: 20px;cursor: pointer;">
            <PermCard :member="member"></PermCard>
          </div>
    <!-- </div> -->

  </section>

</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import NoMember from "@/app/shared/NoMember";

export default {
    name: "settings",
    components: {
      NoMember,
    },
    data() {
      return {
      }
    },
    methods: {
      fetchTeam() {
        // Get client team data
          this.callWithToken({
          parameters: {
            id: this.user.team_Id, // clients team id
            // id: this.user.Id, // clients team id
          },
          action: this.getClientTeam,
        });

      },

      ...mapActions('team', [
        'getClientTeam',
      ]),
      ...mapActions('roles', [
        'getMemberRoles',
      ]),
      ...mapActions('team', {
        teamResetState: 'resetState'
      }),

      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
      ...mapMutations('team', [
        'setTeam',
      ]),
    },
    mounted() {

      this.fetchTeam();
    },
    computed: {
      ...mapGetters('userCredentials', ['user',]),
      ...mapGetters('team/getPendingInvites', ['team_Id']),
      ...mapGetters('team', ['team',]),
    },

};
</script>
<style scoped>
@import "../../../assets/css/bootstrap/css/bootstrap.css";



.f-weight-3 {
  font-weight: 300;
}


</style>
