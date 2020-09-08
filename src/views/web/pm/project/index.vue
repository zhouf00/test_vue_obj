<!-- 单项目展示 -->
<template>
  <div class="app-container" v-if="loading">
    <h2>{{value.name}}</h2>
    <div class="table-layout" >
      <el-row>
        <el-col :span="4" class="table-cell-title">地址</el-col>
        <el-col :span="4" class="table-cell-title">区域</el-col>
        <el-col :span="4" class="table-cell-title">优先级</el-col>
        <el-col :span="4" class="table-cell-title">内部编号</el-col>
        <el-col :span="4" class="table-cell-title">项目状态</el-col>
        <el-col :span="4" class="table-cell-title">监测类型</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{value.address}}</el-col>
        <el-col :span="4" class="table-cell">{{value.area}}</el-col>
        <el-col :span="4" class="table-cell"><priority-tag :value="value.priority"/></el-col>
        <el-col :span="4" class="table-cell">{{value.sn}}</el-col>
        <el-col :span="4" class="table-cell">
          <project-status-select :value="value.status" :disableShow="false"></project-status-select>
        </el-col>
        <el-col :span="4" class="table-cell">
          <el-tag v-for="item in value.monitor_type" size="mini" type="info">{{item.title}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell-title">主机厂商</el-col>
        <el-col :span="4" class="table-cell-title">设备数量</el-col>
        <el-col :span="4" class="table-cell-title">最后一次更新时间</el-col>
        <el-col :span="4" class="table-cell-title">项目负责人</el-col>
        <el-col :span="4" class="table-cell-title">维护施工人员</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">GE</el-col>
        <el-col :span="4" class="table-cell">{{value.facility.length}}</el-col>
        <el-col :span="4" class="table-cell">{{value.update_time | formatDateTime}}</el-col>
        <el-col :span="4" class="table-cell"></el-col>
        <el-col :span="4" class="table-cell"></el-col>
      </el-row>
    </div>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" size="small"
          >查询搜索</el-button>
          <el-button style="float:right;margin-right:15px" size="small"
          >重置</el-button>
      </div>
      <div style="margin-top:15px">
        <el-form size="small" label-width="140px" :inline="true" :model="listQuery">
          <el-form-item label="采集器ID：">
            <el-input class="input-width" placeholder="采集器ID"></el-input>
          </el-form-item>
          <el-form-item label="传感器ID：">
            <el-input class="input-width" placeholder="传感器ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table style="width:100%" border
        :data="value.facility">
        <el-table-column label="设备名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="设备型号" align="center">
          <template slot-scope="scope">{{scope.row.machine.title}}</template>
        </el-table-column>
        <el-table-column label="采集器型号" align="center">
          <template slot-scope="scope">{{scope.row.collector.title}}</template>
        </el-table-column>
        <el-table-column label="采集器IP" align="center">
          <template slot-scope="scope">{{scope.row.collector.ip}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <p>
            <el-button size="mini"
              >查看</el-button>
            <el-button size="mini"
              >编辑</el-button>
          </p>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import projectStatusSelect from 'components/content/select/projectStatusSelect'
  import priorityTag from 'components/content/tag/priorityTag'

  import {getProjects} from 'network/api/pm'
  import filter from 'views/web/mixin/filter'

  export default {
    name: 'index',
    components: {
      priorityTag,
      projectStatusSelect
    },
    mixins: [filter],
    data() {
      return {
        value: null,
        loading: null,
        listQuery: Object.assign({},)
      }
    },
    created() {
      
    },
    mounted() {
      this.getProject()
    },
    methods: {
      getProject() {
        this.loading = false
        getProjects({id:this.$route.query.id}).then(response => {
          this.loading = true
          this.value = response.results[0];
        })
      }
    }
  }
</script>

<style scoped>
  .app-container {
    width:80%;
    margin:20px auto;
  }
  .filter-container {
    margin-top: 20px;
  }
  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }
  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }
  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>