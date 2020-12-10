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
          <el-form-item>
            <el-input style="width: 150px" placeholder="商机" v-model="listQuery.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 150px" placeholder="集团公司" v-model="listQuery.company"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 150px" placeholder="负责人" v-model="listQuery.user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="请选择命中率"
              style="width: 150px"
              v-model="listQuery.hit_rate">
              <el-option v-for="item in rateList"
                :key="item.value"
                :label="item.title"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="请选择省份"
              style="width: 150px"
              filterable
              v-model="listQuery.address">
              <el-option v-for="item in provinceList"
                :key="item"
                :label="item"
                :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 150px" placeholder="超过天数" v-model="listQuery.days"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-date-picker value-format="timestamp"
                style="width:90%"
                placeholder="开始时间"
                v-model="listQuery.start_time"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker value-format="timestamp"
                style="width:90%"
                placeholder="结束时间"
                v-model="listQuery.end_time"></el-date-picker>
          </el-form-item> -->
        </el-form>
      </div>
    </el-card>
    <!-- 数据列表 添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>商机列表</span>
        </div>
        <el-button class="btn-add" size="small" type="primary" @click="handleAddSaleInfo()" plain>添加</el-button>
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
            <el-table-column label="类别" width="110" align="center" prop="type">
              <template slot-scope="scope">
                <span v-for="item in scope.row.typeList">{{item.title}} </span>
              </template>
            </el-table-column>
            <el-table-column label="客户" width="110" align="center" prop="customer" sortable></el-table-column>
            <el-table-column label="商机" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  @click="handleShowSaleInfo(scope.row)"
                  :underline="false"
                >{{scope.row.title}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="预额" width="105" align="center" sortable
             prop="estimated_amount"></el-table-column>
            <el-table-column label="命中率" width="120" align="center" prop="hit_rate">
              <template slot-scope="scope">
                <span :style="rateColor(scope.row.hit_rate)">{{scope.row.hit_rate*100}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="漏额" width="105" align="center" sortable
               prop="amount"></el-table-column>
            <el-table-column label="地区" width="105" align="center" prop="address"></el-table-column>
            <el-table-column label="更新时间" width="105" align="center" prop="traceTime" sortable>
              <template slot-scope="scope">
                <div  v-if="scope.row.traceTime">
                  {{scope.row.traceTime | formatDateTime}}
                </div>
                <div v-else>
                  {{scope.row.create_time | formatDateTime}}
                </div>
              </template>
            </el-table-column>
            <!-- 50%以上，进行颜色提醒: 15<days<30 黄色；30<days 红色  -->
            <el-table-column label="天数" width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.traceTime" :style="calcDays(scope.row, scope.row.traceTime).color">{{calcDays(scope.row, scope.row.traceTime).days}}</span>
                <span v-else :style="calcDays(scope.row, scope.row.create_time).color">{{calcDays(scope.row, scope.row.create_time).days}}</span>
              </template>
            </el-table-column>
            <el-table-column label="负责人" width="150" align="center">
              <template slot-scope="scope">
                <span v-for="item in scope.row.userList">{{item.name}} </span>
              </template>
            </el-table-column>
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
        <div class="pagination-container" style="margin-bottom:10px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="listQuery.pageSize"
            :page-sizes="[10, 20, 50]"
            :current-page.sync="listQuery.page"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getMarket} from "network/api/crm"

import {toDate, daysToDate} from "utils/date"
import {filter, calcDays, global} from "views/web/mixin";

export default {
  name: "sales",
  mixins: [filter, calcDays, global],
  data() {
    return {
      listQuery: this.$store.getters.marketListQuery,
      listLoading: false,
      total: null,
      list: [],
      rateList: [
        {value:0, title:'0'},
        {value:0.25, title:'25%'},
        {value:0.5, title:'50%'},
        {value:0.75, title:'75%'},
        {value:1, title:'100%'},
      ]

    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList () {
      getMarket(this.listQuery).then(response => {
        this.list = response.results
        this.total = response.count
        // console.log(this.list)
      })
    },
    handleQuery() {
      // 天数转换成日期
      // this.listQuery.start_time = daysToDate(this.listQuery.days)
      if(this.listQuery.page > 1){
        this.listQuery.page =1
      }
      if (this.listQuery.end_time) {
        this.listQuery.end_time = daysToDate(this.listQuery.days)
      }
      this.getList()
    },
    handleReset() {
      this.$store.dispatch('QueryReset', 'marketListQuery').then(response => {
        this.listQuery = this.$store.getters.marketListQuery
        this.getList()
      })
    },
    handleAddSaleInfo() {
      this.$router.push({ name: "crmDetails" }).catch(()=>{});
    },
    handleShowSaleInfo(row) {
      this.$router.push({ name: "crmDetails", query: {id:row.id}}).catch(()=>{});
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList()
    }
  },
  computed: {
     rateColor() {
      return (evolve) => {
        let color = {
          0: null,
          0.25: 'color:#E6A23C',
          0.5: 'color:red',
          0.75: 'color:blue',
          1: 'color:green'
        }
        return color[evolve]
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