# Primus Requests

Send a named request with data and attach a callback to get the response.

## Installation

```bash
npm install primus-emitter --save
```

After installing with npm just add primus-emitter as a [primus plugin](https://github.com/primus/primus#plugins)

## Usage

Sending requests is identical on the server and the client.

### `send(name, [data, callback])`

```
(primus || spark).send('message', 'hello', (data) => {

    // Do something with the response in data

})
```

### `on(name, handler)`

Responding to requests is also identical on the server and client.

```
(primus || spark).on('hello', (data, response) => {

    // Data is what is sent with the request

    // Response is a callback to send data back
    response('Well hey there')

})
```

