<template>
	<div class="sidebar-dashboard">
		<div class="row">
			<div class="col-xs-3" style="padding-top: 40px;">
				<div class="heading">Quick Statistics</div>
			</div>
			<div class="col-xs-3 pull-right people stats-card">
				<div class="col-xs-7">
					<span style="font-size: 12px;">Completed Projects1</span>
					<p style="font-weight: bolder; font-size: 14px;">23 Nos</p>
				</div>
				<div class="fa fa-signal btn-primary fa-2x col-xs-4 img-rounded text-center pull-right" >

				</div>
			</div>
			<div class="col-xs-3 pull-right people stats-card">
				<div class="col-xs-7">
					<span style="font-size: 12px;">Active Projects</span>
					<p style="font-weight: bolder;">12 Nos</p>
				</div>
				<div class="fa fa-files-o btn-primary fa-2x col-xs-4 img-rounded text-center pull-right" >

				</div>
			</div>
			<div class="col-xs-3 pull-right people stats-card">
				<div class="col-xs-7">
					<span style="font-size: 12px;">People</span>
					<p style="font-weight: bolder;">0 Nos</p>
				</div>
				<div class="ion-android-people btn-primary fa-2x col-xs-4 img-rounded text-center pull-right" >

				</div>
			</div>
		</div>

		<div class="row" style="margin-top: 30px;">
			<div class="heading">PROJECTS</div>
			<div class="col-xs-4 projects-card people">
				<div class="top">
					<span class="ion-ios-monitor-outline top-icons"></span>
					<span class="ion-android-phone-portrait top-icons"></span>
					<span class="ion-android-globe top-icons"></span>
					<span class="pull-right">Created 2 days ago</span>
				</div>
				<div class="details">
					<h4>RSA</h4>
					<p>Finance app for Ruby Inc</p>
				</div>
				<div class="team">
						<!-- <img :src="require('@/assets/img/centralLogo.png')" class="img" alt="">
						<img :src="require('@/assets/img/centralLogo.png')" class="img" alt=""> -->

						<ul>
							<!-- <li v-for="tem in team">
								<img class="img" :src="require('+tem+')">
								 </li> -->
								 <!-- <li v-for="tem in team"><img :src="returnImage(tem)" class="img" alt=""> </li> -->
						</ul>
				</div>


				<div class="tool-box people">
					<button class="btn btn-default fa fa-user" style="border-radius: 50%;"></button>
					<button class="btn btn-default fa fa-trash-o" style="border-radius: 50%;"></button>
					<button class="btn btn-default pull-right btn-rounded">VIEW</button>
				</div>
			</div>
		</div>
		<div class="row" style="padding-left: 100px; margin-top: 50px;">
			<div class="text-center">
				<el-tooltip class="item" effect="dark" content="Create a new project" placement="left">
				<a class="btn btn-sm btn-circle" data-intro="Create a New Project" data-tooltipClass="Create New Project" @click.stop="openNewProject">
						<i class="ion-plus"></i>
				</a>
			</el-tooltip>
			 </div>
			 <p class="heading text-center" style="margin-top: 10px;">NEW PROJECTS</p>

		</div>

	</div>
</template>


<style type="text/css" scoped>
.people{
	background: #ffffff;
	border: 1px solid #e5e7f7;
	border-radius: 5px;
	padding: 13px;
	padding-top: 15px;
	margin-top: 5px;
	transition: all .4s ease;
	margin-bottom: 10px;
}
.btn-rounded {
	border-radius: 6rem !important;
	padding: 5px 30px 5px 30px;
}
.btn-circle {
	border-radius: 50%;
	background: #EF6375;
	color: #fff;
	box-shadow: 0 11px 37px 0 rgba(0, 0, 0, 0.13);
}
.btn-circle:hover {
	background-color: #fff;
	color: #EF6375;
}
.img {
	border-radius: 100%;
	height: 40px;
	width: 40px;
}
.team ul {
	position: relative;
	left: -30px;
	list-style-type: none;
}
.team ul li {
	position: relative;
	display: inline-block;
}
/* .team ul li:nth-child(n+2) {
	left: -25px;
} */


.people .tool-box {
  display: none;
}

.people:hover .tool-box {
  display: block;
}
.top-icons {
	margin: 5px;
	font-size: 18px;
}
.top {
	color: #A8BCE4;
	padding: 10px;
}
.details {
	padding: 10px;
}
.details h4 {
	font-size: 28px;
	font-weight: bolder;
}
.details p {
	font-size: 16px;
	font-weight: bold;
}

.people:hover {
	background: #ffffff;
	/* transform: rotate(90deg); */
	box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
	border-radius: 1px;
	border: 1px solid #3469da;
	/* margin-top: 27%; */
}
.stats-card {
	height: 100px;
	width: 24%;
	margin-right: 10px;
	text-align: left;
}
.projects-card {
	height: 265px;
	width: 28%;
	margin-right: 50px;
	text-align: left;
}
.projects-card .tool-box {
	position: absolute;
	bottom: -30px;
	margin: 5px 30px 5px 20px;
	width: 80%;
	height: auto;
}
.heading {
	text-transform: uppercase;
	font-weight: bolder;
	font-size: 10px;
	padding-bottom: 10px;
}
</style>


<script type="text/javascript">
/* eslint-disable */

	export default {
		name: 'zeedas-dasboard-sidebar-re-do',
		data () {
			return {

			}
		},
		components: {

		},
		methods: {

		}
	}
</script>
