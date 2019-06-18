import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register.vue")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
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
              path: "/dashboard/analysis",
              meta: { title: "分析页" },
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis.vue"
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
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "基础表单" },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "./views/Form/BasicForm.vue"
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
    },
    {
      path: "https://www.baidu.com",
      name: "baidu",
      meta: { title: "百度" }
    }
  ]
});
