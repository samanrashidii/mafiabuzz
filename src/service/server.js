import axios from 'axios'
import api from './api'

Object.entries(api).map(([key, value]) => {
  const obj = { ...value }
  api[key] = function (payload, url) {
    obj.data = payload
    if (url) {
      obj.url = url
    }
    const promise = axios(obj)
    return promise
  }
})

export default {
  ...api
}
