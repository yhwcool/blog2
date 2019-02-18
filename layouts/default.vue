<template>
  <div>


    <el-container>
      <el-container>
        <el-main><nuxt/></el-main>
      </el-container>
      <el-aside width="auto" class="my-aside-info">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">
                <div class="my-aside-info-img">
                   <img src="../assets/image/myicon.jpg"/>
                </div>
                <div class="my-aside-info-name"><h3>YHW</h3></div>
                <div class="my-aside-info-sign">
                  <span>日志</span>
                  <span>|</span>
                  <span>分类</span>
                  <span>|</span>
                  <span>标签</span>
                </div>
                <div  class="my-aside-info-links">
                  <h3>Links</h3>
                  <nuxt-link to="/admin">后台管理</nuxt-link>
                  <nuxt-link to="">www.gitHubyhw@qq.com</nuxt-link>
                  <nuxt-link to="">www.gitHubzx@qq.com</nuxt-link>
                </div>
            </div>
          </div>
        </el-collapse-transition>      
      </el-aside>
    </el-container>


    <div class="blog-fixed">
      <p>
      <span class="el-icon-caret-top blog-el-icon" @click="scrolltopClick()">
        </span>
      </p>
     <p>
        <span class="el-icon-remove-outline blog-el-icon" v-show="show3" @click="asideShowOrHide(1)"></span>
        <span class="el-icon-circle-plus-outline blog-el-icon" v-show="show4" @click="asideShowOrHide(2)"></span>
     </p>
      
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
         show3: false,
         show4: true
    }
  },
  methods: {

    scrolltopClick() {
        document.documentElement.scrollTop = 0;
    },
    asideShowOrHide(args) {

      if(args == 1){
        this.show3 = false;
         this.show4= true;
      }else{
         this.show3= true;
         this.show4= false;
      }
    }
  },
}
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.el-container,.el-main{
  margin: 0px;
  padding: 0px;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
.my-aside-info{
    background-color: #333;
}
.my-aside-info-img{
  padding:30px;
}
.my-aside-info-img img{
  width: 80px;
}
.my-aside-info-name,.my-aside-info-sign,.my-aside-info-links{
  line-height: 35px;
  color: #FFF;
 
}
.my-aside-info-links a{
  line-height: 25px;
  color: #FFF;
  text-decoration: none;
 
}

 .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100%;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }
.index-header{
  min-height: 20vh;
  background: #eee;
  text-align: center;
  line-height: 20vh;
}
.blog-nav-item,.blog-nav-item-one{
  text-decoration: none;
  font-size:14px;
  font-weight: 700;
  color: #666;
  padding: 10px;
}
.blog-nav-item-one{
    font-size:26px;
    color: #DA9011;
}
.blog-nav-item:hover{
  background: #ccc;
  border-radius: 3px;
  cursor: pointer;
}
.blog-fixed{
  position: fixed;
  bottom: 50px;
  right:50px;
}
.blog-el-icon{
  font-size: 2rem;
  color: #2b9ccf;
}
</style>

