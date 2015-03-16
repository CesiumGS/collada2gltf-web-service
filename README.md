# collada2gltf-web-service

<p align="center">
<a href="https://www.khronos.org/gltf"><img src="doc/gltf.png" /></a>
</p>

Simple web service to convert 3D models from COLLADA to glTF using [COLLADA2GLTF](https://github.com/KhronosGroup/glTF).

## Overview

This is a code sample that is a starting point for a Node.js web service that converts COLLADA models to
glTF.  This version just converts a .dae file to a .gltf with embedded geometry, animations, skins, and shaders.  It does not handle textures.

## Install

Clone this repo.  Install [Node.js](http://nodejs.org/).  From this repo's root directory, run:
```
npm install
```

## Usage

Start the server:
```
npm start
```

Invoke the web service by issuing an HTTP request and providing the COLLADA model with POST:
```
curl -X POST -H "Content-Type:text/plain" -d @test/data/box.dae localhost:3000/convert
```

A few settings can be changed by modifying [config.json](config.json).  This is loaded using [nconf](https://www.npmjs.com/package/nconf) so environment variables and command-line arguments can override this.

## Development and Testing

To automatically restart the server during development, install and run [nodemon](http://nodemon.io/):
```
npm install nodemon -g
nodemon server.js
```

Install and run [JSHint](http://jshint.com/):
```
npm install jshint -g
npm run jshint
```

Install [mocha](http://mochajs.org/) and run the tests:
```
npm install mocha -g
npm test
```

## COLLADA2GLTF builds

Build are in the [collada2gltf](collada2gltf) directory.  They are currently version 0.8 from [here](https://github.com/KhronosGroup/glTF/wiki/Converter-builds).

## Resources

* [9 uses for cURL worth knowing](http://httpkit.com/resources/HTTP-from-the-Command-Line/)
* [nodeinpractice](https://github.com/alexyoung/nodeinpractice) - book and sample code

***

Developed by <a href="http://www.agi.com/">AGI</a>, founders of the Cesium WebGL engine.
<p align="center">
<a href="http://cesiumjs.org/"><img src="doc/cesium.png" /></a>
</p>
