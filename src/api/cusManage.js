import request from '@/utils/request'

export function cusList(query) {
  return request({
    url: '/erp/cusManage/cusList',
    method: 'post',
    data: query
  })
}

export function cusStatusChange(query) {
  return request({
    url: '/erp/cusManage/statusChange',
    method: 'post',
    data: query
  })
}

export function newCusFormPost(query) {
  return request({
    url: '/erp/cusManage/newCusFormPost',
    method: 'post',
    data: query
  })
}

