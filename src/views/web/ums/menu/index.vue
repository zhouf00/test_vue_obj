<!-- 菜单管理 -->
<template>
  <div>
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
          >
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
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" style="margin-left:20px" @click="">添加</el-button>
    </el-card>
    <!-- 表格展示 -->
    <div class="table-container">
      
    </div>
    <div class="pagination-container">
      <!-- <el-pagination
        background 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    search: null,
  }

  export default {
    name: 'index',
    data() {
      return {
        listQuery:Object.assign({}, defaultListQuery),
        isEdit:null
      }
    }
  }
</script>
<style scoped>
  
</style>