<!--  -->
<template>
  <div style="margin-top: 50px">
    <el-form ref="projectInfoForm" label-width="120px" style="width:600px" size="small"
      :model="value" :rules="rules" @next="nextStep()">
      <el-form-item label="项目类型" prop="type">
        <el-select placeholder="请选择类型" style="width:300px"
          v-model="value.type">
          <el-option 
            v-for="item in projectTypeList"
            :key="item"
            :label="item"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input style="width:300px" v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="内部编号" prop="sn">
        <el-input style="width:300px" v-model="value.sn"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <el-select placeholder="请选择区域" style="width:300px"
          v-model="value.area">
          <el-option 
            v-for="item in areaList"
            :key="item"
            :label="item"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input style="width:300px" v-model="value.address" ></el-input>
      </el-form-item>
      <el-form-item label="主机厂商" prop="manufacturers">
        <el-select placeholder="请选择厂商" multiple style="width:300px"
          v-model="value.manufacturers">
          <el-option 
            v-for="item in manuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
        <el-button style="margin-left:10px" icon="el-icon-edit" circle
          @click="addManufacturer()"></el-button>
      </el-form-item>
      <el-form-item label="预计进场时间" prop="entrance_time">
        <el-date-picker value-format="timestamp" style="width:300px"
          v-model="value.entrance_time"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目状态" prop="status">
        <el-select placeholder="请选择状态" style="width:300px"
          v-model="value.status">
          <el-option 
            v-for="item in projectStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" style="width:300px" :rows="5"
          v-model="value.memo"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="small" 
          @click="handleNext('projectInfoForm')">下一步</el-button>
      </el-form-item>
    </el-form>
        <!-- 弹窗 编辑 -->
    <el-dialog width="40%" title="添加设备厂商"
      :visible.sync="dialogVisible">
      <el-form label-width="25%" size="small" ref="ManuForm"
        :model="Manufacturer">
        <el-form-item label="厂商名称" prop="title">
          <el-input style="width: 80%" v-model="Manufacturer.title"></el-input>
        </el-form-item>
        <el-form-item label="厂商电话">
          <el-input style="width: 80%" v-model="Manufacturer.telephone"></el-input>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input style="width: 80%" type="textarea" maxlength="100" show-word-limit 
            v-model="Manufacturer.memo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible=false">取 消</el-button>
        <el-button size="small" type="primary" @click="addDialogConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchManufacturers, createManufacturer} from 'network/api/pm'
  import {isInteger, isNum} from 'utils/validate'

  const defaultManufacturer = {
    title: '',
    telephone: '',
    memo: ''
  }

  export default {
    name: 'ProjectInfoDetail',
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
        projectTypeList: ['风电', '火电', '水泥', '轨道', ],
        areaList: ['东部', '南部', '西部', '北部', '中部', '海外', ],
        projectStatus:[
          {value:1, label: '安装'},
          {value:2, label: '调试'},
          {value:3, label: '试运行'},
        ],
        manuList:[
          {id:1, title: '金风'},
          {id:2, title: 'GE'}
        ],
        rules: {
          name: [{required:true, message:'必填项'}],
          sn:[{validator: isNum, trigger: 'blur'}],
          address: [{required:true, message:'必填项'}]
        },
        Manufacturer: Object.assign({}, defaultManufacturer)
      }
    },
    created() {
      this.getManufacturerList()
    },
    computed:{
     
    },
    methods: {
      getManufacturerList() {
        fetchManufacturers().then(response => {
          console.log(response);
          this.manuList = response
        })
      },
      handleNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              durattion: 1000
            })
            return false
          }
        })
      },
      addManufacturer() {
        this.dialogVisible = true
        this.Manufacturer = Object.assign({}, defaultManufacturer)
      },
      addDialogConfirm() {
        this.$confirm('是否确认', '提示', {
          confirmButtonText: '确定',
          cancelButtonText:'取消',
          type: 'warning'
        }).then(() => {
          createManufacturer(this.Manufacturer).then(response => {
                this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.getManufacturerList()
              this.dialogVisible = false
          })
        })
      }
    }
  }
</script>

<style scoped>
  
</style>