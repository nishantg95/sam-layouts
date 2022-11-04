const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function expressMiddleware (router) {
  router.use('/api/now/sp/search', createProxyMiddleware({
    target: "https://tstservice.fsd.gov",
    changeOrigin: true,
    secure: true,
    ws: true,
    // pathRewrite: {
    //   "^/api": ""
    // }
  }))
}