const getters = {
  sidebar: state => state.app.sidebar,
  user: state => state.user,
  routes: state => state.permission.routes
};

export default getters;
