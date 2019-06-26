export default store => {
  // 已经初始化
  // 不能 store.state = '' 直接赋值方式改变 state
  const localStore = localStorage.getItem("vue-pro-state");
  if (localStore)
    store.replaceState(Object.assign(store.state, JSON.parse(localStore)));
  console.log("eee");
  store.subscribe((mutation, state) => {
    try {
      const newState = { ...state };
      delete newState.user;
      localStorage.setItem("vue-pro-state", JSON.stringify(newState));
    } catch (error) {
      console.log("持久化遇到错误");
      console.error(error);
    }
  });
};
