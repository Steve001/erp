import request from '@/utils/request'

// list
export function fetchAllCharging(listQuery) {
  return request({
    url: '/houseSelect/printList',
    method: 'post',
    data: { listQuery }
  })
}

// 打印成功post
export function singleVoucherIdPost(listQuery) {
  return request({
    url: '/houseSelect/singleVoucherIdPost',
    method: 'post',
    data: { listQuery }
  })
}

