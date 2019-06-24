export default store => {
  // 已经初始化
  // 不能 store.state = '' 直接赋值方式改变 state
  if (localStorage.getItem("vue-pro-state"))
    store.replaceState(JSON.parse(localStorage.getItem("vue-pro-state")));
  store.subscribe((mutation, state) => {
    try {
      localStorage.setItem("vue-pro-state", JSON.stringify(state));
    } catch (error) {
      console.log("持久化遇到错误");
      console.error(error);
    }
  });
};
