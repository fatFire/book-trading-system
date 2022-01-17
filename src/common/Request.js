import axios from 'axios'

const loacURL = 'http://localhost:1337'

const config_ = {
  contentType: 'json',
  timeout: 10 * 1000,
  baseURL: loacURL
}

axios.interceptors.request.use(config => {
  config = Object.assign({}, config_, config)

  config.token && (config.headers.Authorization = `Bearer ${config.token}`)

  if(config.contentType === 'json') {
    config.headers["Content-Type"] = 'application/json'
  }

  if(config.contentType === 'form-data') {
    config.headers["Content-Type"] = 'multipart/form-data'
    config.transformRequest = data => {
      if(data instanceof FormData) {
        return data
      }
      const f = new FormData()
      for(let [key, value] of Object.entries(data)) {
        f.append(key, value)
      }
      return f
    }
  }

  return config

})

axios.interceptors.response.use(response => {

  const data = response.data

  if(data) {
    return data
  }

  return response
},
err => {
  const response = err.response
  const error = new Error(response.statusText)
  error.code = response.status

  return Promise.reject(error)
})

export function get(url, config) {
  return axios.get(url, config)
}

export function post(url, data, config) {
  return axios.post(url, data, config)
}

export function put(url, data, config) {
  return axios.put(url, data, config)
}
