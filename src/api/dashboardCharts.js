import request from '@/utils/request'

// 获取控制台echart数据源
export function getEchartDetails(query) {
  return request({
    url: '/dashboardCharts/echartDetails',
    method: 'get',
    data: query
  })
}

// 获取控制台echart数据源
export function getEchartNumAll() {
  return request({
    url: '/dashboardCharts/echartNumAll',
    method: 'get'
  })
}
