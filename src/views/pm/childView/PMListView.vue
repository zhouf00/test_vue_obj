<!-- 项目列表 -->
<template>
  <div class="pmlist" v-infinite-scroll="load" 
       style="overflow:auto"
       infinite-scroll-disabled="disabled">
    <div v-for="item in allData" style="margin-bottom: 10px;">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="img">{{item.value}}</div></el-col>
        <el-col :span="15">
          <h3 style="margin-bottom: 5px;">
            <el-tag :type="TagType(item.status)">{{item.status}}</el-tag>
            {{item.value}}</h3>
          <div style="margin-bottom: 5px;">
            <span v-for="(tag,index) in item.tag">{{tag}}<el-divider v-if="index !== item.tag.length-1" direction="vertical"/>
            </span>
          </div>
          <div style="margin-bottom: 5px;">
            <i class="el-icon-wind-power"></i>
            <span v-for="windpower in item.windpower">{{windpower}} </span>
          </div>
          <div style="margin-bottom: 5px;">
            <i class="el-icon-location-information"/>
            {{item.address}}
          </div>
          <div> 
            <i class="el-icon-phone"/>
            {{item.telephone}}
          </div>
        </el-col>
      </el-row>
    </div>
    <p v-if="!loading" style="text-align: center">加载中...</p>
    <p v-if="loading" style="text-align: center">我的有底线的</p>
  </div>
</template>

<script>
  export default {
    name: 'PMListView',
    props:{
      allData:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        count:0
      }
    },
    methods:{
      TagType(val){
        switch(val){
          case '安装':
            return 'warning'
          case '数据验收':
            return 'success'
          case '施工':
            return 'info'
          case '消缺':
            return 'danger'
        }
      },
      load(){
        setTimeout(() =>{
          this.count += 2
          this.allData.push(
            {'value': '寒风岭风电场工',
            'address': '山西', 
            'tag':['振动','油液'], 
            'windpower':['金风科技','联合致力'],
            'telephone':'1388888888',
            'status':'试运行'},)
        }, 1000)
      }
    },
    computed:{
      loading(){
        // 判断是否还有多少数据
        return this.count >= this.allData.length
      },
      disabled() {
        return this.loading
      }
    }
  }
</script>
<style scoped>
  .pmlist {
    margin-left: 10px;
    /* margin-right: 8px; */
  }
  .img {
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 47px 10px;
  }
</style>