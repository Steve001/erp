import request from '@/utils/request'

export function houseLikeList(query) {
  return request({
    url: '/houseSelect/houseLikeList',
    method: 'post',
    data: { query }
  })
}

// 房源收藏数倒序排序
export function houseSelectOrderDesc(query) {
  return request({
    url: '/houseSelect/houseSelectOrderDesc',
    method: 'post',
    data: { query }
  })
}

// 获取房源收藏信息
export function getHouseLikedDetail(houseId) {
  return request({
    url: '/houseSelect/getHouseLikedDetail',
    method: 'post',
    data: { houseId }
  })
}

