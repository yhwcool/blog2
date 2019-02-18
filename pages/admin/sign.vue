<template>
  <div class="">
     <div class= "table-toolbar">
        <el-button @click="addSignHanldle()" type="primary" class="el-icon-circle-plus-outline" size="medium">新增标签</el-button>
     </div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        v-if="false"
        label="id"
        prop="id"
        width="180">
        </el-table-column>
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
    <!-- 新增标签弹窗 -->
    <el-dialog class="login-frame"   title="新增标签" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :visible.sync="saveLabelVisible">
        <el-form ref="saveLabel" :model="saveLabel" label-width="80px">
            <el-form-item label="标签名">
                <el-input v-model="saveLabel.name" placeholder="请输入标签名"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">			
            <el-button style="width:90%" type="primary" @click="saveArticle()">确     定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑标签弹窗 -->
    <el-dialog class="login-frame"   title="编辑标签" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :visible.sync="updateLabelVisible">
        <el-form ref="updateLabel" :model="updateLabel" label-width="80px">
            <el-form-item label="标签名">
                <el-input v-model="updateLabel.name" placeholder="请输入标签名"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">			
            <el-button style="width:90%" type="primary" @click="updateArticle()">确     定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js'
  import _axios from 'axios'
  import Qs from 'qs';
  export default {
    data() {
      return {
        currentPage4: 1,
        tableData: [],
        saveLabelVisible: false,
        updateLabelVisible:false,
        saveLabel: {
          saveLabel : ''
        },
        updateLabel : {
          id : '',
          name : ''
        }
      }
    },
    async asyncData ({ $axios }) {
      return $axios({
        method:'post',
        url: '/labelRest/list'
      }).then(function (response) {
        return { tableData: response.data.tableData }
      })
    },
  
    methods: {
      addSignHanldle() {
        this.saveLabelVisible = true;
      },

      handleCurrentChange() {

      },
      handleSizeChange() {

      },
      saveArticle () {
        let saveLabel = Qs.stringify(this.saveLabel)
        console.log("saveLabel", saveLabel)
        this.$axios({
          method:'post',
          url: '/labelRest/saveOrUpdate',
          data: saveLabel
        }).then(res => {
          this.refreshPage()
        });
        this.saveLabelVisible = false;
      },
      updateArticle() {
        let updateLabel = Qs.stringify(this.updateLabel)
        this.$axios({
          method:'post',
          url: '/labelRest/saveOrUpdate',
          data: updateLabel
        }).then(res => {
          this.refreshPage()
        });
        this.updateLabelVisible = false;
      },
      handleEdit(index, row) {
        this.updateLabel.id = row.id;
        this.updateLabel.name = row.name;
        this.updateLabelVisible = true;
      },
      handleDelete(index, row) {
        let id = Qs.stringify({
          id : row.id
        })
        this.$axios({
          method:'post',
          url: '/labelRest/delete',
          data: id
        }).then(res => {
          this.refreshPage()
        });
      },
      refreshPage() {//页面刷新方法
        this.$axios({
          method:'post',
          url: '/labelRest/list'
        }).then(res => {
          this.tableData = res.data.tableData
        })
      }
    }
  }
</script>

<style>
.table-toolbar .el-button{
    margin: 10px;
}
</style>