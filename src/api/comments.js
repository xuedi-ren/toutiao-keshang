import request from '@/utils/request'

export const getComments = params => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// !评论点赞
export const addLikeComments = target => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// ! 取消评论点赞
export const delLikeComments = id => {
  return request({
    url: `/v1_0/comment/likings/${id}`,
    method: 'DELETE',
  })
}

// ! 文章评论
export const postCommentAPI = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
