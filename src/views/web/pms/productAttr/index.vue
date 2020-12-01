<!-- 产品类型信息 -->
<template>
  <div class="app-container">
    <!-- 筛选用户 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start">
        <div>
          <i class="el-icon-search" style="margin-right: 10px" />
          <span>筛选搜索</span>
        </div>
      </div>
      <div class="operate-container-body-two"></div>
    </el-card>
    <!-- 数据列表添加 -->
    <el-card class="operate-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>产品列表</span>                  
        </div>
        <el-button
          class="btn-add"
          size="small"
          @click="handleAdd()"
          type="primary"
          plain>添加</el-button>
      </div>
      <div class="operate-container-body">
        <el-table
          ref="rbacTable"
          :data="list"
          style="width:100%"
          v-loading="listLoading"
          :header-cell-style="{ background: '#F3F6FC' }"
          border>
          <el-table-column label="编号" width="60" align="center">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column label="设备名称" width="150" align="center">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="型号" width="120" align="center">
            <template slot-scope="scope">{{scope.row.model}}</template>
          </el-table-column>
          <el-table-column label="硬件版本" width="120" align="center">
            <template slot-scope="scope">{{scope.row.hard_version}}</template>
          </el-table-column>
          <el-table-column label="通道类型" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.aisleInfo">{{scope.row.aisleInfo.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.statusInfo.title}}</span>
            </template>
          </el-table-column>
          <el-table-column label="产品说明" align="center">
            <template slot-scope="scope">{{scope.row.memo}}</template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :current-page.sync="listQuery.page"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>

    <!-- 产品新建修改 -->
    <el-dialog :title="isEdit? '编辑产品信息': '添加产品信息'"
      :visible.sync="dialogVisible" width="650px">
      <el-form ref="prodcutAttrForm"
        :model="productParam"
        :rules="rules"
        label-width="120px"s>
        <el-form-item label="设备名称" prop="title">
          <el-input v-model="productParam.title" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input v-model="productParam.model" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="硬件版本" prop="hard_version">
          <el-input v-model="productParam.hard_version" style="width: 85%"
            placeholder="请输入硬件版本"/>
        </el-form-item>
        <el-form-item label="通道类型" prop="aisleType">
          <el-select v-model="productParam.aisle" placeholder="请选择通道类型">
            <el-option v-for="item in aisleList"
              :key="item.id"
              :label="item.title"
              :value="item.id"></el-option>
          </el-select>
          <el-button style="margin-left:10px"
            icon="el-icon-edit"
            circle
            @click="AisleDialogVisible = true"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="productParam.status" placeholder="请选择状态">
            <el-option v-for="item in statusList"
              :key="item.id"
              :label="item.title"
              :value="item.id"></el-option>
          </el-select>
          <el-button style="margin-left:10px"
            icon="el-icon-edit"
            circle
            @click="StatusDialogVisible=true"/>
        </el-form-item>
        <el-form-item label="产品说明" prop="memo">
          <el-input
            type="textarea"
            :rows="4"
            v-model="productParam.memo"
            style="width: 85%"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="hendleDialogConfirm('prodcutAttrForm')">确认</el-button>
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加通道 -->
    <el-dialog title="通道类型标签"
      :visible.sync="AisleDialogVisible" width="650px">
      <el-button size="small"  @click="addEdit()">新建</el-button>
      <el-table
        :data="aisleList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addEdit(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px" >
        <el-form label-width="120px" :model="editParam">
          <el-form-item label="通道类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitAisle()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加状态 -->
    <el-dialog title="状态标签"
      :visible.sync="StatusDialogVisible" width="650px">
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
          <el-form-item label="通道类型名称">
            <el-input v-model="editParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitStatus()">{{isEditTag ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 import { getProduct, createProduct, updateProduct,
          getAisle, createAisle, updateAisle,
          getStatus, createStatus, updateStatus,
          getLifecycle, createLifecycle, updateLifecycle} from 'network/api/pms'
  const defaultListQuery = {
    page: 1,
    pageSize: 5,
  }
  export default {
    name: 'productAttr',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        listLoading: null,
        total: 0,

        list: [],
        isEdit: null,
        productParam: Object.assign({}),
        rules: {
          title: [{ required: true, message: "必填项" }],
          hard_version: [{ required: true, message: "必填项" }],
          model:[{ required: true, message: "必填项" }],
          // aisleType: [{ required: true, message: "必填项" }],
          status: [{ required: true, message: "必填项" }],
        },
        dialogVisible: false,
        
        editParam: Object.assign({}),
        isEditTag: false,

        aisleList:[],
        AisleDialogVisible: false,

        statusList:[],
        StatusDialogVisible:false

      };
    },
    created() {
      this.getaisleList()
      this.getStatusList()
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getProduct(this.listQuery).then(response => {
          this.list = response.results
          this.total = response.count;
          this.listLoading = false
          console.log(this.list)
        })
      },
      getStatusList() {
        getStatus().then(response => {
          this.statusList = response
        })
      },
      getaisleList() {
        getAisle().then( response => {
          this.aisleList = response
          // console.log(this.aisleList)
        })
      },
      handleAdd() {
        this.isEdit = false
        this.productParam = Object.assign({})
        this.dialogVisible = true
      },
      handleUpdate(index, row) {
        this.isEdit = true
        this.dialogVisible = true
        this.productParam = Object.assign({},row)
      },
      hendleDialogConfirm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.isEdit){
              // console.log('修改')
              updateProduct(this.productParam.id, this.productParam).then(response => {
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
              // console.log('新建')
              createProduct(this.productParam).then(response => {
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
          } else {
            this.$message({
              message: "带*号的为必填项",
              type: "error",
              durattion: 1000
            });
            return false;
          }
        })
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
      // 通道标签
      submitAisle() {
        if (this.isEditTag) {
          updateAisle(this.editParam.id, this.editParam).then(response => {
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
              this.getaisleList()
            }
          })
        } else {
          createAisle(this.editParam).then(response => {
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
              this.getaisleList()
            }
          })
        }
        this.showAisleParam = false       
      },
      // 状态标签
      submitStatus() {
        if (this.isEditTag) {
          updateStatus(this.editParam.id, this.editParam).then(response => {
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
              this.getStatusList()
            }
          })
        } else {
          createStatus(this.editParam).then(response => {
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
              this.getStatusList()
            }
          })
        }
        this.showLifecycleParam = false      
      },
      
      handleSizeChange(val) {
        this.listQuery.page = 1
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
    }
  }
</script>
<style scoped>
  
</style>