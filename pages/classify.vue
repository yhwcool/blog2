<template>
  <div class="container">
    <Header></Header>
    <div class="classify">
    <el-card class="box-card"
      v-for="(page, index) in pages"
      :key="index"
    >
      <div slot="header" class="clearfix">
        <h4 style="color: #409EFF">{{index}}</h4>
      </div>
      <div 
      v-for="(article, index) in page"
      :key="index"
      class="text item">
        {{article.title}}
      </div>
    </el-card>
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
          let type = table.type;    
          if(pages[type]){//根据年份分组
            pages[type].push(table)
          }else {
            pages[type] = [table]
          }
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
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 380px;
    margin: 5px;
    float: left;
  }

  .classify{
    width: 780px;
    margin: 40px auto;
    text-align: left;
  }
</style>