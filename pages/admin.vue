<template>
    <div id="admin">

      <el-container :style="{'height':winHeight+'px'}">
            <el-header>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                        <b>YHW博客</b>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content" style="text-align:right;">
                            <small>{{nowTime}}</small>
                            <el-button type="info" class="el-icon-caret-left" @click="goBackToIndex">返回首页</el-button>
                        </div>
                        
                    </el-col>
                </el-row>
                
            </el-header>
            <el-container>
                <el-aside width="200px" :style="{'height':winHeight+'px'}">
                    <el-menu :style="{'height':winHeight+'px'}">
                        <el-menu-item index="1-1">
                            <nuxt-link to="/admin/article" class="blog-nav-item"><span class="el-icon-menu"></span>文章管理</nuxt-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                             <nuxt-link to="/admin/classify" class="blog-nav-item"><span class="el-icon-setting"></span>分类管理</nuxt-link>
                        </el-menu-item>
                        <el-menu-item index="1-3">
                            <nuxt-link to="/admin/sign" class="blog-nav-item"><span class="el-icon-star-off"></span>标签管理</nuxt-link>
                        </el-menu-item>
                        <el-menu-item index="1-4">
                             <nuxt-link to="/admin/links" class="blog-nav-item"><span class="el-icon-share"></span>友情链接</nuxt-link>
                        </el-menu-item>
                 
                        <el-menu-item index="1-5">
                             <nuxt-link to="/admin/account" class="blog-nav-item"><span class="el-icon-setting"></span>账号管理</nuxt-link>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main><nuxt/></el-main>
            </el-container>
        </el-container>
        <!-- 登录页面 -->
        <el-dialog class="login-frame"  title="登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item>
                    <el-input v-model="userInfo.username" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="userInfo.password" placeholder="密码"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">			
                <el-button style="width:100%" type="primary" @click="doLogin()">确     定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'admin',
    layout: 'admin',
    data() {
        return{
            dialogFormVisible:false,
		    userInfo:{},
            winHeight: '',
            nowTime: ''
        }
    },
    beforeMount() {
        this.winHeight =  document.documentElement.clientHeight;
        this.getNowTime();
      
    },
    methods: {
        getNowTime() {
            setInterval(()=>{

                var date=new Date();   
                var year=date.getFullYear(); //获取当前年份   
                var mon=date.getMonth()+1; //获取当前月份   
                var da=date.getDate(); //获取当前日   
                var day=date.getDay(); //获取当前星期几   
                var h=date.getHours(); //获取小时   
                var m=date.getMinutes(); //获取分钟   
                var s=date.getSeconds(); //获取秒   
                 
                this.nowTime = '当前时间:'+year+'年'+mon+'月'+da+'日'+'星期'+day+' '+h+':'+m+':'+s; 
                
            },1000) 
        },
        doLogin() {
            this.dialogFormVisible= false;
        },
        /**
        *返回首頁
        */
        goBackToIndex(){
           
            this.$router.push({
                path:'/',//跳转路由
                query:{//参数对象
                    name:""
                }
            });
        }
    },
    mounted() {
          //this.dialogFormVisible= true;
        window.onresize = ()=>{
            this.winHeight =  document.documentElement.clientHeight;
        } 
    },
   

}


</script>

<style scope="scope">
.container {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.el-header{
    line-height: 60px;
    background:#333;
    color:#FFF;
    
}
.el-menu{
    background: #ededed;
}
.login-frame{
}
.blog-nav-item{
    text-decoration: none;
}
a:active{
color:#FFCC00;
}
</style>