<template>
  <span>
    <!-- {{user}} -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 main-title" style="font-size: 14px !important">
          <h3 style="font-size: 16px !important">Staff
            <span style="font-size: 16px !important" >({{ team.staff.confirmed.length }})</span>
          </h3>
        </div>

        <div class="col-md-6 main-title" style="font-size: 14px !important">
         	<el-input v-model="filter_by" @input="searching" placeholder="Search Staff" style="width: 64%;"></el-input>
        </div>
    </div>
    <div class="row">
        <div class="col-md-11">
          <div class="row">
            <NoMember v-if="!team.staff.confirmed || !team.staff.confirmed.length && !loading">
              No Clients found
          </NoMember>
            <div v-else>
            	<div v-if="filteredTeam.length>0" v-for="(member, index) in filteredTeam" :key="index" class="col-md-4"  style="padding-bottom: 20px;">
          	
	              <MemberCard :member="member" :people="true"></MemberCard>
	            </div>
	            <div v-if="filteredTeam.length==0">
	            	<NoMember>No Results Found</NoMember>
	            </div>
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
import inviteForm from '@/app/shared/modals/sendInvite';

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
       filteredTeam () {              
	        if(this.showing == null){
	            return this.team.staff.confirmed;
	        }else{
	            return this.showing;
	        }
	    },


    },
    mounted(){
      
    },
    data(){
    	return {
    		filter_by: '',
    		showing: null,
    	}
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
      searching(){
        var self = this;
            var matches = this.team.staff.confirmed.filter(function(str) {
            return str.first_name.toLowerCase().includes(self.filter_by) 
            || str.last_name.toLowerCase().includes(self.filter_by)
             || str.Email.toLowerCase().includes(self.filter_by);
        });
        this.showing = matches; 

    },
    }

};
</script>
<style scoped="true">
  .main-title{
    color: #8c8989 !important;
    font-size: 14px !important;
  }
</style>
