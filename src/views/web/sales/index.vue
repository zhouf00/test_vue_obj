<!-- 销售界面 -->
<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-search" style="margin-right: 10px"></i>
          <span>筛选搜索</span>
        </div>
        <div>
          <el-button
            type="primary"
            size="small"
            style="margin: 0 15px 0 40px"
            @click="handleQuery()"
          >查询结果</el-button>
          <el-button size="small" type="primary" plain @click="handleReset()">重置</el-button>
        </div>
      </div>
      <div class="operate-container-body-two">
        <el-form size="small" label-width="100px" :inline="true" :model="listQuery">
          <el-form-item label="项目搜索：">
            <el-input style="width: 203px" placeholder="项目名称" v-model="listQuery.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 数据列表 添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>项目列表</span>
        </div>
        <el-button class="btn-add" size="small" type="primary" @click="handleAddProject()" plain>添加</el-button>
      </div>
      <div class="operate-container-body">
        <!-- 表格展示 -->
        <div class="table-container">
          <el-table
            style="width: 100%"
            ref="productTable"
            border
            :data="list"
            v-loading="listLoading"
            :header-cell-style="{ background: '#F3F6FC' }"
          >
            <el-table-column type="selection" width="40" align="center" />
            <el-table-column label="类别" width="110" align="center" prop="type"></el-table-column>
            <el-table-column label="客户" width="110" align="center" prop="client" sortable></el-table-column>
            <el-table-column label="商机" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  @click="handleShowProject"
                  :underline="false"
                >{{scope.row.name}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="预额" width="105" align="center" prop="contract" sortable></el-table-column>
            <el-table-column label="命中率" width="120" align="center" prop="evolve"></el-table-column>
            <el-table-column label="漏额" width="105" align="center" prop="count" sortable></el-table-column>
            <el-table-column label="地区" width="105" align="center" prop="area"></el-table-column>
            <el-table-column label="更新时间" width="105" align="center" prop="update_time" sortable>
              <template slot-scope="scope">
                {{scope.row.update_time}}
                <!-- {{scope.row.update_time | formatDateTime}} -->
              </template>
            </el-table-column>
            <el-table-column label="天数" width="120" align="center" prop="days"></el-table-column>
            <el-table-column label="负责人" width="150" align="center">
              <template slot-scope="scope">{{scope.row.user}}</template>
            </el-table-column>
            <!-- <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <p>
                  <el-button
                    size="mini"
                    @click="handleShowProject(scope.$index, scope.row)">查看</el-button>
                  <el-button
                    size="mini"
                    @click="handleUpdateProject(scope.$index, scope.row)">编辑</el-button>
                </p>
              </template>
            </el-table-column>-->
          </el-table>
        </div>
        <!-- 表格 批量操作 -->
        <!-- <div class="batch-operate-container">
          <el-select size="small" placeholder="批量操作" v-model="operateType">
            <el-option
              v-for="item in operates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            style="margin-left: 20px"
            class="search-button"
            type="parmary"
            size="small">确定</el-button>
        </div>-->
        <!-- 表格 分页 -->
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :current-page.sync="listQuery.page"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import filter from "views/web/mixin/filter";

export default {
  name: "sales",
  mixins: [filter],
  data() {
    return {
      listQuery: Object.assign({}),
      listLoading: false,
      total: null,
      // list: []
      list: [
        {
          type: "S8000",
          client: "上海绿能",
          name: "上海绿能东滩风电场2020年维保项目",
          contract: "20",
          count: 10,
          area: "上海",
          update_time: "2020-10-22",
          days: 200,
          evolve: "75%",
          user: "袁骞"
        }
      ]
    };
  },
  methods: {
    handleQuery() {
      // this.getList()
    },
    handleReset() {
      // this.$store.dispatch('QueryReset').then(response => {
      //   this.listQuery = this.$store.getters.listQuery
      //   this.getList()
      // })
    },
    handleShowProject() {
      console.log("aaa");
      this.$router.push({
        name: "aaa"
      });
    },
    handleUpdateProject() {},

    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.pageSize = val;
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      // this.getList()
    }
  }
};
</script>
<style scoped>
.operate-container-header {
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #ecf1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate-container-body {
  padding: 20px;
}
</style>