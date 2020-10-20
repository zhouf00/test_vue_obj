<!-- 角色权限 -->
<template>
  <div class="app-container">
    <!-- 筛选角色 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start">
        <div>
          <i class="el-icon-search" style="margin-right: 10px" />
          <span>筛选搜索</span>
        </div>
      </div>
      <div class="operate-container-body-two">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="100px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.search"
              class="input-width"
              placeholder="帐号/姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>

        <div>
          <el-button
            style="margin: 0 15px 0 40px"
            type="primary"
            size="small"
            @click="handleSearrchList()"
          >
            查询搜索
          </el-button>
          <el-button size="small"> 重置 </el-button>
        </div>
      </div>
    </el-card>
    <!-- 数据列表添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>数据列表</span>
        </div>

        <el-button
          size="mini"
          class="btn-add"
          style="margin-left: 20px"
          @click="handleAdd()"
          >添加</el-button
        >
      </div>
      <!-- 表格展示 -->
      <div class="operate-container-body">
        <el-table
          ref="rbacTable"
          :data="list"
          style="width: 100%"
          v-loading="listLoading"
          :header-cell-style="{ background: '#F3F6FC' }"
          border
        >
          <el-table-column label="编号" width="60" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="角色名称" align="center">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">{{ scope.row.memo }}</template>
          </el-table-column>
          <el-table-column label="管理员" align="center">
            <template slot-scope="scope">
              <div v-for="item in scope.row.user_list" :key="item.id">
                <p v-if="listIndex(item.id, scope.row.leader_list)">
                  {{ item.name }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户数" width="150" align="center">
            <template slot-scope="scope">{{
              scope.row.user_list.length
            }}</template>
          </el-table-column>
          <el-table-column label="是否启用" width="100" align="center">
            <template slot-scope="scope">
              <el-switch
                @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="true"
                :inactive-value="false"
                v-model="scope.row.status"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleUserMassage()"
                >人员管理</el-button
              >
              <el-button size="mini" type="text">分配菜单</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleUpdate(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container" style="padding-bottom: 20px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[10, 15, 20]"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>

    <!-- 弹窗显示：新增、编辑角色 -->
    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form ref="roleForm" label-width="25%" size="small" :model="role">
        <el-form-item label="角色名：" prop="rolename">
          <el-input v-model="role.title" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            v-model="role.memo"
            type="textarea"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="isEdit" label="管理员：" prop="mobile">
          <el-select
            v-model="role.leader_list"
            multiple
            size="small"
            style="width: 80%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in role.user_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="role.status" style="width: 80%">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary"
          >确 认</el-button
        >
      </span>
    </el-dialog>

    <!-- 弹窗显示：分配角色 -->
    <el-dialog title="用户管理" width="630px" :visible.sync="userDialogVisible">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="data"
      >
      </el-transfer>
    </el-dialog>
  </div>
</template>

<script>
import { getrole, updateRole, createRole } from "network/api/role";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  search: null,
};
const defaultRole = {
  id: null,
  title: null,
  memo: null,
  leader: null,
  leader_list: null,
  permissions: null,
  status: 1,
  user_list: null,
};
export default {
  name: "index",
  data() {
    return {
      data: null,
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      listQuery: Object.assign({}, defaultListQuery),
      isEdit: null,
      listLoading: null,
      total: null,
      list: null,
      role: Object.assign({}, defaultRole),
      dialogVisible: false,
      userDialogVisible: false,
      namelist: ["周凡", "张三", "李四"],
      // list:[
      //   {id:1, title:'超级管理员', memo:'所有的权限', user:20, create_time:'2020-10-10', status:true},
      //   {id:2, title:'项目管理员', memo:'项目模块的相关权限', user:20, create_time:'2020-10-10', status:true},
      //   {id:3, title:'销售管理员', memo:'销售模块的相关权限', user:20, create_time:'2020-10-10', status:true},
      //   {id:4, title:'普通用户', memo:'浏览及指定权限', user:20, create_time:'2020-10-10', status:true}
      // ]
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.generateData();
  },
  methods: {
    generateData() {
      const data = [];
      const cities = ['1','2'];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu",
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: cities[index],
        });
      });
      this.data = data;
    },
    getList() {
      this.listLoading = true;
      getrole(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response;
        this.total = response.length;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
    },
    handleStatusChange(index, row) {},
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.role = Object.assign({}, defaultRole);
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.role = Object.assign({}, row);
    },
    listIndex(id, row) {
      if (row.indexOf(id) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        // 因leader字段为分格字符串字段
        if (this.role.leader_list.length > 0) {
          this.role.leader = this.role.leader_list.join(",");
        }
        updateRole(this.role.id, this.role).then((response) => {
          this.dialogVisible = false;
          this.getList();
        });
        console.log("aa");
      } else {
        console.log("bb");
        createRole(this.role).then((response) => {
          console.log(response);
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    handleUserMassage() {
      this.userDialogVisible = true;
    },
  },
};
</script>
<style scoped>
</style>