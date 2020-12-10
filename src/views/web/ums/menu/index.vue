<!-- 角色权限 -->
<template>
  <div class="app-container">
    <!-- 筛选角色 -->
    <el-card class="filter-container"
      shadow="hover"
      body-style="padding:0">
      <div class="operate-container-header-start">
        <div>
          <i class="el-icon-search"
            style="margin-right:10px" />
          <span>筛选搜索</span>
        </div>
      </div>
      <div class="operate-container-body-two">
        <el-form :inline="true"
          :model="listQuery"
          size="small"
          label-width="100px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.search"
              class="input-width"
              placeholder="帐号/姓名"
              clearable></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button style="margin: 0 15px 0 40px"
            type="primary"
            size="small"
            @click="handleSearrchList()">
            查询搜索
          </el-button>
          <el-button size="small">
            重置
          </el-button>
        </div>
      </div>
    </el-card>
    <!-- 数据列表添加 -->
    <el-card class="operate-container"
      shadow="hover"
      body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets"
            style="margin-right:10px"></i>
          <span>数据列表</span>
        </div>
        <el-button size="mini"
          class="btn-add"
          style="margin-left:20px"
          @click="handleAdd()">添加</el-button>
      </div>
      <!-- 表格展示 -->
      <div class="operate-container-body">
        <el-table ref="adminTable"
          :data="list"
          style="width:100%"
          v-loading="listLoading"
          :header-cell-style="{ background: '#F3F6FC' }"
          border>
          <el-table-column label="编号"
            width="60"
            align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="菜单名称"
            align="center">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="前端名称"
            align="center" prop="name">
          </el-table-column>
          <el-table-column label="父菜单"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.parent">{{scope.row.parentInfo.title}}</span>
              <span v-else>顶级菜单</span>
            </template>
          </el-table-column>
          <el-table-column label="图标"
            align="center">
            <template slot-scope="scope">{{scope.row.icon}}</template>
          </el-table-column>
          <el-table-column label="设置"
            align="center">
            <template slot-scope="scope">
              <el-button type="text"
                @click="filterParent(scope.row)">{{scope.row.parent !== null ? '返回上级' : '查看下级'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"
            width="180"
            align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text"
                @click="roleHandleUpdate(scope.row)">授权</el-button>
              <el-button size="mini" type="text"
                @click="handleUpdate(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 弹窗显示：添加授权 -->
    <el-dialog title="添加授权" width="40%" 
      :visible.sync="roleDialogVisible">
      <el-form label-width="25%" size="small" :model="roleParam">
        <el-form-item label="部门：">
          <el-select 
            v-model="roleParam.department"
            multiple
            size="small"
            style="width: 80%"
            placeholder="请选择">
            <el-option v-for="item in deptList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="roleHandleDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：添加菜单信息 -->
    <el-dialog :title="isEdit ? '编辑菜单': '添加菜单'" width="40%"
      :visible.sync="dialogVisible">
      <el-form label-width="25%" size="small" :model="menuParam">
        <el-form-item label="菜单名：" prop="title">
          <el-input v-model="menuParam.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="前端名称：" prop="title">
          <el-input v-model="menuParam.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="父菜单：" prop="parent">
          <el-select 
            v-model="menuParam.parent"
            size="small"
            style="width: 80%"
            placeholder="请选择"
            :disabled="isEdit && ! menuParam.parent">
            <el-option v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu, createMenu, updateMenu, updateMenuAuth } from 'network/api/menu'
import {getDept} from 'network/api/department'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  search: null
};
export default {
  name: "index",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading:null,
      isEdit: false,
      list: [],
      tmpList: [],

      dialogVisible:false,
      menuParam: Object.assign({}),

      deptList: [],
      roleDialogVisible:false,
      roleParam: Object.assign({})
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getMenu().then(response => {
        this.listLoading = false
        this.tmpList = response
        this.list = this.tmpList.filter(t => t.parent == null)
      })
    },
    getdeptList() {
      getDept().then(response => {
        this.deptList = response
      })
    },
    handleAdd() {
      this.isEdit = false
      this.dialogVisible = true
      this.menuParam = Object.assign({})
    },
    handleUpdate(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.menuParam = Object.assign({}, row)
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updateMenu(this.menuParam.id, this.menuParam).then(response => {
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
            this.getList()
          }
        })
      } else {
        createMenu(this.menuParam).then(response => {
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
            this.getList()
          }
        })
      }
    },
    filterParent(row) {
      console.log(row.parent == null)
      if (row.parent == null) {
        let tmp = this.tmpList.filter(t => t.parent == row.id)
        if (tmp.length > 0) {
          this.list = tmp
        }
      } else {
        this.list = this.tmpList.filter(t => t.parent == null)
      }
    },
    roleHandleUpdate(row) {
      this.getdeptList()
      this.roleDialogVisible = true
      this.roleParam = Object.assign({}, {id:row.id,department:row.department})
      console.log(this.roleParam)
    },
    roleHandleDialogConfirm() {
      updateMenuAuth(this.roleParam.id, this.roleParam).then(response => {
        if (response.err) {
          this.$message({
            type: "warning",
            message: response.err,
            duration: 3000
          });
        } else {
          this.$message({
            type: "success",
            message: "提交成功",
            duration: 1000
          });
          this.getdeptList()
        }
      })
    },
    handleSizeChange(val) {
      // this.listQuery.pageNum = 1;
      // this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      // this.listQuery.pageNum = val;
    },
 
  }
};
</script>
<style scoped>
</style>