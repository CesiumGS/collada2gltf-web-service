"use strict";
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var temp = require('temp').track();
var Errors = require('./Errors');
var Verbose = require('./Verbose');

module.exports = collada2gltf;

function returnError(err, message, callback) {
    temp.cleanup(function(err, stats) {
    	Verbose.log('Temp cleanup stats: ' + JSON.stringify(stats));
    });
	
    process.nextTick(function() {
    	Verbose.timeEnd('total time');
    	callback(new Errors.Conversion(message + ': ' + err.message), undefined);
    });
    
    return undefined;
}

function collada2gltf(collada, callback) {
	Verbose.time('total time');

	var collada2gltfPath = '';
    if (process.platform === 'darwin') {
    	collada2gltfPath = 'collada2gltf/mac/collada2gltf';
    } else if (process.platform === 'win32') {
// TODO: test this on Windows
    	collada2gltfPath = 'collada2gltf/win32/collada2gltf.exe';
    } else {
        process.nextTick(callback('Only Mac and Windows builds of collada2gltf are included. Build from source for your platform: https://github.com/KhronosGroup/glTF', undefined));
        return;
    }
    
    // 1. Create a temporary directory
    // 2. Write the input COLLADA file to the directory
    // 3. Run collada2gltf with -e to embed resources
    // 4. Read the generated glTF file
    // -> Remove the temporary directory on success or failure
    
    temp.mkdir('collada2gltf-web-service', function(err, dirPath) {
		if (err) { return returnError(err, '1/4 mkdir', callback); }

        var daePath = path.join(dirPath, 'input.dae');
        var gltfPath = path.join(dirPath, 'output.gltf');

        fs.writeFile(daePath, collada, function(err) {
        	if (err) { return returnError(err, '2/4 writeFile', callback); }
        	
        	Verbose.time('collada2gltf time');
        	
        	child_process.execFile(collada2gltfPath, [
                '-f', daePath,
                '-o', gltfPath,
                '-e'],
            function(err, stdout, stderr) {
        		Verbose.timeEnd('collada2gltf time');

            	if (err) { return returnError(err, '3/4 execFile', callback); }

                fs.readFile(gltfPath, 'utf8', function(err, data){
                	if (err) { return returnError(err, '4/4 readFile', callback); }

        		    temp.cleanup(function(err, stats) {
        		    	Verbose.log('Temp cleanup stats: ' + JSON.stringify(stats));
        		    });
                	
        		    process.nextTick(function() {
        		    	Verbose.timeEnd('total time');
        		    	callback(undefined, data);
        		    });
                });
        	});
        });
	});
}
