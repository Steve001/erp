<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="16" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('user')">
        <div class="card-panel-icon-wrapper icon-electric">
          <svg-icon icon-class="electric" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            经纪人注册总量
          </div>
          <count-to :start-val="0" :end-val="userEndval" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('cus')">
        <div class="card-panel-icon-wrapper icon-water">
          <svg-icon icon-class="property" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            客户推介总量
          </div>
          <count-to :start-val="0" :end-val="cusEndval" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('cusArrived')">
        <div class="card-panel-icon-wrapper icon-property">
          <svg-icon icon-class="parking" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            到访客户总量
          </div>
          <count-to :start-val="0" :end-val="cusArrivedEndval" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getEchartNumAll } from '@/api/dashboardCharts'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      userEndval: null,
      cusEndval: null,
      cusArrivedEndval: null
    }
  },
  created() {
    this.getEchart()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getEchart() {
      getEchartNumAll().then(response => {
        this.userEndval = response.data.userEndval
        this.cusEndval = response.data.cusEndval
        this.cusArrivedEndval = response.data.cusArrivedEndval
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-electric {
        background: #40c9c6;
      }

      .icon-water {
        background: #36a3f7;
      }

      .icon-property {
        background: #f4516c;
      }

      .icon-parking {
        background: #34bfa3
      }
    }

    .icon-electric {
      color: #40c9c6;
    }

    .icon-water {
      color: #36a3f7;
    }

    .icon-property {
      color: #f4516c;
    }

    .icon-parking {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
