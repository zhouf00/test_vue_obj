<!-- 用户列表 -->
<template>
  <div class="app-container">
    <!-- 筛选用户 -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"/>
        <span>筛选搜索</span>
        <el-button 
          style="float:right" type="primary" size="small"
          @click="handleSearrchList()">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right:15px" size="small"
          @click="handleRestSearch()">
          重置
        </el-button>
      </div>
      <div style="margin-top:15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.search" class="input-width" placeholder="帐号/姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 数据列表添加 -->
    <el-card class="operate-container" shadow="never">

    </el-card>
    <!-- 表格展示 -->
    <div class="table-container">
      <el-table ref="adminTable" :data="list"
                style="width:100%" v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="手机" align="center">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="最后登录" width="160" align="center">
          <template slot-scope="scope">{{scope.row.last_login | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch @change="handleStatusChange(scope.$index, scope.row)" 
            :active-value="1" :inactive-value="0" v-model="scope.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template>
            <el-button size="mini" type="text"
                       >分配角色</el-button>
            <el-button size="mini" type="text"
                       >编辑</el-button>
            <el-button size="mini" type="text"
                       >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗显示:添加、编辑 -->
    <el-dialog>

    </el-dialog>
    <!-- 弹窗显示：分配角色 -->
    <el-dialog>

    </el-dialog>
  </div>
</template>

<script>
  import {fetchList, updateStatus} from 'network/api/login'
  import {formatDate} from 'utils/date'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    search: null
  }
  const defaultUser = {
    id: null,
    username: null,
    password: null,
    nickName:null,
    email: null,
    note: null,
    status: 1
  }
  export default {
    name: 'user',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        listLoading:null
      }
    },
    created() {
      this.getList()
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A'
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery)
      },
      handleSearrchList() {
        this.listQuery.pageNum =1;
        this.getList()
      },
      handleStatusChange(index, row){
        this.$confirm('是否要修改该状态？', '提示', {
          confirmButtonText: '确定',
          concelButtonText: '取消'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
          this.getList()
        })
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response
          console.log(this.list[1]);
        })
      }
    }
  }
</script>

<style scoped>
  
</style>