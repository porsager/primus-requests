const callbacks = new Map()
    , types = {
      request: 0,
      response: 1
    }

let callbackId = 0

const messages = module.exports

messages.incoming = function({ data }) {
  if (data.type === 0 && data.name) {
    this.emit(data.name, data.data, (response) => {
      this.write({
        type: types.response,
        id: data.id,
        name: data.name,
        data: response
      })
    })
    return false
  }

  if (data.type === 1 && data.name && data.id) {
    const callback = callbacks.get(data.id)

    if (callback) {
      callback(data.data)
      callbacks.delete(data.id)
    }

    return false
  }
}

messages.send = function(name, data, callback) {
  if (typeof data === 'function') {
    callback = data
    data = null
  }

  if (callback) {
    callbackId++
    callbacks.set(callbackId, callback)
  }

  this.write({
    type: types.request,
    id: callbackId,
    name: name,
    data: data
  })

}
