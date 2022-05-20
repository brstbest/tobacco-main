<template>
  <div class="bake-record-detail">
<<<<<<< HEAD
    <el-row class="bake-record-detail-item-row" :gutter="20">
      <el-col :span="16">
        <el-descriptions title="烘烤基本信息" :column="4" border>
          <template v-for="(b_item, b_index) in bakeInfo">
            <el-descriptions-item :label="b_item.label" :span="b_item.span">---</el-descriptions-item>
          </template>
        </el-descriptions>
      </el-col>
      <el-col :span="8">
        <el-descriptions title="烤房基本信息" :column="1" border>
          <template v-for="(d_item, d_index) in deviceInfo">
            <el-descriptions-item :label="d_item.label">---</el-descriptions-item>
          </template>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row class="bake-record-detail-item-row">
      <el-descriptions title="烘烤评价信息" :column="5" border>
        <template v-for="(e_item, e_index) in evaluationInfo">
          <el-descriptions-item :label="e_item.label" :span="e_item.span">---</el-descriptions-item>
        </template>
      </el-descriptions>
    </el-row>
    <el-row class="bake-record-detail-item-row">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="烘烤曲线" name="1">
          <div id="bake-record-detail-chart">
          </div>
          <el-descriptions style="padding-bottom: 20px;" :column="1">
            <el-descriptions-item label="选用曲线">---</el-descriptions-item>
            <el-descriptions-item label="修改记录">
              <el-timeline>
                <el-timeline-item
                  v-for="(history, index) in lineHistories"
                  :key="index"
                  :timestamp="history.timestamp">
                  {{history.content}}
                </el-timeline-item>
              </el-timeline>
            </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item title="烘烤历史照片" name="2">
          <el-row :gutter="20">
            <el-col :span="8">
              <div style="text-align: center;font-weight: bold;">烤前</div>
              <el-carousel height="200px" :autoplay="false" trigger="click" indicator-position="none" :loop="false">
                <el-carousel-item v-for="(item, index) in picSrc" :key="index">
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="item"
                    :preview-src-list="picSrc"
                    :fit="fit">
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="8">
              <div style="text-align: center;font-weight: bold;">烤中</div>
              <el-carousel height="200px" :autoplay="false" trigger="click" indicator-position="none" :loop="false">
                <el-carousel-item v-for="(item, index) in picSrc" :key="index">
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="item"
                    :preview-src-list="picSrc"
                    :fit="fit">
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="8">
              <div style="text-align: center;font-weight: bold;">烤后</div>
              <el-carousel height="200px" :autoplay="false" trigger="click" indicator-position="none" :loop="false">
                <el-carousel-item v-for="(item, index) in picSrc" :key="index">
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="item"
                    :preview-src-list="picSrc"
                    :fit="fit">
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </el-collapse-item>


        <el-collapse-item title="烘烤报警信息" name="3">
          <el-table :data="tableData">
            <template v-for="(item, index) in columns">
              <el-table-column
              :prop="item.key"
              :label="item.label"
              :sortable="item.sortable">

              </el-table-column>
            </template>
          </el-table>

        </el-collapse-item>
      </el-collapse>
    </el-row>
=======
    <el-descriptions title="烘烤基本信息" :column="3">
      <template v-for="(b_item, b_index) in bakeInfo">
        <el-descriptions-item :label="b_item.label"></el-descriptions-item>
      </template>
    </el-descriptions>
    <el-descriptions title="烘烤评价信息" :column="3">
      <template v-for="(e_item, e_index) in evaluationInfo">
        <el-descriptions-item :label="e_item.label"></el-descriptions-item>
      </template>
    </el-descriptions>
    <el-descriptions title="烤房基本信息" :column="2">
      <template v-for="(d_item, d_index) in deviceInfo">
        <el-descriptions-item :label="d_item.label"></el-descriptions-item>
      </template>
    </el-descriptions>
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
  </div>
</template>

<script>
<<<<<<< HEAD

  import echarts from 'echarts'

  export default{
    name: 'BakeDetail',
    components: {
    },
    data() {
      return {
        activeNames: ['1', '2', '3'],
        chart: null,
        fit: 'contain',
        bakeInfo: [
          {key: 'start_time', label: '开始时间', span: '2'},
          {key: 'end_time', label: '结束时间', span: '2'},
          {key: 'baking_weight_before', label: '烤前重量', span: '2'},
          {key: 'baking_weight_after', label: '烤后重量', span: '2'},
          {key: 'tobacco_type', label: '烟叶类型', span: '4'},
          {key: 'technician_id', label: '技师', span: '1'},
          {key: 'farmer_id', label: '烟农', span: '1'},
          {key: 'phone', label: '手机', span: '1'},
          {key: 'nname', label: '姓名', span: '1'},
        ],
        evaluationInfo: [
          {key: 'level', label: '烟叶等级', span: '1'},
          {key: 'loss_rate', label: '损失率', span: '1'},
          {key: 'cyanosis_rate', label: '含青率', span: '1'},
          {key: 'noise_rate', label: '杂色率', span: '1'},
          {key: 'yellow_rate', label: '黄烟率', span: '1'},
          {key: 'tobacco_info', label: '评价信息', span: '5'},
        ],
        deviceInfo: [
          { key: 'location', label: '县/市', span: '1'},
          { key: 'parent_location', label: '州/市', span: '1'},
          { key: 'station_id', label: '烟站ID', span: '1'},
          { key: 'device_id', label: '设备ID', span: '1'},
        ],
        picSrc: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ],
        lineHistories: [{
          content: '调整xxxxx',
          timestamp: '2018-04-15'
        }, {
          content: '调整xxxxx',
          timestamp: '2018-04-13'
        }, {
          content: '调整xxxxx',
          timestamp: '2018-04-11'
        }],
        columns: [
          { key: 'alert_time', label: '报警时间', sortable: true },
          { key: 'recovery_time', label: '恢复时间', sortable: true },
          { key: 'alert_info', label: '报警信息', sortable: false },
          { key: 'alert_reason', label: '报警原因', sortable: false },
        ],
        chartData: [],
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.initChart()
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('bake-record-detail-chart'))
        window.addEventListener("resize", () => { this.chart.resize(); });
        this.setChartOptions()
      },
      setChartOptions() {
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // prettier-ignore
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [
              {
                lte: 6,
                color: 'green'
              },
              {
                gt: 6,
                lte: 8,
                color: 'red'
              },
              {
                gt: 8,
                lte: 14,
                color: 'green'
              },
              {
                gt: 14,
                lte: 17,
                color: 'red'
              },
              {
                gt: 17,
                color: 'green'
              }
            ]
          },
          series: [
            {
              name: 'Electricity',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
              markArea: {
                itemStyle: {
                  color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [
                  [
                    {
                      name: 'Morning Peak',
                      xAxis: '07:30'
                    },
                    {
                      xAxis: '10:00'
                    }
                  ],
                  [
                    {
                      name: 'Evening Peak',
                      xAxis: '17:30'
                    },
                    {
                      xAxis: '21:15'
                    }
                  ]
                ]
              }
            },
            {
              name: 'Electricity',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: [390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400, 300, 280, 250, 260, 270, 300, 550, 500, 400],
              markArea: {
                itemStyle: {
                  color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [
                  [
                    {
                      name: 'Morning Peak',
                      xAxis: '07:30'
                    },
                    {
                      xAxis: '10:00'
                    }
                  ],
                  [
                    {
                      name: 'Evening Peak',
                      xAxis: '17:30'
                    },
                    {
                      xAxis: '21:15'
                    }
                  ]
                ]
              }
            }
          ]
        };
        this.chart.setOption(option)
=======
  export default{
    name: 'BakeDetail',
    components: {

    },
    data() {
      return {
        bakeInfo: [
          {key: 'start_time', label: '开始时间'},
          {key: 'end_time', label: '结束时间'},
          {key: 'tobacco_type', label: '烟叶类型'},
          {key: 'baking_weight_before', label: '烤前重量'},
          {key: 'baking_weight_after', label: '烤后重量'},
          {key: 'technician_id', label: '技师'},
          {key: 'farmer_id', label: '烟农'},
          {key: 'phone', label: '手机'},
          {key: 'nname', label: '姓名'},
        ],
        evaluationInfo: [
          {key: 'level', label: '烟叶等级'},
          {key: 'loss_rate', label: '损失率'},
          {key: 'empty', label: ''},
          {key: 'cyanosis_rate', label: '含青率'},
          {key: 'noise_rate', label: '杂色率'},
          {key: 'yellow_rate', label: '黄烟率'},
          {key: 'tobacco_info', label: '评价信息'},
        ],
        deviceInfo: [
          { key: 'location', label: '县/市'},
          { key: 'parent_location', label: '州/市'},
          { key: 'station_id', label: '烟站ID'},
          { key: 'device_id', label: '设备ID'},
        ]
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
      }
    }
  }
</script>

<style>
  .bake-record-detail{
    padding: 1.25rem;
  }
<<<<<<< HEAD
  .bake-record-detail-item-row{
    padding-bottom: 1.25rem;
  }
  #bake-record-detail-chart{
    height: 300px;
  }
=======
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
</style>
