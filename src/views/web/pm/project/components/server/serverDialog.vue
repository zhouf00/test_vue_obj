<!-- 服务器添加、修改界面 -->
<template>
  <el-card class="form-container" shadow="never">
    <div style="magin-top:50px">
      <el-form label-width="120px" style="width: 600px" size="small">
        <el-form-item label="服务器品牌">
          <el-select v-model="serverParam.barnd">
            <el-option v-for="item in barnd"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器型号">
          <el-select v-model="serverParam.model">
            <el-option v-for="item in barnd"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

  const defaultServer = {
    barnd: '戴尔',
    model: 'SR550'
  }

  export default {
    name: 'serverDialog',
    data() {
      return {
        barnd: ['戴尔 DELL', '联想 Lenovo', '华为 HUAWEI', '浪潮'],
        serverParam: Object.assign({}, defaultServer)
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  .form-container {
    width: 800px;
  }
</style>