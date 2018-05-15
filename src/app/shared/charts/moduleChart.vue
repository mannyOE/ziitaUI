<template>
  <div class="main-test-details">
    <div class="">
      <div class="col-md-3 loki" style="padding-top: 20px;">
        <a :href="details.link" class="btn-o" target="_blank" v-if="details.link">Go To Test Link</a><br><br>
        <p v-if="details.link" id="link">{{details.link}}</p>
        <a class=" btn-o" name="button" @click="copy_link(details.link)" v-if="details.link">
          <i class="ion-ios-browsers-outline" style="margin: auto; cursor: pointer;"></i>
          <span id="fb"> Copy</span>
        </a>
      </div>
      <div class="divi col-md-2">
        <p class="rectangle-15" :style="{background:chartData.colors[0]}">Passed:<span style="color: #fff">ds</span>{{setLowa[0]}} </p>
        <p class="rectangle-15" :style="{background:chartData.colors[1]}">Failed:<span style="color: #fff">ds</span>{{setLowa[1]}}</p>
        <p class="rectangle-15" :style="{background:chartData.colors[2]}">Untested:<span style="color: #fff">ds</span>{{setLowa[2]}}</p>
        <p class="rectangle-15" :style="{background:chartData.colors[3]}">Retest:<span style="color: #fff">ds</span>{{setLowa[3]}}</p>
        <p class="rectangle-15" :style="{background:chartData.colors[4]}">Pending:<span style="color: #fff">ds</span>{{setLowa[4]}}</p>
      </div>
        <div class="col-xs-4 overall text-center">
          <chart :chart-data.sync="fillData" :width="200" :height="100"/>
          <span style="font-weight: bolder;" v-if="isPassed">All Tests have passed</span>
        </div>
        <div class="col-xs-2" style="padding-top: 20px;">
          <h3 class="text-center" v-if="isComplete">COMPLETED</h3>
          <a href="#" v-if="!isComplete && isPassed" class="btn-o" @click.prevent="approveModule">Approve</a>
          <a href="#" v-if="!isPassed" class="btn-o" @click.prevent="rejectModule">Reject</a>
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
        colors: ['#B4EC51',"#F5515F","#f0a04e", "#20c0de", '#FAD961'],
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
    copy_link(link){
      var $temp = $("<input>");
      $("#link").append($temp);
      $temp.val(link).select();
      document.execCommand("copy");
      $temp.remove();
      $('#fb').html('<span class="fa fa-checked">Copied</span>');
      setTimeout(function () {
        $('#fb').html('Copy');
      }, 3000);
    },
    approveModule(){
      this.$emit('approve', this.module);
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
      if(this.stats.modules.filter(e=>e.module === this.module)[0].completed){
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
            this.stats.modules[i].retest,
            this.stats.modules[i].pending
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
      if(this.details.test.filter(e=>e.status === 0).length == this.setTotal){
        return true;
      }else{
        return false;
      }
    },
    ...mapGetters('qualityAssurance', [
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
  border-bottom: 1px solid #d8d8d8;
  margin: 0 0 auto -2px;
}

.key{
  height: 35px;
  margin-right: 10px;
  padding-top: 8px;
  color: #fff;
}
.overall {
  margin: 12.64px 0px 24.64px 0px;
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
.overall-result {
  text-decoration: underline;
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 0;
}
.sclam {
  font-size: 15px;
  font-weight: bolder;
  position: relative;
  text-transform: capitalize;
  top: -0.6em;
}
.mbl {
  padding-top: 5px;
  bottom: -5px;
}
.dubious {
  margin-top: 3%;
}
.aelin{
  margin-bottom: 10px;
}
.btn-o {
  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  color: #fff;
  border-radius: 3px;
  padding: 5px 15px;
  text-decoration: none;
  margin-top: -300px;
  cursor: pointer;
}
#link {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
