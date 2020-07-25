<template>
  <!-- 选房收藏分析 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery_all.houseId" type="text" placeholder="输入房号" style="width: 130px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.buildingNum" type="text" placeholder="输入楼号" style="width: 150px" class="filter-item" clearable />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page = 1)">
        搜索
      </el-button>
      <!-- <el-button v-waves class="filter-item" type="success" @click="houseOrder()">
        <svg-icon icon-class="stars" />
        收藏数排序
      </el-button> -->
    </div>

    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="tableData" highlight-current-row stripe border fit max-height="900px">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="完整房号" prop="houseId" align="center" />
      <el-table-column label="楼号" prop="buildingNum" align="center" />
      <el-table-column label="单元" prop="unitNum" align="center" />
      <el-table-column label="房号" prop="houseNum" align="center" />
      <el-table-column label="房源收藏数" prop="houseLikedNum" align="center" />
      <!-- 查看收藏信息按钮 -->
      <el-table-column label="查看收藏信息" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="large" @click="viewLikedDetail(scope.row.houseId)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 房源收藏细节模态框 -->
    <el-dialog :visible.sync="dialogHouseLikedDetail" width="20%" title="房源收藏信息">
      <el-table v-loading="listLoading" :data="houseLikedTableData" highlight-current-row stripe border fit max-height="900px">
        <el-table-column label="id" prop="id" align="center" />
        <el-table-column label="客户姓名" prop="cusName" align="center" />
        <el-table-column label="客户手机号" prop="cusPhone" align="center" />
      </el-table>
      <el-button type="success" @click="closeDialog()">确定</el-button>
    </el-dialog>

    <!-- 分页功能实现标签 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery_all.page" @pagination="getList" />
  </div>
</template>

<script>
import { houseLikeList, getHouseLikedDetail, houseSelectOrderDesc } from '@/api/houseSelect'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HouseSelectManage',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: true,
      total: 0,
      // list接口请求参数
      listQuery_all: {
        page: 1,
        houseId: null,
        buildingNum: null
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
      houseLikeList(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
        this.listLoading = false
      })
    },
    // 查看房源收藏具体信息
    viewLikedDetail(houseId) {
      getHouseLikedDetail(houseId).then(response => {
        this.houseLikedTableData = response.data.items
        this.listLoading = false
      })
      this.dialogHouseLikedDetail = true
    },
    // 关闭房源收藏模态框
    closeDialog() {
      this.dialogHouseLikedDetail = false
    },
    // 收藏数倒序排序
    houseOrder() {
      this.listLoading = true
      houseSelectOrderDesc(this.listQuery_all).then(response => {
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
