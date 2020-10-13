<!-- 用户列表 -->
<template>
  <div class="app-container">
    <!-- 筛选用户 -->
    <el-card class="filter-container"
      shadow="hover"
      body-style="padding:0">
      <div class="operate-container-header-start">
        <div> <i class="el-icon-search"
            style="margin-right:10px" />
          <span>筛选搜索</span></div>

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
          <el-button type="primary"
            style="margin: 0 15px 0 40px"
            size="small"
            @click="handleSearrchList()">
            查询搜索
          </el-button>
          <el-button size="small"
            @click="handleResetSearch()">
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
          <el-table-column label="手机"
            align="center">
            <template slot-scope="scope">{{scope.row.mobile}}</template>
          </el-table-column>
          <el-table-column label="最后登录"
            width="160"
            align="center">
            <template slot-scope="scope">{{scope.row.last_login | formatDateTime }}</template>
          </el-table-column>
          <el-table-column label="是否启用"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-switch @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column label="操作"
            width="180"
            align="center">
            <template slot-scope="scope">
              <el-button size="mini"
                type="text"
                @click="handleSelectRole(scope.$index, scope.row)">分配角色</el-button>
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
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[10,15,20]"
            :total="total">
          </el-pagination>
        </div>
      </div>

    </el-card>
    <!-- 表格展示 -->

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
        <el-form-item label="姓名：">
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
          <el-radio-group v-model="user.status"
            style="width: 80%">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
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
    <!-- 弹窗显示：分配角色 -->
    <el-dialog title="分配角色"
      width="30%"
      :visible.sync="allocDialogVisible">
      <el-select v-model="allocRoleIds"
        multiple
        size="small"
        style="width:80%"
        placeholder="请选择">
        <el-option v-for="item in allRoleList"
          :key="item.id"
          :label="item.title"
          :value="item.id" />
      </el-select>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="allocDialogVisible=false"
          size="small">取消</el-button>
        <el-button @click="handleAllocDialogConfirm()"
          type="primary"
          size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  updateStatus,
  createUser,
  updateUser,
  fetchAllRoleList
} from "network/api/login";
import { formatDate } from "utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  search: null
};
const defaultUser = {
  id: null,
  username: null,
  password: null,
  name: null,
  email: null,
  mobile: null,
  status: 1
};
export default {
  name: "user",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      listLoading: null,
      total: null,
      user: Object.assign({}, defaultUser),
      dialogVisible: null,
      isEdit: null,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocUserId: null,
      rules: {
        username: [{ required: true, message: "必填项" }],
        password: [{ required: true, message: "必填项" }],
        mobile: [{ required: true, message: "必填项" }]
      }
    };
  },
  created() {
    this.getList();
    this.getAllRoleList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearrchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态？", "提示", {
        confirmButtonText: "确定",
        concelButtonText: "取消"
      })
        .then(() => {
          updateStatus(row.id, { status: row.status }).then(response => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
          this.getList();
        });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.user = Object.assign({}, defaultUser);
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.user = Object.assign({}, row);
    },
    handleSelectRole(index, row) {
      this.allocUserId = row.id;
      this.allocDialogVisible = true;
      this.getRoleListByUser(row);
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
          console.log(this.user);
          // 修改用户
          updateUser(this.user.id, this.user).then(response => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          // 添加用户
          createUser(this.user).then(response => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    handleAllocDialogConfirm() {
      // 角色分配 未写完
      this.$confirm("是否要确认？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {});
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response;
        this.total = response.length;
      });
    },
    getAllRoleList() {
      fetchAllRoleList().then(response => {
        this.allRoleList = response;
      });
    },
    getRoleListByUser(User) {
      let allocRoleList = User.roles;
      this.allocRoleIds = [];
      if (allocRoleList != null && allocRoleList.length > 0) {
        for (let i in allocRoleList) {
          this.allocRoleIds.push(allocRoleList[i].id);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>