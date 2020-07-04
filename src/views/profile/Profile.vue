<!-- 用户中心 -->
<template>
  <div>
   <h2>我的</h2>
  </div>

</template>

<script>
  export default {
    name: 'ProFile',
    data() {
      return {
        drawer: flase,
        direction: 'rtl',
        radio1:'北京',
        radio: 3
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
<style scoped>

</style>  