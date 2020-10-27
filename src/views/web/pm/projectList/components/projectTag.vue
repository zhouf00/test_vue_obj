<!--  -->
<template>
  <!-- 添加状态 -->
    <el-dialog title="状态标签"
      :visible.sync="dialogVisible" width="650px">
      <el-button size="small"  @click="addLifecycle()">新建</el-button>
      <el-table
        :data="lifecycleList">
        <el-table-column prop="title">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="addLifecycle(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px" v-if="showLifecycleParam">
        <el-form label-width="120px" :model="lifecycleParam">
          <el-form-item label="通道类型名称">
            <el-input v-model="lifecycleParam.title" style="width: 85%"></el-input>
            <el-button size="small"  style="margin-left:10px" @click="submitLifecycle()">{{isEditLifecycle ? '修改':'新增'}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
</template>

<script>
  export default {
    name: 'projectTag',
    methods: {
      isShow(dialogVisible) {
        console.log('tag')
        this.dialogVisible = true
      }
    }
  }
</script>
<style scoped>
  
</style>