<template>
	<div>
		<div>
			<sidebar  class="col-xs-2"></sidebar>
		</div>

		<div style="background: #fafbff; min-height: 700px; overflow: auto;">
			<div style="padding: 0px 80px; margin: 0px;" class="row">
				<topbar class="col-xs-10 col-xs-offset-2"></topbar>

				<ProjectNavbar></ProjectNavbar>
				<router-view class="col-xs-10 col-xs-offset-2"></router-view>
			</div>
		</div>
		<!--<div class="col-xs-10" style="background: #fafbff; height: auto;">-->
			<!--<div class="row">-->
				<!--<topbar></topbar>-->
			<!--</div>-->
			<!--<div class="row">-->
				<!--<ProjectNavbar></ProjectNavbar>-->
			<!--</div>-->
			<!--<div class="row">-->
				<!--<router-view class="col-md-12"></router-view>-->
			<!--</div>-->
		<!--</div>-->
	</div>
</template>

<style type="text/css" scoped>

	.body-class {

	  margin-right: auto;
	  margin-left: auto;
	}
	@media (min-width: 768px) {
	  .body-class {
	    width: 750px;
	  }
	}
	@media (min-width: 992px) {
	  .body-class {
	    width: 970px;
	  }
	}
	@media (min-width: 1200px) {
	  .body-class {
	    width: 1170px;
	  }
	}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { checkUser } from '@/utils';
// import ChatComponent from '@/app/shared/chatComponent';
// import FabComponent from '@/app/shared/fabComponent';
// import ProjectTabs from '@/app/shared/project-tabs';
import ProjectNavbar from '@/app/shared/ProjectNavbar';
import Breadcrumbs from '@/app/shared/projectBreadcrumbs';
import sidebar from '@/app/updated/sidebar'
import mainBoard from '@/app/updated/main_board'
import topbar from '@/app/updated/dashtop'

export default {
    name: 'projectlayout',
    props: ['id'],
    components: {
        ProjectNavbar,
        Breadcrumbs,
        topbar,
        sidebar,
        // ChatComponent,
        // FabComponent,
    },

}
</script>

<style>

</style>
