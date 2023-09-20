import axios from 'axios'
// import type { AxiosInstance } from 'axios'
import { TIME_OUT, BASE_URL } from './config'

import { showToast } from 'vant'

const service = axios.create({ baseURL: BASE_URL, timeout: TIME_OUT })

service.interceptors.request.use((config) => {
  // 这里可以设置token: config!.headers!.Authorization = token
  return config
})

service.interceptors.response.use(
  (response) => {
    const data = response.data
    if (data.status === '2000000' && data.message === 'ok') {
      return data
    } else {
      return Promise.reject(data)
    }
  },
  (err) => {
    return Promise.reject(err.response)
  }
)

function request(method = 'GET', url, data) {
  return new Promise((resolve, reject) => {
    return service({
      method,
      url,
      ...data,
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

const get = function (url, data) {
  return request('GET', url, { params: data }).catch((err) =>
    showToast({
      message: err.message,
      wordBreak: 'break-all'
    })
  )
}

const post = function (url, data) {
  return request('POST', url, { data }).catch((err) => {
    showToast({
      message: err.message,
      wordBreak: 'break-all'
    })
    throw err
  })
}

const upload = function (url, file) {
  const formData = new FormData()
  formData.append('file', file)
  return post(url, formData)
}

const uploadBase64 = function (url, base64) {
  const formData = new FormData()
  formData.append('base64', base64)
  return post(url, formData)
}

// put(url: string, data?: any): Promise<T> {
//   return service.request("PUT", url, { data });
// },
// delete(url: string, data?: any): Promise<T> {
//   return service.request("DELETE", url, { params: data });
// },

export { get, post, upload, uploadBase64 }
