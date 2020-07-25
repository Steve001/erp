<template>
  <!-- 客户管理 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery_all.cusName" type="text" placeholder="输入客户名称" style="width: 150px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.brokerName" type="text" placeholder="输入对接人姓名" style="width: 150px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.brokerPhone" type="text" placeholder="输入对接人手机号" style="width: 170px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.salerName" type="text" placeholder="输入销售员姓名" style="width: 150px" class="filter-item" clearable />
      <el-select v-model="listQuery_all.salerDepart" placeholder="请选择部门" class="filter-item" clearable>
        <el-option v-for="item in operatorDepartmentOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page = 1)">
        搜索
      </el-button>
    </div>

    <el-button v-waves class="filter-item" type="success" icon="el-icon-coin" @click="handleNewCus">
      新增客户信息
    </el-button>
    <br>
    <br>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row stripe border fit max-height="900px">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="客户名称" prop="cusName" align="center" />
      <el-table-column label="客户位置" prop="cusLoc" align="center" />
      <!-- <el-table-column label="意向程度" prop="cusIntent" align="center" /> -->
      <el-table-column label="意向程度" prop="cusIntent" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cusIntent in cusIntentHigh ? 'danger' : 'success'" disable-transitions>{{ scope.row.cusIntent }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="对接人姓名" prop="brokerName" align="center" />
      <el-table-column label="对接人手机号" prop="brokerPhone" align="center" />
      <el-table-column label="对接人职位" prop="brokerPosit" align="center" />
      <el-table-column label="销售员" prop="salerName" align="center" />
      <el-table-column label="分属部门" prop="salerDepart" align="center" />
      <el-table-column label="上次拜访日期" prop="lastVisitDate" align="center" />
      <el-table-column label="上次联系日期" prop="lastContactDate" align="center" />
      <el-table-column label="提交时间" prop="postTime" align="center" />
      <el-table-column label="备注" prop="remark" align="center" style="width: 100px">
        <template slot-scope="scope">
          <el-tag @click="getContentAll(scope.row.remark)">{{ scope.row.remark }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="客户状态" prop="cusStatus" align="center" style="width: 100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.cusStatus === '已成交' ? 'success' : 'info'" disable-transitions>{{ scope.row.cusStatus }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="推荐时间" prop="recommandDate" align="center" /> -->
      <!-- <el-table-column label="变更信息" prop="cusStatus" align="center">
        <template slot-scope="scope">
          <el-tag disable-transitions>{{ scope.row.id }}</el-tag>
        </template>
      </el-table-column> -->

      <!-- 状态变更按钮 -->
      <el-table-column label="变更信息" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="statusChange(scope.row.id, scope.row.cusName, scope.row.cusLoc, scope.row.cusIntent, scope.row.brokerName, scope.row.brokerPhone, scope.row.brokerPosit, scope.row.salerName, scope.row.lastVisitDate, scope.row.lastContactDate, scope.row.cusStatus, scope.row.remark)">
            变更信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 状态变更模态框 -->
    <el-dialog :visible.sync="dialogCusStatus" title="客户信息变更" width="40%" style="margin-bottom:20px">
      <el-form ref="cusStatusForm" :model="cusStatusForm" label-width="80px">
        <el-form-item label="客户名称" label-width="100px" prop="cusName">
          <el-input v-model="cusStatusForm.cusName" />
        </el-form-item>
        <el-form-item label="客户位置" label-width="100px" prop="cusLoc">
          <el-input v-model="cusStatusForm.cusLoc" />
        </el-form-item>
        <el-form-item label="意向程度" label-width="100px" prop="cusIntent">
          <el-select v-model="cusStatusForm.cusIntent" placeholder="请选择">
            <el-option v-for="item in cusIntentOptions" :key="item" :label="item" :value="item" />
          </el-select>
          <!-- <el-input v-model="cusStatusForm.cusIntent" /> -->
        </el-form-item>
        <el-form-item label="对接人姓名" label-width="100px" prop="brokerName">
          <el-input v-model="cusStatusForm.brokerName" />
        </el-form-item>
        <el-form-item label="对接人手机号" label-width="100px" prop="brokerPhone">
          <el-input v-model="cusStatusForm.brokerPhone" />
        </el-form-item>
        <el-form-item label="对接人职位" label-width="100px" prop="brokerPosit">
          <el-input v-model="cusStatusForm.brokerPosit" />
        </el-form-item>
        <el-form-item label="销售员" label-width="100px" prop="salerName">
          <el-input v-model="cusStatusForm.salerName" />
        </el-form-item>
        <el-form-item label="上次拜访日期" label-width="100px" prop="lastVisitDate">
          <el-date-picker
            v-model="cusStatusForm.lastVisitDate"
            type="date"
            placeholder="选择日期"
          />
          <!-- <el-input v-model="cusStatusForm.lastVisitDate" /> -->
        </el-form-item>
        <el-form-item label="上次联系日期" label-width="100px" prop="lastContactDate">
          <el-date-picker
            v-model="cusStatusForm.lastContactDate"
            type="date"
            placeholder="选择日期"
          />
          <!-- <el-input v-model="cusStatusForm.lastContactDate" /> -->
        </el-form-item>
        <el-form-item label="客户状态" label-width="100px" prop="salerName">
          <el-input v-model="cusStatusForm.cusStatus" />
        </el-form-item>
        <el-form-item label="备注" label-width="100px" prop="remark">
          <el-input v-model="cusStatusForm.remark" :rows="5" type="textarea" />
        </el-form-item>
        <!-- <el-form-item label="备注" label-width="100px" prop="cusStatus">
          <el-select v-model="cusStatusForm.cusStatus" placeholder="请选择">
            <el-option v-for="item in cusStatusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="success" @click="cusStatusChangePost(cusStatusForm)">确定</el-button>
          <el-button @click="cancelCusStatusChange()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 备注模态框 -->
    <el-dialog :visible.sync="dialogRepairContent" title="客户详情">
      <span>{{ remark }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRepairContent = false">确定</el-button>
      </span>
    </el-dialog>

    <!-- 新增客户信息页面模态框 -->
    <el-dialog :visible.sync="dialogNewCus" title="新增客户信息">
      <el-card class="box-card">
        <!-- 定义表单提交项 -->
        <el-form ref="newCus" :model="newCusForm" label-width="80px">
          <el-form-item label="客户名称" label-width="100px" prop="cusName">
            <el-input v-model="newCusForm.cusName" />
          </el-form-item>
          <el-form-item label="客户位置" label-width="100px" prop="cusLoc">
            <el-input v-model="newCusForm.cusLoc" />
          </el-form-item>
          <el-form-item label="意向程度" label-width="100px" prop="cusIntent">
            <el-select v-model="newCusForm.cusIntent" placeholder="请选择">
              <el-option v-for="item in cusIntentOptions" :key="item" :label="item" :value="item" />
            </el-select>
          <!-- <el-input v-model="cusStatusForm.cusIntent" /> -->
          </el-form-item>
          <el-form-item label="对接人姓名" label-width="100px" prop="brokerName">
            <el-input v-model="newCusForm.brokerName" />
          </el-form-item>
          <el-form-item label="对接人手机号" label-width="100px" prop="brokerPhone">
            <el-input v-model="newCusForm.brokerPhone" />
          </el-form-item>
          <el-form-item label="对接人职位" label-width="100px" prop="brokerPosit">
            <el-input v-model="newCusForm.brokerPosit" />
          </el-form-item>
          <el-form-item label="上次拜访日期" label-width="100px" prop="lastVisitDate">
            <el-date-picker
              v-model="newCusForm.lastVisitDate"
              type="date"
              placeholder="选择日期"
            />
          <!-- <el-input v-model="cusStatusForm.lastVisitDate" /> -->
          </el-form-item>
          <el-form-item label="上次联系日期" label-width="100px" prop="lastContactDate">
            <el-date-picker
              v-model="newCusForm.lastContactDate"
              type="date"
              placeholder="选择日期"
            />
          <!-- <el-input v-model="cusStatusForm.lastContactDate" /> -->
          </el-form-item>
          <el-form-item label="备注" label-width="100px" prop="remark">
            <el-input v-model="newCusForm.remark" :rows="5" type="textarea" />
          </el-form-item>
          <!-- <el-form-item label="备注" label-width="100px" prop="cusStatus">
          <el-select v-model="cusStatusForm.cusStatus" placeholder="请选择">
            <el-option v-for="item in cusStatusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
          <el-form-item>
            <el-button type="success" @click="newCusPost(newCusForm)">确定</el-button>
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
import { cusList, cusStatusChange, newCusFormPost } from '@/api/cusManage'
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
        cusName: null,
        brokerName: null,
        brokerPhone: null,
        salerName: null,
        salerDepart: null,
        adminId: this.$store.getters.adminId
      },
      // 声明下api变量
      tableData: [],
      dialogCusStatus: false,
      cusStatusOptions: ['已推介', '已到访', '已排号', '已成交'],
      cusIntentOptions: ['极高', '高', '中等', '一般', '较低', '极低'],
      cusIntentHigh: ['极高', '高'],
      cusStatusList: ['已成交'],
      cusStatusForm: {
        cusName: null,
        cusLoc: null,
        cusIntent: null,
        brokerName: null,
        brokerPhone: null,
        brokerPosit: null,
        salerName: null,
        lastVisitDate: null,
        lastContactDate: null,
        remark: null,
        cusStatus: null,
        adminId: this.$store.getters.adminId
      },
      dialogRepairContent: false,
      remark: null,
      dialogNewCus: false,
      newCusForm: {
        cusName: null,
        cusLoc: null,
        cusIntent: null,
        brokerName: null,
        brokerPhone: null,
        brokerPosit: null,
        lastVisitDate: null,
        lastContactDate: null,
        remark: null,
        adminId: this.$store.getters.adminId
      },
      operatorDepartmentOptions: ['影视', '科技']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      cusList(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
        this.listLoading = false
      })
    },
    statusChange(id, cusName, cusLoc, cusIntent, brokerName, brokerPhone, brokerPosit, salerName, lastVisitDate, lastContactDate, cusStatus, remark) {
      this.cusStatusForm.id = id
      this.cusStatusForm.cusName = cusName
      this.cusStatusForm.cusLoc = cusLoc
      this.cusStatusForm.cusIntent = cusIntent
      this.cusStatusForm.brokerName = brokerName
      this.cusStatusForm.brokerPhone = brokerPhone
      this.cusStatusForm.brokerPosit = brokerPosit
      this.cusStatusForm.salerName = salerName
      this.cusStatusForm.lastVisitDate = lastVisitDate
      this.cusStatusForm.lastContactDate = lastContactDate
      this.cusStatusForm.cusStatus = cusStatus
      this.cusStatusForm.remark = remark
      this.dialogCusStatus = true
    },
    // 获取备注详情
    // 点击报修内容获取详情
    getContentAll(remark) {
      this.remark = remark
      this.dialogRepairContent = true
    },
    cancelCusStatusChange() {
      this.dialogCusStatus = false
    },
    // 状态变更提交
    cusStatusChangePost(cusStatusForm) {
      console.log(cusStatusForm)
      cusStatusChange(cusStatusForm).then(response => {
        if (response.codeStatus === 200) {
          this.$notify({
            title: 'Success',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.dialogCusStatus = false
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
    // 新增操作员信息按钮
    handleNewCus() {
      this.dialogNewCus = true
    },
    // 新增客户信息提交
    newCusPost(newCusForm) {
      newCusFormPost(newCusForm).then(response => {
        if (response.codeStatus === 200) {
          this.$notify({
            title: 'Success',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.dialogNewCus = false
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
      if (this.$refs['newCus'] !== undefined) {
        this.$nextTick(() => {
          this.$refs['newCus'].resetFields()
        })
      }
      this.dialogNewCus = false
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
