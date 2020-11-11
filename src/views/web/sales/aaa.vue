<!-- 角色权限 -->
<template>
  <div class="app-container">
    <!-- 筛选角色 -->
    <el-card class="filter-container" shadow="hover" body-style="padding:0">
      <div class="operate-container-header-start" style="justify-content: space-between;">
        <div>
          <i class="el-icon-tickets" style="margin-right: 10px" />
          <span>商机</span>
        </div>
        <el-button style="float:right" type="primary" size="small" @click="modification()">修改</el-button>
      </div>
      <div style="padding:20px">
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
                <el-form-item label="谜面">
                  <el-input v-model="dengmiQueryForm.mimian" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="谜目">
                  <el-input v-model="dengmiQueryForm.mimu" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="谜格">
                  <el-input v-model="dengmiQueryForm.mige" style="width:300px"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="rightContainer">
              <div>
                <el-form-item label="谜底">
                  <el-input v-model="dengmiQueryForm.midi" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="作者">
                  <el-input v-model="dengmiQueryForm.zuozhe" style="width:300px"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="谜底字数">
                  <el-input v-model="dengmiQueryForm.midiLength" style="width:300px"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="buttonSet">
                <el-button @click="submitForm">取消</el-button>
                <el-button type="primary" @click="resetForm">完成</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-card
      class="filter-container"
      shadow="hover"
      body-style="padding:20"
      style="margin-top:20px"
    >
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
              <td>设备名</td>
              <td>转速</td>
            </tr>
            <tr>
              <td>MAS2326</td>
              <td>1768rpm</td>
            </tr>
            <tr>
              <td>设备名</td>
              <td>转速</td>
            </tr>
            <tr>
              <td>MAS2326</td>
              <td>1768rpm</td>
            </tr>
          </table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "aaa",
  data() {
    return {
      dengmiQueryForm: {
        mimian: "",
        mimu: "",
        mige: "",
        midi: "",
        zuozhe: "",
        midiLength: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    modification() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
