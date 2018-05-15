// We import our ROute Componets here
import Vue from 'vue'
import Router from 'vue-router'

import ProfileLayout from '@/app/shared/layouts/ProfileLayout';
import Profile from '@/app/components/profileStructure/Profile';
import Reviews from '@/app/components/profileStructure/Reviews';
import Wallet  from '@/app/components/clientDashboard/wallet/paywallet';
import Settings  from '@/app/components/clientDashboard/settings';
import Permissions  from '@/app/shared/modals/permissions';
import FundWallet  from '@/app/components/clientDashboard/wallet/addcard';
import ManageAccount from '@/app/components/profileStructure/ManageAccount';
import Organisation from '@/app/components/profileStructure/Organisation';

import HomePage from "@/app/components/index";
import SignUp from "@/app/components/SignUp";
import Download from "@/app/components/download";
import Login from '@/app/components/Login';
import Confirmation_sent from '@/app/components/Confirmation_sent';
import Confirm_email from '@/app/components/Confirm_email';
import NewPassword from '@/app/components/newPassword';
import ForgotPassword from '@/app/components/forgotPassword';
import DashboardLayout from '@/app/shared/layouts/DashboardLayout';
import PlainLayout from '@/app/shared/layouts/PlainLayout';
import Feedback from './../app/components/Feedback.vue';

// Client Dashboard
import ProjectLayout from '@/app/shared/layouts/ProjectLayout';
import Projects from '@/app/components/projectsStructure/Projects';
import Modules from '@/app/components/projectsStructure/modules/Modules';
import ProjectOverview from '@/app/components/projectsStructure/overview/overview';
import ProjectTeam from '@/app/components/projectsStructure/teams/ProjectTeam';
import Activities from '@/app/components/projectsStructure/Activities';
import FileShare from '@/app/components/projectsStructure/FileShare';
import qualityAssurance from '@/app/components/projectsStructure/qa/qaDashboard';
import ea from '@/app/components/projectsStructure/ea/eaDashboard';
import ClientPeople from '@/app/components/clientDashboard/People/ClientPeople';
import Developer from '@/app/components/clientDashboard/People/developer';
import Category from '@/app/components/clientDashboard/People/Category';
import Configuration from '@/app/components/clientDashboard/configuration/Configuration';
import Configuration2 from '@/app/components/clientDashboard/configuration/config2Repo';
import CreateProject from '@/app/components/projectsStructure/createproject/CreateProject';
import ConfirmHire from '@/app/components/ConfirmHire';
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
      path: '/download',
      name: 'download',
      component: Download,
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
      path: '/superuser',
      redirect: '/superuser/dashboard',
      component: PlainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "confirm_hire",
          name: "confirm-hire",
          component: ConfirmHire,
          props: (route) => ({
            teamId: route.query.teamId,
            userId: route.query.userId,
            type: route.query.type,
          })
        },
        {
          path: 'dashboard',
          redirect: '/superuser/dashboard/clients',
          components: {
            default: DashboardLayout,
          },
          children: [
            {
              path: "clients",
              name: "projects",
              component: Projects
            },

            {
              path: "team",
              name: "clientteam",
              component: ClientPeople,
            },
              {
              path: "developer/stats/:id",
              name: "developer",
              component: Developer,
            },
            {
              path: "permissions",
              name: "permissions",
              component: Settings,
            },
            {
              path: 'projects/:active',
              name: 'active',
              component: Projects,
            },
            {
              path: "category",
              name: "category",
              component: Category,
            },
            {
             path: "wallet",
             name: 'wallet',
             component: Wallet,
           },
           {
            path: "wallet/fund",
            name: 'fund-wallet',
            component: FundWallet,
          },

            {
              path: "createproject",
              name: "create-project",
              component: CreateProject,

            },

            // {
            //   path: "/team/hire",
            //   name: "hire-team",
            //   component: HireTeam,
            //   props: {
            //     view: 'team'
            //   }
            // }
          ]
        },


        {
          path: 'project/:id',
          name: 'project',
          redirect: '/user/project/:id/overview',
          props: true,
          component: ProjectLayout,
          children: [
            {
              path: "overview",
              name: "project-overview",
              component: ProjectOverview,
              props: true,
            },
            {
              path: "modules",
              name: "modules",
              component: Modules,
              props: true,
            },
            {
              path: "team",
              name: "project-team",
              component: ProjectTeam,
              props: true,
            },
            {
              path: "files",
              name: "share-files",
              component: FileShare,
            },
            {
              path: "quality-assurance",
              name: "qa",
              component: qualityAssurance,
            },
            {
              path: "code-review",
              name: "ea",
              component: ea,
            },
            // {
            //   path: "/:id/modules",
            //   name: "modules",
            //   // meta: {
            //   //   clientId:
            //   // },
            //   component: ProjectModules,
            //   params: 'id'
            // },
             {
              path: "config",
              name: "configuration",
              component: Configuration,

            },
            {
             path: "file-share",
             name: "file-share",
             component: FileShare,

           },
            {
                path: "config2repo",
                name: "configuration2",
                component: Configuration2,
              },
            {
              path: "activity",
              name: "activity",
              component: Activities,
              props: true,
            },
            // {
            //   path: "/:id/team/add-members",
            //   name: "add:team:member",
            //   params: 'id',
            //   component: AddTeamMember,
            // },
          ]
        },

        {
          path: 'profile',
          // name: 'profile',
          components: {
            default: ProfileLayout
          },
          children: [{
              path: '',
              name: 'profile',
              component: Profile
            },

            {
              path: 'account',
              name: 'manage-account',
              component: ManageAccount

            },
            {
              path: 'permissions',
              name: 'perms',
              component: Settings

            },
            {
              path: 'permissions/:Id',
              name: 'perms_single',
              component: Permissions,
              props: true,

            },
            {
              path: 'reviews',
              name: 'reviews',
              component: Reviews,
            },
            {
              path: 'organisation',
              name: 'organisation',
              component: Organisation,
            }
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
