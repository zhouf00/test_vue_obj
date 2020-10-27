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
          style="margin-left:20px">添加</el-button>
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
          <el-table-column label="url"
            align="center">
            <template slot-scope="scope">{{scope.row.url}}</template>
          </el-table-column>
          <el-table-column label="父菜单"
            align="center">
            <template slot-scope="scope">{{menuQuery(scope.row.parent)}}</template>
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
              <el-button size="mini"
                type="text">编辑</el-button>
              <el-button size="mini"
                type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>


    <!-- 弹窗显示：分配角色 -->
    <el-dialog>

    </el-dialog>
  </div>
</template>

<script>
import { getMenu } from 'network/api/menu'
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
      isEdit: null,
      list: null,
      tmpList: [],
      showMenu: null
    };
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      this.listLoading = true
      getMenu().then(response => {
        this.listLoading = false
        this.tmpList = response
        this.list = this.tmpList.filter(t => t.parent == null)
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
    },
    handleStatusChange (index, row) {

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
  },
  computed: {
    menuQuery() {
      return parent => {
        for (let i in this.list) {
          if (parent === this.list[i].id){
            return this.list[i].title
          }
        }
      }
    }
  }
};
</script>
<style scoped>
</style>