<!-- 搜索导航 -->
<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center">
      <el-autocomplete v-model="state"
                       :fetch-suggestions="querySearch"
                       placeholder="请输入内容"
                       @select="handleSelect">
        <i class="el-icon-search" slot="prefix"></i>
      </el-autocomplete>
    </div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>

  export default {
    name: 'NavBarSearch',
    components: {

    },
    data() {
      return {
        state: '',
        timeout: null,
      }
    },
    props:{
      restaurants:{
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) :restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000*Math.random())
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        };
      },
      handleSelect(item) {
        console.log(item);
        this.temp = item
      }
    }
  }
</script>
<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 60px;
  }
  .center {
    flex:1;
  }
</style>