import {Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
  props:['data'],
  data(){
    return {
      options: [],
      body: [],
      colors: []
    }
  },
  mounted () {

  },
  methods: {
    Chart(body){
      this.options = body.options;
      this.colors = body.colors;
      this.body = body.data;
      this.renderChart({
        labels: this.options,
        datasets: [
          {
            data: this.body,
            backgroundColor: this.colors,
          }
        ]
      }, {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
              display: false,
          },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }
        }
        })
    },


  },
  watch: {
      'data': {
          handler: function (val, old) {
            console.log(val,old);
            this.Chart(val);
            // this.resetData();
            // val.forEach(mod=>{
            //   this.updatePassed(mod);
            //   this.total = this.total + mod.test.length;
            //   this.getChartData();
            // });
          },
          deep: true
      },
  },
}
