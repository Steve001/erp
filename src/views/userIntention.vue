<template>
  <!-- 用户意向 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery_all.cusName" type="text" placeholder="输入姓名" style="width: 130px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.cusPhone" type="text" placeholder="输入手机号" style="width: 150px" class="filter-item" clearable />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page = 1)">
        搜索
      </el-button>
    </div>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row stripe border fit max-height="900px">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="姓名" prop="userName" align="center" />
      <el-table-column label="手机号" prop="userPhone" align="center" />
      <el-table-column label="所属机构" prop="userOrgan" align="center" />
      <el-table-column label="最近位置" prop="userLoc" align="center" />
      <el-table-column label="房源查看次数" prop="houseActCount" align="center" />
      <el-table-column label="vr查看次数" prop="vrActCount" align="center" />
      <el-table-column label="app启动次数" prop="appLanuchCount" align="center" />
      <el-table-column label="成功邀请下载次数" prop="inviteTotal" align="center" />
      <el-table-column
        label="用户意向"
        prop="userIntention"
        align="center"
        :filters="[{ text: '意向客户', value: '意向客户' }, { text: '意向一般', value: '意向一般' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.userIntention === '意向客户' ? 'success' : 'primary'" disable-transitions>{{ scope.row.userIntention }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能实现标签 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery_all.page" @pagination="getList" />
  </div>
</template>

<script>
import { userActCount } from '@/api/userAnalyse'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CusIntention',
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
        cusPhone: null
      },
      // 声明下api变量
      tableData: [],
      dialogCusStatus: false,
      cusStatusOptions: ['已推介', '已到访', '已排号', '已成交'],
      cusStatusForm: {
        cusName: null,
        cusPhone: null,
        cusStatus: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userActCount(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
        this.listLoading = false
      })
    },
    filterTag(value, row) {
      return row.userIntention === value
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
