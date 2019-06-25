import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // get token from sessionStorge

const whiteList = ["/user/login", "/auth-redirect"];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/user/login") {
      console.log(hasToken, "123");
      next({ path: "/" });
    } else {
      const hasRoles =
        store.getters.user && store.getters.user.roles.length > 0;
      if (hasRoles) {
        console.log(hasRoles);
        next();
      } else {
        try {
          //get user info
          const { roles } = await store.dispatch("user/getInfo");
          console.log(roles);
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
