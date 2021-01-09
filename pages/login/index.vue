<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a v-if="!isLogin" href="/login">Have an account?</a>
            <a v-else href="/register">Need an account?</a>
          </p>
          <!-- 错误提示 -->
          <ul class="error-messages">
            <template v-for="(messages, filed) in errors">
              <li v-for="(messages, index) in messages" :key="filed + index">{{ filed }} {{ messages }}</li>
            </template>
          </ul>

          <form @submit.prevent="handleSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
  name: 'LoginPage',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        username: ''
      },
      errors: {}
    }
  },
  methods: {
    async handleSubmit() {
      // 提交表单请求登陆
      try {
        const { data } = this.isLogin ? await login({user: this.user}): await register({user: this.user})
        this.$router.push('/')
        this.$store.commit('setUser', data.user)
        // 为了防止刷新页面数据丢失，需要把数据持久化
        Cookie.set('user', data.user)
      } catch (err) {
        console.dir(err)
        this.errors = err?.response?.data?.errors;
      }
    }
  }
}
</script>

<style>

</style>