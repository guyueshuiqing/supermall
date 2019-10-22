import axios from 'axios'

// 最终方案
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v1',
    timeout: 5000
  })
    // 拦截器
    // instance.interceptors.request.use(config=>{},err=>{})

  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })

  return instance(config)
}

