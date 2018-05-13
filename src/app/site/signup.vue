<template>
		    <!-- End Navbar -->
	    <div class="page-header" filter-color="orange">
	        <div class="page-header-image"></div>
	        <div class="container">
	            <div class="col-md-4 content-center">
					<div class="card card-signup" data-background-color="orange" 
					style="margin-top: 200px;" v-if="afterSignup">

					<div class="header text-center">
						<h4 class="title title-up">Sign Up</h4>
					</div>
					<div class="card-body">
						Signup Complete, Please Confirm your account from the email, we sent to you...<br>
                        <div style="margin-top: 15px; margin-bottom: 30px;">
							<h6>
								<router-link :to="{name: 'login'}" class="link">Login to your account here</router-link>
							</h6>
						</div>
					</div>
                  </div>
			<div class="card card-signup" data-background-color="orange" 
			style="margin-top: 200px;" v-else>

<div class="header text-center">
		<h4 class="title title-up">Sign Up</h4>
</div>
<form>
<div class="card-body">
		<div class="input-group form-group-no-border">
				<span class="input-group-addon">
						<i class="now-ui-icons users_circle-08"></i>
				</span>
				<input type="text" v-validate="'required'" name="firstname" v-model="user.first_name" class="form-control" placeholder="First Name...">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_check" v-if="!errors.has('firstname') && user.first_name.length !== 0"></i>
						<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('firstname')"></i>
				</span>
		</div>
		<div class="input-group form-group-no-border">
				<span class="input-group-addon">
						<i class="now-ui-icons text_caps-small"></i>
				</span>
				<input type="text" v-validate="'required'" v-model="user.last_name" name="lastname" placeholder="Last Name..." class="form-control" />
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_check" v-if="!errors.has('lastname')&& user.last_name.length !== 0"></i>
						<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('lastname')"></i>
				</span>
		</div>
		<div class="input-group form-group-no-border">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_email-85"></i>
				</span>
				<input type="text" v-validate="'required|email'" name="email" v-model="user.email" class="form-control" placeholder="Email...">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_check" v-if="!errors.has('email')&& user.email.length !== 0"></i>
						<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('email')"></i>
				</span>
		</div>
		<div class="input-group form-group-no-border">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_lock-circle-open"></i>
				</span>
				<input type="password" v-validate="'required|min:8'" name="password" v-model="user.password" class="form-control" placeholder="Password...">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_check" v-if="!errors.has('password')&& user.password.length !== 0"></i>
						<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('password')"></i>
				</span>
		</div>
		<div class="input-group form-group-no-border">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_lock-circle-open"></i>
				</span>
				<input type="password" v-validate="'required|confirmed:password'" name="cpass" v-model="user.cpassword" class="form-control" placeholder="Confirm Password...">
				<span class="input-group-addon">
						<i class="now-ui-icons ui-1_check" v-if="!errors.has('cpass')&& user.cpassword.length !== 0"></i>
						<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('cpass')"></i>
				</span>
		</div>									
		</div>
		<div class="footer text-center">
				<button class="btn btn-neutral btn-round btn-lg"
				:disabled="validateform && errors.items.length !== 0"
				@click.prevent="signupStore">Get Started</button>
		</div>
</form>
		<div style="margin-top: 15px; margin-bottom: 30px;">
				<h6>
						<router-link :to="{name: 'login'}" class="link">Login to your account here</router-link>
				</h6>
		</div>

		</div>
	            </div>
	        </div>
			<Spinner :show="showLoading" />
			<Error :show="showError" :error="errorMsg" @close="showError = false"/>
			<Success :show="showSuccess" @close="showSuccess = false"/>
	    </div>
</template>

<script type="text/javascript">
/* eslint-disable */
import Spinner from '@/app/shared/loading'

import {
    mapGetters,
    mapActions
  } from 'vuex';
	export default {
			data(){
				return {
					user: {
						first_name: '',
						last_name: '',
						email: '',
						password: '',
						cpassword: '',
					},
					showLoading: false,
					showError: false,
					showSuccess: false,
					errorMsg: '',
					afterSignup: false,
				}
			},
			mounted(){

			},
			methods: {
		...mapActions('register', [
				'register',
		]),
			signupStore(){
				this.showLoading = true;
				var args = {
					user: this.user
				}
				if(this.$router.params.inviteId){
					var t = this.$router.params;
					var invite = {
						id: t.inviteId,
						type: t.inviteType,
						team: t.inviteTeam
					};
					args.invite = invite;
				}
				
				this.register(args).then((result)=>{
					this.showLoading = false;
					if(result.status == true){
						this.afterSignup = true;
						this.reportLoader(1);
					}else{
						this.reportLoader(0, result.message)
					}
				});
			},
			reportLoader(rep, msg){
				var self = this;
				if(rep == 0){
					this.errorMsg = msg;
					this.showError = true;
					// window.setTimeout(function(){self.showError= false;},000)
				}
				if(rep == 1){
					this.showSuccess = true;
					// window.setTimeout(function(){self.showSuccess = false},3000)
				}
			},
		},
			computed: {
				invited(){
					var invite = {
						id: new Date().getTime(),
						type : 3,
						team : new Date().getTime() - 1000000
					}
					return invite;
				},
				validateform(){
					var u = this.user;
					if(!u.first_name||!u.last_name||!u.email||!u.password||!u.cpassword){
						return true;
					}
				}
			}
	}
</script>
