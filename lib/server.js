const messages = require('./messages')

module.exports = function(primus, options) {
  primus.Spark.prototype.send = messages.send
  primus.transform('incoming', messages.incoming)
  primus.send = function(name, data) {
    primus.forEach(spark => spark.send(name, data))
  }
}