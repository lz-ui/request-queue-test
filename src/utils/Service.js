import axios from 'axios'

// create an axios instance
const Service = axios.create({
  baseURL: 'https://wx.jczxw.cn/api/v1',
  timeout: 50000 // request timeout
})

export const source = axios.CancelToken.source(); // 这里初始化source对象

console.log(source);

// request interceptor
Service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
Service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '000000') {
      alert('Error')
      return Promise.reject(new Error(res || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return false
  }
)

export default Service