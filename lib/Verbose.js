var nconf = require('./nconf');

var verbose = !!nconf.get('verbose');
var f = function(arg) {};

// Timing, log, and error messages based on the verbose flag in config.json
module.exports = {
	log : verbose ? function(message) { console.log(message); } : f,
	error : verbose ? function(message) { console.error(message); } : f,
	time : verbose ? function(label) { console.time(label); } : f,
	timeEnd : verbose ? function(label) { console.timeEnd(label); } : f
};