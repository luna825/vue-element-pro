import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";
// import store from "@/store";

// request interceptor
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    //do something before requrest is sent
    const newConfig = { ...config };
    // 从本地存储中取得 jwt 的验证 token
    const token = getToken();
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
  }
);

export default service;
