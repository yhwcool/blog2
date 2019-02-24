<template>
  <div>
    <Header></Header>
    <div class="read-header">
      <div class="read-title">
        <h1> Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态</h1>
      </div>
      <div>
        <span>发表于 {{articleInfo.updateDate}}</span> | <span>分类于 {{articleInfo.type}}</span> | <span> 阅读次数
          {{articleInfo.viewCount}}</span>
      </div>
    </div>
    <div class="read-content">
      <blockquote>
        <p>原文：<a href="https://data-artisans.com/blog/4-steps-flink-application-production-ready" target="_blank" rel="external">https://data-artisans.com/blog/4-steps-flink-application-production-ready</a><br>作者：Nico
          Kruber, Markos Sfikas<br>译者：云邪（Jark）</p>
      </blockquote>
      <mavon-editor
        class = "md"
        :value = "articleInfo.content"
        :subfield = "subfield"
        :defaultOpen = "defaultOpen"
        :toolbarsFlag = "toolbarsFlag"
        :editable = "editable"
        :scrollStyle = "scrollStyle"
        ></mavon-editor>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  export default {
    components: {
      Header
    },
    created() {
      console.log("created:", this.$route.query)
      this.articleInfo = this.$route.query
      console.log(this)
    },
    data() {
      return {
        articleInfo: {},
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
    },
    methods: {

    }
  }

</script>

<style>
  .read-header,
  .read-content {
    width: 780px;
    margin: 40px auto;
  }

  .read-header {
    text-align: center;
  }

  .read-content {
    line-height: 25px;
  }

</style>
