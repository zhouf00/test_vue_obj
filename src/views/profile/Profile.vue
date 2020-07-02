<!-- 用户中心 -->
<template>
  <div>
    <i class="el-icon-edit"></i><br>
    <el-radio-group v-model="direction">
      <el-radio label="ltr">打开</el-radio>
      <el-radio label="rtl">关闭</el-radio>
    </el-radio-group>
    <div>
      <span class="wrapper">
        <el-button type="success">按钮</el-button>
        <el-button type="danger">按钮</el-button>
      </span>
      <el-button :plain="true" type="success">按钮</el-button>
      <el-button :plain="true" type="danger">按钮</el-button>
      <el-button  type="primary" plain round>按钮</el-button>
    </div>
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-radio-group v-model="radio2">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
      </el-radio-group>
    </div>
      <el-radio-group v-model="radio">
        <el-radio :label="3"></el-radio>
        <el-radio :label="6"></el-radio>
        <el-radio :label="9"></el-radio>
      </el-radio-group>
  </div>

</template>

<script>
  export default {
    name: 'ProFile',
    data() {
      return {
        drawer: flase,
        direction: 'rtl',
        radio1:'北京',
        radio: 3
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
<style scoped>

</style>  