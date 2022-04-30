<template>
  <div class="home">
    <el-row class="search-row" :gutter="20">
      <el-col :span="4">
        <el-select v-model="province" placeholder="省">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="city" placeholder="州/市">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="county" placeholder="县/市">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="station" placeholder="烟站">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="group" placeholder="房群">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="device" placeholder="烤房">

        </el-select>
      </el-col>
    </el-row>


    <el-row class="chart-row" :gutter="40">
      <el-col :span="2" class="chart-item">
      </el-col>
      <el-col :span="10" class="chart-item">
        <Progress></Progress>
      </el-col>
      <el-col :span="10" class="chart-item">
        <el-row class="chart-item-child" style="padding-bottom: 0.625rem;">
          <AlertCount></AlertCount>
        </el-row>
        <el-row class="chart-item-child" style="padding-top: 0.625rem;">
          <AlertSolveRate></AlertSolveRate>
        </el-row>
      </el-col>
      <el-col :span="2" class="chart-item">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Progress from './components/Progress'
  import AlertCount from './components/AlertCount'
  import AlertSolveRate from './components/AlertSolveRate'

  export default{
    name: 'Home',
    components: {
      Progress,
      AlertCount,
      AlertSolveRate,
    },
    data() {
      return {
        province: '',
        city: '',
        county: '',
        station: '',
        group: '',
        device: '',
      }
    }
  }
</script>

<style>
  .home{
    height: 94vh;
  }
  .search-row{
    padding: 1.25rem;
    padding-bottom: 0rem;
    height: 8vh;
  }
  .chart-row{
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    height: 86vh;
  }
  .chart-item{
    height: 100%;
  }
  .chart-item-child{
    height: 50%;
  }

</style>
