<!-- 项目基本界面 -->
<template>
  <div class="app-container" v-if="loading"> 
    <!-- 项目信息展示 -->
    <el-card class="form-container" shadow="hover">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;">
        <h2>{{ value.name }}</h2>
        <el-button size="small" @click="updateProject(value.id)">修改</el-button>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">地址</el-col>
          <el-col :span="4" class="table-cell-title">区域</el-col>
          <el-col :span="4" class="table-cell-title">作业环境</el-col>
          <el-col :span="4" class="table-cell-title">内部编号</el-col>
          <el-col :span="4" class="table-cell-title">项目状态</el-col>
          <el-col :span="4" class="table-cell-title">监测类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ value.address }}</el-col>
          <el-col :span="4" class="table-cell">{{ value.areaInfo.title }}</el-col>
          <el-col :span="4" class="table-cell">
            {{value.working_envInfo.title}}
          </el-col>
          <el-col :span="4" class="table-cell">{{ value.sn }}</el-col>
          <el-col :span="4" class="table-cell">
            <span>{{value.statusInfo.title}}</span>
          </el-col>
          <el-col :span="4" class="table-cell">
            <el-tag
              v-for="item in value.monitortypeList"
              :key="item.id"
              size="mini"
              type="info"
            >{{ item.title }}</el-tag>
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
          <el-col :span="4" class="table-cell">
            <span>{{ addComma(value.manufacturersList, 'title') }}</span>
          </el-col>
          <el-col :span="4" class="table-cell">
            {{ value.facility_count }}
          </el-col>
          <el-col :span="4" class="table-cell">
            {{ value.update_time | formatDateTime }}
          </el-col>
          <el-col :span="4" class="table-cell">{{value.manager}}</el-col>
          <!-- 只显示了一个 -->
          <el-col :span="4" class="table-cell">
            <!-- <span v-for="item in value.builders" :key="item.id">{{ item.name}}</span> -->
            <span>{{ addComma(value.buildersList)}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="table-cell-title">备注</el-col>
          <el-col class="table-cell">这人懒什么也没留下...</el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 机房信息展示 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span style="font-weight: bold">机房信息</span>
        </div>
        <el-button size="mini" @click="bomDialogVisible()">添加机房设备</el-button>
      </div>
      <idc-room ref="bomDialogVisible" v-model="bomList"/>
    </el-card>

    <!-- 设备信息展示 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span style="font-weight: bold">采集器信息</span>
        </div>
        <el-button size="mini" @click="productDialogVisible()">添加采集器</el-button>
      </div>
      <div
        style="
          margin-top: 15px;
          margin-top: 20px;
          display: flex;
          justify-content: start;
          align-items: center;">
        <div>
          <el-form size="small" label-width="105px" :inline="true" :model="listQuery">
            <el-form-item label="采集器ID：" style="margin-bottom: 0">
              <el-input class="input-width" placeholder="采集器ID"></el-input>
            </el-form-item>
            <el-form-item label="传感器ID：" style="margin-bottom: 0">
              <el-input class="input-width" placeholder="传感器ID"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 20px">
          <el-button type="primary" size="small">查询搜索</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
      <product ref="productDialogVisible" v-model="productList"/>
    </el-card>

    <!-- 发货功能 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-box" style="margin-right: 10px"></i>
          <span style="font-weight: bold">发货</span>
        </div>
        <div>
          <el-button size="mini" @click="inventoryDialogVisible()">新增发货清单</el-button>
          <!-- <el-button size="mini" @click="inventoryDialogVisible()">我要发货</el-button> -->
        </div>
      </div>
      <inventory ref="inventoryDialogVisible" v-model="inventoryList"/>
    </el-card>
    

  </div>
</template>

<script>
  import { getProjects, fetchMonitorType } from "network/api/pm";
  import filter from "views/web/mixin/filter";

  import IdcRoom from "./components/IdcRoom"
  import product from "./components/product"
  import inventory from "./components/inventory"

  export default {
    name: "index",
    components: {
      IdcRoom,
      product,
      inventory
    },
    mixins: [filter],
    data() {
      return {
        value: null,
        loading: null,
        listQuery: Object.assign({}),

        // 测试数据
        bomList: [
          {
            title: "dell r730",
            sn: "12345",
            memo: "cpu:xxx / 内存:xxx / 硬盘:xxx / RAID:xxx / 阵列卡:xxx\n系统版本:windows 2008\n帐号密码:administrator/12345",
            version: "v2.1.46",
            IPaddress: "网卡1:192.168.0.89\t掩码:255.255.255.0\t网关:\n"
          }
        ],
        productList:[
          {
            facility: '1号风机',
            sn: 12345,
            sw: 'v2.1.48',
            ip: '192.168.0.89/255.255.255.0/',
            statusInfo:{title:'故障'},
            lifecycleInfo: {title:'发货'},
            memo: '这世间没你想的那么完美',
            sensor: 'a公司传感器|AABBCC',
            info:{
              id: 1,
              title: "叶片监测产品",
              memo: "2020-10发布工程使用",
              model: "CS2000v2.1",
              aisleType: '后8通道',
              status: {title:'新品'},
              hardVersion:'1.11'
            }
          }
        ],
        inventoryList: [
          {
            name: "C2000",
            type: [{ id: "1", title: "传动链" }],
            total: "20",
            sent: "10",
            not_send: "10",
            update: "2020-09-20"
          },
        ]
      };
    },
    created() {},
    mounted() {
      this.getProject();
    },
    methods: {
      addComma(list, name='name') {
        if (list.length > 0) {
          const rs = [];
          list.forEach(item => {
            rs.push(item[name]);
          });
          return rs.join(" 、");
        } else {
          return "无";
        }
        console.log(list);
      },
      bomDialogVisible() {
        this.$refs['bomDialogVisible'].isShow(true)
      },
      productDialogVisible() {
        this.$refs['productDialogVisible'].isShow(true)
      },
      inventoryDialogVisible() {
        this.$refs['inventoryDialogVisible'].isShow(true)
      },
      // initDialogVisible() {
      //   this.$refs['inventoryDialogVisible'].isShow(true, 'init')
      // },
      // 弹窗重置
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      getProject() {
        this.loading = false;
        getProjects({ id: this.$route.query.id }).then(response => {
          this.loading = true;
          this.value = response.results[0];
          console.log(this.value);
        });
      },
      updateProject(id) {
        this.$router.push({ name: "updateProject", query: { id: id } });
      },
  
    },
    computed: {
      showQuery() {
        return (a, list) => {
          for (let i in list) {
            if (a == list[i].value) {
              return list[i].label
            }
          }
        }
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
<style lang="scss" scoped>
/deep/.el-upload-dragger {
  width: 250px;
  height: 150px;
  i {
    margin: 25px 0 16px;
  }
}
</style>