<template>


	    <!-- End Navbar -->
	    <div class="page-header" filter-color="orange">
	        <div class="container">
	            <div class="col-md-4 content-center">
	                <!-- <div class="card card-login card-plain">
	                    <form class="form" method="" autocomplete="off" action="">

											    <input autocomplete="false" name="hidden" type="text" style="display:none;">
	                        <div class="header header-primary text-center">
	                            <div class="logo-container">
	                                <img src="/static/img/now-logo.png" alt="">
	                            </div>
	                        </div>
	                        <div class="content">
	                            <div class="input-group form-group-no-border input-lg">
	                                <span class="input-group-addon">
	                                    <i class="now-ui-icons users_circle-08"></i>
	                                </span>
	                                <input type="text" v-model="username" class="form-control" placeholder="Username...">
	                            </div>
	                            <div class="input-group form-group-no-border input-lg">
	                                <span class="input-group-addon">
	                                    <i class="now-ui-icons text_caps-small"></i>
	                                </span>
	                                <input type="password" v-model="password" placeholder="Password..." class="form-control" />
	                            </div>

	                        </div>
	                        <div class="footer text-center">
	                            <button class="btn btn-primary btn-round btn-lg btn-block" @click.prevent="loginStore">Get Started</button>
	                        </div>
	                        <div class="pull-left">
	                            <h6>
	                                <router-link :to="{name: 'signup'}" class="link">Create Account here</router-link>
	                            </h6>
	                        </div>
	                        <div class="pull-right">
	                            <h6>
	                                <a href="#pablo" class="link">Need Help?</a>
	                            </h6>
	                        </div>
	                    </form>
	                </div> -->
									<div class="card card-signup" data-background-color="orange" style="margin-top: 200px;">
													<div class="header text-center">
															<h4 class="title title-up">Login Now</h4>
															<div class="social-line">
																	<!-- <a href="#pablo" class="btn btn-neutral btn-facebook btn-icon btn-round">
																			<i class="fa fa-facebook-square"></i>
																	</a>
																	<a href="#pablo" class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round">
																			<i class="fa fa-twitter"></i>
																	</a>
																	<a href="#pablo" class="btn btn-neutral btn-google btn-icon btn-round">
																			<i class="fa fa-google-plus"></i>
																	</a> -->
															</div>
													</div>
													<div class="card-body">
														<div class="input-group form-group-no-border input-lg">
															 <span class="input-group-addon">
																	 <i class="now-ui-icons users_circle-08"></i>
															 </span>
															 <input type="text" v-model="username" class="form-control" placeholder="Username...">
													 </div>
													 <div class="input-group form-group-no-border input-lg">
															 <span class="input-group-addon">
																	 <i class="now-ui-icons text_caps-small"></i>
															 </span>
															 <input type="password" v-model="password" placeholder="Password..." class="form-control" />
													 </div>
																<!-- If you want to add a checkbox to this form, uncomment this code -->
															<!-- <div class="checkbox">
							<input id="checkboxSignup" type="checkbox">
								<label for="checkboxSignup">
								Unchecked
								</label>
								</div> -->

													</div>
													<div class="footer text-center">
															<button class="btn btn-neutral btn-round btn-lg"  @click.prevent="loginStore">Login</button>
													</div>
	                        <div style="margin-top: 15px; margin-bottom: 30px;">
	                            <h6>
	                                <router-link :to="{name: 'signup'}" class="link">Create Account here</router-link>
	                            </h6>
	                        </div>
													<div style="margin-top: 15px; margin-bottom: 30px;">
	                            <h6>
	                                <router-link :to="{name: 'recovery'}" class="link">Forgot Password?</router-link>
	                            </h6>
	                        </div>
									</div>
	            </div>
				<Spinner :show="showLoading" />
			<Error :show="showError" :error="errorMsg" @close="showError = false"/>
			<Success :show="showSuccess" @close="showSuccess = false"/>
	        </div>
	    </div>
</template>

<script type="text/javascript">
/* eslint-disable */
import {
    mapGetters,
    mapActions
  } from 'vuex';

export default {
	components: {},
	data() {
		return {
			username: '',
			password:'',
			showLoading: false,
			showError: false,
			showSuccess: false,
			label: 'Loading ...',
		}
	},
	methods: {
		...mapActions('auth', [
				'login',
		]),
		loginStore(){
			this.showLoading = true;
			this.login(
				{
					username:this.username,
					password: this.password
				}
			).then((result)=>{
				this.showLoading = false;
					if(result.status == true){
						if(this.reportLoader(1)){
							switch (result.type) {
								case 1:
									this.$router.push({name:'superadmin'});
									break;
								case 2: 
									this.$router.push({name:'staffmember'});
								default:
									this.$router.push({name:'client'});
									break;
							}
						}
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
					window.setTimeout(function(){self.showError= false;},3000)
				}
				if(rep == 1){
					this.showSuccess = true;
					window.setTimeout(function(){
						self.showSuccess = false;
						return true;
						},1000)
				}
			},
	}
}
</script>
