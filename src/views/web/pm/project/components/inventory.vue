<!--  -->
<template>
  <div>
    <div class="table-container" style="padding: 20px">
      <el-table
        style="width: 100%"
        border
        :header-cell-style="{ background: '#F3F6FC' }"
        :data="list">
        <el-table-column label="货物名称" align="center" prop="title"></el-table-column>
        <el-table-column label="货物类型" align="center">
          <template slot-scope="scope" >
            <el-tag 
              size="mini"
              type="info"
              style="margin:3px">{{ scope.row.typeInfo.title}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="货物总量" align="center" prop="totality"></el-table-column>
        <el-table-column label="已发" align="center" prop="delivered"></el-table-column>
        <el-table-column label="未发" align="center" prop="undelivered"></el-table-column>
        <el-table-column label="是否完成" align="center" prop="finish">
          <template slot-scope="scope">
            <span>{{scope.row.finishInfo.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">{{ scope.row.update_time | formatDateTime}}</template> 
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" style="margin:2px"
              @click="handleUpdate(scope.$index, scope.row)">编辑发货</el-button><br>
            <el-button size="mini" style="margin:2px"
              @click="handleInvoice(scope.$index, scope.row)">我要发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 日志表格 -->
      <h3 style="margin:30px 0 10px 0">发货记录</h3>
      <el-table
        style="width: 100%;"
        border
        :header-cell-style="{ background: '#F3F6FC' }"
        :data="invoiceList">
        <el-table-column label="日期" align="center">
          <template slot-scope="scope">{{ scope.row.create_time | formatDateTime}}</template> 
        </el-table-column>
        <el-table-column label="发货详情" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.title}}，{{scope.row.count}}套</span>
          </template>
        </el-table-column>
        <el-table-column label="发货人" align="center" prop="userInfo.name"></el-table-column>
        <el-table-column label="备注" align="center" prop="memo"></el-table-column>
        <el-table-column label="附件" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleImg(scope.$index, scope.row)">查看</el-link>
            <el-image-viewer
              v-if="showViewer"
              :on-close="closeViewer"
              :url-list="imgList"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
              @click="handleUpLoadImg(scope.$index, scope.row)">回单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="invoiceListQuery.pageSize"
          :page-sizes="[5,10,15]"
          :current-page.sync="invoiceListQuery.page"
          :total="invoiceTotal">
        </el-pagination>
      </div>
    </div>

    <!-- 我要发货 弹窗 -->
    <el-dialog title="发货" :visible.sync="dialogVisible" width="600px">
      <el-form 
        :model="invoice"
        :rules="rulesInvoice"
        ref="invoice"
        label-width="150px">
        <el-form-item label="货物名称" prop="title">
          <el-input v-model="invoice.cargo.title" :disabled="true" style="width: 180px"/>
        </el-form-item>
        <el-form-item label="发货类型" prop="type">
          <el-select v-model="invoice.type" placeholder="请选择发货类型">
            <el-option v-for="item in invoiceType"
              :key="item.type"
              :label="item.label"
              :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货数量">
          <el-input-number v-model="invoice.count"
            :min="0"
            :max="9999"
            label="发货数量"
            :disabled="invoice.cargo.undelivered === 0"></el-input-number>
          <span width="10px">剩余：{{invoice.cargo.undelivered}}</span>
        </el-form-item>
        <el-form-item label="发货人">
          <el-input v-model="invoice.uname" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input type="textarea" :rows="3" v-model="invoice.memo" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="测试">
          <el-upload ref="upload"
            :action="imgUrl"
            multiple
            :data="imgData"
            name="image"
            :file-list="fileList"
            :auto-upload="false">
            <el-button size="small" type="primary" 
              :disabled="invoice.cargo.undelivered === 0">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verifyForm('invoice',handleDialogConfirm)"
            :disabled="invoice.cargo.undelivered === 0">确认发货</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 初始化清单 -->
    <el-dialog :title="isEdit? '编辑清单': '初始化清单'" 
      :visible.sync="initDialogVisible" width="650px">
      <el-form ref="cargo"
        :model="initCargoParam"
        :rules="rulesCargo"
        label-width="120px">
        <el-form-item label="货物名称" prop="title">
          <el-input v-model="initCargoParam.title" style="width: 85%"/>
        </el-form-item>
        <el-form-item label="货物类型" prop="type">
          <el-select placeholder="请选择监测类型"
            style="width:300px"
            v-model="initCargoParam.type">
            <el-option v-for="item in monitortypeList"
              :key="item.id"
              :label="item.title"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="totality">
          <el-input-number v-model="initCargoParam.totality"
            :min="0"
            :max="9999"
            label="发货数量"></el-input-number>
        </el-form-item>
        <el-form-item label="设备描述" prop="memo">
          <el-input
            type="textarea"
            :rows="4"
            v-model="initCargoParam.memo"
            style="width: 85%"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verifyForm('cargo',handleInitDialogConfirm)">确定</el-button>
          <el-button size="small" @click="initDialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 上传回单 -->
    <el-dialog :visible.sync="receiptDialogVisible">
      <el-upload ref="receiptUpload"
        :action="imgUrl"
        multiple
        :data="imgData"
        name="image"
        :file-list="fileList"
        :auto-upload="true">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  import { getCargo, createCargo, updateCargo, 
           getInvoice, createInvoice, updateInvoice,
           getInvoiceImage,  
           getMonitorType } from "network/api/pm";
  import ElImageViewer from "element-ui/packages/image/src/image-viewer";
  import filter from "views/web/mixin/filter";

  const defaultListQuery = {
    page: 1,
    pageSize: 5,
    project: null
  }
  const defaultInitCargo = {
    count: 0,
    finish: 2,
  };
  const defaultInvoice = {
    type: 1,
    count: 0,
    memo: '',
    cargo: {}
  }

  export default {
    name: 'inventory',
    components: {
      ElImageViewer,
    },
    mixins:[filter],
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        invoiceListQuery: Object.assign({}, defaultListQuery),
        dialogVisible:false,
        initDialogVisible:false,
        receiptDialogVisible:false,
        isEdit: false,
        imgUrl: 'http://test.windit.com.cn/api/engineering/invoice/upload/',
        list: [],
        invoiceList: [],
        invoiceTotal: null,
        monitortypeList:null,
        fileList:[],
        imgData:Object.assign({}),
        imgList:[],

        // 测试数据
        initCargoParam: Object.assign({}, defaultInitCargo),
        invoice: Object.assign({}, defaultInvoice),
        rulesInvoice: {
          memo: [{ required: true, message: "请输入发货情况", trigger: "blur" }],
          type: [{ required: true, message: "请选择发货类型", trigger: "change" }]
        },
        rulesCargo: {
          title: [{ required: true, message: "请输入货物名称", trigger: "blur" }],
          type: [{ required: true, message: "请输入货物类型", trigger: "blur" }],
          totality: [{ required: true, message: "请输入货物数量", trigger: "blur" }],
        },
        showViewer: false, // 显示查看器
        invoiceType: [
          { type: 1, label: "正常发货" },
          { type: 2, label: "补发配件" }
        ],
      }
    },
    created() {
      this.listQuery.project = Number(this.$route.query.id)
      this.invoiceListQuery.project = Number(this.$route.query.id)
      this.getMonitortypeList();
      this.getInvoiceList()
      this.getList()
    },
    methods: {  
      isShow(dialogVisible) {
        this.isEdit = false
        this.initDialogVisible = dialogVisible
        this.countChange = false;
      },
      getList() {
        this.listLoading = true
        getCargo(this.listQuery).then(response => {
          this.list = response.results
          this.listLoading = false
        })
      },
      getInvoiceList() {
        getInvoice(this.invoiceListQuery).then(response => {
          this.invoiceList = response.results
          this.invoiceTotal = response.count
          // this.listLoading = false
        })
      },
      getMonitortypeList() {
        getMonitorType().then(response => {
          this.monitortypeList = response;
        });
      },
      handleUpdate(index, row) {
        this.initDialogVisible = true
        this.isEdit = true
        this.initCargoParam = Object.assign({}, row)

      },
      handleInvoice(index, row) {
        this.invoice = Object.assign({},defaultInvoice, {cargo: row})
        this.invoice.project = this.listQuery.project
        this.invoice.uname = this.$store.getters.name
        this.invoice.user = this.$store.getters.id
        this.dialogVisible = true
      },
      handleInitDialogConfirm() {
        let cargo = Object.assign({}, this.initCargoParam)
        if (this.isEdit) {
          cargo.undelivered = cargo.totality - cargo.delivered
          cargo.finish = (cargo.undelivered === 0 ? 2:1)
          updateCargo(cargo).then(response => {
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
              this.getList()
              this.initDialogVisible = false
            }
          })
        } else {
          this.initCargoParam.project = this.listQuery.project;
          this.initCargoParam.undelivered = this.initCargoParam.totality
          createCargo(this.initCargoParam).then(response => {
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
              this.getList()
              this.initDialogVisible = false
            }
          })
        }
      },
      handleDialogConfirm() {
        // 计算库存情况
        let cargo = Object.assign({},this.invoice.cargo)
        if (this.invoice.type === 1) {
          cargo.delivered += this.invoice.count
          cargo.undelivered -= this.invoice.count
          cargo.finish = (cargo.undelivered === 0 ? 2:1)
          // 1 未完成，2 完成
        }
        updateCargo(cargo.id, cargo).then(response => {
          if (response.err) {
              this.$message({
                type: "warning",
                message: response.err
              });
            } else {
              // 处理记录
              this.invoice.title = `${this.invoiceType.filter(t => t.type === this.invoice.type)[0].label} ${cargo.title} `
              createInvoice(this.invoice).then(response => {
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
                  this.imgData.invoice = response.id
                  this.$refs['upload'].submit()
                  this.getInvoiceList()
                }
              })
              this.getList()
              this.dialogVisible = false
            }
        })
      },
      handleImg(index, row) {
        this.imgList = []
        getInvoiceImage({search:row.id}).then(response =>{
          for (let i in response) {
            if (response[i].image){
              this.imgList.push(response[i].image)
            }
          }
          if (this.imgList.length > 0) {
            this.showViewer = true;
          } else {
            this.$message({
              type: "warning",
              message: '没有图片'
            });
          }
        })
      },

      handleUpLoadImg(index, row) {
        this.fileList = []
        this.receiptDialogVisible = true
        this.imgData.invoice = row.id
      },
      handleSizeChange(val) {
        this.invoiceListQuery.page = 1
        this.invoiceListQuery.pageSize = val
        this.getInvoiceList()
      },
      handleCurrentChange(val) {
        this.invoiceListQuery.page = val
        this.getInvoiceList()
      },
      // 关闭查看器
      closeViewer() {
        this.showViewer = false;
      },
      verifyForm(formName, obj){
        this.$refs[formName].validate(valid => {
          if (valid) {
            obj()
          } else {
            this.$message({
              message: "带*号的为必填项",
              type: "error",
              durattion: 1000
            });
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
 /deep/.el-upload-dragger {
  width: 250px;
  height: 150px;
  i {
    margin: 25px 0 16px;
  }
} 
</style>