<!-- 项目列表 -->
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
          <el-button type="primary" size="small" style="margin: 0 15px 0 40px"
            @click="handleQuery()">查询结果</el-button>
          <el-button size="small" type="primary" plain
            @click="handleReset()">重置</el-button>
        </div>
      </div>
      <div class="operate-container-body-two" >
        <el-form
          size="small"
          label-width="100px"
          :inline="true"
          :model="listQuery">
          <el-form-item label="项目搜索：">
            <el-input
              style="width: 203px"
              placeholder="项目名称"
              v-model="listQuery.name"></el-input>
          </el-form-item>
          <el-form-item label="内部编号：">
            <el-input
              style="width: 203px"
              placeholder="项目编号"
              v-model="listQuery.sn"></el-input>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select
              placeholder="请选择区域"
              clearable
              style="width: 203px"
              v-model="listQuery.area">
              <el-option v-for="item in areaList"
                :value="item.id"
                :label="item.title"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-select
              placeholder="请选择项目状态"
              clearable
              style="width: 203px"
              v-model="listQuery.status">
              <el-option v-for="item in statusList"
                :value="item.id"
                :label="item.title"
                :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货状态：">
            <el-select
              placeholder="请选择发货状态"
              clearable
              style="width: 203px"
              v-model="listQuery.stock_finish">
              <el-option v-for="item in ['未完成','完成']"
                :value="item"
                :label="item"
                :key="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        
      </div>
    </el-card>
    <!-- 数据列表 添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>数据列表</span>
        </div>
        <el-button
          class="btn-add"
          size="small"
          @click="handleAddProject()"
          type="primary"
          plain>添加</el-button>
      </div>
      <div class="operate-container-body">
        <!-- 表格展示 -->
        <div class="table-container">
          <el-table
            ref="productTable"
            style="width: 100%"
            border
            :data="list"
            v-loading="listLoading"
            :header-cell-style="{ background: '#F3F6FC' }">
            <el-table-column
              type="selection"
              width="40"
              align="center"/>
            <el-table-column
              label="内部编号"
              width="110"
              align="center"
              prop="sn"
              sortable>
            </el-table-column>
            <el-table-column
              label="合同编号"
              width="110"
              align="center"
              prop="pj_sn"
              sortable>
            </el-table-column>
            <el-table-column
              label="区域"
              width="80"
              align="center"
              prop="area">
              <template slot-scope="scope" >
                <span>{{scope.row.areaInfo.title}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="监测类型" width="120" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-for="item in scope.row.monitortypeList"
                  :key="item.id"
                  size="mini"
                  type="info"
                  style="margin:3px">{{ item.title }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="项目状态" width="105" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.statusInfo.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新日期"
              width="105"
              align="center"
              prop="update_time"
              sortable>
              <template slot-scope="scope">
                {{scope.row.update_time | formatDateTime('hh:mm')}}</template>
            </el-table-column>
            <el-table-column
              label="设备数量"
              width="105"
              align="center"
              prop="facility_count"
              sortable>
              <template slot-scope="scope">
                <div v-if="scope.row.monitorNumberList.length <= 0">
                  <span>{{scope.row.facility_count}}</span>
                </div>
                <div v-else>
                  <span>{{scope.row.facility_count}}</span><br>
                  <span v-for="item in scope.row.monitorNumberList" :key="item.id">{{item.title}}: {{item.number}} </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="维护施工人员" width="150" align="center">
              <template slot-scope="scope">
                {{scope.row.manager}} <el-tag v-if="scope.row.manager" size="mini" type="info" effect="plain">负责</el-tag>
                <p v-for="item in scope.row.buildersList" :key="item.name">
                  {{ item.name}}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
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
            </el-table-column>
          </el-table>
        </div>
        <!-- 表格 批量操作 -->
        <div class="batch-operate-container">
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
        </div>
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
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>

    <!-- 弹窗 编辑 -->
    <el-dialog></el-dialog>
  </div>
</template>

<script>
import priorityTag from "components/content/tag/priorityTag";

import { getProjects, getArea, getStatus } from "network/api/pm";
import filter from "views/web/mixin/filter";


export default {
  name: "index",
  components: {
    priorityTag,
  },
  mixins: [filter],
  data() {
    return {
      editInfo: {
        dialogVisible: false,
      },
      listQuery: this.$store.getters.listQuery,
      listLoading: true,
      list: null,
      monitortypeList: null,
      total: null,
      operateType: null,
      operates: [
        { label: "设为紧急", value: "urgency" },
        { label: "试运行", value: "pilot run" },
      ],

      areaList: [],
      statusList: []
    };
  },
  created() {
    this.getAreaList()
    this.getStatusList()
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getProjects(this.listQuery).then(response => {
        this.list = response.results;
        this.total = response.count;
        this.listLoading = false;
      });
    },
    getAreaList() {
      getArea().then(response => {
        this.areaList = response
      })
    },
    getStatusList() {
      getStatus().then(response => {
        this.statusList = response
      })
    },
    handleAddProject() {
      this.$router.push({ name: "addProject" }).catch(()=>{});
    },
    handleUpdateProject(index, row) {
      this.$router.push({ name: "updateProject", query: { id: row.id } }).catch(()=>{});
    },
    handleShowProject(index, row) {
      this.$router.push({ name: "showProject", query: { id: row.id } }).catch(()=>{});
    },
    handleSizeChange(val) {
      this.listQuery.page = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleQuery() {
      this.getList()
    },
    handleReset() {
      this.$store.dispatch('QueryReset').then(response => {
        this.listQuery = this.$store.getters.listQuery
        this.getList()
      })      
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