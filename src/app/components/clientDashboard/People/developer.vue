<template>
	<div class="row father-card">
		<div class="col-md-3 left-card">

		<div class="col-md-12" style="padding:unset">
				<div class="card-inner-top" :style="{ 'background-image': 'url(' + require('@/assets/img/bg.png') + ')' }">
		</div>
			<div class="col-md-3 name-pic-row">
				<img class="img img-circle  ibro-image" :src="developerImage(developer.profile_thumbnail)"></img>
			</div>
			<div   class="col-md-9 name-pic-row">
				<!-- {{developerCategory}} -->
				<br>
				<span class="name">{{developer.first_name}} {{developer.last_name}}</span>
				<span style="display:inline;width:auto" class="status">active</span>
			</div>

				<div class="col-md-12" style="margin-left: 32px">
				<div class="box">
					<img :src="require('@/assets/img/cam.png')">
				</div>
				<div class="stack-parent">
					<span class="stack"><span v-for="(category,index) in developerCategory" v-if="index < developerCategory.length-1">{{category}},</span>
					<span>{{developerCategory[developerCategory.length-1]}}</span>
				</span>
				</div>
				</div>
					<div class="col-md-12 another-row">
				<div class="box">
					<img :src="require('@/assets/img/brief-case.png')">
				</div>
				<div class="stack-parent">
					<span class="stack">{{developer.Email}}</span>
				</div>
				</div>
					<div class="col-md-12 another-row" style="
	margin-bottom: 40px;
					">
				<div class="box">
					<img :src="require('@/assets/img/job.png')">
				</div>
				<div class="stack-parent">
					<span  class="stack" style="margin-left:10px">
						<span v-for="(skill,index) in developer.skills" v-if="index < developer.skills.length-1">{{skill}},</span>
					<span >{{developer.skills[developer.skills.length-1]}}</span>
				</span>
				</div>
				</div>
				<div class="col-md-12 stats">
					<div class="col-md-4 stats-container">
						<span class="stats-labels">Task Assigned</span>
						<span class="stats-count">{{tDev.statistics.modulesAssigned}}</span>
					</div>
					<div class="col-md-4 stats-container">
							<span class="stats-labels">Task Completed</span>
							<span class="stats-count">{{tDev.statistics.modulesCompleted}}</span>
					</div>
					<div class="col-md-4">
							<span class="stats-labels">Deadlines Missed</span>
							<span class="stats-count">{{tDev.statistics.deadlinesMissed}}</span>
					</div>
				</div>
		</div>
		<div class="col-md-12 left-card-inner">
			<br>
			<div class="col-md-4"><span class="speed">Speed</span> </div>
			<div class="col-md-4"><span class="speed">Accuracy</span></div>
			<div class="col-md-4"><span class="speed">Efficiency</span></div>
			<br>
			 <div class="col-md-4 clearfix">
                <div class="c100 small" :class="'p'+tDev.statistics.developerSpeed" :style="{'color':getPercentage(tDev.statistics.developerSpeed)}">
                    <span class="progress-count">{{tDev.statistics.developerSpeed}}%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>
          </div>
          	 <div class="col-md-4 clearfix">
                <div class="c100 small" :class="'p'+tDev.statistics.accuracy" :style="{'color':getPercentage(tDev.statistics.accuracy)}">
                    <span class="progress-count">{{tDev.statistics.accuracy}}%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>
          </div>

          		 <div class="col-md-4 clearfix">
                <div class="c100 small" :class="'p'+progress" :style="{'color':getPercentage()}">
                    <span class="progress-count">{{progress}}%</span>
                    <div class="slice">
                        <div class="bar"></div>
                        <div class="fill"></div>
                    </div>
                </div>
          </div>
        <div class="col-md-12" align="center">
        	  <span class="average">Average Speed</span> <br>
          <span class="average-speed">{{tDev.statistics.averageSpeed}}</span>
        </div>

		</div>

		</div>
		<div class="col-md-4 right-card">
				<div class="col-md-12 top-card">
						<span class="details">Details</span>
						<!-- <i class="ion-android-more-vertical pull-right icon-details"></i> -->
						<i @click="togglePrivillegeCard()" class="ion-unlocked pull-right icon-details"></i>
						<i @click="toggleUpdateCard()" class="ion-edit pull-right icon-details" ></i>
				</div>
				<div class="col-md-12 workflow">
					<span class="workflow-text">Work Flow</span>
          <chart :chart-data.sync="fillData" :width="200" :height="100"/>

				</div>
				<span class="projects-text">Projects</span>
				<div class="project-divider"></div>
					<div class="col-md-12" style="margin-left:35px;height:300px">
							<ProjectCard v-for="(project, index) in filtereprojects"
			 :project="project" :key="index"/>

					</div>
					</div>

					  <DeveloperModal
        :member="developer"
        :show="show"
        @close="closeDevModal"/>
        <updateDeveloper
        :member="developer"
        :show="showUpdateCard"
        @close="toggleUpdateCard"></updateDeveloper>
        <privillege :member="developer" :show="show" @close="togglePrivillegeCard"></privillege>
	</div>

</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import ProjectCard from "@/app/shared/developerProjectCard";
import DeveloperModal from "@/app/shared/modals/developerDetail";
import updateDeveloper from "./developerCard";
import Privillege from "./privileges";
import chart from '@/app/shared/charts/workFlow.js';
export default{
	  data() {
      return {
      	progress:10,
      	show:false,
      	showUpdateCard:false,
      	   chartData: {
              labels: ['jan', 'feb', 'mar', 'apr','may','jun','jul','aug','sep','oct','nov','dec'],
            },
      };
  },
   components: {
      ProjectCard,
      DeveloperModal,
      updateDeveloper,
      Privillege,
      chart
  },
  computed:{
    ...mapGetters('team', [
          'team',
          'denied',
        'loading',
        'error',
      ]),
      ...mapGetters('team/getProjects', [
      'projects',
      'loading',
      'error',
    ]),
      ...
        mapGetters('categories', [
            'categories',
            'loading',
            'error',
        ]),
          ...mapGetters('userCredentials', [
      'user',
    ]),
          ...mapGetters('team/getDeveloper', {
		tDev: 'developer',
		tLoad: 'loading',
		tError: 'error',
	  }),
             fillData () {
     this.datacollection = {
       labels: this.chartData.labels,
       datasets: [
         {
           backgroundColor: [
              'transparent',
            ],
            borderColor: '#326ADA',
           data: [2,5,87,22,109,86,99,102,11,22,11,22]
         },

       ]
     };
     return this.datacollection;
   },
    developer(){
    	 var self = this;
    var dev =  this.team.find(dev=>dev.Id==self.$route.params.id);
		this.getDevAnalysis(dev.Id);
		return dev;
    },
    projectCount(){


    	return this.projects.filter(p=>p.team.includes(this.developer.Id)).length

    },

    developerCategory(){
    	var category = [];
    	this.categories.forEach(cat=>{
    		this.developer.skills.forEach(skill=>{
    				if(cat.skills.includes(skill) && !category.includes(cat.category_name)){
    					category.push(cat.category_name)
    				}
    		})
    	})

    	return category;
    },
    filtereprojects(){
    	return this.projects.filter(p=>p.team.includes(this.developer.Id));
    },
    // goOverview(id){
    // 	 this.$router.push("/user/project/"+id+"/overview")
    // }

  },
  mounted(){

  	if(this.categories.length>0)
  		return;
  	this.fetchCategories();
  	  var self = this;
      this.callWithToken({
        parameters: {
          id: self.user.Id, // clients team id
        },
        action: self.getProjects,

      });
  },
  methods:{
  	  ...mapActions('categories', [
      'getCategories',
      'resetState'
    ]),
  	     ...mapActions('team/getProjects', [
      'getProjects',
      'resetState'
    ]),
  	   ...mapActions('team/getDeveloper', {
		getTDev: 'getDeveloper',
	  }),
  	    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
  	   togglePrivillegeCard(){
          this.show = !this.show;
      
        },
          toggleUpdateCard(){
    	this.showUpdateCard = !this.showUpdateCard;
    	// alert();
    },
        showDevModal(member){
          this.selectedMember = member
          if(member.type !== '3'){
            this.showOthers = true;
          }else{
            this.show = true;
          }

        },
  	   developerImage(link){

    		     if(!link){
                return require('@/assets/img/user.svg');
            }
            return this.$API + 'img/thumbnails/'+ link

    },
    getPercentage(speed){
    	 var color = "green"
    	if(speed>70){
    		color = "green"
    	}
    	else if(speed > 50){
    		color = "blue"
    	}
    	else if(speed <50){
    		color = "red"
    	}
    	return color;
    },
    	getDevAnalysis(id) {
		let args = {
			id: id,
		}

		const self = this;

			this.callWithToken({
				parameters: args,
				action: this.getTDev,
			})

	},
    fetchCategories(){
    	   this.callWithToken({
        parameters: {
          teamId: this.user.Id, // clients team id
        },
        action: this.getCategories,
      });
    }
  }



}
</script>
<style type="text/css" scoped>
	.left-card{
	height: 530px;
	width: 396px;
	border-radius: 3px;
	background-color: #FFFFFF;
	margin-left: 82px !important;
	box-shadow: 0 5px 20px 0 rgba(50,106,218,0.1);
	padding: unset;
}
	.left-card-inner{
	height: 290px;
	border-radius: 3px;
	background-color: #FFFFFF;
	box-shadow: 0 10px 30px 0 rgba(50,106,218,0.1);
	padding: unset;
	margin-top: 20px;

}
.myclass{
	background-color: #000 !important
}
.projects-text {
	height: 19px;
	width: 52px;
	color: #4A4A4A;

	font-size: 14px;
	font-weight: 600;
	line-height: 19px;
	margin-left: 45px;
	margin-bottom: 8px
}
.project-divider{
	width: 100%;
	border: 1px solid #D8D8D8;
	margin-bottom: 39px;
	margin-top: 8px;
}
.right-card{
	height: 840px;
	width: 491px;
	border-radius: 3px;
	background-color: #FFFFFF;
	box-shadow: 0 5px 20px 0 rgba(50,106,218,0.1);
	margin-left: 13px;
	padding: unset;
	overflow-y: scroll;
	overflow-x: hidden;
}
.stats-container{
	border-right: 1px solid #D8D8D8;
	height: 100%
}
.project-card-holder{
/*	  display: flex;
  align-items: center;
  justify-content: center;*/
}
.father-card{
	height: 100%;
    /*background-color: rgba(0,78,207,0.03);*/
	/*margin-to
	p: 118px !i
	mportant;*/
}
.speed {
	height: 19px;
	width: 42px;
	color: #9B9B9B;
	font-size: 14px;
	font-weight: 500;
	line-height: 19px;
	margin-bottom: 20px;
	margin-left: 20px;
}
.stats-labels {
	height: 19px;
	width: 100%;
	color: #9B9B9B;

	font-size: 13px;
	font-weight: 500;
	line-height: 19px;
	display: block;
	text-align: center;
	margin-top: 13px;
}
.average {
	height: 19px;
	width: 100%;
	text-align: center;
	color: #9B9B9B;
	font-size: 14px;
	font-weight: 500;
	line-height: 19px;
}
.stats-count{

	height: 27px;
	width: 100%;
	color: #011936;

	font-size: 20px;
	font-weight: 500;
	line-height: 27px;
	text-align: center;
	display: block;

}
.status{
	height: 22px;
	width: 100%;
	color: #02AE62;

	font-size: 16px;
	font-weight: 500;
	line-height: 22px;
	text-align: center;
	display: block;
}
.name-pic-row{
	height: 62px;
	background-color: rgba(50,106,218,0.05) !important;
	text-align: center;
	margin-bottom: 36px;

}
.stats{
	/*box-sizing: border-box;*/
	height: 85px;
	border-top: 1px solid #D8D8D8;
	padding: unset;
}
.box{
	height: 47px;
	width: 47px;
	border-radius: 3px;
	background: linear-gradient(90deg, #326ADA 0%, #53A0FD 47.52%, #FFFFFF 100%);
	display: inline;

}
.stack-parent{
	display: inline;
}
.another-row{
	margin-left: 32px;
	margin-top: 18px;
}
.name{
	height: 22px;
	color: #4A4A4A;
	width: 200px;
	font-size: 16px;
	font-weight: 600;
	line-height: 22px;
	margin-right: 79px;
	overflow: hidden;
	margin-left: 10px;
}
.stack {
	height: 22px;
	width: 154px;
	color: #9B9B9B;

	font-size: 16px;
	font-weight: 500;
	line-height: 22px;
	margin-left: 14px;
}
.top-card{
	border-bottom: 1px solid #D8D8D8;
	height: 70px;
}
.details {
	height: 22px;
	width: 52px;
	color: #4A4A4A;

    margin-top: 25px;
    display: inline-block;
	font-size: 16px;
	font-weight: 600;
	line-height: 22px;
	margin-left: 19px;
}
.average-speed{
	height: 27px;
	width: 78px;
	color: #4A4A4A;
	font-family: "Avenir Next";
	font-size: 20px;
	font-weight: 500;
	line-height: 27px;
}
.icon-details{
	 margin-top: 25px;
    display: inline-block;
    margin-left: 10px;
}
.workflow-text {
	height: 25px;
	width: 100%;
	color: #4A4A4A;

	font-size: 18px;
	font-weight: 600;
	letter-spacing: -0.12px;
	line-height: 25px;
	text-align: center;
	display: block;
}
.workflow{
	height: 325px;
	padding: 45px;
}
.ibro-image{
	height: 108px;
	width: 105px;
	margin-top: -45px;
}
.holder{
	background-color: #fff;
	height: 40%;
}
.card-inner-top{
	height: 130px;
	width: 100%;
	border-radius: 3px 3px 0 0;

}
#line-chart{
	height: 200px !important;
}
/****************************************************************
 *
 * CSS Percentage Circle
 * Author: Andre Firchow
 *
*****************************************************************/
.rect-auto, .c100.p51 .slice, .c100.p52 .slice, .c100.p53 .slice, .c100.p54 .slice, .c100.p55 .slice, .c100.p56 .slice, .c100.p57 .slice, .c100.p58 .slice, .c100.p59 .slice, .c100.p60 .slice, .c100.p61 .slice, .c100.p62 .slice, .c100.p63 .slice, .c100.p64 .slice, .c100.p65 .slice, .c100.p66 .slice, .c100.p67 .slice, .c100.p68 .slice, .c100.p69 .slice, .c100.p70 .slice, .c100.p71 .slice, .c100.p72 .slice, .c100.p73 .slice, .c100.p74 .slice, .c100.p75 .slice, .c100.p76 .slice, .c100.p77 .slice, .c100.p78 .slice, .c100.p79 .slice, .c100.p80 .slice, .c100.p81 .slice, .c100.p82 .slice, .c100.p83 .slice, .c100.p84 .slice, .c100.p85 .slice, .c100.p86 .slice, .c100.p87 .slice, .c100.p88 .slice, .c100.p89 .slice, .c100.p90 .slice, .c100.p91 .slice, .c100.p92 .slice, .c100.p93 .slice, .c100.p94 .slice, .c100.p95 .slice, .c100.p96 .slice, .c100.p97 .slice, .c100.p98 .slice, .c100.p99 .slice, .c100.p100 .slice {
  clip: rect(auto, auto, auto, auto);
}

.pie, .c100 .bar, .c100.p51 .fill, .c100.p52 .fill, .c100.p53 .fill, .c100.p54 .fill, .c100.p55 .fill, .c100.p56 .fill, .c100.p57 .fill, .c100.p58 .fill, .c100.p59 .fill, .c100.p60 .fill, .c100.p61 .fill, .c100.p62 .fill, .c100.p63 .fill, .c100.p64 .fill, .c100.p65 .fill, .c100.p66 .fill, .c100.p67 .fill, .c100.p68 .fill, .c100.p69 .fill, .c100.p70 .fill, .c100.p71 .fill, .c100.p72 .fill, .c100.p73 .fill, .c100.p74 .fill, .c100.p75 .fill, .c100.p76 .fill, .c100.p77 .fill, .c100.p78 .fill, .c100.p79 .fill, .c100.p80 .fill, .c100.p81 .fill, .c100.p82 .fill, .c100.p83 .fill, .c100.p84 .fill, .c100.p85 .fill, .c100.p86 .fill, .c100.p87 .fill, .c100.p88 .fill, .c100.p89 .fill, .c100.p90 .fill, .c100.p91 .fill, .c100.p92 .fill, .c100.p93 .fill, .c100.p94 .fill, .c100.p95 .fill, .c100.p96 .fill, .c100.p97 .fill, .c100.p98 .fill, .c100.p99 .fill, .c100.p100 .fill {
  position: absolute;
  border: 0.08em solid green;
  width: 0.84em;
  height: 0.84em;
  clip: rect(0em, 0.5em, 1em, 0em);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}

.pie-fill, .c100.p51 .bar:after, .c100.p51 .fill, .c100.p52 .bar:after, .c100.p52 .fill, .c100.p53 .bar:after, .c100.p53 .fill, .c100.p54 .bar:after, .c100.p54 .fill, .c100.p55 .bar:after, .c100.p55 .fill, .c100.p56 .bar:after, .c100.p56 .fill, .c100.p57 .bar:after, .c100.p57 .fill, .c100.p58 .bar:after, .c100.p58 .fill, .c100.p59 .bar:after, .c100.p59 .fill, .c100.p60 .bar:after, .c100.p60 .fill, .c100.p61 .bar:after, .c100.p61 .fill, .c100.p62 .bar:after, .c100.p62 .fill, .c100.p63 .bar:after, .c100.p63 .fill, .c100.p64 .bar:after, .c100.p64 .fill, .c100.p65 .bar:after, .c100.p65 .fill, .c100.p66 .bar:after, .c100.p66 .fill, .c100.p67 .bar:after, .c100.p67 .fill, .c100.p68 .bar:after, .c100.p68 .fill, .c100.p69 .bar:after, .c100.p69 .fill, .c100.p70 .bar:after, .c100.p70 .fill, .c100.p71 .bar:after, .c100.p71 .fill, .c100.p72 .bar:after, .c100.p72 .fill, .c100.p73 .bar:after, .c100.p73 .fill, .c100.p74 .bar:after, .c100.p74 .fill, .c100.p75 .bar:after, .c100.p75 .fill, .c100.p76 .bar:after, .c100.p76 .fill, .c100.p77 .bar:after, .c100.p77 .fill, .c100.p78 .bar:after, .c100.p78 .fill, .c100.p79 .bar:after, .c100.p79 .fill, .c100.p80 .bar:after, .c100.p80 .fill, .c100.p81 .bar:after, .c100.p81 .fill, .c100.p82 .bar:after, .c100.p82 .fill, .c100.p83 .bar:after, .c100.p83 .fill, .c100.p84 .bar:after, .c100.p84 .fill, .c100.p85 .bar:after, .c100.p85 .fill, .c100.p86 .bar:after, .c100.p86 .fill, .c100.p87 .bar:after, .c100.p87 .fill, .c100.p88 .bar:after, .c100.p88 .fill, .c100.p89 .bar:after, .c100.p89 .fill, .c100.p90 .bar:after, .c100.p90 .fill, .c100.p91 .bar:after, .c100.p91 .fill, .c100.p92 .bar:after, .c100.p92 .fill, .c100.p93 .bar:after, .c100.p93 .fill, .c100.p94 .bar:after, .c100.p94 .fill, .c100.p95 .bar:after, .c100.p95 .fill, .c100.p96 .bar:after, .c100.p96 .fill, .c100.p97 .bar:after, .c100.p97 .fill, .c100.p98 .bar:after, .c100.p98 .fill, .c100.p99 .bar:after, .c100.p99 .fill, .c100.p100 .bar:after, .c100.p100 .fill {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}

.c100 {
  position: relative;
  font-size: 120px;
  width: 1em;
  height: 1em;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  float: left;
  margin: 0 0.1em 0.1em 0;
  background-color: #000;
}
.c100 *, .c100 *:before, .c100 *:after {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
.c100.center {
  float: none;
  margin: 0 auto;
}
.c100.big {
  font-size: 240px;
}
.c100.small {
  font-size: 100px;
}
.c100 > span {
  position: absolute;
  width: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  width: 5em;
  line-height: 5em;
  font-size: 0.2em;
  color: #cccccc;
  display: block;
  text-align: center;
  white-space: nowrap;
  -webkit-transition-property: all;
  -moz-transition-property: all;
  -o-transition-property: all;
  transition-property: all;
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.c100:after {
  position: absolute;
  top: 0.08em;
  left: 0.08em;
  display: block;
  content: " ";
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  background-color: #fff;
  width: 0.84em;
  height: 0.84em;
  -webkit-transition-property: all;
  -moz-transition-property: all;
  -o-transition-property: all;
  transition-property: all;
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-in;
  -moz-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.c100 .slice {
  position: absolute;
  width: 1em;
  height: 1em;
  clip: rect(0em, 1em, 1em, 0.5em);
}
.c100.p1 .bar {
  -webkit-transform: rotate(3.6deg);
  -moz-transform: rotate(3.6deg);
  -ms-transform: rotate(3.6deg);
  -o-transform: rotate(3.6deg);
  transform: rotate(3.6deg);
}
.c100.p2 .bar {
  -webkit-transform: rotate(7.2deg);
  -moz-transform: rotate(7.2deg);
  -ms-transform: rotate(7.2deg);
  -o-transform: rotate(7.2deg);
  transform: rotate(7.2deg);
}
.c100.p3 .bar {
  -webkit-transform: rotate(10.8deg);
  -moz-transform: rotate(10.8deg);
  -ms-transform: rotate(10.8deg);
  -o-transform: rotate(10.8deg);
  transform: rotate(10.8deg);
}
.c100.p4 .bar {
  -webkit-transform: rotate(14.4deg);
  -moz-transform: rotate(14.4deg);
  -ms-transform: rotate(14.4deg);
  -o-transform: rotate(14.4deg);
  transform: rotate(14.4deg);
}
.c100.p5 .bar {
  -webkit-transform: rotate(18deg);
  -moz-transform: rotate(18deg);
  -ms-transform: rotate(18deg);
  -o-transform: rotate(18deg);
  transform: rotate(18deg);
}
.c100.p6 .bar {
  -webkit-transform: rotate(21.6deg);
  -moz-transform: rotate(21.6deg);
  -ms-transform: rotate(21.6deg);
  -o-transform: rotate(21.6deg);
  transform: rotate(21.6deg);
}
.c100.p7 .bar {
  -webkit-transform: rotate(25.2deg);
  -moz-transform: rotate(25.2deg);
  -ms-transform: rotate(25.2deg);
  -o-transform: rotate(25.2deg);
  transform: rotate(25.2deg);
}
.c100.p8 .bar {
  -webkit-transform: rotate(28.8deg);
  -moz-transform: rotate(28.8deg);
  -ms-transform: rotate(28.8deg);
  -o-transform: rotate(28.8deg);
  transform: rotate(28.8deg);
}
.c100.p9 .bar {
  -webkit-transform: rotate(32.4deg);
  -moz-transform: rotate(32.4deg);
  -ms-transform: rotate(32.4deg);
  -o-transform: rotate(32.4deg);
  transform: rotate(32.4deg);
}
.c100.p10 .bar {
  -webkit-transform: rotate(36deg);
  -moz-transform: rotate(36deg);
  -ms-transform: rotate(36deg);
  -o-transform: rotate(36deg);
  transform: rotate(36deg);
}
.c100.p11 .bar {
  -webkit-transform: rotate(39.6deg);
  -moz-transform: rotate(39.6deg);
  -ms-transform: rotate(39.6deg);
  -o-transform: rotate(39.6deg);
  transform: rotate(39.6deg);
}
.c100.p12 .bar {
  -webkit-transform: rotate(43.2deg);
  -moz-transform: rotate(43.2deg);
  -ms-transform: rotate(43.2deg);
  -o-transform: rotate(43.2deg);
  transform: rotate(43.2deg);
}
.c100.p13 .bar {
  -webkit-transform: rotate(46.8deg);
  -moz-transform: rotate(46.8deg);
  -ms-transform: rotate(46.8deg);
  -o-transform: rotate(46.8deg);
  transform: rotate(46.8deg);
}
.c100.p14 .bar {
  -webkit-transform: rotate(50.4deg);
  -moz-transform: rotate(50.4deg);
  -ms-transform: rotate(50.4deg);
  -o-transform: rotate(50.4deg);
  transform: rotate(50.4deg);
}
.c100.p15 .bar {
  -webkit-transform: rotate(54deg);
  -moz-transform: rotate(54deg);
  -ms-transform: rotate(54deg);
  -o-transform: rotate(54deg);
  transform: rotate(54deg);
}
.c100.p16 .bar {
  -webkit-transform: rotate(57.6deg);
  -moz-transform: rotate(57.6deg);
  -ms-transform: rotate(57.6deg);
  -o-transform: rotate(57.6deg);
  transform: rotate(57.6deg);
}
.c100.p17 .bar {
  -webkit-transform: rotate(61.2deg);
  -moz-transform: rotate(61.2deg);
  -ms-transform: rotate(61.2deg);
  -o-transform: rotate(61.2deg);
  transform: rotate(61.2deg);
}
.c100.p18 .bar {
  -webkit-transform: rotate(64.8deg);
  -moz-transform: rotate(64.8deg);
  -ms-transform: rotate(64.8deg);
  -o-transform: rotate(64.8deg);
  transform: rotate(64.8deg);
}
.c100.p19 .bar {
  -webkit-transform: rotate(68.4deg);
  -moz-transform: rotate(68.4deg);
  -ms-transform: rotate(68.4deg);
  -o-transform: rotate(68.4deg);
  transform: rotate(68.4deg);
}
.c100.p20 .bar {
  -webkit-transform: rotate(72deg);
  -moz-transform: rotate(72deg);
  -ms-transform: rotate(72deg);
  -o-transform: rotate(72deg);
  transform: rotate(72deg);
}
.c100.p21 .bar {
  -webkit-transform: rotate(75.6deg);
  -moz-transform: rotate(75.6deg);
  -ms-transform: rotate(75.6deg);
  -o-transform: rotate(75.6deg);
  transform: rotate(75.6deg);
}
.c100.p22 .bar {
  -webkit-transform: rotate(79.2deg);
  -moz-transform: rotate(79.2deg);
  -ms-transform: rotate(79.2deg);
  -o-transform: rotate(79.2deg);
  transform: rotate(79.2deg);
}
.c100.p23 .bar {
  -webkit-transform: rotate(82.8deg);
  -moz-transform: rotate(82.8deg);
  -ms-transform: rotate(82.8deg);
  -o-transform: rotate(82.8deg);
  transform: rotate(82.8deg);
}
.c100.p24 .bar {
  -webkit-transform: rotate(86.4deg);
  -moz-transform: rotate(86.4deg);
  -ms-transform: rotate(86.4deg);
  -o-transform: rotate(86.4deg);
  transform: rotate(86.4deg);
}
.c100.p25 .bar {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}
.c100.p26 .bar {
  -webkit-transform: rotate(93.6deg);
  -moz-transform: rotate(93.6deg);
  -ms-transform: rotate(93.6deg);
  -o-transform: rotate(93.6deg);
  transform: rotate(93.6deg);
}
.c100.p27 .bar {
  -webkit-transform: rotate(97.2deg);
  -moz-transform: rotate(97.2deg);
  -ms-transform: rotate(97.2deg);
  -o-transform: rotate(97.2deg);
  transform: rotate(97.2deg);
}
.c100.p28 .bar {
  -webkit-transform: rotate(100.8deg);
  -moz-transform: rotate(100.8deg);
  -ms-transform: rotate(100.8deg);
  -o-transform: rotate(100.8deg);
  transform: rotate(100.8deg);
}
.c100.p29 .bar {
  -webkit-transform: rotate(104.4deg);
  -moz-transform: rotate(104.4deg);
  -ms-transform: rotate(104.4deg);
  -o-transform: rotate(104.4deg);
  transform: rotate(104.4deg);
}
.c100.p30 .bar {
  -webkit-transform: rotate(108deg);
  -moz-transform: rotate(108deg);
  -ms-transform: rotate(108deg);
  -o-transform: rotate(108deg);
  transform: rotate(108deg);
}
.c100.p31 .bar {
  -webkit-transform: rotate(111.6deg);
  -moz-transform: rotate(111.6deg);
  -ms-transform: rotate(111.6deg);
  -o-transform: rotate(111.6deg);
  transform: rotate(111.6deg);
}
.c100.p32 .bar {
  -webkit-transform: rotate(115.2deg);
  -moz-transform: rotate(115.2deg);
  -ms-transform: rotate(115.2deg);
  -o-transform: rotate(115.2deg);
  transform: rotate(115.2deg);
}
.c100.p33 .bar {
  -webkit-transform: rotate(118.8deg);
  -moz-transform: rotate(118.8deg);
  -ms-transform: rotate(118.8deg);
  -o-transform: rotate(118.8deg);
  transform: rotate(118.8deg);
}
.c100.p34 .bar {
  -webkit-transform: rotate(122.4deg);
  -moz-transform: rotate(122.4deg);
  -ms-transform: rotate(122.4deg);
  -o-transform: rotate(122.4deg);
  transform: rotate(122.4deg);
}
.c100.p35 .bar {
  -webkit-transform: rotate(126deg);
  -moz-transform: rotate(126deg);
  -ms-transform: rotate(126deg);
  -o-transform: rotate(126deg);
  transform: rotate(126deg);
}
.c100.p36 .bar {
  -webkit-transform: rotate(129.6deg);
  -moz-transform: rotate(129.6deg);
  -ms-transform: rotate(129.6deg);
  -o-transform: rotate(129.6deg);
  transform: rotate(129.6deg);
}
.c100.p37 .bar {
  -webkit-transform: rotate(133.2deg);
  -moz-transform: rotate(133.2deg);
  -ms-transform: rotate(133.2deg);
  -o-transform: rotate(133.2deg);
  transform: rotate(133.2deg);
}
.c100.p38 .bar {
  -webkit-transform: rotate(136.8deg);
  -moz-transform: rotate(136.8deg);
  -ms-transform: rotate(136.8deg);
  -o-transform: rotate(136.8deg);
  transform: rotate(136.8deg);
}
.c100.p39 .bar {
  -webkit-transform: rotate(140.4deg);
  -moz-transform: rotate(140.4deg);
  -ms-transform: rotate(140.4deg);
  -o-transform: rotate(140.4deg);
  transform: rotate(140.4deg);
}
.c100.p40 .bar {
  -webkit-transform: rotate(144deg);
  -moz-transform: rotate(144deg);
  -ms-transform: rotate(144deg);
  -o-transform: rotate(144deg);
  transform: rotate(144deg);
}
.c100.p41 .bar {
  -webkit-transform: rotate(147.6deg);
  -moz-transform: rotate(147.6deg);
  -ms-transform: rotate(147.6deg);
  -o-transform: rotate(147.6deg);
  transform: rotate(147.6deg);
}
.c100.p42 .bar {
  -webkit-transform: rotate(151.2deg);
  -moz-transform: rotate(151.2deg);
  -ms-transform: rotate(151.2deg);
  -o-transform: rotate(151.2deg);
  transform: rotate(151.2deg);
}
.c100.p43 .bar {
  -webkit-transform: rotate(154.8deg);
  -moz-transform: rotate(154.8deg);
  -ms-transform: rotate(154.8deg);
  -o-transform: rotate(154.8deg);
  transform: rotate(154.8deg);
}
.c100.p44 .bar {
  -webkit-transform: rotate(158.4deg);
  -moz-transform: rotate(158.4deg);
  -ms-transform: rotate(158.4deg);
  -o-transform: rotate(158.4deg);
  transform: rotate(158.4deg);
}
.c100.p45 .bar {
  -webkit-transform: rotate(162deg);
  -moz-transform: rotate(162deg);
  -ms-transform: rotate(162deg);
  -o-transform: rotate(162deg);
  transform: rotate(162deg);
}
.c100.p46 .bar {
  -webkit-transform: rotate(165.6deg);
  -moz-transform: rotate(165.6deg);
  -ms-transform: rotate(165.6deg);
  -o-transform: rotate(165.6deg);
  transform: rotate(165.6deg);
}
.c100.p47 .bar {
  -webkit-transform: rotate(169.2deg);
  -moz-transform: rotate(169.2deg);
  -ms-transform: rotate(169.2deg);
  -o-transform: rotate(169.2deg);
  transform: rotate(169.2deg);
}
.c100.p48 .bar {
  -webkit-transform: rotate(172.8deg);
  -moz-transform: rotate(172.8deg);
  -ms-transform: rotate(172.8deg);
  -o-transform: rotate(172.8deg);
  transform: rotate(172.8deg);
}
.c100.p49 .bar {
  -webkit-transform: rotate(176.4deg);
  -moz-transform: rotate(176.4deg);
  -ms-transform: rotate(176.4deg);
  -o-transform: rotate(176.4deg);
  transform: rotate(176.4deg);
}
.c100.p50 .bar {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
.c100.p51 .bar {
  -webkit-transform: rotate(183.6deg);
  -moz-transform: rotate(183.6deg);
  -ms-transform: rotate(183.6deg);
  -o-transform: rotate(183.6deg);
  transform: rotate(183.6deg);
}
.c100.p52 .bar {
  -webkit-transform: rotate(187.2deg);
  -moz-transform: rotate(187.2deg);
  -ms-transform: rotate(187.2deg);
  -o-transform: rotate(187.2deg);
  transform: rotate(187.2deg);
}
.c100.p53 .bar {
  -webkit-transform: rotate(190.8deg);
  -moz-transform: rotate(190.8deg);
  -ms-transform: rotate(190.8deg);
  -o-transform: rotate(190.8deg);
  transform: rotate(190.8deg);
}
.c100.p54 .bar {
  -webkit-transform: rotate(194.4deg);
  -moz-transform: rotate(194.4deg);
  -ms-transform: rotate(194.4deg);
  -o-transform: rotate(194.4deg);
  transform: rotate(194.4deg);
}
.c100.p55 .bar {
  -webkit-transform: rotate(198deg);
  -moz-transform: rotate(198deg);
  -ms-transform: rotate(198deg);
  -o-transform: rotate(198deg);
  transform: rotate(198deg);
}
.c100.p56 .bar {
  -webkit-transform: rotate(201.6deg);
  -moz-transform: rotate(201.6deg);
  -ms-transform: rotate(201.6deg);
  -o-transform: rotate(201.6deg);
  transform: rotate(201.6deg);
}
.c100.p57 .bar {
  -webkit-transform: rotate(205.2deg);
  -moz-transform: rotate(205.2deg);
  -ms-transform: rotate(205.2deg);
  -o-transform: rotate(205.2deg);
  transform: rotate(205.2deg);
}
.c100.p58 .bar {
  -webkit-transform: rotate(208.8deg);
  -moz-transform: rotate(208.8deg);
  -ms-transform: rotate(208.8deg);
  -o-transform: rotate(208.8deg);
  transform: rotate(208.8deg);
}
.c100.p59 .bar {
  -webkit-transform: rotate(212.4deg);
  -moz-transform: rotate(212.4deg);
  -ms-transform: rotate(212.4deg);
  -o-transform: rotate(212.4deg);
  transform: rotate(212.4deg);
}
.c100.p60 .bar {
  -webkit-transform: rotate(216deg);
  -moz-transform: rotate(216deg);
  -ms-transform: rotate(216deg);
  -o-transform: rotate(216deg);
  transform: rotate(216deg);
}
.c100.p61 .bar {
  -webkit-transform: rotate(219.6deg);
  -moz-transform: rotate(219.6deg);
  -ms-transform: rotate(219.6deg);
  -o-transform: rotate(219.6deg);
  transform: rotate(219.6deg);
}
.c100.p62 .bar {
  -webkit-transform: rotate(223.2deg);
  -moz-transform: rotate(223.2deg);
  -ms-transform: rotate(223.2deg);
  -o-transform: rotate(223.2deg);
  transform: rotate(223.2deg);
}
.c100.p63 .bar {
  -webkit-transform: rotate(226.8deg);
  -moz-transform: rotate(226.8deg);
  -ms-transform: rotate(226.8deg);
  -o-transform: rotate(226.8deg);
  transform: rotate(226.8deg);
}
.c100.p64 .bar {
  -webkit-transform: rotate(230.4deg);
  -moz-transform: rotate(230.4deg);
  -ms-transform: rotate(230.4deg);
  -o-transform: rotate(230.4deg);
  transform: rotate(230.4deg);
}
.c100.p65 .bar {
  -webkit-transform: rotate(234deg);
  -moz-transform: rotate(234deg);
  -ms-transform: rotate(234deg);
  -o-transform: rotate(234deg);
  transform: rotate(234deg);
}
.c100.p66 .bar {
  -webkit-transform: rotate(237.6deg);
  -moz-transform: rotate(237.6deg);
  -ms-transform: rotate(237.6deg);
  -o-transform: rotate(237.6deg);
  transform: rotate(237.6deg);
}
.c100.p67 .bar {
  -webkit-transform: rotate(241.2deg);
  -moz-transform: rotate(241.2deg);
  -ms-transform: rotate(241.2deg);
  -o-transform: rotate(241.2deg);
  transform: rotate(241.2deg);
}
.c100.p68 .bar {
  -webkit-transform: rotate(244.8deg);
  -moz-transform: rotate(244.8deg);
  -ms-transform: rotate(244.8deg);
  -o-transform: rotate(244.8deg);
  transform: rotate(244.8deg);
}
.c100.p69 .bar {
  -webkit-transform: rotate(248.4deg);
  -moz-transform: rotate(248.4deg);
  -ms-transform: rotate(248.4deg);
  -o-transform: rotate(248.4deg);
  transform: rotate(248.4deg);
}
.c100.p70 .bar {
  -webkit-transform: rotate(252deg);
  -moz-transform: rotate(252deg);
  -ms-transform: rotate(252deg);
  -o-transform: rotate(252deg);
  transform: rotate(252deg);
}
.c100.p71 .bar {
  -webkit-transform: rotate(255.6deg);
  -moz-transform: rotate(255.6deg);
  -ms-transform: rotate(255.6deg);
  -o-transform: rotate(255.6deg);
  transform: rotate(255.6deg);
}
.c100.p72 .bar {
  -webkit-transform: rotate(259.2deg);
  -moz-transform: rotate(259.2deg);
  -ms-transform: rotate(259.2deg);
  -o-transform: rotate(259.2deg);
  transform: rotate(259.2deg);
}
.c100.p73 .bar {
  -webkit-transform: rotate(262.8deg);
  -moz-transform: rotate(262.8deg);
  -ms-transform: rotate(262.8deg);
  -o-transform: rotate(262.8deg);
  transform: rotate(262.8deg);
}
.c100.p74 .bar {
  -webkit-transform: rotate(266.4deg);
  -moz-transform: rotate(266.4deg);
  -ms-transform: rotate(266.4deg);
  -o-transform: rotate(266.4deg);
  transform: rotate(266.4deg);
}
.c100.p75 .bar {
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -o-transform: rotate(270deg);
  transform: rotate(270deg);
}
.c100.p76 .bar {
  -webkit-transform: rotate(273.6deg);
  -moz-transform: rotate(273.6deg);
  -ms-transform: rotate(273.6deg);
  -o-transform: rotate(273.6deg);
  transform: rotate(273.6deg);
}
.c100.p77 .bar {
  -webkit-transform: rotate(277.2deg);
  -moz-transform: rotate(277.2deg);
  -ms-transform: rotate(277.2deg);
  -o-transform: rotate(277.2deg);
  transform: rotate(277.2deg);
}
.c100.p78 .bar {
  -webkit-transform: rotate(280.8deg);
  -moz-transform: rotate(280.8deg);
  -ms-transform: rotate(280.8deg);
  -o-transform: rotate(280.8deg);
  transform: rotate(280.8deg);
}
.c100.p79 .bar {
  -webkit-transform: rotate(284.4deg);
  -moz-transform: rotate(284.4deg);
  -ms-transform: rotate(284.4deg);
  -o-transform: rotate(284.4deg);
  transform: rotate(284.4deg);
}
.c100.p80 .bar {
  -webkit-transform: rotate(288deg);
  -moz-transform: rotate(288deg);
  -ms-transform: rotate(288deg);
  -o-transform: rotate(288deg);
  transform: rotate(288deg);
}
.c100.p81 .bar {
  -webkit-transform: rotate(291.6deg);
  -moz-transform: rotate(291.6deg);
  -ms-transform: rotate(291.6deg);
  -o-transform: rotate(291.6deg);
  transform: rotate(291.6deg);
}
.c100.p82 .bar {
  -webkit-transform: rotate(295.2deg);
  -moz-transform: rotate(295.2deg);
  -ms-transform: rotate(295.2deg);
  -o-transform: rotate(295.2deg);
  transform: rotate(295.2deg);
}
.c100.p83 .bar {
  -webkit-transform: rotate(298.8deg);
  -moz-transform: rotate(298.8deg);
  -ms-transform: rotate(298.8deg);
  -o-transform: rotate(298.8deg);
  transform: rotate(298.8deg);
}
.c100.p84 .bar {
  -webkit-transform: rotate(302.4deg);
  -moz-transform: rotate(302.4deg);
  -ms-transform: rotate(302.4deg);
  -o-transform: rotate(302.4deg);
  transform: rotate(302.4deg);
}
.c100.p85 .bar {
  -webkit-transform: rotate(306deg);
  -moz-transform: rotate(306deg);
  -ms-transform: rotate(306deg);
  -o-transform: rotate(306deg);
  transform: rotate(306deg);
}
.c100.p86 .bar {
  -webkit-transform: rotate(309.6deg);
  -moz-transform: rotate(309.6deg);
  -ms-transform: rotate(309.6deg);
  -o-transform: rotate(309.6deg);
  transform: rotate(309.6deg);
}
.c100.p87 .bar {
  -webkit-transform: rotate(313.2deg);
  -moz-transform: rotate(313.2deg);
  -ms-transform: rotate(313.2deg);
  -o-transform: rotate(313.2deg);
  transform: rotate(313.2deg);
}
.c100.p88 .bar {
  -webkit-transform: rotate(316.8deg);
  -moz-transform: rotate(316.8deg);
  -ms-transform: rotate(316.8deg);
  -o-transform: rotate(316.8deg);
  transform: rotate(316.8deg);
}
.c100.p89 .bar {
  -webkit-transform: rotate(320.4deg);
  -moz-transform: rotate(320.4deg);
  -ms-transform: rotate(320.4deg);
  -o-transform: rotate(320.4deg);
  transform: rotate(320.4deg);
}
.c100.p90 .bar {
  -webkit-transform: rotate(324deg);
  -moz-transform: rotate(324deg);
  -ms-transform: rotate(324deg);
  -o-transform: rotate(324deg);
  transform: rotate(324deg);
}
.c100.p91 .bar {
  -webkit-transform: rotate(327.6deg);
  -moz-transform: rotate(327.6deg);
  -ms-transform: rotate(327.6deg);
  -o-transform: rotate(327.6deg);
  transform: rotate(327.6deg);
}
.c100.p92 .bar {
  -webkit-transform: rotate(331.2deg);
  -moz-transform: rotate(331.2deg);
  -ms-transform: rotate(331.2deg);
  -o-transform: rotate(331.2deg);
  transform: rotate(331.2deg);
}
.c100.p93 .bar {
  -webkit-transform: rotate(334.8deg);
  -moz-transform: rotate(334.8deg);
  -ms-transform: rotate(334.8deg);
  -o-transform: rotate(334.8deg);
  transform: rotate(334.8deg);
}
.c100.p94 .bar {
  -webkit-transform: rotate(338.4deg);
  -moz-transform: rotate(338.4deg);
  -ms-transform: rotate(338.4deg);
  -o-transform: rotate(338.4deg);
  transform: rotate(338.4deg);
}
.c100.p95 .bar {
  -webkit-transform: rotate(342deg);
  -moz-transform: rotate(342deg);
  -ms-transform: rotate(342deg);
  -o-transform: rotate(342deg);
  transform: rotate(342deg);
}
.c100.p96 .bar {
  -webkit-transform: rotate(345.6deg);
  -moz-transform: rotate(345.6deg);
  -ms-transform: rotate(345.6deg);
  -o-transform: rotate(345.6deg);
  transform: rotate(345.6deg);
}
.c100.p97 .bar {
  -webkit-transform: rotate(349.2deg);
  -moz-transform: rotate(349.2deg);
  -ms-transform: rotate(349.2deg);
  -o-transform: rotate(349.2deg);
  transform: rotate(349.2deg);
}
.c100.p98 .bar {
  -webkit-transform: rotate(352.8deg);
  -moz-transform: rotate(352.8deg);
  -ms-transform: rotate(352.8deg);
  -o-transform: rotate(352.8deg);
  transform: rotate(352.8deg);
}
.c100.p99 .bar {
  -webkit-transform: rotate(356.4deg);
  -moz-transform: rotate(356.4deg);
  -ms-transform: rotate(356.4deg);
  -o-transform: rotate(356.4deg);
  transform: rotate(356.4deg);
}
.c100.p100 .bar {
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  transform: rotate(360deg);
}
.c100:hover {
  cursor: default;
}
/*.c100:hover > span {
  width: 3.33em;
  line-height: 3.33em;
  font-size: 0.3em;
  color: #307bbb;
}*/
/*.c100:hover:after {
  top: 0.04em;
  left: 0.04em;
  width: 0.92em;
  height: 0.92em;
}*/
.c100.dark {
  background-color: #000;
}
.c100.dark .bar,
.c100.dark .fill {
  border-color: #000 !important;
}
.c100.dark > span {
  color: #777777;
}
.c100.dark:after {
  background-color: #000;
}
.progress-count{
	height: 12.64px;
	width: 27.48px;
	color: #000 !important;
	font-size: 12px;
	font-weight: bold;
	line-height: 17px;
}

	    .right-card:hover::-webkit-scrollbar{
      width: 5px;
      transition: all 1s ease;
  }
    .right-card::-webkit-scrollbar {
      width: 0px;

      transition: all 1s ease;
  }
    .right-card::-webkit-scrollbar-thumb {
      border-radius: 50px;
      /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
      background-color: #848484;
      transition: all 1s ease;
      /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
  }
    .right-card::-webkit-scrollbar-track {
      -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
      border-radius: 50px;

      transition: all 1s ease;
  }
/*.c100.dark:hover > span {
  color: #c6ff00;
}
.c100.green .bar, .c100.green .fill {

  border-color: #4db53c !important;
}
.c100.green:hover > span {
  color: #4db53c;
}
.c100.green.dark .bar, .c100.green.dark .fill {
  border-color: #5fd400 !important;
}
.c100.green.dark:hover > span {
  color: #5fd400;
}
.c100.orange .bar, .c100.orange .fill {
  border-color: #dd9d22 !important;
}
.c100.orange:hover > span {
  color: #dd9d22;
}
.c100.orange.dark .bar, .c100.orange.dark .fill {
  border-color: #e08833 !important;
}
.c100.orange.dark:hover > span {
  color: #e08833;
}*/

</style>
