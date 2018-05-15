import {Bar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        legend: {
          display: false,
        },
        scales: {
           xAxes: [{
               ticks: {
                   display: true
               },
               gridLines: { display:false, drawBorder: false },
               barPercentage: 0.4
           }],
           yAxes: [{
               ticks: {
                   display: false
               },
               gridLines: { display:false, drawBorder: false }
           }]
       },
       lineColor: 'black',

      }
    }
  },

  mounted () {
    // console.log(this.chartData);
    this.renderChart(this.chartData, this.options)
    // this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  },

}