import {Doughnut, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        legend: {
          display: false,
        },
        
      }
    }
  },

  mounted () {
    console.log(this.chartData);
    this.renderChart(this.chartData, this.options)
    // this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
