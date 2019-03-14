<template>
    <div class="container">
      <Header></Header>
      <timeline class="timeline">
        <timeline-item bg-color="#90d8e0">一共{{pageModel.total}}篇</timeline-item>
        
        <div
        v-for="(page, index) in pages"
        :key="index"
        >
          <timeline-title>{{index}}</timeline-title>
          <timeline-item :hollow="true"
            v-for="(article, index) in page"
            :key="index"
          >
            <h4>{{article.title}}</h4>
            <span>{{article.createDate}}</span>
          </timeline-item>
        </div>
      </timeline>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import axios from "~/plugins/axios.js"
import Qs from "qs"
export default {
  components: {
    Header,
    Timeline,
    TimelineItem,
    TimelineTitle
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
          let date = table.createDate.substring(0,19);    
          date = date.replace(/-/g,'/'); 
          let timestamp = new Date(date).getTime();
          let d = new Date(timestamp)
          let year = d.getFullYear() //获取年份
          if(pages[year]){//根据年份分组
            pages[year].push(table)
          }else {
            pages[year] = [table]
          }
        })
        console.log("pages",pages)
        return {
          pageModel: response.data,
          pages:pages 
        }
      })
    },
}
</script>
<style>
  .timeline{
    width: 780px;
    margin: 40px auto;
    text-align: left;
  }
</style>