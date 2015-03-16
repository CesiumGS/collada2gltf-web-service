var nconf = require('nconf');

// This module wraps nconf to make sure it is initialized before being used

// Override options in this order: config.json < environment variables < command-line arguments
nconf.argv()
     .env()
     .file({ file: 'config.json' });

module.exports = nconf;