export default store => {
  // 已经初始化
  // 不能 store.state = '' 直接赋值方式改变 state
  const localStore = localStorage.getItem("vue-pro-state");
  if (localStore)
    store.replaceState(Object.assign(store.state, JSON.parse(localStore)));
  store.subscribe((mutation, state) => {
    if (mutation.type === "app/TOGGLE_SIDEBAR") {
      try {
        const { app } = state;
        const newState = { app };
        localStorage.setItem("vue-pro-state", JSON.stringify(newState));
      } catch (error) {
        console.log("持久化遇到错误");
        console.error(error);
      }
    }
  });
};
