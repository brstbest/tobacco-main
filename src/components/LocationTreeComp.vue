<template>
  <div class="location-tree-comp">
    <el-input
      placeholder="输入单位所在地搜索"
      v-model="filterText"
      size="small"
      style="padding-bottom: 0.625rem;">
    </el-input>
    <el-tree
      class="filter-tree"
      :filter-node-method="filterNode"
      ref="locationTree"
      :highlight-current="true"
      :data="options"
      :props="props"
      :load="loadNode"
      lazy
      @node-click="nodeClick"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      @node-expand="handleNodeExpand"
      @node-collapse="handleNodeCollapse">
    </el-tree>
  </div>
</template>

<script>
  import optionJSON from '/public/static/map/postcodeOption.json'
  import { searchStation } from '@/api/station'
  import { searchGroup } from '@/api/group'
  import { searchDevice } from '@/api/device'

  export default {
    data() {
      return {
        optionJSON,
        filterText: '',
        options: [],
        defaultExpandedKeys: [],
        defaultSelectNode: null,
        clickTreeLog: [],
        props: {
          id: 'id',
          label: 'label',
          children: 'children',
          isLeaf: 'leaf'
        },
      };
    },
    created() {
      this.fetchData()
    },
    mounted() {
      this.options = this.optionJSON
      // window.addEventListener("beforeunload", e => this.saveSession())
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      clickTreeLog(val) {
        // console.log(JSON.stringify(val))
        this.saveSession()
      }
    },
    methods: {
      fetchData() {
        // this.user = JSON.parse(localStorage.getItem('user'))
        // // this.options = this.optionJSON

        // let rdata = {}

        // switch(this.user.category){
        //   case '1':
        //     rdata.parent_location = this.user.permission_range
        //     break
        //   case '2':
        //     rdata.location = this.user.permission_range
        //     break
        //   case '3':
        //     rdata.station_id = this.user.permission_range
        // }
        // this.requestStation(rdata)
        console.log(sessionStorage.getItem("defaultExpanded"))
        console.log(sessionStorage.getItem("defaultSelected"))
        if(sessionStorage.getItem("defaultExpanded") !== null && sessionStorage.getItem("defaultSelected") !== null){
          this.clickTreeLog = JSON.parse(sessionStorage.getItem("defaultExpanded"))
          this.clickTreeLog.forEach(node => {
            this.defaultExpandedKeys.push(node.key)
          })
          this.defaultSelectNode = JSON.parse(sessionStorage.getItem("defaultSelected"))
          this.$nextTick(function(){
              this.$refs.locationTree.setCurrentKey(this.defaultSelectNode.id);
          })
          this.$emit('watchLocation', {id: this.defaultSelectNode.id, level: this.defaultSelectNode.level})
        }
      },
      saveSession(){
        sessionStorage.setItem("defaultExpanded", JSON.stringify(this.clickTreeLog))
        sessionStorage.setItem("defaultSelected", JSON.stringify(this.defaultSelectNode))
      },
      nodeClick(data, node, comp){
        this.$emit('watchLocation', {id: data.id, level: node.level})
        console.log(data, node, comp)
      },
      handleNodeExpand(data, node, comp){
        this.defaultSelectNode = {id: node.key, level: node.level}
        let pushFlag = true
        this.clickTreeLog.forEach(item => {
          if(item.key === node.key) {
            pushFlag = false
            return true
          }
        })
        if(pushFlag) {
          this.clickTreeLog.push({parent_key: node.parent.key, key: node.key})
        }
      },
      handleNodeCollapse(data, node, comp){
        let temp = []
        this.defaultSelectNode = {id: node.key, level: node.level}
        for(let i=0; i<this.clickTreeLog.length; i++){
          if(this.clickTreeLog[i].key === node.key){
            this.clickTreeLog.splice(i, 1)
            i -= 1
          }
          else if(this.clickTreeLog[i].parent_key === node.key){
            temp.push(this.clickTreeLog[i].key)
            this.clickTreeLog.splice(i, 1)
            i -= 1
          }
          else if(temp.indexOf(this.clickTreeLog[i].parent_key) != -1){
            temp.push(this.clickTreeLog[i].key)
            this.clickTreeLog.splice(i, 1)
            i -=1
          }
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      async loadNode(node, resolve) {
        console.log('loadNode', node)
        // 点击省懒加载
        if(node.level === 1){
          return resolve(node.data.children)
        }
        // 点击州懒加载
        if(node.level === 2){
          return resolve(node.data.children)
        }
        // 点击县懒加载
        if(node.level === 3){
          let data = await this.requestStation(node)
          console.log('node', data)
          return resolve(data)
        }
        // 点击烟站懒加载
        if(node.level === 4){
          let data = await this.requestGroup(node)
          console.log('node', data)
          return resolve(data)
        }
        // 点击烤房群懒加载
        if(node.level === 5){
          let data = await this.requestBakery(node)
          console.log('node', data)
          return resolve(data)
        }
        // 点击烤房懒加载
        if(node.level === 6){
          sessionStorage.setItem("device", node.data.data)
          this.$router.push({name:'BakeryDetail'})
          return resolve([])
        }
      },
      async requestStation(node) {
        let rdata = {
          location: node.data.id
        }
        let res = await searchStation(rdata)
        let result = []
        if(res.code === 200) {
          res.data.forEach(data => {
            result.push({id: data.station_id, label: data.station_name})
          })
        }
        else {
          console.log(res)
        }
        return result
      },
      async requestGroup(node) {
        let rdata = {
          station_id: node.data.id
        }
        let res = await searchGroup(rdata)
        let result = []
        if(res.code === 200) {
          res.data.forEach(data => {
            result.push({id: data.group_id, label: data.group_name, data: data})
          })
        }
        else {
          console.log(res)
        }
        return result
      },
      async requestBakery(node) {
        let rdata = {
          group_id: node.data.id
        }
        let res = await searchDevice(rdata)
        let result = []
        if(res.code === 200) {
          res.data.forEach(data => {
            result.push({id: data.device_id, label: data.device_name})
          })
        }
        else {
          console.log(res)
        }
        return result
      }
    }
  };
</script>

<style>
  .location-tree-comp{
    padding: 0.625rem;
  }
  .filter-tree{
    height: 54.375rem;
    overflow-y: auto;
  }
</style>
