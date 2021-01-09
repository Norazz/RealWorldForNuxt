import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0644c70b = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _1aa37600 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _6352a368 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _9b438c30 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _2aa913c4 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _0b142564 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _cdaf0596 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _0644c70b,
    children: [{
      path: "",
      component: _1aa37600,
      name: "home"
    }, {
      path: "/login",
      component: _6352a368,
      name: "login"
    }, {
      path: "/register",
      component: _6352a368,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _9b438c30,
      name: "profile"
    }, {
      path: "/settings",
      component: _2aa913c4,
      name: "settings"
    }, {
      path: "/editor",
      component: _0b142564,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _cdaf0596,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
