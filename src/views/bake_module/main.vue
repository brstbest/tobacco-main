<template>
  <div class="home">
    <el-row class="search-row" :gutter="20">
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
        <el-select v-model="province" placeholder="省">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="city" placeholder="州/市">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="county" placeholder="县/市">
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa

        </el-select>
      </el-col>
      <el-col :span="4">
<<<<<<< HEAD
        <el-select v-model="group" style="width: 100%;" placeholder="烤房群">
=======
        <el-select v-model="station" placeholder="烟站">
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
        <el-select v-model="group" placeholder="房群">

        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="device" placeholder="烤房">

        </el-select>
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
      </el-col>
    </el-row>


<<<<<<< HEAD
    <el-row class="chart-row" :gutter="20">
      <el-col :span="8" class="chart-item">
        <Progress></Progress>
      </el-col>
      <el-col :span="16" class="chart-item">
=======
    <el-row class="chart-row" :gutter="40">
      <el-col :span="2" class="chart-item">
      </el-col>
      <el-col :span="10" class="chart-item">
        <Progress></Progress>
      </el-col>
      <el-col :span="10" class="chart-item">
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
        <el-row class="chart-item-child" style="padding-bottom: 0.625rem;">
          <AlertCount></AlertCount>
        </el-row>
        <el-row class="chart-item-child" style="padding-top: 0.625rem;">
          <AlertSolveRate></AlertSolveRate>
        </el-row>
      </el-col>
<<<<<<< HEAD
=======
      <el-col :span="2" class="chart-item">
      </el-col>
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
    </el-row>
  </div>
</template>

<script>
  import Progress from './components/Progress'
  import AlertCount from './components/AlertCount'
  import AlertSolveRate from './components/AlertSolveRate'

<<<<<<< HEAD
  import LocationComp from '/src/components/LocationComp'
  import DateTimeComp from '/src/components/DateTimeComp'

=======
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
  export default{
    name: 'Home',
    components: {
      Progress,
      AlertCount,
      AlertSolveRate,
<<<<<<< HEAD
      LocationComp,
      DateTimeComp
=======
>>>>>>> 6b9d7b2368fd3498770b1f9c29316fff628a27fa
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
