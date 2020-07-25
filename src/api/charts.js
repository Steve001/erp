import request from '@/utils/request'

// 获取经纪人量客户量具体数据（linkMarker）
export function registerAll() {
  return request({
    url: '/dashboardCharts/registerAll',
    method: 'get'
  })
}

