module.exports = {
    devServer: {
        proxy: {
            // 'api.wheypal.com/': {
            '/': {
                target: 'http//localhost:8081/'
            }
        }
    }
}