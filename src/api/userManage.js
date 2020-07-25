import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/erp/userManage/userList',
    method: 'post',
    data: query
  })
}

export function newSalerFormPost(query) {
  return request({
    url: '/erp/userManage/newSaler',
    method: 'post',
    data: query
  })
}
