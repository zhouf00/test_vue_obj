<!--  -->
<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写项目信息"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <project-info-detail 
      v-show="showStatus[0]"
      v-model="projectParam"
      :is-edit="isEdit"
      @nextStep="nextStep"></project-info-detail>
    <project-finish
      v-show="showStatus[1]"
      v-model="projectParam"
      :is-edit="isEdit"
      @finishCommit="finishCommit"></project-finish>
  </el-card>
</template>

<script>
  import ProjectInfoDetail from './ProjectInfoDetail'
  import ProjectFinish from './ProjectFinish'

  import {createProject, getProjectInfo, updateProject} from 'network/api/pm'
  import {formatDate} from 'utils/date'

  const defaultProjectParam = {
    is_delete: false,
    type: '风电',
    name: '',
    area:'',
    priority: 0,
    status: 1,
    manufacturers: [],
    entrance_time: '',
    memo: ''
  }
  export default {

    name: 'ProjectDetail',
    components: {
      ProjectInfoDetail,
      ProjectFinish
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        projectParam: Object.assign({}, defaultProjectParam),
        showStatus: [true, false]
      }
    },
    created() {
      if(this.isEdit) {
        getProjectInfo(this.$route.query.id).then(response => {
          this.projectParam = response
          if (response.entrance_time) {
            this.projectParam.entrance_time = new Date(response.entrance_time)
          }
        })
      }
    },
    methods: {
      hideAll () {
        for (let i in this.showStatus) {
          this.showStatus[i] = false
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length -1) {
          this.active++;
          this.hideAll()
          this.showStatus[this.active] = true
        }
      },
      toDate(date) {
        if (this.projectParam[date]) {
          this.projectParam[date] = new Date(this.projectParam[date])
        } else {
          delete this.projectParam[date]
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该项目', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (isEdit) {
            // 更新
            console.log('更新提交');
            this.toDate('entrance_time')
            updateProject(this.$route.query.id, this.projectParam).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            })
          } else {
            // 新建
            console.log('新建提交');
            // 修改预计完成时间格式
            this.toDate('entrance_time')
            createProject(this.projectParam).then(response => {
              console.log(response)
              if (response.err) {
                let err = response.err
                this.$message({
                  type:'warning',
                  message: err
                });
              } else{
                this.$message({
                  type:'success',
                  message: '提交成功',
                  duration: 1000
                });
              }
              location.reload();
            })
          }
        })
      },
    },
    computed: {

    }
  }
</script>

<style scoped>
  .form-container {
    /* width: 800px; */
  }
</style>