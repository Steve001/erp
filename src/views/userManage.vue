<template>
  <!-- 经纪人管理 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery_all.salerName" type="text" placeholder="输入姓名" style="width: 130px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.salerPhone" type="text" placeholder="输入手机号" style="width: 150px" class="filter-item" clearable />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page = 1)">
        搜索
      </el-button>
    </div>

    <el-button v-waves class="filter-item" type="success" icon="el-icon-coin" @click="handleNewSaler">
      新增销售员信息
    </el-button>
    <br>
    <br>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row stripe border fit max-height="900px">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="姓名" prop="salerName" align="center" />
      <el-table-column label="手机号" prop="salerPhone" align="center" />
      <el-table-column label="分属部门" prop="salerDepart" align="center" />
      <el-table-column label="推介客户量" prop="recommandNum" align="center" />
      <el-table-column label="成交客户量" prop="successNum" align="center" />
    </el-table>

    <!-- 新增销售员信息页面模态框 -->
    <el-dialog :visible.sync="dialogNewSaler" title="新增销售员信息">
      <el-card class="box-card">
        <!-- 定义表单提交项 -->
        <el-form ref="newOperator" :model="newSalerForm" label-width="80px">
          <el-form-item label="姓名" label-width="100px" prop="operatorName">
            <el-input v-model="newSalerForm.salerName" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="手机号" label-width="100px" prop="operatorPhone">
            <el-input v-model="newSalerForm.salerPhone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="密码" label-width="100px" prop="operatorPhone">
            <el-input v-model="newSalerForm.salerPassword" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="分属部门" label-width="100px" prop="operatorDepartment">
            <el-select v-model="newSalerForm.salerDepartment" placeholder="请选择部门">
              <el-option v-for="item in salerDepartmentOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="newSalerPost(newSalerForm)">提交</el-button>
            <el-button @click="CleanDataForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>

    <!-- 分页功能实现标签 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery_all.page" @pagination="getList" />
  </div>
</template>

<script>
import { userList, newSalerFormPost } from '@/api/userManage'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserManage',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: true,
      total: 0,
      // list接口请求参数
      listQuery_all: {
        page: 1,
        salerName: null,
        salerPhone: null
      },
      // 声明下api变量
      tableData: [],
      dialogNewSaler: false,
      newSalerForm: {
        salerName: null,
        salerPhone: null,
        salerPassword: null,
        salerDepartment: null
      },
      salerDepartmentOptions: ['影视', '科技']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userList(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
        this.listLoading = false
      })
    },
    // 新增操作员信息按钮
    handleNewSaler() {
      this.dialogNewSaler = true
    },
    // 新增销售员信息提交
    newSalerPost(newCusForm) {
      newSalerFormPost(newCusForm).then(response => {
        if (response.codeStatus === 200) {
          this.$notify({
            title: 'Success',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.dialogNewSaler = false
          this.getList()
        } else {
          this.$notify({
            title: 'Failure',
            message: '提交失败，请联系系统管理员',
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    // 取消按钮
    CleanDataForm() {
      if (this.$refs['newOperator'] !== undefined) {
        this.$nextTick(() => {
          this.$refs['newOperator'].resetFields()
        })
      }
      this.dialogNewSaler = false
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.show-sms {
    position: absolute;
    right: 10px;
    top: 82px;
    font-size: 15px;
    color: $light_gray;
    cursor: pointer;
    user-select: none;
  }

body .el-table th.gutter {
  display: table-cell !important;
}
.el-table {
  th.gutter,
  colgroup.gutter {
    display: block !important;
    width: 6px !important
  }
}

</style>
