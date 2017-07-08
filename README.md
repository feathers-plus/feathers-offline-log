# feathers-offline-log

[![Build Status](https://travis-ci.org/feathersjs/feathers-offline-log.png?branch=master)](https://travis-ci.org/feathersjs/feathers-offline-log)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-offline-log/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-offline-log)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-offline-log/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-offline-log/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-offline-log.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-offline-log)
[![Download Status](https://img.shields.io/npm/dm/feathers-offline-log.svg?style=flat-square)](https://www.npmjs.com/package/feathers-offline-log)

| Performant, persistent client-side log.

Maintain a transaction log on the client.
Browser client logs are kept in IndexedDB, WebSQL or, lastly, localStorage.
Log entries are added in an efficient manner, whether the log is small or very large
JavaScript objects may be also be added in an efficient manner.

> **ProTip:** Used for feathers-offline's optimistic mutation log, while client is disconnected.

The cache is efficient because it 

## Installation

```
npm install feathers-offline-log --save
```

## Documentation

Please refer to the [feathers-offline-log documentation](http://docs.feathersjs.com/) for more details.

## Complete Example

Here's an example of a Feathers server that uses `feathers-offline-log`. 

```js
const storageBrowser = require('feathers-offline-log/storage-browser');
const Cache = require('feathers-offline-log');

const cache = new Cache(storageBrowser, { chunkMaxLen: 500000 }); // logs stored in 0.5 meg chunks
cache.config()
  .then(() => cache.addObj(obj1))
  .then(() => cache.addObj(obj2))
  .then(() => cache.addObj(obj3))
  
  .then(() => cache.length()) 
  .then(chunkCount => console.log(`There are ${chunkCount} chunks.`))
    
  .then(() => cache.getOldestChunk()) 
  .then(chunk => JSON.parse(`[${chunk}]`)) 
  .then(chunkObj => console.log(chunkObj))
  .then(() => cache.removeOldestChunk()) 
  .then(() => ) 
  .then(() => ) 
  .then(() => ) 
```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
