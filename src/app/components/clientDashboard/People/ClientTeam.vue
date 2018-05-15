<template>
  <span>
    <!-- {{user}} -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 main-title" style="font-size: 14px !important">
          <h3 style="font-size: 16px !important">MEMBERS
            <span style="font-size: 16px !important" >({{ team.length }})</span>
          </h3>
        </div>
        <div class="col-md-6">

        </div>
        <div class="col-md-12" style="width: 950px !important;" >
          <div class="row">

            <LoadingBar v-if="loading && team.length"/>
            <FetchError v-else-if="error">{{ error }}</FetchError>


            <NoMember v-else-if="!team || !team.length && !loading">
              No team member found
          </NoMember>

            <div v-else v-for="(member, index) in team" :key="index" class="col-md-4"  style="padding-bottom: 20px;">
        <MemberCard :member="member" :people="true"></MemberCard>
            </div>

          </div>
        </div>
      </div>
    </div>
  </span>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NoMember from "@/app/shared/NoMember";
export default {
    name: "team",
    components: {
      NoMember,
    },
    computed: {
        ...mapGetters('team', [
          'team',
          'denied',
        'loading',
        'error',
      ]),


    },
    mounted(){
      // this.fetchTeam();
      this.accessDenied();
    },

    // created: {

    // },
    methods: {
        reloadStore(type, id) {
            this.$emit('reloadStore', type, id);
        },

          ...mapActions('userCredentials', [
        'callWithToken',
      ]),
    
      accessDenied(){
        console.log(this.denied);
      }

    }

};
</script>
<style scoped="true">
  .main-title{
    color: #8c8989 !important;
    font-size: 14px !important;
  }
</style>
