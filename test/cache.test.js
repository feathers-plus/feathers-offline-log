
const assert = require('chai').assert;
const storageBrowser = require('../src/storage-browser');
const Cache = require('../src/cache');

const ls = require('humble-localstorage');

let cache;
let obj;

describe('cache', () => {
  beforeEach(() => {
    const unique = Math.random();
    
    obj = {
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
    
    cache = new Cache(storageBrowser);
    
    return cache.config()
      .then(() => cache.clear());
  });
  
  it('adds to cache', () => {
    return cache.addObj(obj)
      .then(() => cache.getOldestChunk())
      .then(chunk => {
        assert.deepEqual(JSON.parse(chunk), obj);
      });
  })
});

