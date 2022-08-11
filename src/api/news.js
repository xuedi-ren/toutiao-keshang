import request from '@/utils/request'
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

// ! 获取文章详情
export const getArticleDetailsAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`,
  })
}

// !收藏文章
export const addCollectedAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// !取消收藏文章
export const delCollectedAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE',
  })
}

// ! 加关注
export const addAttentionAPI = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// ! 取消关注
export const delAttentionAPI = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE',
  })
}
