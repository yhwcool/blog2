<template>
    <div class="container">
    <Header></Header>
      <div class="classify">
        <el-badge 
        v-for="(page, index) in pages"
        :key="index"
        :value="page.length" :max="10" class="item">
          <el-button size="big">{{index}}</el-button>
        </el-badge>
      </div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import axios from "~/plugins/axios.js"
import Qs from "qs"
export default {
  components: {
    Header
  },
  data() {
    return {
      pageModel : '',
      pages:[]
    }
  },
  async asyncData({
      $axios
    }) {
      let pageModel = {
        currentPage: 1,
        total: 10,
        pageSize: 20,
        tableData: []
      }
      return $axios({
        method: "post",
        url: "/infoRest/list",
        data: Qs.stringify(pageModel)
      }).then(function(response) {
        let tableData = response.data.tableData
        let pages = {}
        tableData.forEach(table => {
          let lables = JSON.parse(table.labelNames)
          lables.forEach(lable => {
            if(pages[lable]){
            pages[lable].push(table)
          }else {
            pages[lable] = [table]
          }
          })
        })
        return {
          pageModel: response.data,
          pages:pages 
        }
      })
    },
}
</script>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>