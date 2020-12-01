<!-- 跟踪表 -->
<template>
  <div>
    <div v-if="showIssue">
      <el-form>
        <el-row>
          <el-form-item label="命中率"
            prop="builders">
            <el-select placeholder="请选择是否升降"
              v-model="traceParam.hit_rate">
              <el-option v-for="item in rateList"
                :key="item.value"
                :label="item.title"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-input type="textarea" :rows="3" placeholder="请输入项目跟踪情况" v-model="traceParam.content" />
      </el-form>
      <div style="text-align: right;margin-top:5px">
        <el-button size="mini" type="primary" @click="handleTrace()">发布</el-button>
        <el-button size="mini" @click="showIssue=false">取消</el-button>
      </div>
    </div>
    <div style="margin-top: 10px;height: 200px;
    overflow: auto;">
      <div v-for="(item, index) in list" :key="item.id">
        <el-avatar :src="item.userInfo.avatar" :size="20" />
        <span v-if="item.userInfo.name">{{item.userInfo.name}}</span>
        <span v-else>{{item.userInfo.username}}</span>
        <span style="font-size:12px;margin-left: 5px">{{item.create_time | formatDateTime('hh:mm:ss') }}</span>
        <span style="margin-left: 50px">第{{list.length - index}}条</span>
        <div style="margin-left: 50px;margin-top:5px">命中率：{{item.hit_rate*100}}%<br>{{item.content}}</div>
        <el-divider />
      </div>
    </div>
    <!-- <el-button type="text">查看更多</el-button> -->
  </div>
</template>

<script>
import {getMarketTrace, createMarketTrace } from "network/api/crm"
import filter from "views/web/mixin/filter";

export default {
  name: "Trace",
  mixins: [filter],
  data() {
    return {
      traceParam: Object.assign({}),
      list: [],
      showIssue: false,
      rateList: [
        {value:0, title:'0'},
        {value:0.25, title:'25%'},
        {value:0.5, title:'50%'},
        {value:0.75, title:'75%'},
        {value:1, title:'100%'},
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    isShow(Visible, data) {
      this.traceParam = Object.assign({}, {
        market:data.id, 
        hit_rate:data.hit_rate,
        user:this.$store.getters.id
      })
      if (Visible) {
        this.showIssue = !this.showIssue
      }
    },
    getList() {
      getMarketTrace({ market: this.$route.query.id ? this.$route.query.id : 0}).then(response => {
        this.list = response;
        // console.log('跟进', this.list)
      });
    },
    handleTrace() {
      // console.log(this.traceParam)
      createMarketTrace(this.traceParam).then(response => {
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
          this.showIssue = false
          this.getList()
          this.$emit("traceRefresh");
        }
      })
    }
  }
};
</script>

<style scoped>
</style>