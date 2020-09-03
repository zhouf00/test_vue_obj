<!--  -->
<template>
  <div style="margin-top: 50px">
    <el-form ref="projectInfoForm" label-width="120px" style="width:600px" size="small"
      :model="value" :rules="rules" @next="nextStep()">
      <el-form-item label="项目类型" prop="type">
        <el-select placeholder="请选择类型"
          v-model="value.type">
          <el-option 
            v-for="item in projectTypeList"
            :key="item"
            :label="item"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="内部编号" prop="sn">
        <el-input v-model="value.sn"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <el-select placeholder="请选择区域"
          v-model="value.area">
          <el-option 
            v-for="item in areaList"
            :key="item"
            :label="item"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="value.address"></el-input>
      </el-form-item>
      <el-form-item label="主机厂商" prop="manufacturers">
        <el-select placeholder="请选择厂商"
          v-model="value.manufacturers">
          <el-option 
            v-for="item in manuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预计进场时间" prop="entrance_time">
        <el-date-picker value-format="timestamp"
          v-model="value.entrance_time"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="项目状态" prop="status">
        <el-select placeholder="请选择状态"
          v-model="value.status">
          <el-option 
            v-for="item in projectStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="small" 
          @click="handleNext('projectInfoForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {isInteger, isNum} from 'utils/validate'

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
        }
      }
    },
    created() {
      this.defaultType()
    },
    computed:{
      defaultType() {
        return this.value.type = this.value.type ? this.value.type : this.projectTypeList[0]
      }
    },
    methods: {
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
      }
    }
  }
</script>

<style scoped>
  
</style>