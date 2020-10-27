<!-- 产品信息 -->
<template>
  <div>
    <div class="table-container" style="padding: 20px">
        <el-table
          style="width: 100%"
          border
          :header-cell-style="{ background: '#F3F6FC' }"
          :data="list">
          <el-table-column label="风机号" align="center">
            <template slot-scope="scope">{{scope.row.facility}}</template>
          </el-table-column>
          <el-table-column label="采集器编号" align="center">
            <template slot-scope="scope">{{scope.row.sn}}</template>
          </el-table-column>
          <el-table-column label="采集器型号" align="center">
            <template slot-scope="scope">{{scope.row.productInfo.model}}</template>
          </el-table-column>
          <el-table-column label="嵌入式版本" align="center">
            <template slot-scope="scope">{{scope.row.sw}}</template>
          </el-table-column>
          <el-table-column label="采集器IP" align="center">
            <template slot-scope="scope">{{scope.row.ip}}</template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">{{scope.row.lifecycleInfo.title}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini">查看</el-button>
              <el-button size="mini" 
                @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--  -->
      <el-dialog :title="isEdit? '编辑采集器': '添加采集器'" 
      :visible.sync="dialogVisible" width="650px">
        <el-form 
        :model="productionParam"
        label-width="120px"
        class="demo-ruleForm">
        <el-form-item label="风机号" prop="title">
          <el-input v-model="productionParam.facility" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="采集器型号">
          <el-select placeholder="请选择采集器"
            style="width:300px"
            v-model="productionParam.product"
            @change="emitSelect()">
            <el-option v-for="item in productList"
              :key="item.id"
              :label="item.title"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showProduct">
          <el-row>
            <el-col :span="6" class="table-cell-title">名称</el-col>
            <el-col :span="6" class="table-cell-title">型号</el-col>
            <el-col :span="6" class="table-cell-title">硬件版本</el-col>
            <el-col :span="6" class="table-cell-title">通道类型</el-col>
        </el-row>
        <el-row>
            <el-col :span="6" class="table-cell-title">{{showProduct.title}}</el-col>
            <el-col :span="6" class="table-cell-title">{{showProduct.model}}</el-col>
            <el-col :span="6" class="table-cell-title">{{showProduct.hard_version}}</el-col>
            <el-col :span="6" class="table-cell-title">{{showProduct.aisleInfo.title}}</el-col>
        </el-row>
        </el-form-item>
        <el-form-item label="采集器编号" prop="title">
          <el-input v-model="productionParam.sn" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="嵌入式版本" prop="version">
          <el-input v-model="productionParam.sw" style="width: 85%"
            placeholder="请输入嵌入式版本"/>
        </el-form-item>
        <!-- <el-form-item label="生命周期" prop="version">
          <el-input v-model="productionParam.lifecycle" style="width: 85%"
            placeholder="请输入嵌入式版本"/>
        </el-form-item> -->
        <el-form-item label="设备描述" prop="memo">
          <el-input
            type="textarea"
            :rows="4"
            v-model="productionParam.memo"
            style="width: 85%"/>
        </el-form-item>
        <el-form-item label="IP地址" prop="IPaddress" >
          <el-input type="textarea"  style="width: 85%"
            :rows="3"
            v-model="productionParam.ip"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleDialogConfirm()">确定</el-button>
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
  </div>
</template>

<script>
 import { getProduction, createProduction, updateProduction,
          getProduct,  } from 'network/api/product'
 const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    project: null
  }
  export default {
    name: 'product',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        dialogVisible:false,
        isEdit: false,
        listLoading: true,
        productionParam: Object.assign({}),
        showProduct: null,
        list: [],
        productList: [],

        // 测试数据
 
      }
    },
    created() {
      this.listQuery.project = Number(this.$route.query.id)
      this.getProductList()
      this.getList()
    },
    methods: {
      isShow(dialogVisible) {
        this.isEdit = false
        this.dialogVisible = dialogVisible
      },
      getList() {
        this.listLoading = true
        getProduction(this.listQuery).then(response => {
          this.list = response.results
          this.listLoading = false
          console.log(this.list)
        })
      },
      getProductList() {
        getProduct().then(response => {
          this.productList = response.results
          console.log(this.productList)
        })
      },
      handleUpdate(index, row) {
        this.isEdit = true
        this.dialogVisible = true
        this.productionParam = Object.assign({}, row)
      },
      handleDialogConfirm() {
        if (this.isEdit) {
          updateProduction(this.productionParam.id, this.productionParam).then(response => {
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
            }
            this.getList()
            this.dialogVisible = false
          })
        } else {
          console.log('新增')
          this.productionParam.project = this.listQuery.project;
          createProduction(this.productionParam).then(response => {
            console.log(response)
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
            }
            this.getList()
            this.dialogVisible = false
          })
        }
      },
      emitSelect() {
        this.showProduct = this.getVar(this.productionParam.product, this.productList)
      }
    },
    computed:{
    getVar (){
      return function (a, list, val='id') {
        for(let i in list) {
          if (list[i][val] == a){
            return list[i]
          }
        }
      }
    }
  }
  }
</script>
<style scoped>
  
</style>