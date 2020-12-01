<!-- 用户列表 -->
<template>
  <div class="app-container">
    <!-- 筛选用户 -->
    <el-card class="filter-container"
      shadow="hover"
      body-style="padding:0">
      <div class="operate-container-header-start">
        <div> 
          <i class="el-icon-search"
            style="margin-right:10px" />
          <span>筛选搜索</span></div>
      </div>
      <div class="operate-container-body-two">
        <el-form :inline="true"
          :model="listQuery"
          size="small"
          label-width="100px">
          <el-form-item label="用户搜索：">
            <el-input v-model="listQuery.search"
              class="input-width"
              placeholder="帐号/姓名"
              clearable></el-input>
          </el-form-item>
           <el-form-item label="部门搜索：">
            <el-input v-model="listQuery.search"
              class="input-width"
              placeholder="部门名称"
              clearable></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary"
            style="margin: 0 15px 0 40px"
            size="small"
            @click="handleSearrchList()">查询搜索</el-button>
          <el-button size="small"
            @click="handleResetSearch()">重置</el-button>
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
          <el-table-column label="帐号"
            align="center">
            <template slot-scope="scope">{{scope.row.username}}</template>
          </el-table-column>
          <el-table-column label="姓名"
            align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="职务"
            align="center">
            <template slot-scope="scope">{{scope.row.position}}</template>
          </el-table-column>
          <el-table-column label="手机"
            align="center">
            <template slot-scope="scope">{{scope.row.mobile}}</template>
          </el-table-column>
          <el-table-column label="最后登录"
            width="160"
            align="center">
            <template slot-scope="scope">{{scope.row.last_login  | formatDateTime('hh:mm:ss') }}</template>
          </el-table-column>
          <el-table-column label="是否启用"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-switch @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="true"
                :inactive-value="false"
                v-model="scope.row.is_active" />
            </template>
          </el-table-column>
          <el-table-column label="操作"
            width="180"
            align="center">
            <template slot-scope="scope">
              <el-button size="mini"
                type="text"
                @click="handleDepartment(scope.$index, scope.row)">设置部门</el-button>
              <el-button size="mini"
                type="text"
                @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container"
          style="padding-bottom:20px">
          <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="listQuery.page"
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :total="total"></el-pagination>
        </div>
      </div>
    </el-card>

    <!-- 弹窗显示:添加、编辑 -->
    <el-dialog :title="isEdit? '编辑用户': '添加用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form ref="userForm"
        label-width="25%"
        size="small"
        :model="user"
        :rules="rules">
        <el-form-item label="帐号："
          prop="username">
          <el-input v-model="user.username"
            style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="姓名："
          prop="name">
          <el-input v-model="user.name"
            style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="手机："
          prop="mobile">
          <el-input v-model="user.mobile"
            style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="user.email"
            style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="密码："
          prop="password">
          <el-input v-model="user.password"
            type="password"
            style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="user.is_active"
            style="width: 80%">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false"
          size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()"
          size="small"
          type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：设置部门 -->
    <el-dialog title="设置部门"
      width="30%"
      :visible.sync="deptDialogVisible">
      <div v-for="item in deptList" :key="item.id">
        <el-checkbox-group v-model="user.departments">
          <el-row class="table-layout" style="background: #F2F6FC;">
            <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
          </el-row>
          <el-row class="table-layout" v-if="item.childrenList && item.childrenList.length > 0">
            <el-col :span="8" v-for="child in item.childrenList" :key="child.id" style="padding: 4px 0'width:10px">
              <el-checkbox :label="child.id">{{child.name}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="deptDialogVisible=false"
          size="small">取消</el-button>
        <el-button @click="handleDeptDialogConfirm()"
          type="primary"
          size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList, createUser, updateUser,
  updateUserStatus, updateUserDept
} from "network/api/login";
import { getDeptList } from 'network/api/department'
import filter from "views/web/mixin/filter";

const defaultListQuery = {
  page: 1,
  pageSize: 5,
  search: null
};
const defaultUser = {
  id: null,
  username: null,
  password: null,
  name: null,
  email: null,
  mobile: null,
  status: true,
  position: null
};
export default {
  name: "user",
  mixins: [filter],
  data() {
    const validateMobile = (rule, value, callback) => {
        if (value && value.length !== 11) {
          callback(new Error('请输入正确的11位手机号码'))
        } else {
          callback()
        }
      }
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      listLoading: null,
      total: null,
      user: Object.assign({}),
      dialogVisible: null,
      isEdit: null,

      rules: {
        username: [{ required: true, message: "必填项" }],
        name: [{ required: true, message: "必填项" }],
        password: [{ required: true, message: "必填项" }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile}]
      },
      checkList:[],
      deptDialogVisible: false,
      deptList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    // 修改用户状态
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态？", "提示", {
        confirmButtonText: "确定",
        concelButtonText: "取消"
      }).then(() => {
          updateUserStatus(row.id, {is_active:row.is_active} ).then(response => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
          this.getList();
        });
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.user = Object.assign({});
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.user = Object.assign({}, row);
    },
    handleDepartment(index, row) {
      this.deptDialogVisible = true;
      this.getDepartmentList()
      this.user = Object.assign({}, row);
      console.log(this.user)
    },
    handleDelete(index, row) {
      // 删除用户 未写完
    },
    handleDialogConfirm() {
      // 添加修改用户
      this.$confirm("是否要确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.isEdit) {
          // console.log(this.user);
          // 修改用户
          updateUser(this.user.id, this.user).then(response => {
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
            this.dialogVisible = false;
          });
        } else {
          // 添加用户
          createUser(this.user).then(response => {
            // console.log(response.err)
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
            this.dialogVisible = false;
          });
        }
      });
    },
    handleDeptDialogConfirm() {
      // console.log(this.user.departments)
      updateUserDept(this.user.id, this.user).then(response => {
        // console.log(response)
        this.getList()
        this.deptDialogVisible = false
      })
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.results;
        this.total = response.count;
        // console.log(this.list)
      });
    },
    getDepartmentList() {
      getDeptList({search:1}).then(response => {
        this.deptList = response;
        // console.log(this.deptList)
      });
    },
  }
};
</script>

<style scoped>
</style>