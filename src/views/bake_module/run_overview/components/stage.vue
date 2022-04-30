<template>
  <div class="run-overview-stage">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="run-overview-stage-title">
        各阶段设备数量
      </div>
      <div id="run-overview-stage">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'Stage',
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
        this.chart = echarts.init(document.getElementById('run-overview-stage'))
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
          xAxis: {
            type: 'category',
            data: ['阶段1', '阶段2', '阶段3', '阶段4', '阶段5', '阶段6', '阶段7'],
          },
          yAxis: { type: 'value' },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
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
  .run-overview-stage {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #run-overview-stage-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #run-overview-stage{
    height: 95%;
  }
</style>
