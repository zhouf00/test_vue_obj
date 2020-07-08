<!--  -->
<template>

  <div @click="itemClick">
    <el-row :gutter="20">
        <el-col :span="7">
          <div class="img">{{pmItem.value}}</div></el-col>
        <el-col :span="15">
          <h3 style="margin-bottom: 5px;">
            <el-tag :type="TagType(pmItem.status)">{{pmItem.status}}</el-tag>
            {{pmItem.value}}</h3>
          <div style="margin-bottom: 5px;">
            <span v-for="(tag,index) in pmItem.tag">{{tag}}<el-divider v-if="index !== pmItem.tag.length-1" direction="vertical"/>
            </span>
          </div>
          <div style="margin-bottom: 5px;">
            <i class="el-icon-wind-power"></i>
            <span v-for="windpower in pmItem.windpower">{{windpower}} </span>
          </div>
          <div style="margin-bottom: 5px;">
            <i class="el-icon-location-information"/>
            {{pmItem.address}}
          </div>
          <div> 
            <i class="el-icon-phone"/>
            {{pmItem.telephone}}
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    name: 'PMListItemView',
    props:{
      pmItem:{
        type: Object,
        default() {
          return {}
        }
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
      itemClick(){   
        this.$router.push('/detail?id='+this.pmItem.telephone)
      }
    }    
  }
</script>

<style scoped>
  .img {
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 47px 10px;
  }
</style>