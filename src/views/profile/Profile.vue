<!-- 用户中心 -->
<template>
  <div>
   <h2>我的</h2>
  {{get_token}}
  </div>

</template>

<script>
  export default {
    name: 'ProFile',
    data() {
      return {
        
      }
    },
    methods: {
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    },
    components:{
      get_token() {
        
      }
    }
  }
</script>
<style scoped>

</style>  