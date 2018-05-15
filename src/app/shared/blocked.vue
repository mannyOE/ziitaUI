<template>
	<div v-if="show">
		<div id="overlay"></div>
		<div class="spinner">
			<div id="loading">
				<img style="height: 200px; width:200px;" :src="require('@/assets/img/lockedout.png')"></img>
			</div>
			<div id="label">{{label}}</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	/* eslint-disable */
	export default {
		props: ['show','label'],
		data () {
			return {

			}
		}
	}
</script>

<style type="text/css" scoped>
	#loading{
		display: inline-block;
		border: 5px solid #f3f3f3;
		height: 230px;
		width: 230px;
		border-radius: 100%;
		bottom: 50%;
		right: 42%;
		background-color: red;
		color: #fff;

		margin: auto;
		position: fixed;
		z-index: 110;
	}
	@keyframes round{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	#label {
		bottom: 40%;
		right: 35%;
		margin: auto;
		position: fixed;
		color: red;
		font-size: 50px;
		font-weight: bolder;
		z-index: 110;
	}
	#overlay{
		display: inline-block;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #fff;
		opacity: .6;
		z-index: 110;

	}
	.spinner{
		text-align: center;

	}
</style>
