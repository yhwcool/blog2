<template>
    <div>
        <div class="table-toolbar">
              <el-button @click="addArticle()" type="primary" class="el-icon-circle-plus-outline" size="medium">新增文章</el-button>
        </div>     
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
            label="分类名称"
            prop="name"
            width="180">
            </el-table-column>
            <el-table-column
            label="发表时间"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            </el-table-column>

            <el-table-column
            label="标签"
            width="300">
            <template slot-scope="scope">
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            label="点击数"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.num }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

       <div class="block" style="text-align:center;margin-top:10px;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'admin-article',
    data() {
        return {
            currentPage4: 1,
             tableData: [{
                date: '2016-05-02',
                name: 'java的编程思想',
                num: 12,
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                num: 14,
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                num: 16,
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                num: 20,
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleCurrentChange() {

      },
      handleSizeChange() {

      },
      addArticle() {

            this.$router.push({
                path:'/write',//跳转路由
                query:{//参数对象
                    name:"zhansan"
                }
            });

      }
    }
}
</script>
<style>
.table-toolbar .el-button{
    margin: 10px;
}
</style>