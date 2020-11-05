<!-- 角色权限 -->
<template>
  <div class="app-container">
    <!-- 筛选角色 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start">
        <div>
          <i class="el-icon-search" style="margin-right: 10px" />
          <span>筛选搜索</span>
        </div>
      </div>
      <div class="operate-container-body-two">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.search" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
        </el-form>

        <div>
          <el-button
            style="margin: 0 15px 0 40px"
            type="primary"
            size="small"
            @click="handleSearrchList()"
          >查询搜索</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
    </el-card>
    <!-- 数据列表添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>数据列表</span>
        </div>

        <el-button size="mini" class="btn-add" style="margin-left: 20px" @click="handleAdd()">添加</el-button>
      </div>
      <!-- 表格展示 -->
      <div class="operate-container-body">
        <el-table
          ref="rbacTable"
          :data="list"
          style="width:100%"
          v-loading="listLoading"
          :header-cell-style="{ background: '#F3F6FC' }"
          border>
          <el-table-column label="编号" width="60" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="角色名称" align="center">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">{{ scope.row.memo }}</template>
          </el-table-column>
          <!-- <el-table-column label="管理角色" align="center">
            <template slot-scope="scope">
              <span>{{getVar(scope.row.role, roleList)}}</span>
            </template>
          </el-table-column> -->
          <!-- <el-table-column label="是否启用" width="100" align="center">
            <template slot-scope="scope">
              <el-switch
                :active-value="true"
                :inactive-value="false"
                v-model="scope.row.status"
              />
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text"
                @click="handleUserChange(scope.row)">分配用户</el-button>
              <el-button size="mini" type="text"
                @click="handleMenuChange(scope.row)">分配菜单</el-button>
              <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container" style="padding-bottom: 20px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[10, 15, 20]"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>

    <!-- 弹窗显示：新增、编辑角色 -->
    <el-dialog :title="isEdit ? '编辑角色' : '添加角色'" :visible.sync="dialogVisible" width="40%">
      <el-form ref="roleForm" label-width="25%" size="small" :model="role">
        <el-form-item label="用户名：" prop="rolename">
          <el-input v-model="role.title" style="width: 80%"></el-input>
          <!-- <el-select v-else
            v-model="role.user"
            size="small"
            style="width: 80%"
            placeholder="请选择">
            <el-option v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select> -->
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="role.memo" type="textarea" style="width: 80%"></el-input>
        </el-form-item>
        <!-- <el-form-item label="管理角色：" prop="mobile">
          <el-radio-group v-model="role.role" style="width: 80%">
            <el-radio v-for="item in roleList" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="role.role == 2" label="管理权限：" prop="mobile">
          <el-checkbox-group  v-model="role.menu" style="width: 80%">
            <el-checkbox v-for="item in menuList" :label="item.id">{{item.title}}</el-checkbox>
          </el-checkbox-group >
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：分配角色 -->
    <el-dialog title="分配用户" :visible.sync="userDialogVisible" width="40%">
      <el-form label-width="25%" size="small" :model="userParam">
        <el-form-item label="用户名：" prop="user">
          <el-select 
            v-model="userParam.user"
            multiple
            size="small"
            style="width: 80%"
            placeholder="请选择">
            <el-option v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleUserDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：分配菜单 -->
    <el-dialog title="分配菜单" :visible.sync="menuDialogVisible" width="40%">
      <div v-for="item in menuList" :key="item.id">
        <el-checkbox-group v-model="checkList">
          <el-row class="table-layout" style="background: #F2F6FC;">
            <el-checkbox :label="item.id">{{item.title}}</el-checkbox>
          </el-row>
          <el-row class="table-layout" v-if="item.childrenList.length > 0">
            <el-col :span="8" v-for="child in item.childrenList" :key="child.id" style="padding: 4px 0">
              <el-checkbox :label="child.id">{{child.title}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleMenuDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getrole, updateRole, createRole, updateRoleChange, } from "network/api/role";
import { fetchUserList } from 'network/api/login'
import { getMenu } from 'network/api/menu'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
};
export default {
  name: "index",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      isEdit: null,
      listLoading: null,
      total: null,
      list: null,

      role: Object.assign({}),
      dialogVisible: false,

      userList: [],
      userParam: Object.assign({}),
      userDialogVisible:false,


      menuList:[],
      checkList: [4],
      menuDialogVisible:false,
      defaultProps: {
          children: 'childrenList',
          label: 'title'
        },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      this.listLoading = true;
      getrole().then(response => {
        this.listLoading = false;
        this.list = response
        // console.log(this.list)
      });
    },
    getMenulist() {
      getMenu({parent:0}).then(response => {
        this.menuList = response
        // console.log(this.menuList)
      }) 
    },
    handleSizeChange(val) {
      // this.listQuery.pageNum = 1;
      // this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      // this.listQuery.pageNum = val;
    },
    handleStatusChange(index, row) {
      
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.role = Object.assign({}, defaultRole);
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.role = Object.assign({}, row);
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updateRole(this.role.id, this.role).then(response => {
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        createRole(this.role).then(response => {
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    handleUserChange(row) {
      this.userDialogVisible = true
      this.userParam = Object.assign({},row)
      fetchUserList().then( response => {
        this.userList =  response
      })
    },
    handleUserDialogConfirm() {
      updateRoleChange(this.userParam.id, this.userParam).then(response => {
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
    },
    handleMenuChange(row) {
      this.menuDialogVisible = true
      this.userParam = Object.assign({},row)
      console.log(this.userParam)
      this.checkList = this.userParam.menu
      console.log(this.checkList)
      getMenu({parent:0}).then(response => {
        this.menuList = response
      }) 
    },
    handleMenuDialogConfirm() {
      this.userParam.menu = this.checkList
      console.log(this.userParam)
      updateRoleChange(this.userParam.id, this.userParam).then(response => {
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
          this.menuDialogVisible = false
        }
      })
    },
  }
};
</script>
<style scoped>
  .table-layout {
    padding: 20px;
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
  }

  .top-line {
    border-top: 1px solid #DCDFE6;
  }
</style>