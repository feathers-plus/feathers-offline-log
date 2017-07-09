
const assert = require('chai').assert;

const storageBrowser = require('../src/storage-browser');
const Cache = require('../src');

let cache;

describe('cache', () => {
  let objs;
  let lens;
  
  beforeEach(() => {
    objs = [
      makeObj(),
      makeObj(),
      makeObj(),
    ];
    
    lens = objs.map((obj, i) => JSON.stringify(objs[i]).length);
  
    cache = new Cache(storageBrowser, { chunkMaxLen: lens[1] + lens[2] + 50 });
    return cache.config()
      .then(() => cache.clear())
      .then(() => cache.config());
  });
  
  it('adds 1 obj, gets oldest chunk', () => {
    return cache.addObj(objs[0])
      
      .then(() => cache._getChunkKeys())
      .then(keys => assert.deepEqual(keys, ['_0']))
      
      .then(() => cache.getOldestChunk())
      .then(chunk => {
        assert.deepEqual(JSON.parse(`[${chunk}]`), [objs[0]]);
      });
  });
  
  it('adds 2 obj', () => {
    return cache.addObj(objs[0])
      .then(() => cache.addObj(objs[1]))
  
      .then(() => cache._getChunkKeys())
      .then(keys => assert.deepEqual(keys, ['_0']))
      
      .then(() => cache.getOldestChunk())
      .then(chunk => {
        assert.deepEqual(JSON.parse(`[${chunk}]`), [objs[0], objs[1]]);
      });
  });
  
  it('starts a new chunk', () => {
    return cache.addObj(objs[0])
      .then(() => cache.addObj(objs[1]))
      .then(() => cache.addObj(objs[2]))
      
      .then(() => cache._getChunkKeys())
      .then(keys => assert.deepEqual(keys, ['_0', '_1']))
  });
  
  it('removes a chunk', () => {
    return cache.addObj(objs[0])
      .then(() => cache.addObj(objs[1]))
      .then(() => cache.addObj(objs[2]))
      
      .then(() => cache.removeOldestChunk())
      
      .then(() => cache._getChunkKeys())
      .then(keys => assert.deepEqual(keys, ['_1']))
      
      .then(() => cache.getOldestChunk())
      .then(chunk => assert.deepEqual(JSON.parse(`[${chunk}]`), [objs[2]]));
  });
});

function makeObj() {
  const unique = Math.random();
  
  return {
    name: { first: 'eddyy', middle: 'boomer', last: 'stop', unique },
    address: { line1: '5 Vallet of Shadows',
      line2: 'upper floor',
      city: 'Orgrimmar',
      country: 'Kalimdor',
      planet: 'Azeroth',
      unique },
    messages: [
      'Death to the Alliance!',
      'Vanilla WoW was best! Burning Crusade was darn good.',
      unique
    ]
  };
}
