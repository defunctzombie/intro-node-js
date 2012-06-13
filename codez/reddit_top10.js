var reddit = require('./reddit');

reddit('programming', function(err, topics) {
    if (err) {
        return console.error(err);
    }

    for (var i=0 , l=topics.length ; i<10 && i < l ; ++i) {
        var topic = topics[i];
        console.log('*', topic.title);
    }
});
