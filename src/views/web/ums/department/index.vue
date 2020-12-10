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
          <span>组织框架</span>
        </div>
        <el-button size="mini"
          class="btn-add"
          style="margin-left:20px"
          @click="handleAdd()">添加</el-button>
      </div>
      <!-- 表格展示 -->
      <div class="operate-container-body">
        <el-table ref="rbacTable"
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
          <el-table-column label="部门ID" 
            align="center">
            <template slot-scope="scope">{{scope.row.deptid}}</template>
          </el-table-column>
          <el-table-column label="部门名称"
            align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="部门主管"
            align="center">
            <template slot-scope="scope">
              <span v-for="item in scope.row.leaders">{{item.name}} </span>
            </template>
          </el-table-column>
          <el-table-column label="上级部门"
            align="center">
            <template slot-scope="scope">{{deptQuery(scope.row.parentid)}}</template>
          </el-table-column>
          <el-table-column label="操作"
            width="150"
            align="left">
            <template slot-scope="scope">
              <el-button size="mini"
                type="text"
                @click="handleAddChild(scope.row)">添加子部门</el-button>
              <el-button size="mini" type="text"
                @click="handleAddUser(scope.row)">添加成员</el-button>
              <el-button size="mini" type="text"
                @click="handleAddLeader(scope.row)">设置领导</el-button>
              <el-button size="mini" type="text"
                @click="handleUpdate(scope.row)">编辑</el-button>
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

    <!-- 弹窗显示：添加组织框架 -->
    <el-dialog title="添加组织框架" width="30%" :visible.sync="dialogVisible" >
      <el-form label-width="150px" size="small">        
        <el-form-item label="上级部门ID：" v-if="departmentParam.parentid">
          <el-select v-model="departmentParam.parentid" 
            :disabled="!isEdit">
            <el-option v-for="item in list"
              :value="item.deptid"
              :label="item.name"
              :key="item.deptid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称："
          prop="name">
          <el-input v-model="departmentParam.name"
            style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="企业微信的部门ID："
          prop="deptid">
          <el-input v-model="departmentParam.deptid"
            style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible=false"
          size="small">取消</el-button>
        <el-button @click="handleDialogConfirm()"
          type="primary"
          size="small">确定</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：用户管理 -->
    <el-dialog title="添加成员" width="630px" :visible.sync="userDialogVisible" >
      <el-form label-width="150px" size="small">
        <el-form-item label="成员：">
          <el-select 
            v-model="departmentParam.userList"
            multiple
            filterable
            size="small"
            style="width: 80%"
            placeholder="请选择">
            <el-option v-for="item in userList"
              :key="item.username"
              :label="item.name"
              :value="item.username" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="userHandleDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗显示：设置领导 -->
    <el-dialog title="设置领导" width="630px" :visible.sync="leaderDialogVisible" >
      <el-form label-width="150px" size="small">
        <el-form-item label="用户名：">
          <el-select 
            v-model="departmentParam.leaderList"
            multiple 
            filterable
            size="small"
            style="width: 80%"
            placeholder="请选择">
            <el-option v-for="item in departmentParam.usersInfoList"
              :key="item.username"
              :label="item.name"
              :value="item.username" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leaderDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="leaderHandleDialogConfirm()" size="small" type="primary">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDept, createDept,updateDept, updateDeptUser, updateDeptLeader } from 'network/api/department'
import { fetchUserList} from 'network/api/login'

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
      isEdit: false,
      listLoading: null,
      total: null,
      list: [],

      dialogVisible: false,
      departmentParam:Object.assign({}),

      userDialogVisible: false,
      leaderDialogVisible: false,
      userList: [],
      
    };
  },
  created() {
    this.getlist();
    this.getUserList()
  },
  methods: {
    getlist() {
      this.listLoading = true
      getDept(this.listQuery).then(response => {
        this.list = response
        this.listLoading = false
        // console.log(this.list)
        this.deptQuery()
      })
    },
    getUserList() {
      fetchUserList().then(response => {
        this.userList = response
        // console.log(this.userList)
      })
    },
    handleAdd() {
      this.dialogVisible = true
      this.isEdit = false
      this.departmentParam = Object.assign({})
    },
    handleUpdate(row) {
      this.dialogVisible = true
      this.isEdit = true
      this.departmentParam = Object.assign({},row)
    },
    handleAddChild(row) {
      this.dialogVisible = true
      this.isEdit = false
      this.departmentParam = Object.assign({},{parentid:row.deptid})
    },
    handleDialogConfirm() {
      // console.log(this.departmentParam)
      if (this.isEdit) {
        console.log('编辑')
        updateDept(this.departmentParam.id, this.departmentParam).then(response => {
          // console.log(response)
          this.getlist()
          this.dialogVisible = false
        })
      } else {
        createDept(this.departmentParam).then(response => {
          // console.log(response)
          this.getlist()
          this.dialogVisible = false
        })
      }
    },
    handleAddUser(row) {
      this.userDialogVisible = true
      this.departmentParam = Object.assign({},{department:row.deptid, userList:row.userList})
    },
    userHandleDialogConfirm() {
      updateDeptUser(this.departmentParam).then(response => {
        // console.log(response)
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
          this.getlist()
          this.userDialogVisible = false
        }
      })
    },
    handleAddLeader(row) {
      this.leaderDialogVisible = true
      this.departmentParam = Object.assign({},{
        department:row.deptid,
        leaderList:row.leaderList,
        usersInfoList:row.usersInfoList
      })
      // console.log(this.departmentParam)
    },
    leaderHandleDialogConfirm() {
      // console.log(this.departmentParam)
      updateDeptLeader(this.departmentParam).then(response => {
        // console.log(response)
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
          this.getlist()
          this.leaderDialogVisible = false
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
    }
  },
  computed: {
    deptQuery() {
      return parent => {
        for (let i in this.list) {
          if (parent === this.list[i].deptid){
            return this.list[i].name
          }
        }
      }
    }
  }
};
</script>
<style scoped>
</style>