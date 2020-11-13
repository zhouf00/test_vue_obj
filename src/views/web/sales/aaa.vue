<!--  -->
<template>
  <div class="app-container">
    <!-- 筛选角色 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start" style="justify-content: space-between;">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px" />
          <span>台湾和平电厂辅机加装S8000系统升级项目 商机</span>
        </div>
        <el-button style="float:right" type="primary" size="small" @click="modification()">修改</el-button>
      </div>
      <el-form size="small"
          label-width="100px"
          style="margin:20px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户">
              <el-input v-model="saleParam.a" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商机">
              <el-input v-model="saleParam.b" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目公司">
              <el-input v-model="saleParam.c" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="编号">
              <el-input v-model="saleParam.k" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备数量">
              <el-input v-model="saleParam.l" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计时间">
              <el-input v-model="saleParam.m" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="地区">
              <el-input v-model="saleParam.d" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设计院">
              <el-input v-model="saleParam.e" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制造厂">
              <el-input v-model="saleParam.f" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预额">
              <el-input v-model="saleParam.g" style="width:85%"></el-input> 万
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="命中率">
              <el-select v-model="saleParam.h">
                <el-option v-for="item in ['0', '25%', '50%', '75%']"
                  :key="item"
                  :label="item"
                  :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人">
              <el-select v-model="saleParam.i">
                <el-option v-for="item in ['钢铁侠', '蜘蛛侠', '美国队长', '雷神']"
                  :key="item"
                  :label="item"
                  :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-form-item label="备注">
            <el-input type="textarea" style="width:97%"
              v-model="saleParam.j"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <div style="padding:20px">
        <el-form
          :model="dengmiQueryForm"
          ref="dengmiQueryForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <div class="outsideTheContainer">
            <div class="leftContainer">
              <div>
                <el-form-item label="客户">
                  <el-input v-model="dengmiQueryForm.mimian" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="商机">
                  <el-input v-model="dengmiQueryForm.mimu" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="项目公司">
                  <el-input v-model="dengmiQueryForm.mige" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="地区">
                  <el-input v-model="dengmiQueryForm.mige" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="预额">
                  <el-input v-model="dengmiQueryForm.midiLength" style="width:300px"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="rightContainer">
              <div>
                <el-form-item label="类别">
                  <el-input v-model="dengmiQueryForm.midi" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="设计院">
                  <el-input v-model="dengmiQueryForm.zuozhe" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="制造厂">
                  <el-input v-model="dengmiQueryForm.midiLength" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="预计时间">
                  <el-input v-model="dengmiQueryForm.midiLength" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="命中率">
                  <el-input v-model="dengmiQueryForm.midiLength" style="width:300px"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div>
            <el-form-item label="负责人">
              <el-select>
                <el-option></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" style="width:400px"></el-input>
            </el-form-item>
          </div>
          <el-row>
            <el-col>
              <div class="buttonSet">
                <el-button @click="submitForm">取消</el-button>
                <el-button type="primary" @click="resetForm">完成</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div> -->
    </el-card>

    <el-card
      class="filter-container"
      shadow="hover"
      body-style="padding:20"
      style="margin-top:20px">
      <div class="outsideTheContainer" style="justify-content: space-between;">
        <div style="width:50%;display: flex;justify-content: center;">
          <div class="leftTable">
            <div>
              <p>预额</p>
              <el-divider></el-divider>
              <p class="number">1000万</p>
            </div>
            <div>
              <p>命中率</p>
              <el-divider></el-divider>
              <p class="number">50%</p>
            </div>
            <div>
              <p>漏额</p>
              <el-divider></el-divider>
              <p class="number">500万</p>
            </div>
          </div>
        </div>
        <div class="rightTable">
          <table class="equipmentForm" border="1" cellspacing="0" cellpadding="0">
            <tr>
              <td>0</td>
              <td>20天</td>
            </tr>
            <tr>
              <td>25%</td>
              <td>20天</td>
            </tr>
            <tr>
              <td>50%</td>
              <td>20天</td>
            </tr>
            <tr>
              <td>75%</td>
              <td>120天</td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>
    <el-card  class="filter-container" shadow="hover" body-style="padding:0" style="margin-top:20px">
      <div class="operate-container-header">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px"></i>
          <span>数据列表</span>
        </div>
        <el-button size="mini" class="btn-add" style="margin-left: 20px" @click="handleAddTrace()">填写跟进</el-button>
      </div>
      <sale-trace size="small"
          label-width="100px"
          style="margin:20px"></sale-trace>
    </el-card>
  </div>
</template>

<script>
import saleTrace from './components/saleTrace'
export default {
  name: "aaa",
  components: {
    saleTrace
  },
  data() {
    return {
      saleParam: {},
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleAddTrace() {

    }
  }
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
