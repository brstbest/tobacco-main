<template>
  <div class="home-alert-count">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="alert-count-title">
        预警数
      </div>
      <div id="alert-count">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'AlertCount',
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
        this.chart = echarts.init(document.getElementById('alert-count'))
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
          xAxis: {
            type: 'category',
        		data:["烤房1","烤房2","烤房3","烤房4","烤房5","烤房6","烤房7","烤房8","烤房9","烤房10","烤房11","烤房12","烤房13","烤房14"],
          },
          yAxis: { type: 'value' },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
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
  .home-alert-count {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #alert-count-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #alert-count{
    height: 95%;
  }
</style>
