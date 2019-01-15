<template>
  <div id="article-write">
        <el-form class="form-toolbar" ref="form" :inline="true" :model="form">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-button type="info"  icon="el-icon-caret-left" style="margin-left:20px;" @click="goback">返回创作</el-button>
                    </div>
                
                </el-col>
                <el-col :span="12">
                    <div class="grid-content" style="text-align:right;">
                        <el-form-item>
                            <el-input placeholder="标题" width="400px" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-button type="danger" style="margin-right:20px;" @click="productArticle()">发布文章</el-button>
                    </div>
                </el-col>
            </el-row>
           
        </el-form>

         <mavon-editor :toolbars="markdownOption" :ishljs = "true" v-model="handbook" class="editor"/>

        <!-- 文章发布页面 -->
        <el-dialog class="login-frame"   title="文章发布" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :visible.sync="dialogArticleVisible">
            <el-form ref="articleform" :model="articleform" label-width="80px">
                <el-form-item label="文章名">
                    <el-input v-model="articleform.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select
                        v-model="value11"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;"
                        placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
              
            </el-form>
               <div slot="footer" class="dialog-footer">			
                    <el-button style="width:90%" type="primary" @click="saveArticle()">确     定</el-button>
                </div>
           
        </el-dialog>


  </div>
</template>
<script>
export default {
  data() {
        return {
                form:{},
                article: {},
                articleform: {},
                options: [{
                    value: 'java',
                    label: 'java'
                 }, {
                    value: 'html',
                    label: 'html'
                 }, {
                    value: 'php',
                    label: 'php'
                 }, {
                    value: 'react',
                    label: 'react'
                 }, {
                    value: '生活',
                    label: '生活'
                }],
                value11: [],
                dialogArticleVisible: false,
                markdownOption:{
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
            },
            handbook:"#### 这是手册",
        }
    },
    methods:{
        goback() {
            this.$router.back(-1); // 返回上一个路由
        },
        productArticle() {
            this.dialogArticleVisible = true;

        },
        saveArticle () {

            this.$message({
                 message: '恭喜你，这是一条成功消息',
                 type: 'success'
            })
            this.dialogArticleVisible = false;
        }
    }
}
</script>
<style>
#article-write{
    margin: 0.5rem auto;
}
.v-note-wrapper{
     min-height: 90vh!important;
}

</style>
