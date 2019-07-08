import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layouts/BasicLayout";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            meta: { title: "分析页" },
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/views/Dashboard/Analysis.vue"
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { title: "表单页", icon: "form" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form/form1"
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            hideChildrenInMenu: true,
            component: () =>
              import(
                /* webpackChunkName: "form" */ "@/views/Form/BasicForm.vue"
              ),
            children: [
              {
                path: "/form/basic-form",
                redirect: "/form/basic-form/form1"
              },
              {
                path: "/form/basic-form/form1",
                name: "form1",
                meta: { title: "表单1" }
              },
              {
                path: "/form/basic-form/form2",
                name: "form2",
                meta: { title: "表单2" }
              },
              {
                path: "/form/basic-form/form3",
                name: "form3",
                meta: { title: "表单3" }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const asyncRoutes = [
  {
    path: "/permission",
    name: "Permission",
    meta: { title: "权限测试", icon: "lock", roles: ["admin"] },
    component: Layout,
    children: [
      {
        path: "/permission",
        redirect: "/permission/page"
      },
      {
        path: "/permission/page",
        name: "PagePermission",
        meta: { title: "页面测试" },
        component: () =>
          import(
            /* webpackChunkName: "permission" */ "@/views/Permission/Page.vue"
          )
      }
    ]
  },
  {
    path: "/error",
    name: "NotFound",
    meta: { title: "错误页面", icon: "404" },
    hideChildrenInMenu: true,
    component: Layout,
    children: [
      {
        path: "/error",
        redirect: "/error/404"
      },
      {
        path: "/error/404",
        name: "404",
        component: () =>
          import(/* webpackChunkName: "error" */ "@/views/ErrorPage/404.vue")
      }
    ]
  },
  {
    path: "https://www.baidu.com",
    name: "baidu",
    meta: { title: "百度", icon: "baidu" }
  },
  { path: "*", redirect: "/error/404" }
];

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export default router;
