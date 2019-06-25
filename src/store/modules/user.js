import { login } from "@/api/user";
import { setToken } from "@/utils/auth";

const state = {
  name: "",
  avatar: "",
  introduction: "",
  roles: []
};

const mutations = {
  SET_USER_INFO: (state, info) => {
    state = { ...state, ...info };
  }
};

const actions = {
  //user login
  login(_, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          setToken(data.token);
          resolve();
        })
        .catch(error => reject(error));
    });
  }
};

export default { state, mutations, actions, namespaced: true };
