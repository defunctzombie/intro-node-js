
var http = require('http');
var url = require('url');

// this will just do the request for us and give us the json object
function request(full_url, cb) {
    var url_obj = url.parse(full_url);

    var opt = {
        host: url_obj.host,
        path: url_obj.path,
        headers: {
            'accepts': 'application/json'
        }
    };

    http.get(opt, function(res) {
        res.setEncoding('utf8');

        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            try {
                var obj = JSON.parse(body);
            } catch (err) {
                cb(new Error('invalid response from reddit'));
            }

            cb(null, obj);
        });

        res.on('error', function(err) {
            cb(err);
        });
    });
}

// this will flatten the data set for us
// and return just the list of items
function fetch_items(subreddit, cb) {
    request('http://www.reddit.com/r/' + subreddit + '/.json', function(err, res) {
        if (err) {
            return cb(err);
        }

        var out = [];
        var items = res.data.children;

        for( var i=0, len=items.length ; i < len ; ++i) {
            var item = items[i];
            out.push(item.data);
        }

        cb(null, out);
    });
}

module.exports = fetch_items;
