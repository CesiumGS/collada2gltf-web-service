var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var routes = require('./routes');
var nconf = require('./lib/nconf');
var Verbose = require('./lib/Verbose');

var app = express();

// Requests post the .dae file using Content-Type: text/plain
// The upload filesize limit is defined in config.json
app.use(bodyParser.text({
	limit : nconf.get('uploadLimit')
}));

// compress
app.use(compression());

// Custom middleware fore enabling CORS.  From http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Custom middleware for handling errors
app.use(function(err, req, res, next) {
    Verbose.error(err.stack);

    res.status(err.statusCode || 500);
    res.format({
        json: function() {
            res.send(err);
        }
    });
});

// Map, for example, localhost:3000/convert, to the function that does the conversion.
// There is also app.get() for requests that pass parameters with GET.
app.post('/convert', routes.convert.convert);

module.exports = app;