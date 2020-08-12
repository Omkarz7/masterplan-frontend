module.exports = {
  devServer: {
    proxy: {
      "/server": {
        target: "http://localhost:3600", // provide proxy for the backend
        changeOrigin: true,
        pathRewrite: {
          "^/server": "/"
        }
      }
    }
  }
};
