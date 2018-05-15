<template>
	<div v-if="show">
		<div id="overlay"></div>
		<div class="spinner">
			<div id="loading"></div>
			<div id="label">{{label}}</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	/* eslint-disable */
	export default {
		props: ['show'],
		data () {
			return {
				label: 'Wait ...'
			}
		}
	}
</script>

<style type="text/css">
	#loading{
		display: inline-block;
		border: 5px solid #f3f3f3;
		height: 30px;
		width: 30px;

		bottom: 60px;
		right: 65px;

		margin: auto;
		border-top-color: #3498db;
		position: fixed;
		border-radius: 100%;
		animation: round 0.5s linear infinite;
		z-index: 110;
	}
	@keyframes round{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	#label {
		bottom: 30px;
		right: 50px;
		margin: auto;
		position: fixed;
		color: #000;
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
