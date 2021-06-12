module.exports = {
    publicPath: './',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        }
    },
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        open: true,

    }
}