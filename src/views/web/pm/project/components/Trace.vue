<!-- 跟踪表 -->
<template>
  <div>
    <div>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入项目跟踪情况"
          v-model="traceParam.content"/>
          <div style="text-align: right" >
            <el-button size="mini" type="primary"
              @click="handleTrace()">发布</el-button>
            <el-button size="mini">取消</el-button>
          </div>
      </div>
      <h3>项目跟踪情况</h3>
      <div style="margin-top: 10px">
        <div v-for="item in list">
          <el-avatar :src="item.userInfo.avatar" :size="20"/>
          <span v-if="item.userInfo.name"> {{item.userInfo.name}} </span>
          <span v-else> {{item.userInfo.username}} </span>
          <span style="font-size:12px">{{item.create_time | formatDateTime('hh:mm:ss') }}</span>
          <div style="margin-left: 50px">
            {{item.content}}
          </div>
          <el-divider/>
        </div>
      </div>
      <el-button type="text">查看更多</el-button> 
  </div>
</template>

<script>
  import filter from "views/web/mixin/filter";
  import { getTrace, createTrace } from 'network/api/pm'
  export default {
    name: 'Trace',
    mixins: [filter],
    data() {
      return {
        traceParam:Object.assign({}),
        list: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getTrace({search:this.$route.query.id}).then(response =>{
          this.list = response
        })
      },
      handleTrace() {
        this.traceParam.project = this.$route.query.id
        this.traceParam.user = this.$store.getters.id
        createTrace(this.traceParam).then(response => {
          if (response.err) {
              this.$message({
                type: "warning",
                message: response.err,
                duration: 3000
              });
            } else {
              this.$message({
                type: "success",
                message: "提交成功",
                duration: 1000
              });
              this.getList(),
              this.traceParam = Object.assign({})
            }
        })
      }
    }
    
  }
</script>

<style scoped>
  
</style>