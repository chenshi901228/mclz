module.exports = {
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        }
    },
    devServer: {
        open: true,
        port: 8080,
        host: '0.0.0.0',
        proxy: process.env.NODE_ENV != 'development' ? {} : {
            '/proxyApi': {
                target: 'http://192.168.250.195:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxyApi': '/'
                }
            }
        },

    },

}