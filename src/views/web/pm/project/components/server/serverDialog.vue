<!-- 服务器添加、修改界面 -->
<template>
  <el-card class="form-container" shadow="never">
    <div style="text-align: center;margin-bottom:50px">
      <h2>{{1===2 ? 'aaa': 'bbb'}}</h2>
    </div>
    <div style="magin-top:50px">
      <el-form label-width="120px" style="width: 600px" size="small">
        <el-form-item label="服务器品牌：">
          <el-select v-model="serverParam.barnd">
            <el-option v-for="item in barnd"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器型号：">
          <el-select v-model="serverParam.model">
            <el-option v-for="item in barnd"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器编号：" >
          <el-input placeholder="输入快速服务代码或SN" style="width:215px"></el-input>
        </el-form-item>
        <el-form-item label="CPU：">
          <el-select v-model="serverParam.model">
            <el-option v-for="item in barnd"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存：">
          <el-select v-model="serverParam.ram">
            <el-option v-for="item in ramList"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'硬盘类型'+(index+1)+':'" :model="serverParam.disks"
          v-for="(item, index) in serverParam.disks">
          <p>{{diskCount}}</p>
          <el-select style="margin-right:10px" v-model="item.disk_type">
            <el-option v-for="item in diskTypleList"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
          <el-select style="margin-right:10px" v-model="serverParam.disk">
            <el-option v-for="item in diskList"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
          <el-select style="margin-right:10px" v-model="serverParam.disk">
            <el-option v-for="item in diskList"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'网卡'+(index+1)+'：'" :model="serverParam.nic"
          v-for="(item, index) in serverParam.nic">
          <el-input v-model="item.ip_adress" style="width:120px"></el-input>
          <el-input v-model="item.net_mask" style="width:120px;margin-left:10px"></el-input>
          <el-input v-model="item.gate_way" style="width:120px;margin-left:10px"></el-input>
          <el-button style="margin-left:10px" size="small" v-if="index === 0"
            @click="addNic()">+</el-button>
          <el-input v-model="item.memo" type="textarea" style="margin-top:10px"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

  const defaultServer = {
    barnd: '戴尔',
    model: 'SR550',
    ram: 8,
    disks: [
      {disk_type: 'SATA 7.2k', disk_capacity: 1000, disk_count: 3, disk_raid: 'RAID 1'}
    ],
    nic: [
      {ip_adress:'192.168.0.89', net_mask: '255.255.255.0', gate_way: '192.168.0.1', memo: '连接风机'},
      {ip_adress:'192.168.1.89', net_mask: '255.255.255.0', gate_way: '192.168.1.1', memo: '隔离'},
    ]
  }

  export default {
    name: 'serverDialog',
    data() {
      return {
        barnd: ['戴尔 DELL', '联想 Lenovo', '华为 HUAWEI', '浪潮'],
        serverParam: Object.assign({}, defaultServer),
        ramList:[
          {value:8, label: '8G'},
          {value:16, label: '16G'},
          {value:32, label: '32G'},
        ],
        diskTypleList:['SATA 7.2k', 'SAS 7.2k', 'SAS 10k', 'SAS 15k'],
        diskList:[
          {value:300, label: '300G'},
          {value:500, label: '500G'},
          {value:1000, label: '1T'},
          {value:2000, label: '2T'},
          {value:4000, label: '4T'},
          {value:8000, label: '8T'},
        ],
        raidList: ['RAID 0', 'RAID 1', 'RAID 5'],
        raidType: {'RAID 0':0, 'RAID 1':1, 'RAID 5':2},
      }
    },
    methods: {
      addNic() {
        this.$confirm('是否确认', '提示', {
          confirmButtonText: '确定',
          cancelButtonText:'取消',
          type: 'warning'
        }).then(() => {
          let obj = {ip_adress:'', net_mask: '', gate_way: '', memo: ''};
          this.serverParam.nic.push(obj)
        })
      }
    },
    computed:{
      diskCount() {
        let count = 0
        let list = this.serverParam.disks
        for (let i in list) {
          count += (list[i].disk_count+(list[i].disk_count-this.raidType[list[i].disk_raid]))*list[i].disk_capacity/2
        }
        return `${count/1000}T`
      }
    }
  }
</script>
<style scoped>
  .form-container {
    width: 800px;
  }
</style>