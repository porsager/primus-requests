const messages = require('./messages')

module.exports = function(primus, options) {
  primus.Spark.prototype.send = messages.send
  primus.transform('incoming', messages.incoming)
  primus.on('disconnection', spark => {
    if (spark.callbackIds) {
      spark.callbackIds.forEach(id => messages.callbacks.delete(id))
      delete spark.callbackIds
    }
  })
}
