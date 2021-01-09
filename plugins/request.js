import axios from 'axios'

const baseUrl = 'https://conduit.productionready.io'

// 导出request对象
export const request = axios.create({
  baseURL: baseUrl
})

// 插件到处函数必须作为default成员
export default ({ store }) => {
  request.interceptors.request.use(config => {
    const { user } = store.state;
    if(user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, (err) => {
  
  })
}
