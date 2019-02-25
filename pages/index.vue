<template>
  <section class="container">
    <div>
      <Header></Header>
      <article class="article" v-bind:key="index" v-for="(arricleInfo, key, index) in pageModel.tableData" >
        <div class="post-header">
          <h1 class="post-header-title">
            <nuxt-link to="/">
              {{arricleInfo.title}}
            </nuxt-link>
          </h1>
          <p class="post-link">
            <span class="link-label">
                    发表于 
                  </span> |
            <time>
                    {{arricleInfo.createDate}}
                  </time> |
            <span class="link-label">
                    分类于: {{arricleInfo.type}}
                  </span> |
            <span class="link-label">
                    阅读次数: {{arricleInfo.viewCount}}
                  </span>
          </p>
        </div>
        <div class="post-article">
          {{arricleInfo.viewDesc}}
          <br>
          <b>
                   <nuxt-link :to="{name: 'read',query:arricleInfo}">阅读全文</nuxt-link>
                </b>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  import Header from '@/components/Header.vue'
  import axios from "~/plugins/axios.js"
  import Qs from "qs"
  export default {
    data() {
      return {
        currentPage4: 1,
        pageModel: {
          currentPage: 1,
          total: 10,
          pageSize: 5,
          tableData: []
        },
        labels: ["标签1", "标签2"]
      }
    },
    async asyncData({
      $axios
    }) {
      let pageModel = {
        currentPage: 1,
        total: 10,
        pageSize: 5,
        tableData: []
      }
      return $axios({
        method: "post",
        url: "/infoRest/list",
        data: Qs.stringify(pageModel)
      }).then(function(response) {
        return {
          pageModel: response.data
        }
      })
    },
    components: {
      Header
    },
    methods: {
      
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  article {
    width: 780px;
    margin: 40px auto;
    text-align: left;
  }
  .post-header {
    text-align: left;
  }
  .post-header-title,
  .post-header-title a {
    font-size: 28px;
    text-decoration: none;
    color: #666;
  }
  .post-link {
    line-height: 35px;
  }
  .link-label {
    font-size: 12px;
    color: #333;
  }
  .post-article {
    line-height: 45px;
  }
</style>

