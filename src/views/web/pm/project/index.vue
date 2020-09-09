<!-- 单项目展示 -->
<template>
  <div class="app-container" v-if="loading">
    <!-- 单项目信息展示 -->
    <h2>{{value.name}}</h2>
    <el-button size="small"
      @click="updateProject(value.id)">修改</el-button>
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
      <el-row>
        <el-col class="table-cell-title">备注</el-col>
        <el-col class="table-cell">这人懒什么也没留下...</el-col>
      </el-row>
    </div>
    <!-- 服务器信息展示 -->
    <div class="table-container">
      <div>
        <span style="font-weight:bold;">服务器列表</span>
        <el-button style="float:right;margin-bottom:10px" size="mini" class="el-icon-edit"
          @click="addServer()"></el-button>
      </div>
      <el-table style="margin-bottom:5px" border
        :data="value.server">

      </el-table>
    </div>
    <!-- 搜索框 -->
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
    <!-- 设备信息展示 -->
    <div class="table-container">
      <div>
        <span style="font-weight:bold;">设备列表</span>
        <el-button style="float:right;margin-bottom:10px" size="mini" class="el-icon-edit"></el-button>
      </div>
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
    <!-- 服务器查看界面 -->
    <el-dialog>

    </el-dialog>
    <!-- 设备展示界面 -->
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
        listQuery: Object.assign({},),
        dialogServer:false,
        Server: Object.assign({}, )
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
      },
      addServer(id) {
        this.$router.push({name: 'server', query: {id:id}})
      },
      updateProject(id) {
        this.$router.push({name: 'updateProject', query: {id:id}})
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