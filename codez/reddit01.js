// lets make a request to download 'http://www.reddit.com/r/programming/.json'
// and get the title of the first 10 itmes

var http = require('http');

var opt = {
    host: 'www.reddit.com',
    path: '/r/programming/.json',
    headers: {
        'accepts': 'application/json'
    }
};

http.get(opt, function(res) {
    // res is an HttpClientResponse
    res.setEncoding('utf8');

    // response conforms to the 'stream' api
    // means we get 'data', 'error', 'end'

    var body = '';
    res.on('data', function(chunk) {
        // note that chunk is a string cause we set the encoding above
        body += chunk;
    });

    res.on('end', function() {
        var obj = JSON.parse(body);
        var items = obj.data.children;

        for( var i=0, len=items.length ; i < 10 && i < len ; ++i) {
            var item = items[i];
            console.log('*', item.data.title);
        }
    });

    res.on('error', function(err) {
        console.error(err);
    });
});
