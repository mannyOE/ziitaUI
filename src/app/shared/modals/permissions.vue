<template>
<el-dialog :visible="show" v-if="show"
      :show-close="false"
      :before-close="beforeClose" class="person-card" >

	<!-- {{devstats}} -->
        <div slot="title">
          <button type="button" class="close" @click.stop="beforeClose">&times;</button>
        </div>
    <!-- Modal content-->

      <div class="person-modal ">
			<img :src="imageLink(member)" alt="User Image">

						<h2>{{ member.first_name }} {{ member.last_name }}</h2>
						<h3>{{ $_$getUserTypeName(member.type) }}</h3>

            <!--Table-->
<table class="table table-striped table-hover">

    <!--Table head-->
    <thead class="blue-grey lighten-4">
        <tr>
            <th>Permission</th>
            <th>State</th>
        </tr>
    </thead>
    <!--Table head-->

    <!--Table body-->
      <tbody class="tb-content">
          <tr v-for="role in roles">
              <td style="">
                <span style="text-transform: uppercase;">
                  {{role.Permission.substring(0,6)}} {{role.Permission.substring(6)}}
                </span>
              </td>
              <td>
                <label class="switch">
                  <input type="checkbox" :id="role.Permission" :checked="role.State" @change="setNewState(role.State, role.Permission, member.Id)">
                  <span class="slider round"></span>
                </label>
              </td>
          </tr>

          <tr v-for="l in more">
            <td style="">
              <span style="text-transform: uppercase;">
                {{l.substring(0,6)}} {{l.substring(6)}}
              </span>
            </td>
            <td>
              <label class="switch">
                <input type="checkbox" :checked="false" @click="setNewState(false, l,member.Id)">
                <span class="slider round"></span>
              </label>
            </td>
          </tr>
      </tbody>
      <!--Table body-->
</table>
<!--Table-->


      </div>
</el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { API } from '../../../config';
export default {
  name: 'developer-detail',
  props: ['show', 'member'],
  data(){
	  return {
      zinc: false,
		  api: API,
		  deleting: false,
      view_no_access: false,
	  }
  },
  watch: {

  },
  mounted () {

    // this.state = this.roles.split('');

  },
  computed: {
    ...mapGetters('roles', ['success','error','roles','more']),
    ...mapGetters('userCredentials', ['user','permissions']),
    isClient(){
      if(this.member.type === '1'){
        return true;
      }
    }

  },
  methods: {
	  imageLink(member){
		  if(!member.profile_thumbnail){
			  return require('@/assets/img/1.jpeg');
		  }

		  return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
	  },

      ...mapActions('userCredentials', [
          'callWithToken',
          'refreshPermissions'
      ]),
      ...mapActions('roles', [
          'updatePermissions',
          'resetState',
      ]),


      setNewState(st, per,id){
        this.callWithToken({
        parameters: {
            Id: id, // project id
            permission: per,
            state: !st,
            type: this.member.type,
          },
          action: this.updatePermissions,
          });
          // this.fetchPermissions(id);
          // console.log(!st, per, id);
          // this.$emit('refresh');
      },
      show_more_permissions(){
        this.view_no_access = !this.view_no_access;
      },

    beforeClose(done) {
      var self = this;
      this.callWithToken({
        parameters: {},
        action: this.refreshPermissions,
      }).then(function(){
        self.$emit('refresh');
        self.$_$closeModal();
      });

      	//   done();
      	// this.$router.reload();

    },
    reloadStore(type, id) {
	//   this.$emit('reloadStore', type, id);
      	 const args = {
            Id: this.member.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.gtDev,
              reloadArgs: args
		  })

    },

  }
};
</script>



<style>

	.person-card > .el-dialog{
		width: 800px !important;
    height: 600px;
    overflow-y: scroll;
	}
  .tb-content{
    text-align: left;
  }
	.person-card .person-modal{
		padding-top: 1px;
		padding-bottom: 1px;
	}
	.person-card .text-center.spacer-down{
		margin: 5px !important;
	}
	.person-card .dev-task{
		margin: 6px 0px !important;
	}
	.person-card .person-modal{
		margin-top: -30px !important;
		padding-bottom: 4px !important;
	}
	.person-card .action-btn{
		margin-top: 15px !important;
	}

  .blue-grey{
    background-color: #3369da;
    color: #fff;
  }

</style>
