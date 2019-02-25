<template>
  <div>
    <div class="table-toolbar">
      <el-button @click="addArticle()" type="primary" class="el-icon-circle-plus-outline" size="medium">新增文章</el-button>
    </div>
    <el-table :data="pageModel.tableData" style="width: 100%">
      <el-table-column v-if="false" label="id" prop="id" width="180"></el-table-column>
      <el-table-column label="文章标题" prop="title" width="180">
      </el-table-column>
      <el-table-column label="分类名称" prop="type" width="160">
      </el-table-column>
      <el-table-column label="发表时间" width="190">
        <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
</template>
      </el-table-column>

      <el-table-column label="标签" width="300">
<template slot-scope="scope">
  <el-tag>
    {{JSON.parse( scope.row.labelNames )[0]}}</el-tag>
  <el-tag type="success">{{JSON.parse( scope.row.labelNames )[1]}}</el-tag>
</template>
      </el-table-column>
      <el-table-column label="点击数" width="180">
<template slot-scope="scope">
  <span style="margin-left: 10px">{{ scope.row.viewCount }}</span>
</template>
      </el-table-column>
      <el-table-column label="操作">
<template slot-scope="scope">
  <el-button size="mini" type="primary" @click="handleRead(scope.$index, scope.row)">
    查看</el-button>
  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
</template>
      </el-table-column>
    </el-table>

    <div class="block" style="text-align:center;margin-top:10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageModel.currentPage"
        :page-sizes="[5, 10, 20, 50]" :page-size="pageModel.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="pageModel.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from "~/plugins/axios.js"
  import Qs from "qs"
  export default {
    name: 'admin-article',
    data() {
      return {
        currentPage4: 1,
        pageModel: {
          currentPage: 1,
          total: 10,
          pageSize: 5,
          tableData: []
        },
        labels: ["标签1", "标签2"]
      }
    },
    async asyncData({
      $axios
    }) {
      let pageModel = {
        currentPage: 1,
        total: 10,
        pageSize: 5,
        tableData: []
      }
      return $axios({
        method: "post",
        url: "/infoRest/list",
        data: Qs.stringify(pageModel)
      }).then(function(response) {
        return {
          pageModel: response.data
        }
      })
    },
    methods: {
      handleCurrentChange() {},
      handleSizeChange() {},
      addArticle() {
        this.$router.push({
          path: '/write', //跳转路由
          query: { //参数对象
            name: "zhansan"
          }
        })
      },
      handleRead(index, row) {
        //编辑方法
        this.$router.push({
          path: '/read', //跳转路由
          query: row
        })
      },
      handleEdit(index, row) {
        //编辑方法
        this.$router.push({
          path: '/write', //跳转路由
          query: row
        })
      },
      handleDelete(index, row) {
        //删除方法
        let id = Qs.stringify({
          id: row.id
        })
        this.$axios({
          method: "post",
          url: "/infoRest/delete",
          data: id
        }).then(res => {
          this.refreshPage()
          this.$message(res.data.alertMessage)
        })
      },
      refreshPage() {
        //页面刷新方法
        let pageModel = {
          currentPage: this.pageModel.currentPage,
          total: this.pageModel.total,
          pageSize: this.pageModel.pageSize,
          tableData: []
        }
        this.$axios({
          method: "post",
          url: "/infoRest/list",
          data: Qs.stringify(pageModel)
        }).then(res => {
          this.pageModel = res.data
        })
      }
    }
  }
</script>
<style>
  .table-toolbar .el-button {
    margin: 10px;
  }
</style>
