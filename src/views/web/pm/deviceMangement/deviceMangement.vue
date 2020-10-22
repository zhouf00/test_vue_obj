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
      <div class="operate-container-body">
        <el-table
          ref="rbacTable"
          :data="list"
          style="width:100%"
          v-loading="listLoading"
          :header-cell-style="{ background: '#F3F6FC' }"
          border
        >
          <el-table-column label="编号" width="60" align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="设备名称" width="150" align="center">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="型号" width="120" align="center">
            <template slot-scope="scope">{{scope.row.model}}</template>
          </el-table-column>
          <el-table-column label="通道数" width="100" align="center">
            <template slot-scope="scope">{{scope.row.aisle}}</template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="true"
                :inactive-value="false"
                v-model="scope.row.status"
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">{{scope.row.memo}}</template>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="text">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container" style="padding-bottom:20px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[10,15,20]"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// const defaultListQuery = {};
export default {
  name: "deviceMangement",
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        search: null
      },
      isEdit: null,
      listLoading: null,
      total: 0,
      // list: null,
      list: [
        {
          id: 1,
          title: "CS2000",
          memo: "2020-10发布工程使用",
          model: "v2.1",
          aisle: 16,
          status: true
        },
        {
          id: 2,
          title: "DGU2600",
          memo:
            "长时间运行有时有报错，长时间运行有时有报错，长时间运行有时有报错，长时间运行有时有报错，长时间运行有时有报错，",
          model: "v1.3",
          aisle: 8,
          status: true
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.computedTotal();
  },
  methods: {
    handleStatusChange() {},
    handleUpdate() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    computedTotal() {
      this.total = this.list.length;
    }
  }
};
</script>

<style scoped>
</style>