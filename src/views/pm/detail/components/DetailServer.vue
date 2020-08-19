<!-- 详情页面服务器 -->
<template>
  <div style="margin-top:10px;">
    <el-divider/>
    <detail-headline :title="'服务器信息'"/>
    <el-card v-for="item in serverData">
      <el-row>
        <el-col :span="7"><p class="">品牌型号：</p></el-col>
        <el-col :span="17"><span>{{item.brand}} {{item.model}}</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="7"><p class="">CPU：</p></el-col>
        <el-col :span="17"><span>{{item.cpu.cpu_model}} {{item.cpu.cpu_core_count}}核 * {{item.cpu.cpu_count}}</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="7"><p class="">内存：</p></el-col>
        <el-col :span="17">
          <span>{{ramShow(item.ram)}}</span>
        </el-col>       
      </el-row>
      <el-row>
        <el-col :span="7"><p class="">硬盘：</p></el-col>
        <el-col :span="17">
          <span>{{diskShow(item.disk)}}</span><br>
        </el-col>       
      </el-row>
      <el-row v-for="nic in item.nic">
        <el-col :span="7"><p class="">网卡1：</p></el-col>
        <el-col :span="9"><span>{{nic.ip_address}} {{nic.net_mask}} {{nic.gate_way}}</span></el-col> 
        <el-col :span="8"><p class="">{{nic.memo}}</p></el-col>       
      </el-row>
      <el-row>
        <el-col :span="7"><p class="">帐号密码：</p></el-col>
        <el-col :span="17"><span>{{item.accounts}} / {{item.passwd}}</span></el-col>       
      </el-row>
      <el-row>
        <el-col :span="7"><p class="">存储位置：</p></el-col>
        <el-col :span="17"><span>{{item.place}}</span></el-col>       
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import DetailHeadline from 'components/content/tabcontrol/DetailHeadline'

  import {getServer} from 'network/detail'

  export default {
    name: 'DetailServer',
    components:{
      DetailHeadline
    },
    props:{
      serverData: {
        type: Array,
        default(){
          return []
        }
      }
    },
    methods:{
      ramShow(list) {
        let capacity = 0
        let str = ''
        let symbol = ' | '
        for(let i in list){
          if(list.length-i === 1){
            symbol = ''
          }
          capacity += list[i].capacity*list[i].ram_count
          str += `${list[i].capacity}G*${list[i].ram_count}${symbol}`
        }
        return `${str} (实际内存${capacity})`
      },
      diskShow(list) {
        let capacity = 0
        let str = ''
        let symbol = ' | '
        let count = 0
        for(let i in list){
          if(list.length-i === 1){
            symbol = ''
          }
          switch(list[i].disk_raid){
            case 'RAID 0':
              count = list[i].disk_count
              break
            case 'RAID 1':
              count = list[i].disk_count/2
              break
            case 'RAID 5':
              count = list[i].disk_count-1
              break
          }
          capacity += list[i].disk_capacity*count
          str += `${list[i].disk_type} ${list[i].disk_capacity}T*${list[i].disk_count} ${list[i].disk_raid}${symbol}`
        }
        return `${str} (实际容量${capacity}T)`
      }
    }
  }
</script>

<style scoped>
  
</style>