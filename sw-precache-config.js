module.exports = {
    staticFileGlobs: [
        'build/**.html',
        'build/**.png',
        'build/static/js/**/*'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    runtimeCaching: [{
        urlPattern: /(^https?:\/\/([a-zA-Z\d-]+\.){0,}apple.com\/?.*)/i,
        handler: 'networkFirst'
    }, {
        urlPattern: /https?:\/\/[^/\s]+\/\S+\.(jpe?g|png|gif)/i,
        handler: 'networkFirst'
    }]
};