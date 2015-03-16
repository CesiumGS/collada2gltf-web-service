"use strict";
var fs = require('fs');
var assert = require('assert');
var request = require('supertest');
var app = require('./../../app');

describe('convert', function(){
    it('convert a COLLADA model', function(done) {
        fs.readFile('test/data/box.dae', 'utf8', function(err, dae) {
        	if (err) { return done(err); }

	        request(app)
	            .post('/convert')
	            .set('Content-Type', 'text/plain')
	            .send(dae)
	            .expect('Content-Type', /json/)
	            .expect(200)
	            .end(function(err, res){
                    if (err) throw err;

                    // Quick and dirty check for glTF
                    assert(res.body.accessors);
                    assert(res.body.bufferViews);
                    assert(res.body.buffers);
                    assert(res.body.materials);
                    assert(res.body.meshes);
                    assert(res.body.nodes);
                    assert(res.body.programs);
                    assert(res.body.scene);
                    assert(res.body.scenes);
                    assert(res.body.shaders);
                    assert(res.body.techniques);
                    done();
                });
        });
    });
});