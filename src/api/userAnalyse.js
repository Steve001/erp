import request from '@/utils/request'

export function userActCount(query) {
  return request({
    url: '/userAnalyse/userActCount',
    method: 'post',
    data: query
  })
}

export function userLocHeat() {
  return request({
    url: '/userAnalyse/userLocHeat',
    method: 'get'
  })
}
