<!--  -->
<template>
  <project-detail :is-edit="true"></project-detail>
</template>

<script>
  import ProjectDetail from './components/ProjectDetail'

  export default {
    name: 'update',
    components: {
      ProjectDetail
    }
    
  }
</script>

<style scoped>
  
</style>