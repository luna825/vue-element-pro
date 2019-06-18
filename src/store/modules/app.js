const state = {
  sidebar: {
    opened: JSON.parse(localStorage.getItem("sidebarStatus"))
      ? !!+JSON.parse(localStorage.getItem("sidebarStatus"))
      : false,
    withoutAnimation: false
  }
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      localStorage.setItem("sidebarStatus", 1);
    } else {
      localStorage.setItem("sidebarStatus", 0);
    }
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
