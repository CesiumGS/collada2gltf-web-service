"use strict";
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var rimraf = require('rimraf');
var Errors = require('./Errors');
var Verbose = require('./Verbose');

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

// From https://github.com/AnalyticalGraphicsInc/cesium/blob/master/Source/Core/createGuid.js
var createGuid = function() {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

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

    var dirPath = path.join('working', createGuid());

    fs.mkdir(dirPath, undefined, function(err) {
		if (err) { return returnError(err, dirPath, '1/5 mkdir', callback); }

        var daePath = path.join(dirPath, 'input.dae');
        var gltfPath = path.join(dirPath, 'output.gltf');

        fs.writeFile(daePath, collada, function(err) {
        	if (err) { return returnError(err, dirPath, '2/5 writeFile', callback); }

        	Verbose.time('collada2gltf time');

        	child_process.execFile(collada2gltfPath, [
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
