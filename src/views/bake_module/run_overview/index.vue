<template>
  <div class="run-overview">
    <el-row class="run-overview-search-row" :gutter="20">
<<<<<<< HEAD
      <el-col :span="6">
        <DateTimeComp></DateTimeComp>
      </el-col>
      <el-col :span="4">
        <LocationComp></LocationComp>
      </el-col>
      <el-col :span="4">
        <el-select v-model="station" style="width: 100%;" placeholder="烟站">
=======
      <el-col :span="4">
        <el-select v-model="province" placeholder="省" style="width: 100%;">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="city" placeholder="州/市" style="width: 100%;">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="county" placeholder="县/市" style="width: 100%;">
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa

        </el-select>
      </el-col>
      <el-col :span="4">
<<<<<<< HEAD
        <el-select v-model="group" style="width: 100%;" placeholder="烤房群">
=======
        <el-select v-model="station" placeholder="烟站" style="width: 100%;">
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa

        </el-select>
      </el-col>
      <el-col :span="4">
<<<<<<< HEAD
        <el-select v-model="device" style="width: 100%;" placeholder="烤房">

        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width: 100%;">查询</el-button>
=======
        <el-select v-model="group" placeholder="房群" style="width: 100%;">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="device" placeholder="烤房" style="width: 100%;">

        </el-select>
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
      </el-col>
    </el-row>


    <el-row class="run-overview-chart-row" :gutter="20" style="padding-bottom: 0.625rem;" v-if="page === true">
      <el-col :span="8" class="chart-item">
        <Stage></Stage>
      </el-col>
      <el-col :span="8" class="chart-item">
        <Utilization></Utilization>
      </el-col>
      <el-col :span="8" class="chart-item">
        <Alert></Alert>
      </el-col>
    </el-row>

    <el-row class="run-overview-chart-row" :gutter="20" style="padding-top: 0.625rem;" v-if="page === true">
      <el-col :span="4" class="chart-item"></el-col>

      <el-col :span="8" class="chart-item">
        <Running></Running>
      </el-col>
      <el-col :span="8" class="chart-item">
        <Standby></Standby>
      </el-col>

      <el-col :span="4" class="chart-item"></el-col>
    </el-row>


    <el-row class="run-overview-table-row" v-if="page === false">
      <el-table
      :data="tableData">
        <template v-for="(item, index) in columns">
          <el-table-column
          :prop="item.key"
          :label="item.label"
          :key="index">
            <template v-slot="scope">
              <div v-if="item.type === 'text'">{{ scope.row[item.key] }}</div>
              <el-button v-if="item.type === 'button'" type="text" @click="">{{ scope.row[item.key] }}</el-button>
              <el-tag class="run-overview-tag" v-if="item.type === 'state-tag'" :type="scope.row[item.key] === 0 ? 'info' : 'success'" @click="">{{ scope.row[item.key] === 0 ? '待烤' : '运行' }}</el-tag>
              <el-tag class="run-overview-tag" v-if="item.type === 'stage-tag'" @click="">{{ '阶段'+scope.row[item.key] }}</el-tag>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-row>
    <el-row class="run-overview-pagination-row" type="flex" justify="center" v-if="page === false">
      <el-pagination
      background
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
      </el-pagination>
    </el-row>

    <el-button @click="page = !page">切换</el-button>

  </div>
</template>

<script>
  import Stage from './components/stage.vue'
  import Utilization from './components/utilization.vue'
  import Alert from './components/alert.vue'
  import Running from './components/running.vue'
  import Standby from './components/standby.vue'
<<<<<<< HEAD
  
  import LocationComp from '/src/components/LocationComp'
  import DateTimeComp from '/src/components/DateTimeComp'
=======
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa

  export default{
    name: 'RunOverview',
    components: {
      Stage,
      Utilization,
      Alert,
      Running,
      Standby,
<<<<<<< HEAD
      LocationComp,
      DateTimeComp
=======
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
    },
    data() {
      return {
        page: true,
        total: 1,
        pageSize: 10,
        currentPage: 1,
        columns: [
          {key: 'device_id', label: '设备ID', type: 'text'},
          {key: 'device_name', label: '设备名称', type: 'text'},
          {key: 'utilization', label: '使用率', type: 'button'},
          {key: 'alert_count', label: '预警数', type: 'button'},
          {key: 'state', label: '状态', type: 'state-tag'},
          {key: 'stage', label: '所处阶段', type: 'stage-tag'},
          {key: 'company', label: '所属单位', type: 'text'},
        ],
        tableData: [
          {
            device_id: '123123',
            device_name: 'ABCD',
            stage: 0,
            utilization: '80%',
            alert_count: 3,
            state: 0,
            company: 'xxxxxx单位'
          }
        ],
      }
    },
    created() {

    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val
      }
    },
  }
</script>

<style>
  .run-overview{
    height: 94vh;
  }
  .run-overview-search-row{
    height: 8vh;
    padding: 1.25rem;
  }
  .run-overview-chart-row{
    height: 43vh;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
  .chart-item{
    height: 100%;
  }
  .run-overview-tag:hover{
    cursor: pointer;
  }
  .run-overview-table-row{
    padding: 20px;
  }

</style>
