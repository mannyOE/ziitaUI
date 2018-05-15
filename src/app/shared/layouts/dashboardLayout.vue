<template>
	<div class="body-class">
		<div>
			<sidebar class="col-xs-2"></sidebar>
		</div>
		<div style="background: #fafbff; min-height: 700px; overflow: auto;">
			<div style="padding: 0px 80px; margin: 0px;" class="row">
                <topbar class="col-xs-10 col-xs-offset-2"></topbar>
				<router-view class="col-xs-10 col-xs-offset-2"></router-view>
			</div>

		</div>
	</div>
</template>

<style type="text/css" scoped>
	.body-class {
		/*border-top: 5px solid #000;*/
	}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseNavbar from '@/app/shared/BaseNavbar';
import sidebar from '@/app/updated/sidebar';
import mainBoard from '@/app/updated/main_board';
import topbar from '@/app/updated/dashtop';

export default {
    name: 'DashboardLayout',
    components: {
        BaseNavbar,
        sidebar,
        mainBoard,
        topbar
    },
}
</script>

<style>

</style>
