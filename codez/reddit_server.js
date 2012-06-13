var http = require('http');
var reddit = require('./reddit');

var server = http.createServer();

server.on('request', function (req, res) {
    reddit('programming', function(err, topics) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end(err.stack);
            return;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<ul>');
        for (var i=0 , l=topics.length ; i<10 && i < l ; ++i) {
            var topic = topics[i];
            res.write('<li>' + topic.title + '</li>');
        }

        res.write('</ul>');
        res.end();
    });
});

server.listen(8124, function() {
    var addr = server.address();
    console.log('Server running at http://%s:%s', addr.address, addr.port);
});
