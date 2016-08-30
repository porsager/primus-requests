/* global Primus */

module.exports = function(primus, options) {
  primus.transform('incoming', Primus.requests.incoming)
  primus.send = Primus.requests.send
}
