<!--  -->
<template>
  <div>
    
    <wxlogin :appid="$store.getters.get_appid"
             :scope="'snsapi_login'"
             :theme="'black'"
             :redirect_uri="encodeURIComponent($store.getters.get_url + 'new-home/#/new-home/structure/?num=' + Math.ceil(Math.random() * 1000))">
    </wxlogin>
  </div>
</template>

<script>
  import wxlogin from 'vue-wxlogin'

  export default {
    name: 'Login',
    components: {
      wxlogin
    },
    data() {
      return {
        
        loginForm: {
          username: '',
          password: ''
        },
        loginRules:{

        },
        loading: false,
        pwdType: 'password',
        // login_center_bg,
        dialogVisible:false,
        supportDialogVisible:false
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      
    }
    
  }
</script>

<style scoped>

  .login-card {
    width: 480px;
    /* text-align: center; */
  }
</style>