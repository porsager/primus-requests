const server = require('./server')
    , client = require('./client')

server.on('listening', () => {
  client.connect(server)

  server.primus.on('connection', spark => {
    console.log(spark.id, 'connected')

    spark.on('hej', (data, callback) => {
      console.log('Server received', 'hej', data)
      callback(data + ':more')
    })

    spark.send('hej', 'fra server', e => {
      console.log('Response from client', e)
    })
  })
})
