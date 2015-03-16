var nconf = require('nconf');

// This module wraps nconf to make sure it is initialized before being used

// Override options in this order: config.json < environment variables < command-line arguments
nconf.argv()
     .env()
     .file({ file: 'config.json' });

// Set the path to the collada2gltf executable based on the platform unless
// a path was already defined in config.json
if (!nconf.get('collada2gltfPath')) {
    if (process.platform === 'darwin') {
        nconf.set('collada2gltfPath', 'collada2gltf/mac/collada2gltf');
    } else if (process.platform === 'win32') {
        nconf.set('collada2gltfPath', 'collada2gltf/win32/collada2gltf.exe');
    } else {
        console.error('Only Mac and Windows builds of collada2gltf are included. Build from source for your platform: https://github.com/KhronosGroup/glTF');
        process.exit(1);
    }
}

module.exports = nconf;