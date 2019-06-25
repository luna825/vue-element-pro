import { login, getInfo } from "@/api/user";
import { setToken, getToken } from "@/utils/auth";

const state = {
  name: "",
  avatar: "",
  introduction: "",
  roles: []
};

const mutations = {
  SET_USER_INFO: (state, { name, avatar, introduction, roles }) => {
    state.name = name;
    state.avatar = avatar;
    state.introduction = introduction;
    state.roles = roles;
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
  },
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(getToken())
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again!");
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }
          commit("SET_USER_INFO", data);
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }
};

export default { state, mutations, actions, namespaced: true };
