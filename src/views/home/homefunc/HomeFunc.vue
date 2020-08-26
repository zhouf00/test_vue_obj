<!-- 首页功能 -->
<template>
  <div class="homefunc">
    <div v-for="(item,index) in funcs" 
         class="func-item"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeFunc',
    props: {
      funcs: {
        type: Array,
        default() {
          return []
        }
      }   
    },
    methods: {
      itemClick(index) {
        let name = ''
        switch (index) {
          case 0:
            name = 'PM'
            break
          case 1:
            name = 'AMS'
            break
          case 2:
            name = 'EA'
            break
        }
        this.$router.push({name:name})
        this.$store.dispatch('ChangeNavbar', name).then(() =>{
          // console.log(this.$store.getters.navbarStatus)
        })
      }
    }
  }
</script>
<style scoped>
  .homefunc {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 50px;
  }
  .func-item {
    margin-bottom: 10px;
    width: 60%;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;

  }
</style>