<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartDataFinal" />
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { getEchartDetails } from '@/api/dashboardCharts'

var lineChartData = {
  user: {
    todayData: null,
    allData: null
  },
  cus: {
    todayData: null,
    allData: null
  },
  cusArrived: {
    todayData: null,
    allData: null
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartDataFinal: lineChartData.user
    }
  },
  created() {
    this.getEchart()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartDataFinal = this.lineChartData[type]
    },
    getEchart() {
      getEchartDetails().then(response => {
        this.lineChartData = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  // .chart-wrapper {
  //   background: #fff;
  //   padding: 16px 16px 0;
  //   margin-bottom: 32px;
  // }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
