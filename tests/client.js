module.exports.connect = function(server) {

  const socket = new server.primus.Socket('http://localhost:' + server.address().port)

  socket.on('hej', (data, callback) => {
    console.log('Client received', 'hej', data)
    callback(data + ':more')
  })

  socket.send('hej', 'hej', e => {
    console.log('Response from server', e)
  })
}
