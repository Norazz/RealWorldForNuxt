const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data;
  }
}

export const actions = {
  // 这个方法只会在服务器端渲染期间自动调用
  // 作用： 初始化容器数据，传递数据给客户端
  nuxtServerInit({commit}, {req}) {
    let user = null
    // 请求头中有Cookie
    if(req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        
      }
    }
    commit('setUser', user)
  }
}