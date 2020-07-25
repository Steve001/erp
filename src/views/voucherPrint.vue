<template>
  <!-- 收费凭证打印界面 -->
  <div class="app-container">

    <!-- 顶部搜索框 -->
    <div class="filter-container">
      <el-input v-model="listQuery_all.cusName" type="text" placeholder="输入业主姓名" style="width: 200px" class="filter-item" clearable />
      <el-input v-model="listQuery_all.cusPhone" type="text" placeholder="输入业主手机号" style="width: 200px" class="filter-item" clearable />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(listQuery_all.page=1)">
        搜索
      </el-button>
    </div>

    <el-button v-waves class="filter-item" type="success" icon="el-icon-coin" @click="handlePrintTest">
      打印测试页
    </el-button>
    <br>
    <br>

    <!-- 可打印项目表格 -->
    <el-card style="margin-top: 20px; height: 50px;width:300px; text-align:center; vertical-align:middle">
      可打印的收费项目清单
    </el-card>
    <br>

    <div id="printMe" class="printTable">
      <el-table ref="multipleSelection" :data="tableData" highlight-current-row border fit max-height="900px">
        <el-table-column label="收费项目id" prop="voucherId" width="50px" align="center" />
        <el-table-column label="业主姓名" prop="cusName" align="center" />
        <el-table-column label="选房序号" prop="cusNum" align="center" />
        <el-table-column label="身份证号码" prop="cusIdNum" align="center" />
        <el-table-column label="手机号码" prop="cusPhone" align="center" />
        <el-table-column label="楼号" prop="buildingNum" align="center" />
        <el-table-column label="单元号" prop="unitNum" align="center" />
        <el-table-column label="房号" prop="houseNum" align="center" />
        <el-table-column label="面积" prop="houseArea" align="center" />
        <el-table-column label="佰万" prop="millionNum" align="center" />
        <el-table-column label="拾万" prop="hundredThousandNum" align="center" />
        <el-table-column label="万" prop="tenThousandNum" align="center" />
        <el-table-column label="千" prop="thousandNum" align="center" />
        <el-table-column label="百" prop="hundredNum" align="center" />
        <el-table-column label="十" prop="tenNum" align="center" />
        <el-table-column label="个" prop="oneNum" align="center" />
        <el-table-column label="总价" prop="numAll" align="center" />
        <el-table-column label="打印状态" prop="printStatus" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.printStatus > 0 ? 'danger' : 'success'" disable-transitions>{{ scope.row.printStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="打印" align="center" width="80" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="{row}">
            <el-button type="primary" size="medium" @click="printDialog(row)">
              打印
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页功能实现标签 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery_all.page" @pagination="getList" />

    <!-- 打印测试页 -->
    <el-dialog :visible.sync="dialogPrintTest" width="80%" title="打印测试页">
      <div id="printVoucher">
        <div class="fontbox">
          <div class="invoicMain">
            <div class="invoiceHeader">
              <div class="headerMiddle" style="margin: 0 auto">
                <h1>华龙澜园认购书</h1>
                <div class="line" />
              </div>
            </div>
            <div class="invoiceBody">
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">买方姓名</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;" />
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">选房序号</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;" />
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">身份证号码</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;" />
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">手机号码</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;" />
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">认购房源</label>
                </div>
                <div class="realData">
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;margin-left:10px" />
                  <div class="textLabel" style="color:black;">号楼</div>
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;" />
                  <div class="textLabel" style="color:black;">单元</div>
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;" />
                  <div class="textLabel" style="color:black;">号房</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">建筑面积</label>
                </div>
                <div class="mixpayType">
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;margin-left:40px;" />
                  <div class="textLabel" style="color:black;">平方米</div>
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 11.7%">
                  <label style="margin:auto auto">房源总价</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;margin-right:0;">人民币</div>
                  <div class="textLine" style="color:black;width:50%;" />
                  <div class="textLabel" style="color:black;">佰</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">拾</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">万</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">仟</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">佰</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">拾</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">元整</div>
                  <div class="textLabel" style="color:black;">（¥：</div>
                  <div class="textLine" style="color:black;" />
                  <div class="textLabel" style="color:black;">）元</div>
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">定金</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">￥: 10000元（大写：壹万元整）</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">付款方式</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;">入会诚意金选房成功自动转为定金</div>
                </div>
              </div>
              <div class="userInfo" style="height:360px">
                <div class="moneyType" style="width: 11.7%">
                  <label style="margin:auto auto">特别约定</label>
                </div>
                <div class="realData">
                  <span class="textContent" style="color:black;margin-top:5%;margin-left:5px;">恭喜您成功选购华龙澜园住宅产品！<br><br>鉴于双方在选房认购之前已就本次澜园认购情况作详尽沟通，本着公平、自愿、透明的原则，现达成以下认购约定：
                    <br><br>1、请于 2020 年 6 月 16 日之前，补足认购定金：105平米户型定金二万元，122平米户型定金三万元，136平米户型5万元，卖方将为您保留该房源直至正式签订商品房买卖合同；
                    <br><br>如在此之前未确认收到足额定金，将会被视为放弃认购该房源及已付定金，卖方可另行处理该物业。
                    <br><br>2、卖方收到买方定金后，除非得到买方放弃认购的通知，不得于 2020 年 6 月 16 日之前将该物业再售他人，否则双倍返还定金。
                    <br><br>3、本认购书约定价格为房源原始总价，买方拥有的认购优惠权益、以不同付款方式、付款时间享有的优惠权益在最终付款并签订《商品房买卖合同》最终核定；请务必遵循您的置业顾问通知的时间<br><br>按时付款签约。
                    <br><br>4、本认购书为双方在公平、自愿、透明的前提下达成的预约协议，双方具体权利义务以最终签订的《商品房买卖合同》为准，此认购书一式二份，买卖双方各持一份，具有同等法律效力。
                    <br><br>5、认购一楼复式户型的地下室部分总价另计。
                  </span>
                </div>
              </div>
              <div class="userInfo" style="height:100px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">卖方（盖章）</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">新乡市华龙置业有限公司</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">买方（签字）</label>
                </div>
                <div class="mixpayType">
                  <!-- <label style="margin:auto auto">缴费方式</label> -->
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">日期</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">2020年6月13日</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">日期</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;">2020年6月13日</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- 打印按钮 -->
      <el-button v-print="printObj" style="margin-top:50px" type="success" @click="handlePrintPost(houseId, voucherId)">打印</el-button>
      <el-button @click="cancelPrint()">取消</el-button>
    </el-dialog>

    <!-- ************************************************************************
    *****************************************************************************
    ***************************************************************************** -->

    <!-- 指定行的收费模态框 -->
    <el-dialog :visible.sync="dialogPrint" width="80%" title="认购书打印">
      <div id="printVoucher">
        <div class="fontbox">
          <div class="invoicMain">
            <div class="invoiceHeader">
              <div class="headerMiddle" style="margin: 0 auto">
                <h1>华龙澜园认购书</h1>
                <div class="line" />
              </div>
            </div>
            <div class="invoiceBody">
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">买方姓名</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">{{ cusName }}</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">选房序号</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;">{{ cusNum }}</div>
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">身份证号码</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">{{ cusIdNum }}</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">手机号码</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;">{{ cusPhone }}</div>
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">认购房源</label>
                </div>
                <div class="realData">
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;margin-left:10px">{{ buildingNum }}</div>
                  <div class="textLabel" style="color:black;">号楼</div>
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;">{{ unitNum }}</div>
                  <div class="textLabel" style="color:black;">单元</div>
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;">{{ houseNum }}</div>
                  <div class="textLabel" style="color:black;">号房</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">建筑面积</label>
                </div>
                <div class="mixpayType">
                  <div class="textLine" style="color:black;padding-left:10px;padding-right:10px;margin-left:40px;">{{ houseArea }}</div>
                  <div class="textLabel" style="color:black;">平方米</div>
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 11.7%">
                  <label style="margin:auto auto">房源总价</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;margin-right:0;">人民币</div>
                  <div class="textLine" style="color:black;width:50%;">{{ millionNum }}</div>
                  <div class="textLabel" style="color:black;">佰</div>
                  <div class="textLine" style="color:black;">{{ hundredThousandNum }}</div>
                  <div class="textLabel" style="color:black;">拾</div>
                  <div class="textLine" style="color:black;">{{ tenThousandNum }}</div>
                  <div class="textLabel" style="color:black;">万</div>
                  <div class="textLine" style="color:black;">{{ thousandNum }}</div>
                  <div class="textLabel" style="color:black;">仟</div>
                  <div class="textLine" style="color:black;">{{ hundredNum }}</div>
                  <div class="textLabel" style="color:black;">佰</div>
                  <div class="textLine" style="color:black;">{{ tenNum }}</div>
                  <div class="textLabel" style="color:black;">拾</div>
                  <div class="textLine" style="color:black;">{{ oneNum }}</div>
                  <div class="textLabel" style="color:black;">元整</div>
                  <div class="textLabel" style="color:black;">（¥：</div>
                  <div class="textLine" style="color:black;">{{ numAll }}</div>
                  <div class="textLabel" style="color:black;">）元</div>
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">定金</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">￥: 10000元（大写：壹万元整）</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">付款方式</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;">入会诚意金选房成功自动转为定金</div>
                </div>
              </div>
              <div class="userInfo" style="height:360px">
                <div class="moneyType" style="width: 11.7%">
                  <label style="margin:auto auto">特别约定</label>
                </div>
                <div class="realData">
                  <span class="textContent" style="color:black;margin-top:5%;margin-left:5px;">恭喜您成功选购华龙澜园住宅产品！<br><br>鉴于双方在选房认购之前已就本次澜园认购情况作详尽沟通，本着公平、自愿、透明的原则，现达成以下认购约定：
                    <br><br>1、请于 2020 年 6 月 16 日之前，补足认购定金：105平米户型定金二万元，122平米户型定金三万元，136平米户型5万元，卖方将为您保留该房源直至正式签订商品房买卖合同；
                    <br><br>如在此之前未确认收到足额定金，将会被视为放弃认购该房源及已付定金，卖方可另行处理该物业。
                    <br><br>2、卖方收到买方定金后，除非得到买方放弃认购的通知，不得于 2020 年 6 月 16 日之前将该物业再售他人，否则双倍返还定金。
                    <br><br>3、本认购书约定价格为房源原始总价，买方拥有的认购优惠权益、以不同付款方式、付款时间享有的优惠权益在最终付款并签订《商品房买卖合同》最终核定；请务必遵循您的置业顾问通知的时间<br><br>按时付款签约。
                    <br><br>4、本认购书为双方在公平、自愿、透明的前提下达成的预约协议，双方具体权利义务以最终签订的《商品房买卖合同》为准，此认购书一式二份，买卖双方各持一份，具有同等法律效力。
                    <br><br>5、认购一楼复式户型的地下室部分总价另计。
                  </span>
                </div>
              </div>
              <div class="userInfo" style="height:100px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">卖方（盖章）</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">新乡市华龙置业有限公司</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">买方（签字）</label>
                </div>
                <div class="mixpayType">
                  <!-- <label style="margin:auto auto">缴费方式</label> -->
                </div>
              </div>
              <div class="userInfo" style="height:60px">
                <div class="moneyType" style="width: 25%">
                  <label style="margin:auto auto">日期</label>
                </div>
                <div class="realData">
                  <div class="textLabel" style="color:black;">2020年6月13日</div>
                </div>
                <div class="password" style="width:25%">
                  <label style="margin:auto auto">日期</label>
                </div>
                <div class="mixpayType">
                  <div class="textLabel" style="color:black;">2020年6月13日</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 打印按钮 -->
      <el-button v-print="printObj" style="margin-top:50px" type="success" @click="handlePrintPost(voucherId)">打印</el-button>
      <el-button @click="cancelPrint()">取消</el-button>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchAllCharging, singleVoucherIdPost } from '@/api/voucherPrint'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'ExportChargingVoucher',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      downloadLoading: false,
      listLoading: true,
      printedTotal: 0,
      total: 0,
      listQuery_all: {
        page: 1,
        cusName: null,
        cusPhone: null
      },
      printedTableData: null,
      tableData: null,
      dialogPrint: false,
      printObj: {
        id: 'printVoucher'
      },
      rowSelected: [],
      // 从store中取出adminId/adminName
      // adminId: this.$store.getters.adminId,
      // adminName: this.$store.getters.adminName
      housePaidQuery: {
        houseId: null,
        adminId: this.$store.getters.adminId
      },
      // 点击打印按钮时的请求参数
      getHouseIdPrintQuery: {
        houseId: null,
        receiptNumber: null,
        adminId: this.$store.getters.adminId
      },
      receiptNumber: null,
      // 打印完成之后把打印的项目参数
      printedHouIds: {
        voucherId: null,
        houseId: null
      },
      // 打印字段定义
      voucherId: null,
      cusName: null,
      cusNum: null,
      cusIdNum: null,
      cusPhone: null,
      buildingNum: null,
      unitNum: null,
      houseNum: null,
      houseArea: null,
      millionNum: null,
      hundredThousandNum: null,
      tenThousandNum: null,
      thousandNum: null,
      hundredNum: null,
      tenNum: null,
      oneNum: null,
      numAll: null,
      printStatus: null,
      // 打印测试页模态框
      dialogPrintTest: null
    }
  },
  computed: {
    ...mapGetters([
      'adminName',
      'adminId',
      'roles'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    // 打印测试页
    handlePrintTest() {
      this.dialogPrintTest = true
    },
    // 单一项目打印
    handlePrintPost(voucherId) {
      this.printedHouIds.voucherId = voucherId
      singleVoucherIdPost(this.printedHouIds).then(response => {
        if (response.code === 200) {
          this.$notify({
            title: '注意！',
            message: '打印成功',
            type: 'success',
            duration: 8000
          })

          this.dialogPrint = false
          fetchAllCharging(this.listQuery_all).then(response => {
            this.tableData = response.data.items
            this.total = response.total
          })
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
    cancelPrint() {
      this.dialogPrint = false
      this.dialogPrintTest = false
    },
    // 每行末尾针对单一项目的收费模态框
    printDialog(row) {
      this.voucherId = row.voucherId
      this.cusName = row.cusName
      this.cusNum = row.cusNum
      this.cusIdNum = row.cusIdNum
      this.cusPhone = row.cusPhone
      this.buildingNum = row.buildingNum
      this.unitNum = row.unitNum
      this.houseNum = row.houseNum
      this.houseArea = row.houseArea
      this.millionNum = row.millionNum
      this.hundredThousandNum = row.hundredThousandNum
      this.tenThousandNum = row.tenThousandNum
      this.thousandNum = row.thousandNum
      this.hundredNum = row.hundredNum
      this.tenNum = row.tenNum
      this.oneNum = row.oneNum
      this.numAll = row.numAll
      this.dialogPrint = true
    },
    getList() {
      fetchAllCharging(this.listQuery_all).then(response => {
        this.tableData = response.data.items
        this.total = response.total
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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

ul,
    ul li {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    label {
        font-weight: 100;
        font-size: 13px;
        color: #9c5223;
    }

    .invoicMain {
        width: 2000px;
        padding: 0 auto;
        font-size: 14px;
        color: #000;
    }

    .fontbox {
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }

    .fontbox .rightText {
        font-weight: 100;
        width: 1px;
        height: 100%;
        margin-left: 10px;
        flex-flow: column;
        align-items: center;
    }

    .invoiceHeader {
        height: 126px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .headerLeft li:nth-child(1) {
        text-indent: 1em;
    }

    .headerLeft li {
        // margin-top: 100px;
    }

    .headerMiddle h1 {
        font-size: 32px;
        color: #9c5223;
        font-family: 'kaiti';
        margin: 0 auto;
        text-align: center;
    }

    .line {
        height: 2px;
        border-top: #9c5223 1px solid;
        border-bottom: #9c5223 1px solid;
    }

    .textLine {
        font-size: 15px;
        width: 100%;
        height: 25px;
        border-bottom: #000000 1px solid;
    }

    .textLabel {
        font-size: 15px;
        width: 100%;
        height: 25px;
    }

    .textContent {
        font-size: 15px;
        width: 100%;
        height: 100%;
        text-align: left;
        display: block;
    }

    .headerRight li {
        line-height: 24px;
        // margin-top: 100px;
    }

    .invoiceBody {
        border: 1px solid #9c5223;
    }

    .userInfo {
        width: 100%;
        display: flex;
        align-items: center;
        height: 96px;
        border-bottom: 1px solid #9c5223;
    }

    .userInfo ul {
        width: 50%;
        margin: 0 5px;
        padding: 0;

    }

    .userInfo ul li {
        line-height: 24px;
    }

    .moneyType {
        padding: 0 10px;
        width: 60%;
        text-align: left;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .houseId {
        padding: 0 10px;
        width: 60%;
        border-left: 1px solid #9c5223;
        text-align: left;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .password {
        padding: 0 10px;
        width: 50%;
        border-left: 1px solid #9c5223;
        border-right: 1px solid #9c5223;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .mixpayType {
        width: 100%;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .realData {
        width: 100%;
        text-align: center;
        border-left: 1px solid #9c5223;
        height: 100%;
        display: flex;
        align-items: center;
        color: #9c5223;
    }

    .payTypes {
        padding: 0 10px;
        height: 100%;
        text-align: center;
        border-bottom: 1px solid #9c5223;
        text-align: center;
        vertical-align: top;
        display: flex;
        color: #9c5223;
    }

    .GoodsTable {
        height: 210px;
        width: 100%;
        border-collapse: collapse;
    }

    .GoodsTable td {
        border-right: 1px solid #9c5223;
        color: #9c5223;
    }

    .GoodsTable tr:nth-child(1),
    .GoodsTable tr:nth-last-child(2) {
        height: 24px;
    }

    .GoodsTable tr:nth-last-child(1) {
        height: 34px;
    }

    .GoodsTable tr:nth-child(1) td {
        text-align: center;
    }

    .GoodsTotal {
        border-top: 1px solid #9c5223;
        border-bottom: 1px solid #9c5223;
    }

    .total td:nth-child(1) {
        text-align: center;
    }

    .invoicetFooter {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    .invoicetFooter li {
        width: 25%;
    }

</style>
