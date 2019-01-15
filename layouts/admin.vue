<template>
    <div>
      <nuxt/>
    </div>
</template>

<script>
export default {
   // name: 'admin',
    data() {
        return{
            dialogFormVisible:false,
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
        }
    },
    mounted() {
          this.dialogFormVisible= true;
        window.onresize = ()=>{
            this.winHeight =  document.documentElement.clientHeight;
        } 
    },
   

}


</script>

<style scope="scope">
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
</style>