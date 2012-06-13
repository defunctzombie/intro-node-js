// load an external module called 'http'
// assign whatever the module 'exported' to the variable 'http'
// modules can export any valid javascript type
// this includes strings, arrays, objects, functions, numbers
var http = require('http');

// we access the 'createServer' property of the 'http' module
// this property happens to be a function which will create an http server for us
// the function takes one argument, a 'function' which will be invoked for every request
// out function will be passed two parameters (request and response)
//
// here we are exposed to an important concept for node.js code
// the use of a 'callback' function which is invoked whenever a particular event happens
// we don't care *when* the event happens, only that it has happened and we can take some further action
// anytime code in node.js interfaces with an I/O boundary (file system, network, etc) it will expose this interface through a very similar pattern. You will have to provide a function which will be invoked once the requested action has been completed

http.createServer(function (request, response) {
    // the response variable is an ServerResponse object which has various methods which are used to respond back to the client
    // the request variable is an ServerRequest object which has information about the request

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8124);
// createServer() returns an instance of HttpServer which exposes various methods
// one of which is 'listen' which starts the http server on the given port
// see the docs for more details

// console.log will print a string to the stdout (terminal) (much like in chrome dev tools or firebug)
// also available console.error for printing to stderr
console.log('Server running at http://127.0.0.1:8124/');

