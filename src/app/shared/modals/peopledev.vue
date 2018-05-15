<template>
<el-dialog :visible="show"
      :show-close="false" 
      :before-close="beforeClose">


        <div slot="title">
          <button type="button" class="close" @click.stop="$_$closeModal">&times;</button>
        </div>
    <!-- Modal content-->
		<BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
		<BannerError v-if="suspendError" :exempt="true">{{ suspendError }}</BannerError>

      <div class="person-modal">
			<img :src="require('@/assets/img/1.jpeg')" alt="User Image">
						<h2>{{ member.first_name }} {{ member.last_name }}</h2>		
						<h3>{{ $_$getUserTypeName(member.type) }}</h3><br>
						<div class="row">
							<div class="col-md-1">
								
							</div>
							<div class="col-md-5">
								<h3 class="text-center">Star Rating</h3>
								<div v-if="!pending">
									<i class="ion-star text-yellow"></i>
									<i class="ion-star text-yellow"></i>
									<i class="ion-star text-yellow"></i>
									<i class="ion-star"></i>
									<i class="ion-star"></i>
								</div><br>
								<div>
									<button class="btn btn-sm bg-primary">{{ $_$getUserStatusName(member.status) }}</button>
								</div>
							</div>
							<div class="col-md-5 text-left">
								<h3 class="text-center spacer-down">Project Analysis By {{ member.first_name }}</h3>
								<h4 class="dev-taskassigned">Task Assigned <b>5</b></h4>
			                    <p class="dev-task">Completed <b>4</b></p>
			                    <p class="dev-task">Deadline Misses <b>0</b></p>
			                    <p class="dev-task">Delivery Speed <b>20kPs</b></p>
			                    <p class="dev-task">Delivery Accuracy <b>Fast</b></p>
			                   
							</div>
							<div class="col-md-1">
								
							</div>
						</div>
						
		<div class="row">
			<div class="col-md-6 ">
			
			
			

			</div>
			
			<div v-if="!pending" class="row">

			</div>
			</div>
		
      </div>
</el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'developer-detail',
  props: ['show', 'member', 'pending'],
  watch: {
    'show': {
        handler: function (val, old) {
            if (val === true) {
              // handle the modal opening
            } else {
              // handle modal closing
			  this.$_$destroyedHook(['suspendReset'])
            }
        },
        deep: true
    },
  },
  computed: {
      ...mapGetters('team/removeUser', [
          'error',
          'loading',
      ]),
      ...mapGetters('team/suspendUser', {
          suspendError: 'error',
          suspendLoading: 'loading',
			}),
  },
  methods: {
      ...mapActions('team/removeUser', [
          'removeUser',
          'resetState',
      ]),
      ...mapActions('team/suspendUser', [
          'suspendUser',
			]),
      ...mapActions('team/suspendUser', {
          suspendReset: 'resetState',
			}),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
    beforeClose(done) {
      this.$_$closeModal()
      done();
    },
    reloadStore(type, id) {
      this.$emit('reloadStore', type, id)
    },
		suspend(id) {
			let args = {
				id: id,
			}

			const self = this;
			this.callWithToken({
				parameters: args,
				action: this.suspendUser,
			})
			.then(function (status) {
					if (status) {
						// Reload pending invites on success
						self.reloadStore('suspendUser')
					} else {
					}
			});
		},
		remove(id) {
			let args = {
				id: id,
			}

			const self = this;
			this.callWithToken({
				parameters: args,
				action: this.removeUser,
			})
			.then(function (status) {
					if (status) {
						// Reload pending invites on success
						self.reloadStore('removeUser')
					} else {
					}
			});
		},
  }
};
</script>

<style scoped>
h4.dev-taskassigned b {
    text-align: right;
    background: green;
    color: #fff;
    border-radius: 5px;
    padding: 2px 7px;
    float: right;
}
.dev-task b {
    background: #889688;
    color: #fff;
    font-size: 11px;
    border-radius: 50px;
    float: right;
    padding: 2px 6px;
}
.dev-task {
    font-size: 12px;
    padding: 0px 9px;
    font-weight: 900;
}
.spacer-down {
	margin-bottom: 7%;
}

h4.dev-taskassigned {
    color: #3369da;
    border-bottom: 1px solid #ddd;
    margin-bottom: 11px;
    font-size: 14px;
    padding: 5px 5px 16px;
}
</style>