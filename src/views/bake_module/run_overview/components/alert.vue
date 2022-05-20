<template>
  <div class="run-overview-alert">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="run-overview-alert-title">
        烤房预警数
      </div>
      <div id="run-overview-alert">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'Alert',
    components: {

    },
    data() {
      return {
        chart: null,
        chartData: [],
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.initChart()
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('run-overview-alert'))
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
          xAxis: {
            type: 'category',
            data: ['烤房1', '烤房2', '烤房3', '烤房4', '烤房5', '烤房6', '烤房7'],
          },
          yAxis: { type: 'value' },
          series: [
            {
              data: [820, 932, 1290, 1330, 1320, 901, 934],
              type: 'bar',
            },
          ],
        };

        this.chart.setOption(option)
      }
    },
  }
</script>

<style>
  .run-overview-alert {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #run-overview-alert-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #run-overview-alert{
    height: 95%;
  }
</style>
