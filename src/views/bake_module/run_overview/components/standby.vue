<template>
  <div class="run-overview-standby">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="run-overview-standby-title">
        待烤设备
      </div>
      <div id="run-overview-standby">
      </div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default{
    name: 'Standby',
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
        this.chart = echarts.init(document.getElementById('run-overview-standby'))
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
                { value: 735, name: '待烤' },
                { value: 1048, name: '其他' },
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
  .run-overview-standby {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #run-overview-standby-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #run-overview-standby{
    height: 95%;
  }
</style>
