import config from '@/config/config'
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: config.rtmp_url,
  })
}