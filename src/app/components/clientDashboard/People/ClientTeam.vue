<template>
  <span>
    <!-- {{user}} -->
    <div class="container">
      <div class="row">
        <div class="col-md-11 main-title" style="font-size: 14px !important">
          <h3 style="font-size: 16px !important">Clients
            <span style="font-size: 16px !important" >({{ team.clients.length }})</span>
          </h3>
        </div>
        <div class="col-md-11">
          <div class="row">
            <NoMember v-if="!team.clients || !team.clients.length && !loading">
              No Clients found
          </NoMember>

            <div v-else v-for="(member, index) in team.clients" :key="index" class="col-md-4"  style="padding-bottom: 20px;">
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
        'loading',
        'error',
      ]),


    },
    mounted(){
      
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
    }

};
</script>
<style scoped="true">
  .main-title{
    color: #8c8989 !important;
    font-size: 14px !important;
  }
</style>
