<template>
  <div class="main-test-details">
    <div class="">
      <div class="col-md-5 descr" style="padding-top: 20px;">
        <span style="font-weight: bolder;">Decsription: </span>
        {{details.module_description}}
      </div>
      <div class="divi col-md-2">
        <p class="rectangle-15" :style="{background:chartData.colors[0]}">Passed:<span style="color: #fff">ds</span>{{setLowa[0]}} </p>
        <p class="rectangle-15" :style="{background:chartData.colors[1]}">Failed:<span style="color: #fff">ds</span>{{setLowa[1]}}</p>
        <p class="rectangle-15" :style="{background:chartData.colors[2]}">Untested:<span style="color: #fff">ds</span>{{setLowa[2]}}</p>
        <a href="#" v-if="!isPassed && !isComplete" @click.prevent="done()" class="btn-o" >Reject</a>
        <a href="#" v-if="isPassed && !isComplete" @click.prevent="done()" class="btn-o">Approve</a>

      </div>
        <div class="col-xs-4 text-center">
          <chart :chart-data.sync="fillData" :width="200" :height="100"/>
          <span style="font-weight: bolder;" v-if="isComplete">All Tests have passed</span>
        </div>
    </div>
  </div>
</template>

<script>
import Chart from './chart2.js';
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  props: ['module','details'],
  components: {Chart},
  data () {
    return {
      datacollection:{},
      isFetchingModules: true,
      chartData: {
        labels: ['Passed', 'Failed', 'Untested', 'Retest','Pending'],
        colors: ['#F5515F',"#429321","#f0a04e", "#20c0de", '#FAD961'],
      },
    }
  },
  mounted () {
  },
  watch : {

  },

  methods: {
    percentage(mod){
      return Math.round(mod/this.setTotal * 100);
    },
    done(){
      this.$emit('done', this.module);
    },
    rejectModule(){
      this.$emit('reject', this.module);
    },

  },
  computed: {
    setColors(){
      return this.chartData.colors;
    },
    isComplete(){
      if(this.details.status === 3){
        return true;
      }else{
        return false;
      }
    },
    setLowa(){
      var currentStat;
      for (var i = 0; i < this.stats.modules.length; i++) {
        if(this.stats.modules[i].module === this.module){
          currentStat = [
            this.stats.modules[i].passed,
            this.stats.modules[i].failed,
            this.stats.modules[i].untested,
          ]
        }
      }

      return currentStat;
    },
    setLabel(){
      return this.chartData.labels;
    },
    setTotal(){
      var total = 0;
      for	(var index = 0; index < this.setLowa.length; index++) {
        total += this.setLowa[index];
      }
      // console.log(total);
      return total;
    },
    isPassed(){
      if(this.setLowa[0] === this.setTotal){
        return true;
      }else{
        return false;
      }
      return true;
    },
    ...mapGetters('ea', [
      'mods',
      'stats',
      'loading',

    ]),
    fillData () {
     this.datacollection = {
       labels: this.chartData.labels,
       datasets: [
         {
           backgroundColor: this.chartData.colors,
           data: this.setLowa
         },
         // {
         //   backgroundColor: '',
         //   data: []
         // },



       ]
     };
     return this.datacollection;
   },

  }
}
</script>

<style scoped>

.main-test-details {
  height: 150px;
  width: 100%;
  background-color: #ffffff;
  margin: 10px;
}

.key{
  height: 35px;
  margin-right: 10px;
  padding-top: 8px;
  color: #fff;
}
.overall {
  margin: 24.64px 0px 24.64px 0px;
  /* display: none; */
  /* background-color: #000; */
}
.rectangle-15 {
	height: 16px;
	width: 16px;
  text-indent: 35px;
  color: #9B9B9B;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 16px;
}
.passed{
  background: linear-gradient(180deg, #B4EC51 0%, #429321 100%);
}
.failed {
  background: linear-gradient(180deg, #F5515F 0%, #9F041B 100%);
}
.pending {
  	background: linear-gradient(180deg, #FAD961 0%, #F76B1C 100%);
}
.divi {
  margin: 18.64px auto 24.64px 50px;
}
.descr {

  height: 130px;
  overflow-y: auto;
}
.descr:hover::-webkit-scrollbar{
    width: 5px;
    transition: all 1s ease;
}
.descr::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.descr::-webkit-scrollbar-thumb {
    border-radius: 50px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
    background-color: #848484;
    transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.descr::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
}
.btn-o {
  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  color: #fff;
  border-radius: 3px;
  padding: 5px 15px;
  text-decoration: none;
  margin-top: -300px;
}
</style>
