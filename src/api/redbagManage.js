import request from '@/utils/request'

export function redbagList(query) {
  return request({
    url: '/redbagManage/redbagList',
    method: 'post',
    data: query
  })
}

export function redbagStatusChange(query) {
  return request({
    url: '/redbagManage/redbagStatusChange',
    method: 'post',
    data: query
  })
}

