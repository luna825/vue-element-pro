import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  Scrollbar,
  Form,
  FormItem,
  Input,
  Tooltip
} from "element-ui";
import router from "./router/index.js";
import store from "./store/index";

import "normalize.css/normalize.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; //全局样式

import "./icons"; // icon

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: "medium", zIndex: 3000 };
Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Scrollbar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Tooltip);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
