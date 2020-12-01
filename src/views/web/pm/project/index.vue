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
        <div>
          <el-button size="small" @click="updateProject(value.id)">修改</el-button>
        </div>
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
          <el-col :span="4" class="table-cell-title">
            <a @click="showDialog()">各设备台数(点击修改)</a>
          </el-col>
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
            <span>{{ addComma(value.buildersList)}}</span>
          </el-col>
          <el-col :span="4" class="table-cell">
            <span v-for="item in monitorNumberList" :key="item.title">{{item.title}}: {{item.number}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="table-cell-title">项目须知</el-col>
          <el-col class="table-cell">{{value.memo}}</el-col>
        </el-row>
      </div>
      <div style="margin-top:20px">
        <trace/>
      </div>
    </el-card>

    <!-- 外包情况 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span style="font-weight: bold">外包信息</span>
        </div>
        <el-button size="mini" @click="outDialogVisible()">添加外包信息</el-button>
      </div>
      <outsource ref="outDialogVisible"/>
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
      <idc-room ref="bomDialogVisible"/>
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
      <product ref="productDialogVisible"/>
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
      <inventory ref="inventoryDialogVisible"/>
    </el-card>
    
    <!-- 添加 监测设备数量 -->
    <el-dialog title="状态标签"
      :visible.sync="monitorNumberDialog" width="650px">
      <el-button size="small"  @click="addEdit()" 
        :disabled="addShow">新建</el-button>
      <el-table
        :data="monitorNumberList">
        <el-table-column label="监测设备类型" prop="title">
        </el-table-column>
        <el-table-column label="数量" prop="number">
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px" >
        <el-form label-width="50px" :model="editParam">
          <el-form-item>
             <el-select v-model="editParam.title" placeholder="请选择通道类型">
              <el-option v-for="item in value.monitortypeList"
                :key="item.id"
                :label="item.title"
                :value="item.title"></el-option>
            </el-select>
            <el-input v-model="editParam.number" style="width: 30%" placeholder="数量"/>
            <el-button size="small"  style="margin-left:10px" @click="submitMonitorNubmer()">{{isEditTag || addShow ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getProjects, 
           getMonitorNumber, createMonitorNumber, updateMonitorNumber} from "network/api/pm";
  import filter from "views/web/mixin/filter";

  import IdcRoom from "./components/IdcRoom"
  import product from "./components/product"
  import inventory from "./components/inventory"
  import Trace from "./components/Trace"
  import Outsource from "./components/Outsource"

  export default {
    name: "index",
    components: {
      IdcRoom,
      product,
      inventory,
      Trace,
      Outsource
    },
    mixins: [filter],
    data() {
      return {
        value: null,
        loading: null,
        listQuery: Object.assign({}),

        addShow:false,
        isEditTag: null,
        monitorNumberList:[],
        editParam: Object.assign({}),
        monitorNumberDialog: false,

        // 测试数据
      };
    },
    created() {
      this.getProject();
      this.getMonitorNumberList()
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
        // console.log(list);
      },
      outDialogVisible () {
        this.$refs['outDialogVisible'].isShow(true)
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
      getProject() {
        this.loading = false;
        getProjects({ id: this.$route.query.id }).then(response => {
          this.loading = true;
          this.value = response.results[0];
        });
      },
      getMonitorNumberList() {
        getMonitorNumber({project:this.$route.query.id}).then(response => {
          this.monitorNumberList = response
          if (!this.addShow && this.monitorNumberDialog) {
            this.addShow = (this.monitorNumberList.length >= this.value.monitortypeList.length ? true : false)
            this.editParam = Object.assign({})
          }
        })
      },
      updateProject(id) {
        this.$router.push({ name: "updateProject", query: { id: id } }).catch(()=>{});
      },
      showDialog() {
        this.monitorNumberDialog=true
        this.editParam = Object.assign({})
        this.addShow = (this.monitorNumberList.length >= this.value.monitortypeList.length ? true : false)
      },
      addEdit(row=null) {
        if(row) {
          this.isEditTag= true
          // console.log('修改')
          this.editParam = Object.assign({}, row)
          
        } else {
          this.isEditTag = false
          // console.log('新增')
          this.editParam = Object.assign({})
        }
      },
      submitMonitorNubmer() {
        if (this.isEditTag) {
          updateMonitorNumber(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getMonitorNumberList()
            }
          })
        } else if(!this.addShow) {
          this.editParam.project = Number(this.$route.query.id)
          // console.log(this.editParam)
          createMonitorNumber(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getMonitorNumberList()
            }
          })
        } else {
          this.$message({
                type: "warning",
                message: '不能再新建了'
              });
        }
      },
    },
    computed: {
      // 没用，遍历数组用
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