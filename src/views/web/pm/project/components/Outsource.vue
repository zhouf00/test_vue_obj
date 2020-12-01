<!-- 外包信息 -->
<template>
  <div>
    <div class="table-container" style="padding: 20px">
      <el-table
        style="width: 100%"
        border
        :header-cell-style="{ background: '#F3F6FC' }"
        :data="list">
        <el-table-column label="公司名称" align="center" >
          <template slot-scope="scope">
            <el-popover 
              placement="right"
              :title="scope.row.nameInfo.title"
              width="300"
              trigger="hover">
              <p>联系人：{{scope.row.nameInfo.linkman}}</p>
              <p>手机：{{scope.row.nameInfo.phone}}</p>
              <el-button slot="reference" type="text" style="color:#606266">{{scope.row.nameInfo.title}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="承包内容" align="center">
          <template slot-scope="scope">{{scope.row.context}}</template>
        </el-table-column>
        <el-table-column label="货款支付进度" align="center">
          <template slot-scope="scope">{{scope.row.payment_rate}}%</template>
        </el-table-column>
        <el-table-column label="交付日期" align="center">
          <template slot-scope="scope">{{scope.row.delivery_time | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          </template>
          </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="isEdit? '编辑外包信息': '添加外包信息'" 
      :visible.sync="dialogVisible" width="650px">
      <el-form
        :model="outsourcerParam"
        label-width="120px">
        <el-form-item label="外包商名称" prop="type">
          <el-select placeholder="请选择监测类型"
            style="width:85%"
            v-model="outsourcerParam.name">
            <el-option v-for="item in outsourcerList"
              :key="item.id"
              :label="item.title"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="承包内容" prop="memo">
          <el-input
            type="textarea"
            :rows="4"
            v-model="outsourcerParam.context"
            style="width: 85%"/>
        </el-form-item>
        <el-form-item label="货款进度" prop="type">
          <el-input-number v-model="outsourcerParam.payment_rate" :min="0" :max="100" label="描述文字"></el-input-number>
          <!-- <el-select placeholder="请选择监测类型"
            style="width:85%"
            v-model="outsourcerParam.payment_rate">
            <el-option v-for="item in ['0','25%','50%','75%', '100%']"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="付款时间"
          prop="payment_time">
          <el-date-picker value-format="timestamp"
            style="width:300px"
            v-model="outsourcerParam.payment_time"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计交付时间"
          prop="delivery_time">
          <el-date-picker value-format="timestamp"
            style="width:300px"
            v-model="outsourcerParam.delivery_time"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" 
            @click="hendleDialogConfirm()">确认</el-button>
          <el-button size="small" 
            @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getContract, createContract, updateContract,
          getOutsourcer} from 'network/api/pm';

  import {toDate} from "utils/date"
  import filter from "views/web/mixin/filter";

  export default {
    name: 'Outsource',
    mixins: [filter],
    data () {
      return {
        dialogVisible:false,
        isEdit: false,
        visible: false,

        list: [
          // {name: '保定精瑞工程技术有限公司', context: '传动链安装', payment: '75%', date: new Date('2020-12-1 18:00')}
        ],
        
        outsourcerParam: Object.assign({}),
        outsourcerList: [
          // {id:1, title:'保定精瑞工程技术有限公司',}
        ]
      }
    },
    created () {
      this.getList()
    },
    methods: {
      isShow (dialogVisible) {
        this.dialogVisible = dialogVisible
        this.isEdit = false
        this.outsourcerParam = Object.assign({})
        this.getOutsourcerList()
      },
      handleUpdate (index, row) {
        this.dialogVisible = true
        this.isEdit = true
        if (row.delivery_time) {
          row.delivery_time = new Date(row.delivery_time);
          // row.payment_time = new Data(row.payment_time)
        }
        if (row.payment_time) {
          row.payment_time = new Date(row.payment_time)
        }
        this.outsourcerParam = Object.assign({}, row)
        this.getOutsourcerList()
      },
      getList () {
        getContract({project:this.$route.query.id}).then( response => {
          this.list = response
          // console.log('外包信息', this.list)
        })
      },
      getOutsourcerList () {
        getOutsourcer().then( response => {
          this.outsourcerList = response
        })
      },
      hendleDialogConfirm () {
        this.outsourcerParam = toDate(this.outsourcerParam, 'delivery_time')
        this.outsourcerParam = toDate(this.outsourcerParam, 'payment_time')
        // console.log(this.outsourcerParam)
        if (this.isEdit){
          // console.log('修改')
          updateContract(this.outsourcerParam.id, this.outsourcerParam).then(response => {
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
          this.outsourcerParam.project = Number(this.$route.query.id)
          createContract(this.outsourcerParam).then(response => {
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
    }
  }
</script>
<style scoped>
  
</style>