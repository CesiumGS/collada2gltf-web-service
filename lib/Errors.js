var util = require('util');

// Module based on https://github.com/alexyoung/nodeinpractice/tree/master/listings/web/error-handling

function HTTPError() {
  Error.call(this, arguments);
}

util.inherits(HTTPError, Error);

function Conversion(message) {
  HTTPError.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.statusCode = 500;
  this.message = message;
  this.name = 'Conversion';
}
util.inherits(Conversion, HTTPError);

module.exports = {
  HTTPError: HTTPError,
  Conversion: Conversion
};