<template>
    <span class="createProjectCustom">
      <!-- Modal -->
  <div id="myModalteam" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Team Info</h4>
        </div>

        <!-- BODY -->
        <div slot = "modal-body">
            <div class="person-modal">
                <img :src="require('@/assets/img/1.jpeg')" alt="User Image">
                <h2>Farl Adetoyin</h2>
                <h3>designer </h3>
                <h4>photoshop, sketch, HTML5, CSS3, <br>javascript, Angularjs
                </h4>
                <p>6 projects executed</p>
                <div class="row">
                    <div class="col-md-6 ">

                        <i class="ion-star text-yellow"></i>
                        <i class="ion-star text-yellow"></i>
                        <i class="ion-star text-yellow"></i>
                        <i class="ion-star"></i>
                        <i class="ion-star"></i>

                    </div>
                    <div class="col-md-6 ">
                        <button class="btn btn-sm bg-primary">AVAILABLE</button>
                    </div>
                    <div class="row">
                        <div class="col-md-9 col-md-offset-2 person-modal-bio text-center ">

                            <h4>
                                <b>BIO</b>
                            </h4>

                            <h4>Hi! I am Fari Adetoyin - UIUX Designer, Front-end Engineer. <br>I just want to make life easier for everyday app user.</h4>
                        </div>
                    </div>
                </div>
                <div class="action-btn">
                    <button class="btn btn-danger btn-md">Delete</button>&nbsp;&nbsp;<button class="btn btn-warning btn-md">Suspend</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    </span>
</template>

<script>
    // import LightModal from 'light-modal-vue'
    // import 'animate.css/animate.min.css';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'TeamMemberModal',
        props: ['show'],

		// components: {
		// 	modal: LightModal,
		// },
		data () {
			return {
				iname: '',
			};
		},
        methods: {
            closeModal () {
                this.$emit('close');
            },
			submit () {
				this.$router.push({ name: 'create-project' });
			}
		}
    }
</script>

<style scoped>
</style>
