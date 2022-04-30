<template>
  <div class="bake-history-overview">
    <el-row class="bake-history-overview-search-row" :gutter="20">
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

    <el-row class="bake-history-overview-table-row">
      <el-table
      :data="tableData"
      show-summary
      :summary-method="getAverage">
        <template v-for="(item, index) in columns">
          <el-table-column
          :prop="item.key"
          :label="item.label"
          :key="index"
          align="center">
            <template v-slot="scope" v-if="item.key !== 'record_id'">
              <div>{{ scope.row[item.key] + '%' }}</div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-row>

  </div>
</template>

<script>

  export default{
    name: 'BakeHistoryOverview',
    components: {
    },
    data() {
      return {
        columns: [
          {key: 'record_id', label: '记录ID', type: 'text'},
          {key: 'score', label: '评分', type: 'text'},
          {key: 'loss_rate', label: '损失率', type: 'button'},
          {key: 'cyanosis_rate', label: '含青率', type: 'button'},
          {key: 'noise_rate', label: '杂色率', type: 'state-tag'},
          {key: 'yellow_rate', label: '	黄烟率', type: 'stage-tag'},
        ],
        tableData: [
          {
            record_id: '123123',
            score: Math.floor(Math.random() * 101),
            loss_rate: Math.floor(Math.random() * 101),
            cyanosis_rate: Math.floor(Math.random() * 101),
            noise_rate: Math.floor(Math.random() * 101),
            yellow_rate: Math.floor(Math.random() * 101),
          },
          {
            record_id: '123124',
            score: Math.floor(Math.random() * 101),
            loss_rate: Math.floor(Math.random() * 101),
            cyanosis_rate: Math.floor(Math.random() * 101),
            noise_rate: Math.floor(Math.random() * 101),
            yellow_rate: Math.floor(Math.random() * 101),
          },
          {
            record_id: '123125',
            score: Math.floor(Math.random() * 101),
            loss_rate: Math.floor(Math.random() * 101),
            cyanosis_rate: Math.floor(Math.random() * 101),
            noise_rate: Math.floor(Math.random() * 101),
            yellow_rate: Math.floor(Math.random() * 101),
          },
          {
            record_id: '123126',
            score: Math.floor(Math.random() * 101),
            loss_rate: Math.floor(Math.random() * 101),
            cyanosis_rate: Math.floor(Math.random() * 101),
            noise_rate: Math.floor(Math.random() * 101),
            yellow_rate: Math.floor(Math.random() * 101),
          },
        ],
      }
    },
    created() {

    },
    methods: {
      getAverage(param) {
        console.log('param', param)
        const { columns, data } = param
        const avgs = []
        const total = data.length
        columns.forEach((column, index) => {
          if (index === 0) {
            avgs[index] = '平均';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            avgs[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            avgs[index] = avgs[index] / total
            avgs[index] += '%';
          } else {
            avgs[index] = 'N/A';
          }
        });
        console.log('avgs', avgs)

        return avgs;
      }
    },
  }
</script>

<style>
  .bake-history-overview-search-row{
    padding: 1.25rem;
  }
  .bake-history-overview-table-row{
    padding: 1.25rem;
  }

</style>
