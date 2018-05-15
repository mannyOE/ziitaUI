<template id="chartJs">
  <div class="row" style="padding-left: 50px;">
    <div class="col-xs-4 rec-1" >
      <p class="modules" >MODULES</p>
      <p class="total-no" >Total No of Modules</p>
      <p class="no" >{{modules.length}}</p>
    </div>
    <div class="col-xs-8 rec-2" >
      <div class="row" style="margin-bottom: 30px;">
        <div class="col-xs-4 text-center tyson">
          <div class="row" >
            <div class="col-xs-12 total-no" >{{message[showing]}}</div>
            <div class="col-xs-12 ty2" >{{setLowa[showing]}}</div>
          </div>
        </div>
        <div id="content" class="col-md-5 mbl">
          <chart :chart-data.sync="fillData" :width="200" :height="100"/>
        </div>
      </div>

      <div class="col-xs-12 buttons" >
        <div class="row" >
          <div class="col-xs-2 col-xs-offset-1 first" :class="{'active': showing==0}" @click="show(0)">PASSED : {{setLowa[0]}}</div>
          <div class="col-xs-2 in" @click="show(1)" :class="{'active': showing==1}">FAILED : {{setLowa[1]}}</div>
          <div class="col-xs-2 in" @click="show(2)" :class="{'active': showing==2}">UNTESTED : {{setLowa[2]}}</div>
          <div class="col-xs-2 in" @click="show(3)" :class="{'active': showing==3}">RETEST : {{setLowa[3]}}</div>
          <div class="col-xs-2 last" @click="show(4)" :class="{'active': showing==4}">PENDING : {{setLowa[4]}}</div>
        </div>
      </div>
    </div>


    <!--<div class="" v-if="isFetchingModules">-->
      <!--<LoadingBar/>-->
    <!--</div>-->
    <!--<div class="" v-else>-->
      <!--<div class="col-md-4 text-center" v-if="setTotal === 0">-->
        <!--<span>No Chart Data</span>-->
      <!--</div>-->

      <!--<div id="content" class="col-md-4 mbl"  v-else>-->

        <!--<canvas ref="chart" style="col-md-8"></canvas>-->
      <!--</div>-->
      <!--<div class="col-md-5 dubious">-->

        <!--<div class="col-md-4 aelin" v-for="(res, index) in setLowa" :key="index">-->
          <!--<span class="key col-md-12" :style="{ background: setColors[index] }">-->

            <!--<span class="col-md-3 text-center" style="border-right: 1px solid #fff;">{{res}}</span>-->
            <!--<span class="col-md-3 text-center">{{percentage(res)}}%</span>-->
          <!--</span>-->
          <!--<span class="col-md-4 text-center"><b>{{setLabel[index]}}</b></span>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="col-md-2 text-center overall" :style="{color: setColors[0]}">-->
        <!--<b class="overall-result">{{percentage(setLowa[0])}}%<br></b>-->
        <!--<b class="sclam">Passed</b>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>



<script type="text/javascript">
  import Chart from './LineChart.js';
  // import { Bar } from 'vue-chartjs'

  import {
    mapGetters,
    mapActions
  } from 'vuex';

  export default{
    // module script starts here
    props: ['modules'],
    components: {Chart},
    data(){
      return {
        showing: 0,
        datacollection:{},
        isFetchingModules: true,
        chartData: {
          labels: ['Passed', 'Failed', 'Untested', 'Retest','Pending'],
          colors: ['#B4EC51',"#F5515F","#f0a04e", "#20c0de", '#FAD961'],
        },
        total: 0,
        message: [
          "Total Number of Passed Tests",
          "Total Number of Failed Tests",
          "Total Number of Untested Tests",
          "Total Number of Retest Tests",
          "Total Number of Pending Tests"
        ]
      }
    },
    mounted() {

      if(this.stats){
        // console.log(this.stats.project.length);

      }
    },
    created(){
      this.fetchModules();
    },

    methods: {

     getRandomInt () {
       return Math.floor(Math.random() * (50 - 5 + 1)) + 5
     },
     show(pad){
       this.showing = pad;
     },
      percentage(mod){
        if(this.setTotal === 0){
          return 0;
        }else{
            return Math.round(mod/this.setTotal * 100);
        }

      },
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      ...mapActions('qualityAssurance', [
        'fetchMods',
        'postCase'
      ]),
      fetchModules(){
        this.isFetchingModules = true;
          this.callWithToken({
             parameters: {
                 projectId: this.$route.params.id, // project id
             },
             action: this.fetchMods,
         }).then(res=>{
           var total = 0;
           this.isFetchingModules = false;
           this.loadChart;
         });
      },

    },
    computed: {
      setColors(){
        return this.chartData.colors;
      },
      setLowa(){
        return this.stats.project;
      },
      setLabel(){
        return this.chartData.labels;
      },
      setTotal(){

        // console.log(total);
        return this.total;
      },


      fillData () {
       this.datacollection = {
         labels: this.chartData.labels,
         datasets: [
           {
             backgroundColor: this.chartData.colors,
             data: this.setLowa
           },
           {
             backgroundColor: '',
             data: []
           },



         ]
       };
       return this.datacollection;
     },
      ...mapGetters('qualityAssurance', [
        'mods',
        'stats',
        'loading',

      ]),

    }


    // module script ends here
  }
</script>

<style scoped>
  .first{
    border: 1px solid #D8D8D8;
    border-radius: 3px 0 0 3px ;
    padding: 8px;
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }
  .last{
    border-top: 1px solid #D8D8D8;
    border-right: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    border-radius: 0 3px 3px 0  ;
    padding: 8px;
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }
  .in{
    border-right: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    border-top: 1px solid #D8D8D8;
    padding: 8px;
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
  }
  .in:hover, .last:hover, .first:hover, .active{
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    color: #fff;
  }
  .no{
    color: #000000;
    font-family: Montserrat;
    font-size: 48px;
    line-height: 66px;
    text-align: center;
  }
  .total-no{
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 14px;
    text-align: center;
  }
  .modules {
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
  .rec-1{
    height: 219px;
    margin-right: 15px;
    width: 237px;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0 0 30px 0 rgba(50,106,218,0.05);
    padding: 40px;
    text-align: center;
  }
  .rec-2{
    height: 219px;
    width: 636px;
    border-radius: 3px;
    background-color: #FFFFFF;
    box-shadow: 0 0 30px 0 rgba(50,106,218,0.05);
  }
  /*.main-test-details {*/
    /*box-shadow: 0 2px 15px rgba(0,0,0,0.16);*/
    /*height: 210px;*/
    /*width: 100%;*/
    /*background-color: #fff;*/

  /*}*/

.key{
  height: 35px;
  margin-right: 10px;
  padding-top: 8px;
  color: #fff;
}
.overall {
  padding-top: 6.3%;
}
.overall-result {
  text-decoration: underline;
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 0;
}
.sclam {
  font-size: 15px;
  position: relative;
  text-transform: capitalize;
  top: -0.6em;
}
.mbl {
  padding-top: 20px;
}
.dubious {
  margin-top: 3%;
}
.aelin{
  margin-bottom: 10px;
}
.no-chart {
  margin-top: 2%;
  margin-left: 3%;
  padding-top: 5%;
  border-radius: 100%;
  background: grey;
  color:#fff;
  height: 150px;
  width: 150px;
}
.buttons {

}
.buttons.row{
  bottom: 0;
}
.tyson {
	color: #9B9B9B;
	font-size: 12px;
	line-height: 18px;
	text-align: center;
  margin: 29px 0px auto 65px;
  width: 216px;
}
.ty2 {
	color: #000000;
	font-size: 36px;
	line-height: 49px;
	text-align: center;
  margin: 10px auto;
}
</style>
