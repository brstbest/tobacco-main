<template>
  <div class="run-overview-running">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="run-overview-running-title">
        运行设备
      </div>
      <div id="run-overview-running">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'Running',
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
        this.chart = echarts.init(document.getElementById('run-overview-running'))
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: '运行' },
                { value: 735, name: '未运行' },
              ]
            }
          ]
        };

        this.chart.setOption(option)
      }
    },
  }
</script>

<style>
  .run-overview-running {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #run-overview-running-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #run-overview-running{
    height: 95%;
  }
</style>
