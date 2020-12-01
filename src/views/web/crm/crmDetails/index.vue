<!--  -->
<template>
  <div class="app-container">
    <!-- 筛选角色 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start" style="justify-content: space-between;">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px" />
          <span>{{saleParam.title}} 商机</span>
        </div>
        <div v-if="!isEdit">
          <el-button style="float:right" type="primary" size="small" @click="isUpdate()">修改</el-button>
        </div>
        <div v-else>
          <el-button type="primary"
            size="small"
            @click="handleConfigForm('saleForm')">确认</el-button>
          <el-button 
            size="small"
            @click="isEdit=false">取消</el-button>
        </div>
      </div>
      <el-form ref="saleForm"
          size="small"
          label-width="100px"
          style="margin:20px"
          :model="saleParam"
          :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户">
              <el-input v-model="saleParam.customer" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商机名称" prop="title">
              <el-input v-model="saleParam.title" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="集团公司">
              <el-input v-model="saleParam.company" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="地区">
              <el-select placeholder="请选择省份"
                filterable
                style="width:90%"
                v-model="saleParam.address"
                :disabled="! isEdit">
                <el-option v-for="item in provinceList"
                  :key="item"
                  :label="item"
                  :value="item"></el-option>
              </el-select>
              <!-- <el-input v-model="saleParam.address" style="width:90%" :disabled="! isEdit"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设计院">
              <el-input v-model="saleParam.designing_institute" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制造厂">
              <el-input v-model="saleParam.manufacturer" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="编号">
              <el-input v-model="saleParam.sn" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备数量">
              <el-input v-model="saleParam.count" style="width:90%" :disabled="! isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计时间" prop="estimated_time">
              <el-date-picker value-format="timestamp"
                style="width:90%"
                v-model="saleParam.estimated_time"
                :disabled="! isEdit"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预额" prop="estimated_amount">
              <el-input v-model="saleParam.estimated_amount" style="width:85%" :disabled="! isEdit"></el-input> 万
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类别">
              <el-select placeholder="请选择类别"
                style="width:90%"
                multiple
                v-model="saleParam.type"
                :disabled="! isEdit">
                <el-option v-for="item in productList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            
          </el-col>
        </el-row>
        <div>
          <el-form-item label="负责人">
              <el-select v-model="saleParam.user" multiple style="width:26%" disabled>
                <el-option v-for="item in usersList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" style="width:97%" v-model="saleParam.memo" :disabled="! isEdit"></el-input>
          </el-form-item>
        </div>
      </el-form>  
    </el-card>

    <!-- 项目进展信息 -->
    <el-card class="filter-container"
      shadow="hover"
      body-style="padding:20"
      style="margin-top:20px">
      <div class="outsideTheContainer" style="justify-content: space-between;">
        <div style="width:50%;display: flex;justify-content: center;">
          <div class="leftTable">
            <div>
              <p>预额</p>
              <el-divider></el-divider>
              <p class="number" v-if="saleParam.estimated_amount">{{saleParam.estimated_amount }}万</p>
              <p class="number" v-else>0万</p>
            </div>
            <div>
              <p>命中率</p>
              <el-divider></el-divider>
              <p class="number">{{saleParam.hit_rate*100}}%</p>
            </div>
            <div>
              <p>漏额</p>
              <el-divider></el-divider>
              <p class="number">{{saleParam.estimated_amount*saleParam.hit_rate}}万</p>
            </div>
          </div>
        </div>
        {{saleParam.rateInfo}}
        <div class="rightTable">
          <el-table :data="saleParam.raterecordList" border>
            <el-table-column label="命中率" align="center" prop="hit_rate">
              <template slot-scope="scope" >
                <span>{{scope.row.hit_rate*100}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="天数" align="center" prop="days">
              <template slot-scope="scope" >
                <span v-if="scope.row.hit_rate === saleParam.hit_rate">{{scope.row.days + calcDays(scope.row.hit_rate, scope.row.start_time).days}}</span>
                <span v-else>{{scope.row.days}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- 通讯录 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0" style="margin-top:20px">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>联系人</span>
        </div>
        <el-button size="mini" class="btn-add" style="margin-left: 20px" @click="handleAddLinkman()">添加</el-button>
      </div>
      <sale-linkman ref="saleLinkmanVisible"
        size="small"
        label-width="100px"
        style="margin:20px"></sale-linkman>
    </el-card>

    <!-- 跟踪表 -->
    <el-card  class="filter-container" shadow="hover" body-style="padding:0" style="margin-top:20px">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>项目跟踪情况</span>
        </div>
        <el-button size="mini" class="btn-add" style="margin-left: 20px" @click="handleAddTrace()">填写跟进</el-button>
      </div>
      <sale-trace ref="saleTraceVisible"
        size="small"
        label-width="100px"
        style="margin:20px"
        @traceRefresh="traceRefresh"></sale-trace>
    </el-card>
  </div>
</template>

<script>
import {getMarketInfo, createMarket, updateMarket } from "network/api/crm"
// import {a} from "network/api/pms"
import { fetchUserList } from "network/api/login";
import { getProduct } from "network/api/pms";

import {toDate} from "utils/date"
import {calcDays, global} from "views/web/mixin";

import saleTrace from './components/saleTrace'
import saleLinkman from './components/saleLinkman'  



export default {
  name: "crmDetails",
  components: {
    saleTrace,
    saleLinkman
  },
  mixins:[ calcDays,global ],
  data() {
    return {
      isEdit: false,
      dialogVisible: false,

      saleParam: Object.assign({}),
      rules: {
        title: [{ required: true, message: "必填项" }],
        estimated_time: [{ required: true, message: "必填项" }],
        estimated_amount:[{ required: true, message: "必填项" }],
      },
      
      usersList: [],
      productList:[]
    }
  },
  created() {
    this.isAdd()
    if (this.$route.query.id) {
      this.getMarketParam();
    }
    this.getUsersList();        // 拉取用户信息
    this.getProductList();      // 拉取产品信息
  }, 
  methods: {
    isAdd () {
      if(! this.$route.query.id) {
        this.isEdit = true
      }
      this.saleParam = Object.assign({}, {
        user: [this.$store.getters.id],
        estimated_amount: 0,
        hit_rate: 0
      })
      // console.log(this.saleParam)
    },
    isUpdate () {
      this.isEdit = true
    },
    getMarketParam () {
      getMarketInfo(this.$route.query.id).then(response => {
        this.saleParam = response
        this.saleParam.estimated_time = new Date(response.estimated_time);
        // console.log(this.saleParam)
      })
    },
    getUsersList() {
      fetchUserList().then(response => {
        this.usersList = response;
        // console.log(this.usersList)
      });
    },
    getProductList() {
      getProduct().then(response => {
        this.productList = response.results
        console.log(response)
      })
    },
    handleConfigForm (formName) {
      this.saleParam = toDate(this.saleParam, "estimated_time")
      // console.log(this.saleParam)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saleParam = toDate(this.saleParam, "estimated_time")
          if (this.$route.query.id) {
            // console.log('修改')
            updateMarket(this.$route.query.id, this.saleParam).then(response => {
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
                this.isEdit = false
                this.saleParam = response
                this.getMarketParam()
              }
            })
          } else {
            // console.log('新建')
            createMarket(this.saleParam).then(response => {
              // console.log(response)
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
                console.log(response)
                this.isEdit = false
                this.$router.push({ name: "crmDetails", query: {id:response.results.id}}).catch(()=>{});
                this.getMarketParam()
              }
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
    handleAddLinkman () {
      this.$refs['saleLinkmanVisible'].isShow(true)
    },
    handleAddTrace () {
      this.$refs['saleTraceVisible'].isShow(true, this.saleParam)
    },   
    traceRefresh () {
      this.getMarketParam()
    } 
  },
  
};
</script>
<style lang="scss" scoped>
.buttonSet {
  display: flex;
  justify-content: flex-end;
}

.outsideTheContainer {
  width: 100%;
  display: flex;
  .leftContainer,
  .rightContainer {
    width: 50%;
    overflow: auto;
  }
  .leftTable {
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      text-align: center;
      .number {
        font-size: 20px;
      }
    }
  }
  .rightTable {
    width: 45%;
  }
}
.equipmentForm {
  border: solid 1px #dcdfe6;
  td {
    padding: 5px;
    width: 200px;
    border: solid 1px #dcdfe6;
  }
  text-align: center;
}
/deep/.el-divider {
  margin: 10px 0;
}
</style>
