<template>
  <div class="bake-record-detail">
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
  </div>
</template>

<script>
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
      }
    }
  }
</script>

<style>
  .bake-record-detail{
    padding: 1.25rem;
  }
</style>
