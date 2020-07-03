<!--  -->
<template>
  
</template>

<script>
  import {login} from 'network/login'

  export default {
    name: 'Login',
    components: {

    },
    created() {
      login()
    },
    mounted() {
      login().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      
    }
    
  }
</script>

<style>
  
</style>