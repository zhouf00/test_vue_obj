<!-- 机房信息 -->
<template>
  <div>
    <div class="table-container" style="padding: 20px">
      <el-table
        style="width: 100%"
        border
        :header-cell-style="{ background: '#F3F6FC' }"
        :data="list">
        <el-table-column label="设备名称" align="center" width="120">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="SN号" align="center">
          <template slot-scope="scope">{{scope.row.sn}}</template>
        </el-table-column>
        <el-table-column label="设备描述" align="center">
          <template slot-scope="scope">{{scope.row.memo}}</template>
        </el-table-column>
        <el-table-column label="软件版本" align="center" width="130">
          <template slot-scope="scope">{{scope.row.software}}</template>
        </el-table-column>
        <el-table-column label="IP地址" align="center">
          <template slot-scope="scope">{{scope.row.ip}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          </template>
          </el-table-column>
      </el-table>
    </div>

    <!-- 机房设备新增与修改 -->
    <el-dialog :title="isEdit? '编辑机房设备': '添加机房设备'" 
      :visible.sync="dialogVisible" width="650px">
      <el-form ref="ruleForm"
        :model="idcroomParem"
        :rules="rules"
        label-width="120px">
        <el-form-item label="设备名称" prop="title">
          <el-input v-model="idcroomParem.title" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="SN号" prop="sn">
          <el-input v-model="idcroomParem.sn" style="width: 85%" placeholder="sn(快速服务代码)"/>
        </el-form-item>
        <el-form-item label="设备描述" prop="describe">
          <el-input
            type="textarea"
            :rows="4"
            v-model="idcroomParem.describe"
            style="width: 85%"/>
        </el-form-item>
        <el-form-item label="软件版本" prop="software">
          <el-input v-model="idcroomParem.software" style="width: 85%"
            placeholder="请输入软件版本"/>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip" >
          <el-input type="textarea"  style="width: 85%"
            :rows="3"
            v-model="idcroomParem.ip"/>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input
            type="textarea"
            :rows="4"
            v-model="idcroomParem.memo"
            style="width: 85%"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verifyForm('ruleForm',handleDialogConfirm)">确定</el-button>
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>


</template>

<script>
  import { getIdcRoom, createIdcRoom, updateIdcRoom } from 'network/api/pm'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    project: null
  }
  const defaultAsset = {
    describe: "cpu:xxx / 内存:xxx / 硬盘:xxx / RAID:xxx / 阵列卡:xxx\n系统版本:windows 2008\n帐号密码:administrator/12345",
    ip: "网卡1:x.x.x.x\t掩码:x.x.x.x\t网关:x.x.x.x\n",
  }
  export default {
    name: 'IdcRoom',
    props: {
      value: Array,
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        dialogVisible:false,
        isEdit: false,
        list:　[],
        idcroomParem: Object.assign({}, defaultAsset),
        rules: {
          title: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
          software: [{ required: true, message: "请输入版本号", trigger: "blur" }],
          ip: [
            { required: true, message: "请输入IP地址", trigger: "blur" }
          ]
        },
      }
    },
    created() {
      this.listQuery.project = Number(this.$route.query.id)
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getIdcRoom(this.listQuery).then( response => {
          this.list = response.results
          this.listLoading = false
          console.log(this.list)
        })
      },
      handleUpdate(index, row) {
        this.isEdit = true
        this.dialogVisible = true
        this.idcroomParem = Object.assign({}, row);
      },
      isShow(dialogVisible) {
        this.isEdit = false
        this.dialogVisible = dialogVisible
        this.idcroomParem = Object.assign({}, defaultAsset);
      },
      handleDialogConfirm() {
        if (this.isEdit) {
          console.log("修改")
          console.log(this.idcroomParem)
          updateIdcRoom(this.idcroomParem.id, this.idcroomParem).then(response => {
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
              this.getList()
              this.dialogVisible = false
            }
          })
        } else {
          console.log("新增")
          this.idcroomParem.project = this.listQuery.project;
          console.log(this.idcroomParem)
          createIdcRoom(this.idcroomParem).then( response => {
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
              this.getList()
              this.dialogVisible = false
            }
            
          })
        }
      },
      verifyForm(formName, obj){
        this.$refs[formName].validate(valid => {
          if (valid) {
            obj()
          } else {
            this.$message({
              message: "带*号的为必填项",
              type: "error",
              durattion: 1000
            });
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
  
</style>