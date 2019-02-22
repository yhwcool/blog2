<template>
  <div class>
    <div class="table-toolbar">
      <el-button
        @click="addSignHanldle()"
        type="primary"
        class="el-icon-circle-plus-outline"
        size="medium"
      >新增标签</el-button>
    </div>
    <!-- 表格组件 -->
    <el-table :data="pageModel.tableData" style="width: 100%">
      <el-table-column v-if="false" label="id" prop="id" width="180"></el-table-column>
      <el-table-column label="标签" prop="name" width="180"></el-table-column>
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
    <!-- 新增标签弹窗 -->
    <el-dialog
      class="login-frame"
      title="新增标签"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :visible.sync="saveLabelVisible"
    >
      <el-form ref="saveLabel" :model="saveLabel" label-width="80px">
        <el-form-item label="标签名">
          <el-input v-model="saveLabel.name" placeholder="请输入标签名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="width:90%" type="primary" @click="saveArticle()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑标签弹窗 -->
    <el-dialog
      class="login-frame"
      title="编辑标签"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :visible.sync="updateLabelVisible"
    >
      <el-form ref="updateLabel" :model="updateLabel" label-width="80px">
        <el-form-item label="标签名">
          <el-input v-model="updateLabel.name" placeholder="请输入标签名"></el-input>
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
      saveLabelVisible: false,
      updateLabelVisible: false,
      saveLabel: {
        id: "",
        name: ""
      },
      updateLabel: {
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
      url: "/labelRest/list",
      data : Qs.stringify(pageModel)
    }).then(function(response) {
      return { pageModel: response.data }
    })
  },

  methods: {
    addSignHanldle() {
      //新增方法
      this.saveLabelVisible = true
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
      let saveLabel = Qs.stringify(this.saveLabel)
      console.log("saveLabel", saveLabel)
      this.$axios({
        method: "post",
        url: "/labelRest/saveOrUpdate",
        data: saveLabel
      }).then(res => {
        this.refreshPage()
        this.$message(res.data.alertMessage)
      })

      this.saveLabelVisible = false
    },
    updateArticle() {
      //编辑后台交互
      let updateLabel = Qs.stringify(this.updateLabel)
      this.$axios({
        method: "post",
        url: "/labelRest/saveOrUpdate",
        data: updateLabel
      }).then(res => {
        this.refreshPage()
        this.$message(res.data.alertMessage)
      })
      this.updateLabelVisible = false
    },
    handleEdit(index, row) {
      //编辑方法
      this.updateLabel.id = row.id
      this.updateLabel.name = row.name
      this.updateLabelVisible = true
    },
    handleDelete(index, row) {
      //删除方法
      let id = Qs.stringify({
        id: row.id
      })
      this.$axios({
        method: "post",
        url: "/labelRest/delete",
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
        url: "/labelRest/list",
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