<!-- 项目添加、编辑页面 -->
<template>
  <div style="margin-top: 50px;display: flex;
    flex-direction: row;
    justify-content: center;">
    <el-form ref="projectInfoForm"
      label-width="120px"
      size="small"
      :model="value"
      :rules="rules"
      @next="nextStep()">
      <el-form-item label="项目类型"
        prop="type">
        <el-select placeholder="请选择类型"
          style="width:300px"
          v-model="value.type">
          <el-option v-for="item in typeList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px"
            icon="el-icon-edit"
            circle
            @click="typeDialogVisible=true"/>
      </el-form-item>
      <el-form-item label="项目名称"
        prop="name">
        <el-input style="width:300px"
          v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="项目编号"
        prop="pj_sn">
        <el-input style="width:300px"
          v-model="value.pj_sn"></el-input>
      </el-form-item>
      <el-form-item label="内部编号"
        prop="sn">
        <el-input style="width:300px"
          v-model="value.sn"></el-input>
      </el-form-item>
      <!-- 暂不使用 -->
      <!-- <el-form-item label="优先级">
        <priority-tag v-model="value.priority"
          :disableShow="true"></priority-tag>
        <priority-tag v-model="value.priority"
          style="margin-left:10px"></priority-tag>
      </el-form-item> -->
      <el-form-item label="区域"
        prop="area">
        <el-select placeholder="请选择区域"
          style="width:300px"
          v-model="value.area">
          <el-option v-for="item in areaList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px"
            icon="el-icon-edit"
            circle
            @click="areaDialogVisible=true"/>
      </el-form-item>
      <el-form-item label="省份"
        prop="province">
        <el-select placeholder="请选择省份"
          filterable
          style="width:300px"
          v-model="value.province">
          <el-option v-for="item in provinceList"
            :key="item"
            :label="item"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址"
        prop="address">
        <el-input style="width:300px"
          v-model="value.address"></el-input>
      </el-form-item>
      <el-form-item label="安装环境"
        prop="working_env">
        <el-select placeholder="请选择安装环境"
          style="width:300px"
          v-model="value.working_env">
          <el-option v-for="item in working_envList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px"
            icon="el-icon-edit"
            circle
            @click="working_envDialogVisible=true"/>
      </el-form-item>
      <el-form-item label="主机厂商"
        prop="manufacturers">
        <el-select placeholder="请选择厂商"
          multiple
          style="width:300px"
          v-model="value.manufacturers">
          <el-option v-for="item in manufacturerList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px"
          icon="el-icon-edit"
          circle
          @click="manufacturerDialogVisible=true"/>
      </el-form-item>
      <el-form-item label="项目状态"
        prop="status">
        <el-select placeholder="请选择项目状态"
          style="width:300px"
          v-model="value.status">
          <el-option v-for="item in statusList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px"
            icon="el-icon-edit"
            circle
            @click="statusDialogVisible=true"/>
      </el-form-item>
      <el-form-item label="监测类型"
        prop="monitor_type">
        <el-select placeholder="请选择监测类型"
          multiple
          style="width:300px"
          v-model="value.monitor_type">
          <el-option v-for="item in monitorTypeList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px"
          icon="el-icon-edit"
          circle
          @click="monitorDialogVisible=true"/>
      </el-form-item>
      <el-form-item label="设备数量"
        prop="facility_count">
        <el-input style="width:300px"
          v-model="value.facility_count"></el-input>
      </el-form-item>
      <el-form-item label="预计进场时间"
        prop="entrance_time">
        <el-date-picker value-format="timestamp"
          style="width:300px"
          v-model="value.entrance_time"></el-date-picker>
      </el-form-item>
      <el-form-item label="用车情况"
        prop="user_car">
        <el-input style="width:300px"
          v-model="value.user_car"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人"
        prop="builders">
        <el-select placeholder="请选择负责人"
          filterable
          style="width:300px"
          v-model="value.manager">
          <el-option v-for="item in usersList"
            :key="item.id"
            :label="`${item.name} | ${item.position}`"
            :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维护施工人员"
        prop="builders">
        <el-select placeholder="请选择施工人员"
          multiple 
          filterable
          style="width:300px"
          v-model="value.builders">
          <el-option v-for="item in usersList"
            :key="item.id"
            :label="`${item.name} | ${item.position}`"
            :value="item.id"
            :disabled="item.project>0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目须知">
        <el-input type="textarea"
          style="width:300px"
          :rows="5"
          placeholder="项目的困难点等"
          v-model="value.memo"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary"
          size="small"
          @click="handleNext('projectInfoForm')">下一步</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加 项目类型 -->
    <el-dialog title="项目类型标签"
      :visible.sync="typeDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="typeList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="项目类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitType()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加 区域标签 -->
    <el-dialog title="项目区域标签"
      :visible.sync="areaDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="areaList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="项目类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitArea()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加 工作环境标签 -->
    <el-dialog title="安装环境标签"
      :visible.sync="working_envDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="working_envList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="项目类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitWorkingEnv()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加 项目状态标签 -->
    <el-dialog title="项目状态标签"
      :visible.sync="statusDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="statusList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="项目类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitStatus()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加 厂商标签 -->
    <el-dialog title="项目状态标签"
      :visible.sync="manufacturerDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="manufacturerList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="项目类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitManufacturer()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加 监测类型标签 -->
    <el-dialog title="监测类型标签"
      :visible.sync="monitorDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="monitorTypeList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="项目类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitMonitorType()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  getMonitorType, createMonitorType, updateMonitorType,
  getManufacturer, createManufacturer, updateManufacturer,
  getType, createType, updateType,
  getArea, createArea, updateArea,
  getWorkingenv, createWorkingenv, updateWorkingenv,
  getStatus,createStatus, updateStatus
} from "network/api/pm";
import { fetchUserList } from "network/api/login";
import { isInteger, isNum } from "utils/validate";
import { globalVar } from 'utils/global'

import projectTag from './projectTag'


export default {
  name: "ProjectInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    projectTag
  },
  data() {
    const validateSn = (rule, value, callback) => {
        if (value && value.length > 4) {
          callback(new Error('内部编号最多4位'))
        } else {
          callback()
        }
      }
    return {
      dialogVisible: false,
      monitorDialogVisible: false,
      provinceList: globalVar.provinceList,
      rules: {
        name: [{ required: true, message: "必填项",trigger: "blur"  }],
        // pj_sn: [{ required: true, message: "必填项" }],
        sn: [{ validator: validateSn, trigger: "blur" }],
        type: [{ required: true, message: "必填项" }],
        area: [{ required: true, message: "必填项" }],
        working_env: [{ required: true, message: "必填项" }],
        address: [{ required: true, message: "必填项" }],
        status: [{ required: true, message: "必填项" }],
        manufacturers:[{ required: true, message: "必填项" }],
        monitor_type: [{ required: true, message: "必填项" }],
      },
      usersList: [],

      isEditTag:false,
      editParam:Object.assign({}),

      typeList:[],
      typeDialogVisible: false,

      areaList: [],
      areaDialogVisible: false,

      statusList: [],
      statusDialogVisible: false,

      manufacturerList: [],
      manufacturerDialogVisible: false,

      monitorTypeList: [],
      monitorTypeDialogVisible: false,

      working_envList:[],
      working_envDialogVisible: false,
    };
  },
  created() {
    this.getManufacturerList(); // 拉取厂商信息
    this.getMonitorTypeList();  // 拉取监测类型信息
    this.getUsersList();        // 拉取用户信息
    this.getWorkingenvList()    // 拉取安装环境信息
    this.getAreaList()          // 拉取区域信息
    this.getTypeList()          // 拉取项目类型信息
    this.getStatusList()     // 拉取项目状态信息
  },
  methods: {
    getManufacturerList() {
      getManufacturer().then(response => {
        this.manufacturerList = response;
      });
    },
    getMonitorTypeList() {
      getMonitorType().then(response => {
        this.monitorTypeList = response;
      });
    },
    getUsersList() {
      fetchUserList().then(response => {
        this.usersList = response;
      });
    },
    getWorkingenvList() {
      getWorkingenv().then(response => {
        this.working_envList = response
      })
    },
    getAreaList() {
      getArea().then(response => {
        this.areaList = response
      })
    },
    getTypeList() {
      getType().then(response => {
        this.typeList = response
      })
    },
    getStatusList() {
      getStatus().then(response => {
        this.statusList = response
      })
    },
    
    handleNext(formName) {
      // console.log(this.value)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("nextStep");
        } else {
          this.$message({
            message: "带*号的为必填项",
            type: "error",
            durattion: 1000
          });
          return false;
        }
      });
    },
    
    addEdit(row=null) {
      if(row) {
        this.isEditTag = true
        console.log('修改')
        this.editParam = Object.assign({}, row)
        
      } else {
        this.isEditTag = false
        console.log('新增')
        this.editParam = Object.assign({})
      }
    },
    // 项目类型
    submitType() {
      if (this.isEditTag) {
          updateType(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getTypeList()
            }
          })
        } else {
          createType(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.editParam = Object.assign({})
              this.getTypeList()
            }
          })
        }
    },
    // 项目区域
    submitArea() {
      if (this.isEditTag) {
          updateArea(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getAreaList()
            }
          })
        } else {
          createArea(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.editParam = Object.assign({})
              this.getAreaList()
            }
          })
        }
    },
    // 项目工作环境
    submitWorkingEnv() {
      if (this.isEditTag) {
          updateWorkingenv(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getWorkingenvList()
            }
          })
        } else {
          createWorkingenv(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.editParam = Object.assign({})
              this.getWorkingenvList()
            }
          })
        }
    },
    // 项目状态
    submitStatus() {
      if (this.isEditTag) {
          updateStatus(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getStatusList()
            }
          })
        } else {
          createStatus(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.editParam = Object.assign({})
              this.getStatusList()
            }
          })
        }
    },
    
    submitManufacturer() {
      if (this.isEditTag) {
          updateManufacturer(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getManufacturerList()
            }
          })
        } else {
          createManufacturer(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.editParam = Object.assign({})
              this.getManufacturerList()
            }
          })
        }
    },
  
    submitMonitorType() {
      if (this.isEditTag) {
          updateMonitorType(this.editParam.id, this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getMonitorTypeList()
            }
          })
        } else {
          createMonitorType(this.editParam).then(response => {
            if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.editParam = Object.assign({})
              this.getMonitorTypeList()
            }
          })
        }
    }
  }
};
</script>

<style scoped>
</style>