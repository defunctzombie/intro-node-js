var http = require('http');

// no longer providing the request handler here
var server = http.createServer();

// server is actually an 'EventEmitter' which means we can connect to the 'events'
// it emits by using the 'on' method and passing our callback as the argument
// every time the 'request' event occurs our callback will be called
// consult the docs for your objects on what events are emitted
server.on('request', function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
});

// another event 'close' which is notified when the server is done
// here we see that we can bind to an event firing 'once'
server.once('close', function() {
    console.log('server is no longer accepting new connections');
});

// listen can take a callback function to know once the server is listening
server.listen(8124, function() {
    var addr = server.address();
    console.log('Server running at http://%s:%s', addr.address, addr.port);
});

