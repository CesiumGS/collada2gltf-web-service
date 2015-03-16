"use strict";
var fs = require('fs');
var request = require('supertest');
var app = require('./../../app');

describe('convert', function(){
    it('convert a COLLADA model', function(done) {
        fs.readFile('test/data/box.dae', 'utf8', function(err, dae) {
        	if (err) { return done(err); }

            fs.readFile('test/data/box.gltf', 'utf8', function(err, gltf) {
            	if (err) { return done(err); }
	    	
		        request(app)
		            .post('/convert')
		            .set('Content-Type', 'text/plain')
		            .send(dae)
		            .expect('Content-Type', /json/)
		            .expect(200, gltf)
		            .end(done);
            });
        });
    });
});