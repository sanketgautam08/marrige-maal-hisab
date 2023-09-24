const PROXY_CONFIG = [{

    context: ['/'],
    target: 'http://localhost:8080/',
    secure: true,
    loglevel: 'debug'
}];

module.exports = PROXY_CONFIG;