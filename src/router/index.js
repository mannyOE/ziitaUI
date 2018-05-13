/* eslint-disable*/

import Vue from 'vue'
import Router from 'vue-router'
import homeLayout from '@/app/shared/layouts/homeLayout'
import Home from '@/app/site/home'
import Signup from '@/app/site/signup'
import Login from '@/app/site/login'
import AfterSignup from '@/app/site/aftersignup'
import RecoverPassword from '@/app/site/recover'
import dashboardLayout from '@/app/shared/layouts/dashboardLayout'
import clients from '@/app/dash/clients/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/main',
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
        },
        {
          // superadmin routes
          path: '/user/superadmin',
          name: 'superadmin',
          component: 'dashboardLayout',
          redirect: '/user/superadmin/clients',
          children: [
            {
              path: '/clients',
              name: 'clients',
              component: 'clients'

            }
          ]
        }
      ]
    }
  ]
})



// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires authentiication, check if logged in
//     // if not, redirect to login page.
//     let fmsg = 'Please login to access this page'
//     if (!store.state.userCredentials.sub.isAuth) {
//       store.dispatch('auth/setRedirectError', fmsg, {root: true}).then(function () {
//       });
//       next({
//         name: 'login',
//         query: { redirectUrl: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })

export default router
