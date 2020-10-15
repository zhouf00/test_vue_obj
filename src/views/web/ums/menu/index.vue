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

      </div>
    </el-card>


    <!-- 弹窗显示：分配角色 -->
    <el-dialog>

    </el-dialog>
  </div>
</template>

<script>
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
      isEdit: null
    };
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;

    },
    handleStatusChange (index, row) {

    }
  }
};
</script>
<style scoped>
</style>