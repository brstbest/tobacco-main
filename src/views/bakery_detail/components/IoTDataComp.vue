<template>
  <div class="iot-data-comp">
    <el-row class="iot-data-body" :gutter="10">
      <el-row class="iot-data-info-row" :gutter="10">
        <el-col :span="12">
          <el-descriptions direction="vertical" :column="5" border>
            <template v-for="(item, index) in descFirstLabels">
              <el-descriptions-item
                :label="item.label"
                :span="item.span"
                :contentStyle="{'text-align': 'center'}"
                :labelStyle="{'text-align': 'center'}">
                {{ descFirstData[item.key] }}
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-col>
        <el-col :span="8">
          <el-descriptions direction="vertical" :column="4" border>
            <template v-for="(item, index) in descSecondLabels">
              <el-descriptions-item
                :label="item.label"
                :span="item.span"
                :contentStyle="{'text-align': 'center'}"
                :labelStyle="{'text-align': 'center'}">
                {{ descSecondData[item.key] + '℃' }}
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-col>
        <el-col :span="4">
          <el-descriptions direction="vertical" :column="3" border>
            <template v-for="(item, index) in descThirdLabels">
              <el-descriptions-item
                :label="item.label"
                :span="item.span"
                :contentStyle="{'text-align': 'center'}"
                :labelStyle="{'text-align': 'center'}">
                {{ descThirdData[item.key] }}
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-col>
      </el-row>
      <el-row class="iot-data-chart-row">
        <div id="iot-data-chart"></div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { timeFormat } from '/src/utils/index.js'
  import { getSensor } from '@/api/sensor'

  export default{
    name: 'IoTDataComp',
    components: {

    },
    props: ['recordMsg'],
    data() {
      return {
        timer: null,
        recordData: null,
        currenTime: null,
        totalTime: null,
        usedTime: null,
        leftTime: null,
        chart: null,
        chartData: {
          xLabel: [],
          dryBallTarget: [],
          dryBallTemp: [],
          wetBallTarget: [],
          wetBallTemp: [],
        },
        descFirstLabels: [
          { key: 'start_time', label: '烘烤开始时间', span: 1 },
          { key: 'end_time', label: '烘烤结束时间', span: 1 },
          { key: 'bake_total_time', label: '烘烤总时间', span: 1 },
          { key: 'bake_used_time', label: '烘烤已用时间', span: 1 },
          { key: 'bake_left_time', label: '烘烤剩余时间', span: 1 },
        ],
        descSecondLabels: [
          { key: 'dryBallTarget', label: '干球目标', span: 1 },
          { key: 'wetBallTarget', label: '湿球目标', span: 1 },
          { key: 'dryBallTemp', label: '干球温度', span: 1 },
          { key: 'wetBallTemp', label: '湿球温度', span: 1 },
        ],
        descThirdLabels: [
          { key: 'fire', label: '助燃', span: 1 },
          { key: 'voltage', label: '电压', span: 1 },
          { key: 'wind', label: '循环风速', span: 1 },
        ],
        descFirstData: {
          start_time: null,
          end_time: null,
          bake_total_time: null,
          bake_used_time: null,
          bake_left_time: null,
        },
        descSecondData: {
          dryBallTarget: null,
          wetBallTarget: null,
          dryBallTemp: null,
          wetBallTemp: null,
        },
        descThirdData: {
          fire: null,
          voltage: null,
          wind: null,
        },
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      this.initChart()
      this.timeCount()
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },
    methods: {
      fetchData() {
        // descFirst
        this.currenTime = new Date('2021-12-30 00:00:00')
        this.recordData = this.recordMsg
        let start_time = new Date(this.recordData.start_time)
        let end_time = new Date(this.recordData.end_time)
        this.totalTime = end_time.getTime() - start_time.getTime()
        this.usedTime = this.currenTime.getTime() - start_time.getTime()
        this.leftTime = end_time.getTime() - this.currenTime.getTime()
        this.descFirstData.start_time = timeFormat(start_time, 0, 5)
        this.descFirstData.end_time = timeFormat(end_time, 0, 5)
        this.descFirstData.bake_total_time = this.timeChange(this.totalTime)
        if(this.usedTime < this.totalTime){
          this.descFirstData.bake_used_time = this.timeChange(this.usedTime)
        }
        else{
          this.descFirstData.bake_used_time = this.timeChange(this.totalTime)
        }
        if(this.leftTime > 0){
          this.descFirstData.bake_left_time = this.timeChange(this.leftTime)
        }
        else{
          this.descFirstData.bake_left_time = '00:00:00'
        }

        // descSecond
        let rdata = {
          device_id: this.recordData.device_id,
          // start_time: this.descFirstData.start_time,
          // end_time: this.descFirstData.end_time
          start_time: timeFormat(new Date('2021-09-24 00:00:00'), 0, 5),
          end_time: timeFormat(new Date('2021-09-26 00:00:00'), 0, 5),
        }
        this.requestSensor(rdata)

        console.log('fetch', this.recordData)
      },
      timeCount(){
        this.timer = setInterval(() => {
          if(this.usedTime < this.totalTime){
            this.usedTime += 1000
            this.descFirstData.bake_used_time = this.timeChange(this.usedTime)
          }
          else{
            this.descFirstData.bake_used_time = this.timeChange(this.totalTime)
          }
          if(this.leftTime > 0){
            this.leftTime -= 1000
            this.descFirstData.bake_left_time = this.timeChange(this.leftTime)
          }
          else{
            this.descFirstData.bake_left_time = '00:00:00'
          }
        }, 1000)
      },
      timeChange(time){
        let hours=Math.floor(time/(3600*1000))
        //计算相差分钟数
        let leave1=time%(3600*1000)        //计算小时数后剩余的毫秒数
        let minutes=Math.floor(leave1/(60*1000))
        //计算相差秒数
        let leave2=leave1%(60*1000)      //计算分钟数后剩余的毫秒数
        let seconds=Math.round(leave2/1000)
        if(hours < 10){
          hours = '0' + hours
        }
        if(minutes < 10){
          minutes = '0' + minutes
        }
        if(seconds < 10){
          seconds = '0' + seconds
        }
        return hours + ':' + minutes + ':' + seconds
      },
      requestSensor(rdata){
        getSensor(rdata).then(res => {
          console.log('getSensor', res)
          if(res.code === 200) {
            this.solveResponse(res.data)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      solveResponse(data){
        // descSecond
        this.descSecondData.dryBallTarget = data[data.length - 1].dryBallTarget
        this.descSecondData.wetBallTarget = data[data.length - 1].wetBallTarget
        this.descSecondData.dryBallTemp = data[data.length - 1].dryBallTemp
        this.descSecondData.wetBallTemp = data[data.length - 1].wetBallTemp
        
        // chart
        
      },
      initChart(){
        this.chart = echarts.init(document.getElementById('iot-data-chart'))
        console.log(this.chart)
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            bottom: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          grid: {
            left: '5%',
            right: '3%',
            top: '5%'
          },
          series: [
            {
              name: '干球目标温度',
              type: 'line',
              data: [20, 31, 43, 51, 62, 72, 89],
            },
            {
              name: '湿球目标温度',
              type: 'line',
              data: [11, 21, 21, 51, 31, 21, 1],
            },
            {
              name: '干球实际温度',
              type: 'line',
              data: [21, 32, 44, 52, 63, 73, 86],
            },
            {
              name: '湿球实际温度',
              type: 'line',
              data: [12, 22, 22, 52, 32, 22, 2],
            }
          ]
        };
        this.chart.setOption(option)
      }
    }
  }
</script>

<style>
  .iot-data-comp, .iot-data-body{
    height: 100%;
  }
  #iot-data-chart{
    height: 100%;
  }
  .iot-data-info-row{
    height: 20%;
  }
  .iot-data-chart-row{
    height: 80%;
  }
</style>
