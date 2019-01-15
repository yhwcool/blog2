<template>
  <div class="">
     <div class= "table-toolbar">
        <el-button @click="addSignHanldle()" type="primary" class="el-icon-circle-plus-outline" size="medium">新增标签</el-button>
     </div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        label="标签"
        prop="name"
        width="180">
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
    data() {
      return {
          currentPage4: 1,
        tableData: [{
          name: 'JAVA',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          name: 'VUE',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: 'REACT',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: 'JAVASCRIPT',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      addSignHanldle() {

      },

      handleCurrentChange() {

      },
      handleSizeChange() {

      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style>
.table-toolbar .el-button{
    margin: 10px;
}
</style>