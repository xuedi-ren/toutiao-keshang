// 用户选择图片后如何显示图片?
// 1. 获取file对象  --> e.target.files
// 2. 把file对象转成img的src可识别的格式
//    - objectUrl  --> URL.createObjectUrl(file对象)
// - 缺点: 内存泄露  因为跟document绑定在一起
// - 优点: 写法简单
//    - Base64   --> FileReader(读文件对象)
// - fr.readAsDataURL(file)
// - fr.onload = (e)=>{  e.target.result  }

export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
