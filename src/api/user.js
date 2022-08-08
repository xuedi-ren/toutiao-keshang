import request from '@/utils/request'
// 登录api封装
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

//! 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// ? 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
//! 如果后端要的是表单(form-data)
// ? const fm = new FormData()
//! fm.append(表单的name,表单项)
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

export const uploadUserInfoAPI = (name) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name
    }
  })
}

export const uploadUserGenderAPI = (gender) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      gender
    }
  })
}

export const uploadUserBirthdayAPI = (birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday
    }
  })
}
