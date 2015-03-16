var app = require('./app');
var nconf = require('./lib/nconf');

app.listen(nconf.get('port'), function() {
    console.log('Server started: http://%s:%s', nconf.get('host'), nconf.get('port'));
});