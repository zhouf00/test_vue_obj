<!-- 外包商管理 -->
<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start">
        <div>
          <i class="el-icon-search" style="margin-right: 10px" />
          <span>筛选搜索</span>
        </div>
      </div>
      <div class="operate-container-body-two"></div>
    </el-card>
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>承包商信息</span>                  
        </div>
        <el-button
          class="btn-add"
          size="small"
          @click="handleAdd()"
          type="primary"
          plain>添加</el-button>
      </div>
      <div class="operate-container-body">
        <el-table
          ref="rbacTable"
          :data="list"
          style="width:100%"
          v-loading="listLoading"
          :header-cell-style="{ background: '#F3F6FC' }"
          border>
          <el-table-column label="类型" width="100" align="center">
            <template slot-scope="scope">{{scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="公司名称" align="center">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="规模" width="120" align="center">
            <template slot-scope="scope">{{scope.row.scale}}</template>
          </el-table-column>
          <el-table-column label="联系人" width="150" align="center">
            <template slot-scope="scope">{{scope.row.linkman}}</template>
          </el-table-column>
          <el-table-column label="电话" width="150" align="center">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="加入时间" width="150" align="center">
            <template slot-scope="scope">{{scope.row.join_time | formatDateTime}}</template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">{{scope.row.memo}}</template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 添加外包商信息 -->
    <el-dialog :title="isEdit? '编辑外包商信息': '添加外包商信息'"
      :visible.sync="dialogVisible" width="650px">
      <el-form 
        :model="outsourcerParam"
        label-width="120px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="outsourcerParam.type"
            style="width: 85%">
            <el-option v-for="item in ['公司', '个人']"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="title">
          <el-input v-model="outsourcerParam.title" style="width: 85%"
            placeholder="如：保定精瑞工程技术有限公司 或 刘茹君"/>
        </el-form-item>
        <el-form-item label="规模" prop="scale">
          <el-input v-model="outsourcerParam.scale" style="width: 85%"
            placeholder="如：29人"/>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="outsourcerParam.linkman" style="width: 85%"
            placeholder="主要联系人名字"/>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="outsourcerParam.phone" style="width: 85%"
            placeholder="手机号码"/>
        </el-form-item>
        <el-form-item label="加入时间"
          prop="join_time">
          <el-date-picker value-format="timestamp"
            style="width:300px"
            v-model="outsourcerParam.join_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="outsourcerParam.memo" style="width: 85%"
            placeholder="其它重要信息"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" 
            @click="hendleDialogConfirm()">确认</el-button>
          <el-button size="small" 
            @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getOutsourcer, createOutsourcer, updateOutsourcer } from 'network/api/pm'
  import filter from "views/web/mixin/filter";
  import { formatDate } from "utils/date";

  const defOutsourcerParam = {
    join_time: new Date()
  }

  const defaultListQuery = {
    page: 1,
    pageSize: 5,
  }
  export default {
    name: 'index',
    mixins: [filter],
    data () {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: null,
        total: 0,
        dialogVisible: false,
        isEdit: false,

        list: [
          // {type: '公司',title:'保定精瑞工程技术有限公司', scale: '29人', linkman: '刘静辉', phone: '17732213118', memo: '共15人有保险信息,共15人有登高/电工证件信息'},
          // {type: '个人',title:'刘茹君', scale: '',linkman: '刘茹君', phone: '15584784900', memo: '身份证：220319196510073010'},
        ],

        outsourcerParam: Object.assign({})
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        getOutsourcer(this.listQuery).then( response => {
          this.list = response
        })
      },
      handleAdd () {
        this.dialogVisible = true
        this.isEdit = false
        this.outsourcerParam = Object.assign({})
      },
      handleUpdate (index, row) {
        this.dialogVisible = true
        this.isEdit = true
        if (row.join_time) {
          row.join_time = new Date(row.join_time);
        }
        this.outsourcerParam = Object.assign({},row)
      },
      hendleDialogConfirm () {
        this.toDate('join_time')
        // this.outsourcerParam[join_time] = formatDate(new Date(this.outsourcerParam[join_time]),"yyyy-MM-dd hh:mm:ss")
        console.log(this.outsourcerParam)
        if (this.isEdit){
          console.log('修改')
          updateOutsourcer(this.outsourcerParam.id, this.outsourcerParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
            }
            this.getList()
            this.dialogVisible = false
          })
        } else {
          console.log('新建')
          createOutsourcer(this.outsourcerParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
            }
            this.getList()
            this.dialogVisible = false
          })
        }
      },
      toDate(date) {
        if (this.outsourcerParam[date]) {
          this.outsourcerParam[date] = formatDate(
            new Date(this.outsourcerParam[date]),
            "yyyy-MM-dd hh:mm:ss"
          );
        } else {
          delete this.outsourcerParam[date];
        }
      },
    }
  }
</script>
<style scoped>
  
</style>