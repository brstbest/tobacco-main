<template>
  <div class="home-progress">
    <el-card class="chart-card" :body-style="{height: '100%'}">
      <div id="progress-title">
        烘烤进度
      </div>
      <div id="progress">
      </div>
    </el-card>
  </div>
</template>

<script>

  import echarts from 'echarts'

  export default{
    name: 'Progress',
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
        this.chart = echarts.init(document.getElementById('progress'))
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
        			grid:{
<<<<<<< HEAD
        				left:"-20",
        				top:"10",
        				right:"-40",
=======
        				left:"10",
        				top:"10",
        				right:"0",
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
        				bottom:"10",
        				containLabel:true
        			},
        			xAxis: {
        				type: 'value',
        				splitLine:{show:false},
        				axisLabel:{show:false},
        				axisTick:{show:false},
        				axisLine:{show:false}
        			},
        			yAxis:[
        			   {
        					type: 'category',
        					axisTick:{show:false},
        					axisLine:{show:false},
        					axisLabel:{
        						color:"black",
        						fontSize:14,
        					},
        					data:["烤房1","烤房2","烤房3","烤房4","烤房5","烤房6","烤房7","烤房8","烤房9","烤房10","烤房11","烤房12","烤房13","烤房14"],
        					max:14, // 关键：设置y刻度最大值，相当于设置总体行高
        					 inverse:true
        				},
        				 {
        					type: 'category',
        					axisTick:{show:false},
        					axisLine:{show:false},
        					axisLabel:{
<<<<<<< HEAD
=======
        						color:"black",
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
        						fontSize:14,
        					},
        					data:[80,40,60,10,80,50,70,80,90,60,60,60,60,60],
        					max:14, // 关键：设置y刻度最大值，相当于设置总体行高
        					inverse:true
        				}
        			],
        			series: [
        			  {
        				name:"条",
        				type:"bar",
        				barWidth:19,
        				data:[80,40,60,10,80,50,70,80,90,60,60,60,60,60],
        				barCategoryGap:20,
        				itemStyle:{
        					normal:{
        						barBorderRadius:10,
        						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        						  offset: 0,
        						  color: '#22b6ed'
        						}, {
        						  offset: 1,
        						  color: '#3fE279'
        						}]),
        					}
        				},
        				zlevel:1

        			  },{
        				  name:"进度条背景",
        				  type:"bar",
        				  barGap:"-100%",
        				  barWidth:19,
        				  data:[100,100,100,100,100,100,100,100,100,100,100,100,100,100],
        				  color: "lightgray",
        				  itemStyle:{
        					  normal:{
        						  barBorderRadius:10
        					  }
        				  },
        			  }
        			]
        		};
        this.chart.setOption(option)
      }
    },
  }
</script>

<style>
  .home-progress {
    height: 100%;
  }
  .chart-card {
    height: 100%;
  }
  #progress-title{
    height: 5%;
    font-size: large;
    font-weight: bold;
  }
  #progress{
    height: 95%;
  }
</style>
