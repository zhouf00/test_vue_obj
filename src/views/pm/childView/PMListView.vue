<!-- 项目列表 -->
<template>
  <div class="pmlist"  v-infinite-scroll="load" 
       style="overflow:auto"
       infinite-scroll-disabled="disabled">
    <p-m-list-item-view v-for="item in allData" 
                        style="margin-bottom: 10px;"
                        :pmItem="item"/>
    <p v-if="!loading" style="text-align: center">加载中...</p>
    <p v-if="loading" style="text-align: center">我是有底线的</p>
  </div>
</template>

<script>
  import PMListItemView from './PMListItemView'

  export default {
    name: 'PMListView',
    components:{
      PMListItemView
    },
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
      load(){
        // setTimeout(() =>{
        //   this.count += 2
        //   this.allData.push(
        //     {'value': '寒风岭风电场工',
        //     'address': '山西', 
        //     'tag':['振动','油液'], 
        //     'windpower':['金风科技','联合致力'],
        //     'telephone':'1388888888',
        //     'status':'试运行'},)
        // }, 1000)
      },
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

</style>