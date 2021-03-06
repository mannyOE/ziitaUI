import {Line, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        legend: {
          display: false,
        },
        scales: {
           yAxes: [{
               ticks: {
                   display: true
               },
               gridLines: { display:true, drawBorder: true }
           }],
           xAxes: [{
               ticks: {
                   display: true
               },
               gridLines: { display:false, drawBorder: false }
           }]
       },
       lineColor: 'black',

      }
    }
  },

  mounted () {
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options)
    // this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
