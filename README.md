# collada2gltf-web-service

<p align="center">
<a href="https://www.khronos.org/gltf"><img src="doc/gltf.png" /></a>
</p>

Simple web service to convert 3D models from COLLADA to glTF using COLLADA2GLTF.

[![Build Status](https://travis-ci.org/AnalyticalGraphicsInc/collada2gltf-web-service.svg?branch=master)](https://travis-ci.org/AnalyticalGraphicsInc/collada2gltf-web-service)

## Overview

This is a code sample that can serve as a starting point for a Node.js web service that converts COLLADA models to
glTF.  This version just converts a .dae file to a .gltf with embedded geometry, animations, skins, and shaders.  It does not handle textures.

## Install

Install [Node.js](http://nodejs.org/), then run:
```
npm install collada2gltf-web-service
```

## Usage

Start server using [nodemon](http://nodemon.io/) so it is automatically restarted when the code changes:
```
npm start
```

Invoke the web service by issuing an HTTP request and providing the COLLADA model with POST:
```
curl -X POST -H "Content-Type:text/plain" -d @test/data/box.dae localhost:3000/convert
```

A few settings can be changed by modifying [config.json](config.json).  This is loaded using [nconf](https://www.npmjs.com/package/nconf) so environment variables and command-line arguments can override this.

## Tests and JSHint

Run the tests:
```
npm test
```

Run JSHint:
```
npm jshint
```

## Resources

* [9 uses for cURL worth knowing](http://httpkit.com/resources/HTTP-from-the-Command-Line/)
* [nodeinpractice](https://github.com/alexyoung/nodeinpractice) - book and sample code

***

Developed by <a href="http://www.agi.com/">AGI</a>, founders of the Cesium WebGL engine.
<p align="center">
<a href="http://cesiumjs.org/"><img src="doc/cesium.png" /></a>
</p>
