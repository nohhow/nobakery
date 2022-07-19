const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      '/info',
      createProxyMiddleware({
          target: 'https://no-bakery.herokuapp.com',
          changeOrigin: true,
      })
  );
};