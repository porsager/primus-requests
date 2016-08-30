/* eslint no-unused-vars: 0, prefer-const: 0 */

const messages = require('./messages')

const incoming = messages.incoming.toString().split('\n').join('\n    ')
    , send = messages.send.toString().split('\n').join('\n    ')

function library(Primus) {
  if (!Primus)
    return

  const callbacks = new Map()
      , types = {
        request: 0,
        response: 1
      }

  let callbackId = 0

  Primus.requests = {
    incoming: '{{incoming}}',
    send: '{{send}}'
  }
}

const libraryString = library
                      .toString()
                      .replace('\'{{incoming}}\'', incoming)
                      .replace('\'{{send}}\'', send)

module.exports = ';(' + libraryString + ')(Primus);'
