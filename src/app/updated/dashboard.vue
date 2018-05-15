<template>
	<span class="body-class">
		<div>
			<sidebar  class="col-xs-2"></sidebar>
		</div>
		<div class="col-xs-10" style="background: #E5E5E5; min-height: 660px;">
			<topbar></topbar>
			<!-- <mainBoard></mainBoard> -->
		</div>
	</span>
</template>

<style type="text/css" scoped>
	.body-class {
		border-top: 5px solid #000;
	}
</style>


<script type="text/javascript">
/* eslint-disable */
	import sidebar from './sidebar'
	import mainBoard from './main_board'
	import topbar from './dashtop'

	export default {
		name: 'zeedas-dasboard-re-do',
		data () {
			return {

			}
		},
		components: {
			sidebar,
			mainBoard,
			topbar
		}
	}
</script>
