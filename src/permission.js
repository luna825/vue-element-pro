import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // get token from sessionStorge

const whiteList = ["/user/login"]; // 白名单不会重新定向到login页面

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken(); // 从localStorage取得token

  if (hasToken) {
    // has token
    if (to.path === "/user/login") {
      // 在有token的情况下，如果访问登录页面就直接重定向到首页
      next("/");
    } else {
      // 检查store中是否有用户信息
      const hasRoles =
        store.getters.user && store.getters.user.roles.length > 0;
      if (hasRoles) {
        next(); //存在用户信息和角色信息就直接访问
      } else {
        // 存在token 没有用户信息就从服务器用去取
        try {
          //get user info
          const { roles } = await store.dispatch("user/getInfo");
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          // 添加异步路由
          router.addRoutes(accessRoutes);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          next(`/user/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/user/login?redirect=${to.path}`);
    }
  }
});
