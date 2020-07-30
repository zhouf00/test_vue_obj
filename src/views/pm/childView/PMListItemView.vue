<!--  -->
<template>

  <div @click="itemClick">
    <el-row :gutter="20">
        <el-col :span="7">
          <div class="img">{{pmItem.name}}</div></el-col>
        <el-col :span="15">
          <h3 style="margin-bottom: 5px;">
            <!-- <el-tag :type="TagType(pmItem.status)" >{{pmItem.status}}</el-tag> -->
            <pm-tag :pmStatus="pmItem.status"/>
            <!-- 全色 -->
            <!-- <el-tag :type="TagType(pmItem.status)" effect="dark">{{pmItem.status}}</el-tag> -->
            {{pmItem.name}}</h3>
          <div style="margin-bottom: 5px;">
            <span v-for="(tag,index) in pmItem.tag">{{tag}}<el-divider v-if="index !== pmItem.tag.length-1" direction="vertical"/>
            </span>
          </div>
          <div style="margin-bottom: 5px;">
            <i class="el-icon-wind-power"></i>
            <span v-for="manu in pmItem.manu_list">{{manu.title}} </span>
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
  import PmTag from 'components/content/tag/PmTag'

  export default {
    name: 'PMListItemView',
    components: {
      PmTag
    },
    props:{
      pmItem:{
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods:{
      itemClick(){   
        this.$router.push('/detail/'+ this.pmItem.name)
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