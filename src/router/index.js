// We import our ROute Componets here
import Vue from 'vue'
import Router from 'vue-router'

import ProfileLayout from '@/app/shared/layouts/ProfileLayout';
import Profile from '@/app/components/profileStructure/Profile';

import HomePage from "@/app/components/index";
import SignUp from "@/app/components/SignUp";
import Login from '@/app/components/Login';
import Confirmation_sent from '@/app/components/Confirmation_sent';
import Confirm_email from '@/app/components/Confirm_email';
import NewPassword from '@/app/components/newPassword';
import ForgotPassword from '@/app/components/forgotPassword';
import DashboardLayout from '@/app/shared/layouts/DashboardLayout';
import PlainLayout from '@/app/shared/layouts/PlainLayout';

// Client Dashboard
import ProjectLayout from '@/app/shared/layouts/ProjectLayout';
import ClientPeople from '@/app/components/clientDashboard/People/ClientPeople';
import ClientEnroll from '@/app/components/clientDashboard/People/enroll_clients';
import ConfirmHire from '@/app/components/ConfirmHire';



import Comms from '@/app/components/communications';

import Reports from '@/app/components/reporting';

import Billings from '@/app/components/billing';

import Requests from '@/app/components/requests';
// import HireTeam from '@/app/components/client-team/HireTeam';

import store from '@/store'

Vue.use(Router)
// This is where our page gets the routing for example localhost:8090/dashboard
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login',
      component: HomePage,
    },
    {
      path: '/signup/:teamId/:type/:inviteId',
      name: 'signup-invite',
      component: SignUp,
      props: true,
    },
    {
      path: '/confirm/:token',
      name: 'confirm_email',
      component: Confirm_email,
    },
    {
      path: '/confirmation_sent/:sent',
      name: 'confirmation_sent',
      component: Confirmation_sent,
      props: (route) => ({
        resendTo: route.query.resendTo,
      })
    },
    {
      path: '/confirmation_sent',
      name: 'confirmation_sent',
      component: Confirmation_sent,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotPassword,
    },
    {
      path: '/newPassword/:token',
      name: 'newPassword',
      component: NewPassword,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: (route) => ({ redirectUrl: route.query.redirectUrl })
    },
    {
      path: '/login/:userId/:token',
      name: 'login-confirm',
      component: Login,
      props: (route) => ({ redirectUrl: route.query.redirectUrl })
    },

    // Authenticated Routes
    {
      path: '/company',
      redirect: '/company/dashboard',
      component: PlainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          components: {
            default: DashboardLayout,
          },
          children: [
            {
              path: "",
              name: "projects",
              component: Projects
            },

            {
              path: "clients",
              name: "clients",
              component: ClientPeople,
            },
            {
              path: 'clients/enroll',
              name: 'enroll-clients',
              component: ClientEnroll,
            },
            {
              path: "communications-center",
              name: "comms-center",
              component: Comms,
            },
            {
              path: 'activity-reports',
              name: 'reports',
              component: Reports,
            },
            {
              path: "staff",
              name: "staff",
              component: Category,
            },
            {
             path: "billings",
             name: 'billings',
             component: Billings,
           },
           {
            path: "client-requests",
            name: 'requests',
            component: Requests,
          },
          ]
        },
      ]
    },
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires authentiication, check if logged in
    // if not, redirect to login page.
    let fmsg = 'Please login to access this page'
    if (!store.state.userCredentials.sub.isAuth) {
      store.dispatch('auth/setRedirectError', fmsg, {root: true}).then(function () {
      });
      next({
        name: 'login',
        query: { redirectUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
    //chupakobra
  }
})

export default router
