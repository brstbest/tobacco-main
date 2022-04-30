<template>
  <div class="run-overview-utilization">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="run-overview-utilization-title">
        烤房使用率
      </div>
      <div id="run-overview-utilization">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'Utilization',
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
        this.chart = echarts.init(document.getElementById('run-overview-utilization'))
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
              data: [57, 78, 65, 34, 98, 32, 98],
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
  .run-overview-utilization {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #run-overview-utilization-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #run-overview-utilization{
    height: 95%;
  }
</style>
