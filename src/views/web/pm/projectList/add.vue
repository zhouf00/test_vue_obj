<!-- 新建项目 -->
<template>
  <project-detail :is-edit="false"></project-detail>
</template>

<script>
  import ProjectDetail from './components/ProjectDetail'

  export default {
    name: 'add',
    components: {
      ProjectDetail
    }
    
  }
</script>

<style scoped>
  
</style>  