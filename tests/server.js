const Primus = require('primus')
    , http = require('http')

const server = http.createServer((req, res) => {
  res.send('OK')
})

server.primus = new Primus(server, {
  transformer: 'uws'
})

server.primus.plugin('primus-requests', require('../lib'))

server.listen(0)

module.exports = server
