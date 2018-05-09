<template>
		    <!-- End Navbar -->
	    <div class="page-header" filter-color="orange">
	        <div class="page-header-image"></div>
	        <div class="container">
	            <div class="col-md-4 content-center">
								<div class="card card-signup" data-background-color="orange" style="margin-top: 200px;">

												<div class="header text-center">
														<h4 class="title title-up">Sign Up</h4>
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
														<div class="input-group form-group-no-border">
																<span class="input-group-addon">
																		<i class="now-ui-icons users_circle-08"></i>
																</span>
																<input type="text" v-validate="'required'" name="firstname" v-model="firstname" class="form-control" placeholder="First Name...">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_check" v-if="!errors.has('firstname')"></i>
																		<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('firstname')"></i>
																</span>
														</div>
														<div class="input-group form-group-no-border">
																<span class="input-group-addon">
																		<i class="now-ui-icons text_caps-small"></i>
																</span>
																<input type="text" v-validate="'required'" v-model="lastname" name="lastname" placeholder="Last Name..." class="form-control" />
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_check" v-if="!errors.has('lastname')"></i>
																		<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('lastname')"></i>
																</span>
														</div>
														<div class="input-group form-group-no-border">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_email-85"></i>
																</span>
																<input type="text" v-validate="'required|email'" name="email" v-model="email" class="form-control" placeholder="Email...">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_check" v-if="!errors.has('email')"></i>
																		<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('email')"></i>
																</span>
														</div>
														<div class="input-group form-group-no-border">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_lock-circle-open"></i>
																</span>
																<input type="password" v-validate="'required|min:8'" name="password" v-model="password" class="form-control" placeholder="Password...">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_check" v-if="!errors.has('password')"></i>
																		<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('password')"></i>
																</span>
														</div>
														<div class="input-group form-group-no-border">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_lock-circle-open"></i>
																</span>
																<input type="password" v-validate="{is:password}" name="cpass" v-model="cpassword" class="form-control" placeholder="Confirm Password...">
																<span class="input-group-addon">
																		<i class="now-ui-icons ui-1_check" v-if="!errors.has('cpass')"></i>
																		<i class="now-ui-icons ui-1_simple-remove" v-if="errors.has('cpass')"></i>
																</span>
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
														<button class="btn btn-neutral btn-round btn-lg"
														:disabled="errors.items.length !== 0"
														@click.prevent="signup">Get Started</button>
												</div>
												<div style="margin-top: 15px; margin-bottom: 30px;">
														<h6>
																<router-link :to="{name: 'login'}" class="link">Login to your account here</router-link>
														</h6>
												</div>

								</div>
	            </div>
	        </div>
	    </div>
</template>

<script type="text/javascript">
/* eslint-disable */
	export default {
			data(){
				return {
					firstname: '',
					lastname: '',
					email: '',
					password: '',
					cpassword: '',
					firstcheck:0,
					lastcheck:0,
					emacheck:0,
					pascheck:0,
					pasconcheck:0,
				}
			},
			mounted(){

			},
			methods: {
				signup(){
					this.$router.push({name:'aftersignup'});
				},
				validate(d){
					// console.log(d);
					switch (d) {
						case 1:
							if(this.firstname.lengtt > 0){
								this.firstcheck = 1;
							}else{
								this.firstcheck = 2;
							}
							break;
						default:

					}
				}
			},
			computed: {

			}
	}
</script>
