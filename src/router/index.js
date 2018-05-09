/* eslint-disable*/

import Vue from 'vue'
import Router from 'vue-router'
import homeLayout from '@/app/shared/layouts/homeLayout'
import Home from '@/app/site/home'
import Signup from '@/app/site/signup'
import Login from '@/app/site/login'
import AfterSignup from '@/app/site/aftersignup'
import RecoverPassword from '@/app/site/recover'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
      component: homeLayout,
      children: [
        {
          path: '/main',
          name: 'homePage',
          component: Home
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/after-signup',
          name: 'aftersignup',
          component: AfterSignup
        },
        {
          path: '/recover-password',
          name: 'recovery',
          component: RecoverPassword
        }
      ]
    }
  ]
})
