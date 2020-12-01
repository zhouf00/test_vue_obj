<!--  -->
<template>
  <div>
    <div style="padding:20px">
      <el-table :data="linkmanList" style="width: 100%">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="身份" prop="identity"></el-table-column>
        <el-table-column label="职务" prop="duty"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="微信" prop="wechat"></el-table-column>
        <el-table-column label="邮箱" prop="mail"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdateLinkman(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" style="margin-bottom:10px">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next,jumper"
            :page-size="listQuery.pageSize"
            :current-page.sync="listQuery.page"
            :total="total"
          ></el-pagination>
        </div>
    </div>
          
    <!-- 通讯录弹窗 -->
    <el-dialog :title="isEdit? '编辑联系人信息': '添加联系人信息'"
      :visible.sync="dialogVisible" width="650px">
      <el-form ref="linkmanForm"
        :model="linkmanParam"
        :rules="rules"
        label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="linkmanParam.name" style="width: 85%" :disabled="isEdit"/>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-input v-model="linkmanParam.identity" style="width: 85%"
            placeholder="在项目中什么身份"/>
        </el-form-item>
        <el-form-item label="职务" prop="duty">
          <el-input v-model="linkmanParam.duty" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="linkmanParam.phone" style="width: 85%"
            placeholder="手机号码" :disabled="isEdit"/>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="linkmanParam.wechat" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="linkmanParam.mail" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" v-model="linkmanParam.memo" style="width: 85%"
            placeholder="其它重要信息"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" 
            @click="hendleDialogConfirm('linkmanForm')">确认</el-button>
          <el-button size="small" 
            @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getLinkman, createLinkman, updateLinkman } from "network/api/crm"

  const defaultListQuery = {
   
  }

  export default {
    name: 'saleLinkman',
    data () {
      const validateMobile = (rule, value, callback) => {
          if (! value ) {
            callback(new Error('必填项'))
          } else if (value && value.length !== 11) {
            callback(new Error('请输入正确的11位手机号码'))
          } else {
            callback()
          }
        }
      return {
        isEdit: false,
        dialogVisible: false,
        total: null,
        listQuery: Object.assign({}, defaultListQuery),
        
        linkmanParam: Object.assign({}), 
        rules: {
          name: [{ required: true, message: "必填项" }],
          phone: [{ required: true, trigger: 'blur', validator: validateMobile}]
        },
        linkmanList: [],
      }
    },
    created () {
      this.listQuery.market=this.$route.query.id ? this.$route.query.id : 0
      this.getLinkmanList()
    },
    methods: {
      isShow(Visible, data) {
        if (Visible) {
          this.dialogVisible = !this.showIssue
        }
        this.isEdit = false
        this.linkmanParam = Object.assign({})
        console.log(this.linkmanParam)
      },
      getLinkmanList () {
        getLinkman(this.listQuery).then(response => {
          this.linkmanList = response.results
          this.total = response.count
          console.log(this.linkmanList)
        })
      },
      handleUpdateLinkman (index, row) {
        this.dialogVisible = true
        this.isEdit = true
        this.linkmanParam = Object.assign({}, row)
      },
      hendleDialogConfirm (formName) {
        this.linkmanParam.market = this.$route.query.id
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.isEdit) {
              console.log('修改', this.linkmanParam)
              updateLinkman(this.linkmanParam.id, this.linkmanParam).then( response => {
                if (response.err) {
                  this.$message({
                    type: "warning",
                    message: response.err
                  });
                } else {
                  this.$message({
                    type: "success",
                    message: "提交成功",
                    duration: 1000
                  });
                  this.dialogVisible = false
                  this.getLinkmanList()
                }
              })
            } else {
              console.log('新增', this.linkmanParam)
              createLinkman(this.linkmanParam).then(response => {
                console.log(response)
                if (response.err) {
                  this.$message({
                    type: "warning",
                    message: response.err
                  });
                } else {
                  this.$message({
                    type: "success",
                    message: "提交成功",
                    duration: 1000
                  });
                  this.dialogVisible = false
                  this.getLinkmanList()
                }
              })
            }
          } else {
            this.$message({
              message: "带*号的为必填项",
              type: "error",
              durattion: 1000
            });
            return false;
            }
          })
      },
      handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getLinkmanList()
    }
    }
  }
</script>
<style scoped>
  .operate-container-body {
    padding: 20px;
  }
</style>