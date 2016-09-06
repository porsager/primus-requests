const callbacks = new Map()
    , types = {
      request: 0,
      response: 1
    }

let callbackId = 0

const messages = module.exports

messages.callbacks = callbacks

messages.incoming = function({ data }) {
  if (data.type === 0 && data.name) {
    this.emit(data.name, data.data, (response) => {
      return this.write({
        type: types.response,
        id: data.id,
        name: data.name,
        data: response
      })
    })
    return false
  }

  if (data.type === 1 && data.name && data.id >= 0) {
    const callback = callbacks.get(data.id)

    if (callback) {
      callback(data.data)
      callbacks.delete(data.id)
      this.callbackIds.delete(data.id)
    }

    return false
  }
}

messages.send = function(name, data, callback) {
  if (typeof data === 'function') {
    callback = data
    data = null
  }

  const packet = {
    type: types.request,
    name: name,
    data: data
  }

  if (callback) {
    packet.id = callbackId++
    callbacks.set(packet.id, callback)

    if (this.callbackIds)
      this.callbackIds.add(packet.id)
    else
      this.callbackIds = new Set([packet.id])
  }

  return this.write(packet)

}
