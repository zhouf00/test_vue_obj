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
          <el-table-column label="用户名" align="center">
            <template slot-scope="scope">{{ scope.row.user }}</template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">{{ scope.row.memo }}</template>
          </el-table-column>
          <el-table-column label="管理角色" align="center">
            <template slot-scope="scope">
              <span>{{getVar(scope.row.role, roleList)}}</span>
            </template>
          </el-table-column>
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
                @click=""
                >分配菜单</el-button>
              <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="text">删除</el-button>
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
    <el-dialog :title="isEdit ? '编辑用户' : '添加用户'" :visible.sync="dialogVisible" width="40%">
      <el-form ref="roleForm" label-width="25%" size="small" :model="role">
        <el-form-item label="用户名：" prop="rolename">
          <el-input v-if="isEdit" v-model="role.user" style="width: 80%" disabled></el-input>
          <el-select v-else
            v-model="role.user"
            size="small"
            style="width: 80%"
            placeholder="请选择">
            <el-option v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="role.memo" type="textarea" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="管理角色：" prop="mobile">
          <el-radio-group v-model="role.role" style="width: 80%">
            <el-radio v-for="item in roleList" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="role.role == 2" label="管理权限：" prop="mobile">
          <el-checkbox-group  v-model="role.menu" style="width: 80%">
            <el-checkbox v-for="item in menuList" :label="item.id">{{item.title}}</el-checkbox>
          </el-checkbox-group >
        </el-form-item>
        <!-- <el-form-item label="是否启用：">
          <el-radio-group v-model="role.status" style="width: 80%">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：分配角色 -->

  </div>
</template>

<script>
import { getrole, updateRole, createRole } from "network/api/role";
import { fetchUserList } from 'network/api/login'
import { getMenu } from 'network/api/menu'
import { globalVar } from 'utils/global'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  user: ''
};
const defaultRole = {
  role: 2,
  menu: []
};
export default {
  name: "index",
  data() {
    return {
      roleList: globalVar.roleList,
      personList: null,
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      listQuery: Object.assign({}, defaultListQuery),
      isEdit: null,
      listLoading: null,
      total: null,
      list: null,
      menuList:null,
      userList: null,
      role: Object.assign({}, defaultRole),
      dialogVisible: false,
      namelist: ["周凡", "张三", "李四"]
      // list:[
      //   {id:1, title:'超级管理员', memo:'所有的权限', user:20, create_time:'2020-10-10', status:true},
      //   {id:2, title:'项目管理员', memo:'项目模块的相关权限', user:20, create_time:'2020-10-10', status:true},
      //   {id:3, title:'销售管理员', memo:'销售模块的相关权限', user:20, create_time:'2020-10-10', status:true},
      //   {id:4, title:'普通用户', memo:'浏览及指定权限', user:20, create_time:'2020-10-10', status:true}
      // ]
    };
  },
  created() {
    this.getList();
    this.getMenulist()
  },
  mounted() {},
  methods: {
    getList() {
      this.listLoading = true;
      getrole(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response;
        this.total = response.length;
      });
    },
    getMenulist() {
      getMenu({parent: 0}).then(response => {
        this.menuList = response
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
      fetchUserList().then( response => {
        this.userList =  response
      })
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
        console.log("aa");
      } else {
        console.log("bb");
        createRole(this.role).then(response => {
          console.log(response);
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    closeAfter(index) {
      if (index === 1) {
        this.personValue = [];
      } else {
        this.userDialogVisible = false;
        this.personValue = [];
      }
    },
    // 确认人员分配就把v-model中的value传上去
    confirmTransferPersonnel() {
      console.log("分配成功");
    }
  },
  computed:{
    getVar (){
      return function (a, list) {
        for(let i in list) {
          if (list[i].value == a){
            return list[i].label
          }
        }
      }
    }
  }
};
</script>
<style scoped>
</style>