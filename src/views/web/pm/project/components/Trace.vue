<!-- 跟踪表 -->
<template>
  <div>
    <div v-if="dialogVisible">
      <el-input type="textarea" :rows="3" placeholder="请输入项目跟踪情况" v-model="traceParam.content" />
      <div style="text-align: right;margin-top: 5px">
        <el-button size="mini" type="primary" @click="handleTrace()">发布</el-button>
        <el-button size="mini" @click="dialogVisible=false">取消</el-button>
      </div>
    </div>
    <el-row style="margin-top: 10px">
      <el-col :span="12">
        <h3>项目跟踪情况</h3>
      </el-col>
      <el-col :span="12">
        <div style="text-align: right" v-if="!dialogVisible">
          <el-button size="mini" @click="dialogVisible = ! dialogVisible">填写跟踪</el-button>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 10px;height: 160px;overflow: auto;">
      <div v-for="(item, index) in list" :key="item.id">  
        <el-avatar :src="item.userInfo.avatar" :size="20" />
        <span v-if="item.userInfo.name">{{item.userInfo.name}}</span>
        <span v-else>{{item.userInfo.username}}</span>
        <span style="font-size:12px;margin-left: 5px">{{item.create_time | formatDateTime('hh:mm:ss') }}</span>    
        <span style="margin-left: 50px">第{{list.length - index}}条</span>
        <div style="margin-left: 50px">{{item.content}}</div>
        <el-divider />
      </div>
    </div>
    <!-- <el-button type="text">查看更多</el-button> -->
  </div>
</template>

<script>
import filter from "views/web/mixin/filter";
import { getTrace, createTrace } from "network/api/pm";
export default {
  name: "Trace",
  mixins: [filter],
  data() {
    return {
      traceParam: Object.assign({}),
      list: [],
      dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getTrace({ project: this.$route.query.id}).then(response => {
        this.list = response;
        // console.log(this.list)
      });
    },
    handleTrace() {
      this.traceParam.project = this.$route.query.id;
      this.traceParam.user = this.$store.getters.id;
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
          this.getList(), (this.traceParam = Object.assign({}));
        }
      });
    },
  }
};
</script>

<style scoped>
</style>