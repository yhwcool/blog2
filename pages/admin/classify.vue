<template>
  <div class>
    <div class="table-toolbar">
      <el-button
        @click="addSignHanldle()"
        type="primary"
        class="el-icon-circle-plus-outline"
        size="medium"
      >新增分类</el-button>
    </div>
    <!-- 表格组件 -->
    <el-table :data="pageModel.tableData" style="width: 100%">
      <el-table-column v-if="false" label="id" prop="id" width="180"></el-table-column>
      <el-table-column label="分类" prop="name" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="block" style="text-align:center;margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageModel.currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageModel.total"
      ></el-pagination>
    </div>
    <!-- 新增分类弹窗 -->
    <el-dialog
      class="login-frame"
      title="新增分类"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :visible.sync="saveTypeVisible"
    >
      <el-form ref="saveType" :model="saveType" label-width="80px">
        <el-form-item label="分类名">
          <el-input v-model="saveType.name" placeholder="请输入分类名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="width:90%" type="primary" @click="saveArticle()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑分类弹窗 -->
    <el-dialog
      class="login-frame"
      title="编辑分类"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :visible.sync="updateTypeVisible"
    >
      <el-form ref="updateType" :model="updateType" label-width="80px">
        <el-form-item label="分类名">
          <el-input v-model="updateType.name" placeholder="请输入分类名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="width:90%" type="primary" @click="updateArticle()">确 定</el-button>
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
      pageModel: {
        currentPage: 1,
        total : 10,
        pageSize : 5,
        tableData: []
      },
      saveTypeVisible: false,
      updateTypeVisible: false,
      saveType: {
        id: "",
        name: ""
      },
      updateType: {
        id: "",
        name: ""
      }
    }
  },
  async asyncData({ $axios }) {
    let pageModel = {
      currentPage: 1,
      total : 10,
      pageSize : 5,
      tableData: []
    }
    return $axios({
      method: "post",
      url: "/typeRest/list",
      data : Qs.stringify(pageModel)
    }).then(function(response) {
      return { pageModel: response.data }
    })
  },

  methods: {
    addSignHanldle() {
      //新增方法
      this.saveTypeVisible = true
    },

    handleCurrentChange(val) {
      this.pageModel.currentPage = val
      this.refreshPage()
    },
    handleSizeChange(val) {
      this.pageModel.currentPage = 1
      this.pageModel.pageSize = val
      this.refreshPage()
    },
    saveArticle() {
      //新增后台交互
      let saveType = Qs.stringify(this.saveType)
      console.log("saveType", saveType)
      this.$axios({
        method: "post",
        url: "/typeRest/saveOrUpdate",
        data: saveType
      }).then(res => {
        this.refreshPage()
        this.$message(res.data.alertMessage)
      })

      this.saveTypeVisible = false
    },
    updateArticle() {
      //编辑后台交互
      let updateType = Qs.stringify(this.updateType)
      this.$axios({
        method: "post",
        url: "/typeRest/saveOrUpdate",
        data: updateType
      }).then(res => {
        this.refreshPage()
        this.$message(res.data.alertMessage)
      })
      this.updateTypeVisible = false
    },
    handleEdit(index, row) {
      //编辑方法
      this.updateType.id = row.id
      this.updateType.name = row.name
      this.updateTypeVisible = true
    },
    handleDelete(index, row) {
      //删除方法
      let id = Qs.stringify({
        id: row.id
      })
      this.$axios({
        method: "post",
        url: "/typeRest/delete",
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
          total : this.pageModel.total,
          pageSize : this.pageModel.pageSize,
          tableData: []
        }
      this.$axios({
        method: "post",
        url: "/typeRest/list",
        data : Qs.stringify(pageModel)
      }).then(res => {
        this.pageModel = res.data
      })
    }
  }
}
</script>

<style>
.table-toolbar .el-button {
  margin: 10px
}
</style>