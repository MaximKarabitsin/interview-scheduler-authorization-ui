module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://host.docker.internal:8091",
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.entry("main").clear();
    config.entry("main").add("./src/main.js");
  }
};
