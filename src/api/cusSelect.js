import request from '@/utils/request'

export function cusSelectList(query) {
  return request({
    url: '/houseSelect/cusSelectList',
    method: 'post',
    data: { query }
  })
}

