<template>
  <!-- 客户收藏分析 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery_all.cusName" type="text" placeholder="输入客户姓名" style="width: 130px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.cusPhone" type="text" placeholder="输入客户手机号" style="width: 150px" class="filter-item" clearable />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page = 1)">
        搜索
      </el-button>
    </div>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row stripe border fit max-height="900px">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="客户姓名" prop="cusName" align="center" />
      <el-table-column label="客户手机号" prop="cusPhone" align="center" />
      <el-table-column label="收藏1房号" prop="cusLikedHouseId1" align="center" />
      <el-table-column label="收藏2房号" prop="cusLikedHouseId2" align="center" />
      <el-table-column label="收藏3房号" prop="cusLikedHouseId3" align="center" />
    </el-table>

    <!-- 分页功能实现标签 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery_all.page" @pagination="getList" />
  </div>
</template>

<script>
import { cusSelectList } from '@/api/cusSelect'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'CusLikedManage',
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
      houseLikedTableData: [],
      dialogHouseLikedDetail: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      cusSelectList(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
        this.listLoading = false
      })
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
