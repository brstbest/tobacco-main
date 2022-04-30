<template>
  <div class="home-alert-solve-rate">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="alert-solve-rate-title">
        预警处理率
      </div>
      <div id="alert-solve-rate">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'AlertSolveRate',
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
        this.chart = echarts.init(document.getElementById('alert-solve-rate'))
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
              data: [80,40,60,10,80,50,70,80,90,60,60,60,60,60],
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
  .home-alert-solve-rate {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #alert-solve-rate-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #alert-solve-rate{
    height: 95%;
  }
</style>
