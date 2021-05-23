const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
		target: 'http://54.180.115.59:80',
            changeOrigin: true,
        })
    );
};
