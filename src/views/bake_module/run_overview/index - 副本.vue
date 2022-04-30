<template>
  <div class="run-overview">
    <el-row class="run-overview-search-row" :gutter="20">
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

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="station" placeholder="烟站" style="width: 100%;">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="group" placeholder="房群" style="width: 100%;">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="device" placeholder="烤房" style="width: 100%;">

        </el-select>
      </el-col>
    </el-row>

    <el-row class="run-overview-chart-row" :gutter="20" style="padding-bottom: 0.625rem;">
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

    <el-row class="run-overview-chart-row" :gutter="20" style="padding-top: 0.625rem;">
      <el-col :span="4" class="chart-item"></el-col>

      <el-col :span="8" class="chart-item">
        <Running></Running>
      </el-col>
      <el-col :span="8" class="chart-item">
        <Standby></Standby>
      </el-col>

      <el-col :span="4" class="chart-item"></el-col>
    </el-row>

  </div>
</template>

<script>
  import Stage from './components/stage.vue'
  import Utilization from './components/utilization.vue'
  import Alert from './components/alert.vue'
  import Running from './components/running.vue'
  import Standby from './components/standby.vue'

  export default{
    name: 'RunOverview',
    components: {
      Stage,
      Utilization,
      Alert,
      Running,
      Standby,
    },
    data() {
      return {

      }
    }
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

</style>
