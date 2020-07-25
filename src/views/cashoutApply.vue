<template>
  <!-- 红包管理 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery_all.userName" type="text" placeholder="输入姓名" style="width: 130px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.userPhone" type="text" placeholder="输入手机号" style="width: 150px" class="filter-item" clearable />
      <!-- 时间选择器 -->
      <el-date-picker
        v-model="listQuery_all.dateRange"
        class="filter-item"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page = 1)">
        搜索
      </el-button>
    </div>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row stripe border fit max-height="900px">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="姓名" prop="userName" align="center" />
      <el-table-column label="手机号" prop="userPhone" align="center" />
      <el-table-column label="当前红包金额" prop="redbagCurrentNum" align="center" />
      <el-table-column label="申请提现金额" prop="applyNum" align="center" />
      <el-table-column label="支付宝账号" prop="alipayAccount" align="center" />
      <el-table-column label="申请时间" prop="applyDate" align="center" />
      <el-table-column
        label="审核状态"
        prop="applyStatus"
        align="center"
        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核中', value: '审核中' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.applyStatus === '审核通过' ? 'success' : 'primary'" disable-transitions>{{ scope.row.applyStatus }}</el-tag>
        </template>
      </el-table-column>

      <!-- 状态变更按钮 -->
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="large" @click="statusChange(scope.row.userName, scope.row.userPhone, scope.row.applyNum, scope.row.alipayAccount, scope.row.applyDate, scope.row.applyStatus)">
            变更审核状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 状态变更模态框 -->
    <el-dialog :visible.sync="dialogRedbagStatus" width="20%" title="审核状态变更">
      <el-form ref="redbagStatusForm" :model="redbagStatusForm" label-width="80px">
        <el-form-item label="姓名" label-width="100px" prop="userName">
          <el-input v-model="redbagStatusForm.userName" disabled />
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" prop="userPhone">
          <el-input v-model="redbagStatusForm.userPhone" disabled />
        </el-form-item>
        <el-form-item label="申请提现金额" label-width="100px" prop="applyNum">
          <el-input v-model="redbagStatusForm.applyNum" disabled />
        </el-form-item>
        <el-form-item label="支付宝账号" label-width="100px" prop="alipayAccount">
          <el-input v-model="redbagStatusForm.alipayAccount" disabled />
        </el-form-item>
        <el-form-item label="申请时间" label-width="100px" prop="applyDate">
          <el-input v-model="redbagStatusForm.applyDate" disabled />
        </el-form-item>
        <el-form-item label="申请状态" label-width="100px" prop="applyStatus">
          <el-select v-model="redbagStatusForm.applyStatus" placeholder="请选择">
            <el-option v-for="item in applyStatusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="redbagStatusChangePost(redbagStatusForm)">确定</el-button>
          <el-button @click="cancelCusStatusChange()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页功能实现标签 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery_all.page" @pagination="getList" />
  </div>
</template>

<script>
import { redbagList, redbagStatusChange } from '@/api/redbagManage'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CashoutApply',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: true,
      total: 0,
      // list接口请求参数
      listQuery_all: {
        page: 1,
        userName: null,
        userPhone: null,
        dateRange: null
      },
      // 声明下api变量
      tableData: [],
      dialogRedbagStatus: false,
      applyStatusOptions: ['审核中', '审核通过'],
      redbagStatusForm: {
        userName: null,
        userPhone: null,
        applyNum: null,
        alipayAccount: null,
        applyDate: null,
        applyStatus: null
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      redbagList(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
        this.listLoading = false
      })
    },
    statusChange(userName, userPhone, applyNum, alipayAccount, applyDate, applyStatus) {
      this.redbagStatusForm.userName = userName
      this.redbagStatusForm.userPhone = userPhone
      this.redbagStatusForm.applyNum = applyNum
      this.redbagStatusForm.alipayAccount = alipayAccount
      this.redbagStatusForm.applyDate = applyDate
      this.redbagStatusForm.applyStatus = applyStatus
      this.dialogRedbagStatus = true
    },
    cancelCusStatusChange() {
      this.dialogRedbagStatus = false
    },
    redbagStatusChangePost(redbagStatusForm) {
      console.log(redbagStatusForm)
      redbagStatusChange(redbagStatusForm).then(response => {
        if (response.codeStatus === 200) {
          this.$notify({
            title: 'Success',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.dialogRedbagStatus = false
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
    filterTag(value, row) {
      return row.applyStatus === value
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
