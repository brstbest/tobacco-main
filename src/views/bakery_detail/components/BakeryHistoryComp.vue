<template>
  <div class="bakery-history-comp">
    <el-row :gutter="5">
      <el-col :span="12">
        <el-button style="width: 100%;" type="success" :size="size" @click="addRecordClick">新增烘烤记录</el-button>
      </el-col>
      <el-col :span="12">
        <el-button style="width: 100%;" type="danger" :size="size" @click="deleteRecordClick">删除烘烤记录</el-button>
      </el-col>
    </el-row>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      format="yyyy/MM/dd"
      value-format="yyyy-MM-dd"
      style="width: 100%;margin-top: 0.625rem;"
      @change="dateChange"
      :size="size">
    </el-date-picker>
    <div class="bakery-history-comp-text">{{ defaultText }}</div>
    <el-tree
      class="filter-tree"
      :filter-node-method="filterNode"
      ref="tree"
      :data="options"
      :props="props"
      :load="loadNode"
      :highlight-current="true"
      lazy
      @node-click="nodeClick"
      node-key="id"
      :default-expanded-keys="selectedRecord"
      :default-checked-keys="selectedRecord"
      :size="size">
      <span slot-scope="{ node, data }">
        <el-row>
          <i v-if="!data.done" class="el-icon-loading" style="margin-right: 0.625rem; color: #67C23A;"></i>
          <i v-if="data.done" class="el-icon-circle-check" style="margin-right: 0.625rem; color: #909399;"></i>
          <span style="font-size: 14px;">{{ node.label }}</span>
        </el-row>
      </span>
    </el-tree>

    <el-dialog
      title="新增烘烤记录"
      :visible.sync="addRecordVisible"
      v-if="addRecordVisible"
      width="50%"
      :show-close="false">
      <el-form ref="recordForm" :model="recordForm" label-width="80px">
        <el-descriptions title="烤前信息" :column="2" border>
          <template v-for="(item, index) in beforeLabels">
            <el-descriptions-item
              :label="item.label"
              :span="item.span">
              <div>
                <el-select v-if="item.key === 'leaf_area'" v-model="recordForm[item.key]" placeholder="请选择烟叶部位" :size="size" style="width: 100%;">
                  <el-option key="上部" label="上部" value="上部"></el-option>
                  <el-option key="中部" label="中部" value="中部"></el-option>
                  <el-option key="下部" label="下部" value="下部"></el-option>
                </el-select>
                <el-select v-else-if="item.key === 'leaf_maturity'" v-model="recordForm[item.key]" placeholder="请选择烟叶成熟度" :size="size" style="width: 100%;">
                  <el-option key="未熟" label="未熟" value="未熟"></el-option>
                  <el-option key="适熟" label="适熟" value="适熟"></el-option>
                  <el-option key="过熟" label="过熟" value="过熟"></el-option>
                </el-select>
                <el-select v-else-if="item.key === 'leaf_quality'" v-model="recordForm[item.key]" placeholder="请选择烟叶素质" :size="size" style="width: 100%;">
                  <el-option key="正常成熟" label="正常成熟" value="正常成熟"></el-option>
                  <el-option key="非正常成熟" label="非正常成熟" value="非正常成熟"></el-option>
                </el-select>
                <el-select v-else-if="item.key === 'install_way'" v-model="recordForm[item.key]" placeholder="请选择装烟方式" :size="size" style="width: 100%;">
                  <el-option key="杆装" label="杆装" value="杆装"></el-option>
                  <el-option key="夹装" label="夹装" value="夹装"></el-option>
                </el-select>
                <el-date-picker
                  v-else-if="item.key.includes('time')"
                  v-model="recordForm[item.key]"
                  type="datetime"
                  placeholder="选择时间"
                  :size="size"
                  style="width: 100%;">
                </el-date-picker>
                <el-input v-else v-model="recordForm[item.key]" :placeholder="'请输入'+item.label" :size="size"></el-input>
              </div>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRecordVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getBakeRecord, addBakeRecord } from '@/api/bake'
  import { timeFormat } from '/src/utils/index.js'

  let t = '2021-12-30 00:00:00'
  export default{
    name: 'BakeryHistoryComp',
    components: {

    },
    props: ['bakeryMsg'],
    data() {
      return {
        addRecordVisible: false,
        dateRange: null,
        deviceData: null,
        size: 'small',
        options: [],
        props: {
          id: 'id',
          label: 'label',
          children: 'children',
          isLeaf: 'leaf'
        },
        defaultText: '',
        selectedRecord: [],
        beforeLabels: [
          { key: 'leaf_kind', label: '烟叶品种', span: 1 },
          { key: 'leaf_area', label: '烟叶部位', span: 1 },
          { key: 'leaf_maturity', label: '烟叶成熟度', span: 1 },
          { key: 'leaf_quality', label: '烟叶素质', span: 1 },
          { key: 'water_rate', label: '含水率', span: 1 },
          { key: 'single_leaf_before', label: '单叶重', span: 1 },
          { key: 'baking_weight_before', label: '装烟量', span: 1 },
          { key: 'install_way', label: '装烟方式', span: 1 },
          { key: 'start_time', label: '开始时间', span: 1 },
          { key: 'end_time', label: '结束时间', span: 1 },
        ],
        recordForm: {
          device_id: null,
          leaf_kind: null,
          leaf_area: null,
          leaf_maturity: null,
          leaf_quality: null,
          water_rate: null,
          single_leaf_before: null,
          baking_weight_before: null,
          install_way: null,
          start_time: null,
          end_time: null
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {

        this.deviceData = JSON.parse(sessionStorage.getItem("device"))
        this.recordForm.device_id = this.deviceData.device_id

        let cur_date = new Date(t)
        let start_date = new Date(t)
        start_date.setMonth(start_date.getMonth() - 11)
        this.dateRange = [start_date, cur_date]
        console.log(this.dateRange)
        let find_start_time = ''
        let find_end_time = ''
        find_end_time = timeFormat(cur_date, 0, 5)

        find_start_time = timeFormat(start_date, 0, 2) + ' 00:00:00'
        console.log(find_start_time, find_end_time)
        let rdata = {
          device_id: this.deviceData.device_id,
          find_start_time: find_start_time,
          find_end_time: find_end_time
        }
        this.requestBakeryRecord(rdata)
        this.defaultText = '烘烤历史：近三个月'
      },
      dateChange(data) {
        if(data !== null){
          this.defaultText = '烘烤历史： ' + data[0] + ' - ' +data[1]
          let find_start_time = data[0] + ' 00:00:00'
          let find_end_time = data[1] + ' 23:59:59'
          let rdata = {
            device_id: this.deviceData.device_id,
            find_start_time: find_start_time,
            find_end_time: find_end_time
          }
          this.requestBakeryRecord(rdata)
        }
        else{
          this.fetchData()
        }
      },
      nodeClick(data, node, comp){
        this.$emit('watchHistory', data)
      },
      requestBakeryRecord(rdata) {
        getBakeRecord(rdata).then(res => {
          console.log('getBakeRecord', res)
          if(res.code === 200){
            this.options = this.solveResponse(res.data)
            this.$nextTick(function(){
                this.$refs.tree.setCurrentKey(this.options[0].id);
            })
          this.$emit('watchHistory', this.options[0])
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      solveResponse(data) {
        let result = []
        data = data.reverse()
        data.forEach(d => {
          let temp = {
            id: d.id,
            label: '',
            done: null,
            leaf: true,
            data: d
          }
          let d_stime = new Date(d.start_time)
          let d_etime = new Date(d.end_time)
          let cur_time = new Date(t)
          if(cur_time.getTime() >= d_etime.getTime()){
            temp.done = true
          }
          else {
            temp.done = false
          }
          temp.label = timeFormat(d_stime, 0, 5)
          result.push(temp)
          temp = Object.assign({},temp)
          temp.id += 1
          result.push(temp)
        })
        return result
      },
      addRecordClick() {
        this.addRecordVisible = true
      },
      addConfirmClick() {
        let rdata = Object.assign({}, this.recordForm)
        this.requestAddRecord(rdata)
      },
      requestAddRecord(rdata) {
        addBakeRecord(rdata).then(res => {
          console.log('addBakeRecord', res)
          if(res.code === 200){
            this.$message.log({message: '新增烘烤记录成功', type: 'success'})
            this.addRecordVisible = false
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style>
  .bakery-history-comp{
    height: 100%;
  }
  .bakery-history-comp .filter-tree{
    padding-top: 0.625rem;
    height: 85%;
    overflow-y: auto;
  }
  .bakery-history-comp-text{
    font-size: 14px;
    font-weight: bold;
    color: #606266;
    padding-top: 0.625rem;
  }
</style>
