import request from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
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
    method: 'DELETE'
  })
}

//! 添加频道
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

export const setMyChannelsToLocal = (myChannels) =>
  storage.set('TOUTIAO_MY_CHANNELS', myChannels)

export const getMyChannelsToLocal = () => storage.get('TOUTIAO_MY_CHANNELS')
