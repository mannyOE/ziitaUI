import {Doughnut, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['passed'],
  data() {
    return {
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false
        },
        "animation": {
            "duration": 1,
            "onComplete": function () {
              var self = this;
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
            // var data = this.chartData[index] + '$';
            ctx.fillStyle = dataset.backgroundColor[0];
            ctx.font = "bold 28px Calibri";
            ctx.fillText(dataset.data[0], bar._model.x, bar._model.y+15);
                    });
                });
            }
        },
      }
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
    // this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
