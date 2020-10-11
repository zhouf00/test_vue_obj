<!-- 单项目展示 -->
<template>
  <div class="app-container"
    v-if="loading">
    <!-- 单项目信息展示 -->
    <el-card class="form-container"
      shadow="hover">
      <div style="display: flex;
    align-items: center;
    justify-content: space-between">
        <h2>{{value.name}}</h2>
        <el-button size="small"
          @click="updateProject(value.id)">修改</el-button>
      </div>

      <div class="table-layout">
        <el-row>
          <el-col :span="4"
            class="table-cell-title">地址</el-col>
          <el-col :span="4"
            class="table-cell-title">区域</el-col>
          <el-col :span="4"
            class="table-cell-title">优先级</el-col>
          <el-col :span="4"
            class="table-cell-title">内部编号</el-col>
          <el-col :span="4"
            class="table-cell-title">项目状态</el-col>
          <el-col :span="4"
            class="table-cell-title">监测类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="4"
            class="table-cell">{{value.address}}</el-col>
          <el-col :span="4"
            class="table-cell">{{value.area}}</el-col>
          <el-col :span="4"
            class="table-cell">
            <priority-tag :value="value.priority" />
          </el-col>
          <el-col :span="4"
            class="table-cell">{{value.sn}}</el-col>
          <el-col :span="4"
            class="table-cell">
            <project-status-select :value="value.status"
              :disableShow="false"></project-status-select>
          </el-col>
          <el-col :span="4"
            class="table-cell">
            <el-tag v-for="item in value.monitor_type"
              size="mini"
              type="info">{{item.title}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"
            class="table-cell-title">主机厂商</el-col>
          <el-col :span="4"
            class="table-cell-title">设备数量</el-col>
          <el-col :span="4"
            class="table-cell-title">最后一次更新时间</el-col>
          <el-col :span="4"
            class="table-cell-title">项目负责人</el-col>
          <el-col :span="4"
            class="table-cell-title">维护施工人员</el-col>
        </el-row>
        <el-row>
          <el-col :span="4"
            class="table-cell">GE</el-col>
          <el-col :span="4"
            class="table-cell">{{value.facility.length}}</el-col>
          <el-col :span="4"
            class="table-cell">{{value.update_time | formatDateTime}}</el-col>
          <el-col :span="4"
            class="table-cell"></el-col>
          <el-col :span="4"
            class="table-cell"></el-col>
        </el-row>
        <el-row>
          <el-col class="table-cell-title">备注</el-col>
          <el-col class="table-cell">这人懒什么也没留下...</el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 服务器信息展示 -->
    <div style="margin-top:20px">
      <el-card class="form-container"
        shadow="hover"
        body-style="padding:0">
        <div class="operate-container-header">
          <div>
            <i class="el-icon-tickets"
              style="margin-right: 10px"></i>
            <span style="font-weight:bold;">服务器列表</span>
          </div>
          <el-button size="mini"
            class="el-icon-edit"
            @click="addServer()"></el-button>

        </div>
        <div class="table-container"
          style="padding:20px">

          <el-table style="margin-bottom:5px"
            border
            :header-cell-style="{ background: '#F3F6FC' }"
            :data="value.server">

          </el-table>
        </div>
      </el-card>
    </div>

    <!-- 搜索框 -->
    <!-- <el-card class="filter-container"
      shadow="hover">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-search"
            style="margin-right: 10px"></i>
          <span>筛选搜索</span>
        </div>
        <div>
          <el-button type="primary"
            size="small">查询搜索</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
      <div style="margin-top:15px">
        <el-form size="small"
          label-width="140px"
          :inline="true"
          :model="listQuery">
          <el-form-item label="采集器ID：">
            <el-input class="input-width"
              placeholder="采集器ID"></el-input>
          </el-form-item>
          <el-form-item label="传感器ID：">
            <el-input class="input-width"
              placeholder="传感器ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <!-- 设备信息展示 -->
    <el-card class="filter-container"
      shadow="hover"
      body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets"
            style="margin-right: 10px"></i>
          <span style="font-weight:bold;">设备列表</span>
        </div>

        <el-button size="mini"
          class="el-icon-edit"></el-button>
      </div>
      <div style="margin-top:15px;margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;">
        <div>
          <el-form size="small"
            label-width="105px"
            :inline="true"
            :model="listQuery">
            <el-form-item label="采集器ID："
              style="margin-bottom:0">
              <el-input class="input-width"
                placeholder="采集器ID"></el-input>
            </el-form-item>
            <el-form-item label="传感器ID："
              style="margin-bottom:0">
              <el-input class="input-width"
                placeholder="传感器ID"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div style="margin-right:20px">
          <el-button type="primary"
            size="small">查询搜索</el-button>
          <el-button size="small">重置</el-button>
        </div>

      </div>
      <div class="table-container"
        style="padding:20px">
        <el-table style="width:100%"
          border
          :header-cell-style="{ background: '#F3F6FC' }"
          :data="value.facility">
          <el-table-column label="设备名称"
            align="center">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="设备型号"
            align="center">
            <template slot-scope="scope">{{scope.row.machine.title}}</template>
          </el-table-column>
          <el-table-column label="采集器型号"
            align="center">
            <template slot-scope="scope">{{scope.row.collector.title}}</template>
          </el-table-column>
          <el-table-column label="采集器IP"
            align="center">
            <template slot-scope="scope">{{scope.row.collector.ip}}</template>
          </el-table-column>
          <el-table-column label="操作"
            align="center">
            <p>
              <el-button size="mini">查看</el-button>
              <el-button size="mini">编辑</el-button>
            </p>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 服务器查看界面 -->
    <el-dialog>

    </el-dialog>
    <!-- 设备展示界面 -->

    <!-- 发货功能 -->
    <el-card class="filter-container"
      shadow="hover"
      body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-box"
            style="margin-right: 10px"></i>
          <span style="font-weight:bold;">发货</span>
        </div>

        <el-button size="mini"
          @click="deliveryDialogVisible = true">我要发货</el-button>
      </div>
      <div class="table-container"
        style="padding:20px">
        <el-table style="width:100%"
          border
          :header-cell-style="{ background: '#F3F6FC' }"
          :data="deliveryInfoList">
          <el-table-column label="设备名称"
            align="center"
            prop="name">
          </el-table-column>
          <el-table-column label="设备类型"
            align="center">
            <template slot-scope="scope">
              <el-tag v-for="item in scope.row.type"
                :key="item.id"
                size="mini"
                type="info">{{ item.title }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="设备总量"
            align="center"
            prop="total">

          </el-table-column>
          <el-table-column label="已发"
            align="center"
            prop="sent">

          </el-table-column>
          <el-table-column label="未发"
            align="center"
            prop="not_send">

          </el-table-column>
          <el-table-column label="更新时间"
            align="center"
            prop="update">

          </el-table-column>
        </el-table>
        <!-- 日志表格 -->

        <el-table style="width:100%;margin-top:20px"
          border
          :header-cell-style="{ background: '#F3F6FC' }"
          :data="deliveryLog">
          <el-table-column label="发货日志"
            align="center">
            <el-table-column label="日期"
              align="center"
              prop="date">
            </el-table-column>

            <el-table-column label="发货详情"
              align="center"
              prop="deliveryDetails">

            </el-table-column>
            <el-table-column label="发货人"
              align="center"
              prop="consignor">

            </el-table-column>

          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 我要发货 弹窗 -->
    <el-dialog title="发货"
      :visible.sync="deliveryDialogVisible"
      width="600px">

      <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm">
        <el-form-item label="设备名称"
          prop="name">
          <el-input v-model="ruleForm.name"
            style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="设备类型"
          prop="type">
          <el-select v-model="ruleForm.type"
            placeholder="请选择设备类型">
            <el-option v-for="item in monitortypeList"
              :key="item.id"
              :label="item.title"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货数量"
          prop="deliveryNumber">
          <el-input-number v-model="ruleForm.deliveryNumber"
            :min="1"
            :max="10"
            label="发货数量"></el-input-number>
        </el-form-item>
        <el-form-item label="发货人"
          prop="consignor">
          <el-input v-model="ruleForm.consignor"
            :disabled="true"
            style="width:180px">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import projectStatusSelect from "components/content/select/projectStatusSelect";
import priorityTag from "components/content/tag/priorityTag";

import { getProjects, fetchMonitorType } from "network/api/pm";
import filter from "views/web/mixin/filter";

export default {
  name: "index",
  components: {
    priorityTag,
    projectStatusSelect
  },
  mixins: [filter],
  data() {
    return {
      monitortypeList: [],
      value: null,
      loading: null,
      listQuery: Object.assign({}),
      dialogServer: false,
      Server: Object.assign({}),
      // 发货列表假数据
      deliveryInfoList: [
        {
          name: "C2000",
          type: [{ id: "1", title: "传动链" }],
          total: "20",
          sent: "10",
          not_send: "10",
          update: "2020-09-20"
        },
        {
          name: "Ssd546",
          type: [{ id: "1", title: "叶片" }],
          total: "45",
          sent: "45",
          not_send: "0",
          update: "2020-09-21"
        },
        {
          name: "skdwq4544",
          type: [
            { id: "1", title: "传动链" },
            { id: "2", title: "叶片" }
          ],
          total: "1223",
          sent: "1220",
          not_send: "3",
          update: "2020-09-23"
        }
      ],
      // 我要发货弹窗
      deliveryDialogVisible: false,
      // 我要发货表单验证
      ruleForm: {
        name: "",
        type: "",
        deliveryNumber: 1,
        consignor: this.$store.getters.name
      },
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择设备类型", trigger: "change" }]
      },
      // 发货日志
      deliveryLog: [
        { date: "2020-09-15", deliveryDetails: "发货清单", consignor: "陈某某" }
      ]
    };
  },
  created() {},
  mounted() {
    this.getProject();
    this.getMonitortypeList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert(
            this.ruleForm.name +
              "\n" +
              this.ruleForm.type +
              "\n" +
              this.ruleForm.deliveryNumber +
              "\n" +
              this.ruleForm.consignor
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getMonitortypeList() {
      fetchMonitorType().then(response => {
        this.monitortypeList = response;
        // console.log(response);
      });
    },
    getProject() {
      this.loading = false;
      getProjects({ id: this.$route.query.id }).then(response => {
        this.loading = true;
        this.value = response.results[0];
      });
    },
    addServer(id) {
      this.$router.push({ name: "server", query: { id: id } });
    },
    updateProject(id) {
      this.$router.push({ name: "updateProject", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.app-container {
  width: 80%;
  margin: 0 auto;
}
.filter-container {
  margin-top: 20px;
}
.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}
.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}
.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>