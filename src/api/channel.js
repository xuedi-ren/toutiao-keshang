import request from '@/utils/request'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels',
  })
}

//! 获取全部频道列表
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// !删除频道
export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE',
  })
}
