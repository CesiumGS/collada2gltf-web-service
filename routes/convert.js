"use strict";
var collada2gltf = require('./../lib/collada2gltf.js');

module.exports.convert = function(req, res, next) {
	collada2gltf(req.body, function(err, gltf) {
    	if (err) { return next(err); }

    	res.setHeader('Content-Type', 'application/json');
    	res.send(gltf);
    });
};
