const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = "vue Element Admin"; // page title

module.exports = {
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  }
};
