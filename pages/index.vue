<template>
  <section class="container">
    <div>
    <Header></Header>
       <article class="article">
          <div class="post-header">
            <h1 class="post-header-title">
                 <nuxt-link to="/">
                     Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态
                 </nuxt-link>
            </h1>
            <p class="post-link">
                <span class="link-label">
                  发表于 
                </span>
                |
                <time>
                  2018-12-03
                </time>
                |
                <span class="link-label">
                  分类于: Flink
                </span>
                |
                <span class="link-label">
                  阅读次数: 590
                </span>
            </p>
          </div>
          
          <div class="post-article">
              本文阐述了使 Flink 应用达到生产就绪状态所需要的一些配置步骤。在以下部分中，我们概述了重要的配置参数，这些参数是技术领导、DevOps、工程师们在将 Flink 应用程序上线生产之前都需要仔细考虑的。Apache Flink 为大多数配置都提供了开箱即用的默认选项，在许多情况下，它们是POC阶段（概念验证）或探索 Flink 不同 API 和抽象的很好的起点。
              <br>
              <b>
                 <nuxt-link to="/read">阅读全文</nuxt-link>
              </b>
          </div>
       </article>


       <article class="article">
          <div class="post-header">
            <h1 class="post-header-title">
                 <nuxt-link to="/">
                     Flink 小贴士 (7): 4个步骤，让 Flink 应用达到生产状态
                 </nuxt-link>
            </h1>
            <p class="post-link">
                <span class="link-label">
                  发表于 
                </span>
                |
                <time>
                  2018-12-03
                </time>
                |
                <span class="link-label">
                  分类于: Flink
                </span>
                |
                <span class="link-label">
                  阅读次数: 590
                </span>
            </p>
          </div>
          
          <div class="post-article">
              本文阐述了使 Flink 应用达到生产就绪状态所需要的一些配置步骤。在以下部分中，我们概述了重要的配置参数，这些参数是技术领导、DevOps、工程师们在将 Flink 应用程序上线生产之前都需要仔细考虑的。Apache Flink 为大多数配置都提供了开箱即用的默认选项，在许多情况下，它们是POC阶段（概念验证）或探索 Flink 不同 API 和抽象的很好的起点。
              <br>
              <b>
                 <nuxt-link to="">阅读全文</nuxt-link>
              </b>
          </div>
       </article>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
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
article{
    width: 780px;
    margin: 40px auto;
    text-align: left;
}
.post-header{
  text-align: left;
}
.post-header-title,.post-header-title a{
  font-size: 28px;
  text-decoration: none;
  color: #666;
}
.post-link{
  line-height: 35px;
}
.link-label{
  font-size:12px;
  color: #333;
}

.post-article{
  line-height: 45px;
}

</style>

