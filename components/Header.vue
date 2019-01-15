<template>
    <div class="index-header">
        <div class="header-inner">
            <nuxt-link to="/" class="blog-nav-item-one">YHW博客</nuxt-link>
            <nuxt-link to="/" class="blog-nav-item">首页</nuxt-link>
            <nuxt-link to="/storage" class="blog-nav-item">归档</nuxt-link>
            <nuxt-link to="/classify" class="blog-nav-item">分类</nuxt-link>
            <nuxt-link to="/sign" class="blog-nav-item">标签</nuxt-link>
            <nuxt-link to="/about" class="blog-nav-item">关于</nuxt-link>
            <span>
                <el-form class="form-search" :inline="true" ref="form" :model="form">
                        <el-input v-model="form.name" placeholder="请输入名称"
                            suffix-icon="el-icon-search"></el-input>
                </el-form>
            </span>
          
        </div>
    </div>
</template>

<script>

export default {
  data() {
      return  {
          form: {},
          search: ''
      }
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

 .form-search{
     display: inline-block;
     width: 200px;
 }

</style>

