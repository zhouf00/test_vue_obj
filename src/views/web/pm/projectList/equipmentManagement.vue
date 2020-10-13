<!-- 用户列表 -->
<template>
  <div class="app-container">
    <!-- 筛选用户 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start">
        <div>
          <i class="el-icon-search" style="margin-right: 10px" />
          <span>筛选搜索</span>
        </div>
      </div>
      <div class="operate-container-body-two"></div>
    </el-card>
    <!-- 数据列表添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>数据列表</span>
        </div>
      </div>
      <div class="operate-container-body"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "equipmentManagement",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
</style>