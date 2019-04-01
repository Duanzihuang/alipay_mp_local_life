// 基准路径
const BASE_URL = "https://locally.uieee.com/"

const get = (url) => {
  return new Promise((resolve, reject) => {
    //异步操作
    my.request({
      url: `${BASE_URL}${url}`,
      success: res => {
        resolve(res) //传递正确的结果出去
      },
      fail: err => {
        reject(err) //传递失败的结果出去
      }
    })
  })
}

const request = {
  get
}

export default request