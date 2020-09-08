<!-- 项目列表 -->
<template>
  <div class="app-container">
    <!-- 搜索框 -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" size="small"
          >查询结果</el-button>
        <el-button style="float:right; margin-right: 15px" size="small"
          >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" :inline="true" :model="listQuery"
          >
          <el-form-item label="项目搜索：">
            <el-input style="width:203px" placeholder="项目名称"
              v-model="listQuery.name"></el-input>
          </el-form-item>
          <el-form-item label="内部编号：">
            <el-input style="width:203px" placeholder="项目编号"
              v-model="listQuery.sn"></el-input>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select placeholder="请选择区域" clearable style="width:203px"
              v-model="listQuery.area"
              @change="test(value)">
              <el-option 
               v-for="item in areaList"
               :key="item"
               :label="item"
               :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 数据列表 添加 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" size="mini"
        @click="handleAddProject()">添加</el-button>
    </el-card>
    <!-- 表格展示 -->
    <div class="table-container">
      <el-table ref="productTable" style="width:100%" border
        :data="list" v-loading="listLoading">
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column label="编号" width="60" align="center">
           <template slot-scope="scope">{{scope.row.sn}}</template>
        </el-table-column>
        <el-table-column label="区域" width="80" align="center">
          <template slot-scope="scope">{{scope.row.area}}</template>
        </el-table-column>
        <el-table-column label="优先级" width="80" align="center">
          <template slot-scope="scope">
            <priority-tag :value="scope.row.priority"></priority-tag>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="监测类型" width="120" align="center">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.monitor_type" size="mini" type="info">{{item.title}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="项目状态" width="110" align="center">
          <template slot-scope="scope">
            <project-status-select :value="scope.row.status"></project-status-select>
          </template>
        </el-table-column>
        <el-table-column label="更新日期" width="100" align="center">
          <template slot-scope="scope">{{scope.row.update_time | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="设备数量" width="80" align="center">
          <template slot-scope="scope">{{scope.row.facility.length}}</template>
        </el-table-column>
        <el-table-column label="维护施工人员" width="150" align="center">
          <template slot-scope="scope">
            吴承国 <el-tag size="mini" type="info" effect="plain">主</el-tag>
            吴天承 李启龙 哈哈哈
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini"
                @click="handleShowProject(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini"
                @click="handleUpdateProject(scope.$index, scope.row)">编辑</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格 批量操作 -->
    <div class="batch-operate-container">
      <el-select size="small" placeholder="批量操作"
        v-model="operateType">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
      <el-button style="margin-left:20px" class="search-button" type="parmary" size="small"
        >确定</el-button>
    </div>
    <!-- 表格 分页 -->
    <div class="pagination-container">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5,10,15]" :total="total"></el-pagination>
    </div>
    <!-- 弹窗 编辑 -->
    <el-dialog>

    </el-dialog>
    
  </div>
</template>

<script>
  import projectStatusSelect from 'components/content/select/projectStatusSelect'
  import priorityTag from 'components/content/tag/priorityTag'

  import {getProjects} from 'network/api/pm'
  import filter from 'views/web/mixin/filter'

  const defaultListQuery = {
    page: 1,
    pageSize: 5,
    name: '',
    sn: '',
    area: ''
  }
  export default {
    name: 'index',
    components: {
      priorityTag,
      projectStatusSelect
    },
    mixins: [filter],
    data() {
      return {
        areaList: ['东部', '南部', '西部', '北部', '中部', '海外', ],
        editInfo: {
          dialogVisible: false,
        },
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: true,
        list: null,
        total: null,
        operateType:null,
        operates: [
          {label: '设为紧急', value: 'urgency'},
          {label: '试运行', value: 'pilot run'},
        ],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true;
        getProjects(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.results;
          this.total = response.results.length;
        })
      },
      handleAddProject() {
        this.$router.push({name: 'addProject'})
      },
      handleUpdateProject(index, row) {
        this.$router.push({name: 'updateProject', query: {id:row.id}})
      },
      handleShowProject(index, row) {
        this.$router.push({name: 'showProject', query: {id:row.id}})
      },
      test(value) {
        console.log(value);
        console.log('iaaa');
      }
    }
  }
</script>

<style scoped>
  
</style>