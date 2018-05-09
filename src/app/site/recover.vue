<template>
		    <!-- End Navbar -->
	    <div class="page-header" filter-color="orange">
	        <div class="page-header-image"></div>
	        <div class="container">
	            <div class="col-md-4 content-center">
								<div class="card card-signup" data-background-color="orange" style="margin-top: 200px;">

												<div class="header text-center">
														<h4 class="title title-up">Password Recovery</h4>
												</div>
												<div class="card-body">
                          <div class="input-group form-group-no-border input-lg">
                             <span class="input-group-addon">
                                 <i class="now-ui-icons users_circle-08"></i>
                             </span>
                             <input type="text" v-model="email" class="form-control" placeholder="Email Address...">
                         </div>
                         <div class="footer text-center">
                             <button class="btn btn-neutral btn-round btn-lg"  @click.prevent="recoverStore">Login</button>
                         </div>
                          <div style="margin-top: 15px; margin-bottom: 30px;">
	                            <h6>
	                                <router-link :to="{name: 'login'}" class="link">Login to your account here</router-link>
	                            </h6>
	                        </div>
        								</div>
                        <div class="footer">

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

				}
			},
			mounted(){

			},
			methods: {
				recoverStore(){

				},

			},
			computed: {

			}
	}
</script>
