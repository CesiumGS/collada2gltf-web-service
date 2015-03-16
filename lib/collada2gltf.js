"use strict";
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var rimraf = require('rimraf');
var Errors = require('./Errors');
var Verbose = require('./Verbose');
var createGuid = require('./createGuid');
var nconf = require('./nconf');

module.exports = collada2gltf;

function returnError(err, dirPath, message, callback) {
    rimraf(dirPath, function(err) {
        if (err) { Verbose.error(err.message); }

	    process.nextTick(function() {
            Verbose.timeEnd('total time');
            callback(new Errors.Conversion(message + ': ' + err.message), undefined);
        });
    });
	
    return undefined;
}

function collada2gltf(collada, callback) {
    // 1. Create a temporary directory
    // 2. Write the input COLLADA file to the directory
    // 3. Run collada2gltf with -e to embed resources
    // 4. Read the generated glTF file
    // -> Remove the temporary directory on success or failure

    Verbose.time('total time');

    var dirPath = path.join('working', createGuid());
    fs.mkdir(dirPath, undefined, function(err) {
		if (err) { return returnError(err, dirPath, '1/5 mkdir', callback); }

        var daePath = path.join(dirPath, 'input.dae');
        var gltfPath = path.join(dirPath, 'output.gltf');

        fs.writeFile(daePath, collada, function(err) {
        	if (err) { return returnError(err, dirPath, '2/5 writeFile', callback); }

        	Verbose.time('collada2gltf time');

            child_process.execFile(nconf.get('collada2gltfPath'), [
                '-f', daePath,
                '-o', gltfPath,
                '-e'],
            function(err, stdout, stderr) {
        		Verbose.timeEnd('collada2gltf time');
                Verbose.log('collada2gltf stdout: ' + stdout);
                Verbose.log('collada2gltf stderr: ' + stderr);

            	if (err) { return returnError(err, dirPath, '3/5 execFile', callback); }

                fs.readFile(gltfPath, 'utf8', function(err, data){
                	if (err) { return returnError(err, dirPath, '4/5 readFile', callback); }

                    rimraf(dirPath, function(err) {
                        if (err) { return returnError(err, dirPath, '5/5 rimraf', callback); }

                        process.nextTick(function() {
                            Verbose.timeEnd('total time');
                            callback(undefined, data);
                        });
                    });
                });
        	});
        });
	});
}
