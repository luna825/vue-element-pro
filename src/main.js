import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Scrollbar
} from "element-ui";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; //全局样式

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Scrollbar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
