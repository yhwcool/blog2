<template>
  <div id="article-write">
    <el-form class="form-toolbar" :inline="true" :model="articleInfo">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-button type="info" icon="el-icon-caret-left" style="margin-left:20px;" @click="goback">返回创作</el-button>
          </div>

        </el-col>
        <el-col :span="12">
          <div class="grid-content" style="text-align:right;">
            <el-form-item>
              <el-input placeholder="标题" width="400px" v-model="articleInfo.title"></el-input>
            </el-form-item>
            <el-button type="danger" style="margin-right:20px;" @click="productArticle()">发布文章</el-button>
          </div>
        </el-col>
      </el-row>

    </el-form>

    <!-- 编辑器 -->
    <mavon-editor :toolbars="markdownOption" :ishljs="true" v-model="articleInfo.content" class="editor" />

    <!-- 文章发布页面 -->
    <el-dialog class="login-frame" title="文章发布" :close-on-click-modal="false" :close-on-press-escape="false"
      :show-close="true" :center="true" :visible.sync="dialogArticleVisible">
      <el-form ref="articleInfo" :model="articleInfo" label-width="80px">
        <el-form-item label="分类">
          <el-select v-model="articleInfo.type" style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="articleInfo.labelNames" multiple style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in labels" :key="item.value" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="width:90%" type="primary" @click="saveArticle()">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>
<script>
  import axios from "~/plugins/axios.js"
  import Qs from "qs"
  export default {
    data() {
      return {
        articleInfo: {},
        labels: [],
        types: [],
        dialogArticleVisible: false,
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },

    created(){
      console.log("created:",this.$route.query)
      this.articleInfo = this.$route.query
      console.log(this)
    },
    methods: {
      getTypes() {
          //获取分类下拉
        let pageModel = {
          currentPage: 1,
          total: 20,
          pageSize: 20,
          tableData: []
        }
        this.$axios({
          method: "post",
          url: "/typeRest/list",
          data: Qs.stringify(pageModel)
        }).then(res => {
          this.types = res.data.tableData
        })
      },
      getLabels() {
          //获取标签下拉
        let pageModel = {
          currentPage: 1,
          total: 20,
          pageSize: 20,
          tableData: []
        }
        this.$axios({
          method: "post",
          url: "/labelRest/list",
          data: Qs.stringify(pageModel)
        }).then(res => {
          this.labels = res.data.tableData
        })
      },
      goback() {
        this.$router.back(-1); // 返回上一个路由
      },
      productArticle() {
        this.getTypes()
        this.getLabels() 
        this.dialogArticleVisible = true;
      },
      saveArticle() {
        //发布保存文章
        let articleInfo = this.articleInfo;
        articleInfo.labelNames = JSON.stringify(articleInfo.labelNames)
        this.$axios({
          method: "post",
          url: "/infoRest/saveOrUpdate",
          data: Qs.stringify(articleInfo)
        }).then(res => {
          this.$message(res.data.alertMessage)
        })
        this.dialogArticleVisible = false;
      }
    }
  }

</script>
<style>
  #article-write {
    margin: 0.5rem auto;
  }

  .v-note-wrapper {
    min-height: 90vh !important;
  }

</style>
