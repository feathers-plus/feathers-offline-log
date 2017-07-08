
const assert = require('chai').assert;
const storageBrowser = require('../src/storage-browser');

describe('storage-browser', () => {
  beforeEach(() => {
    return storageBrowser.config()
      .then(() => storageBrowser.clear());
  });
  
  it('can set/get a string', () => {
    return storageBrowser.setItem('aa', 'aaaaa')
      .then(() => storageBrowser.getItem('aa'))
      .then(res => assert.equal(res, 'aaaaa'));
  });
  
  it('can set/get an object', () => {
    return storageBrowser.setObj('a', { a: 'a' })
      .then(() => storageBrowser.getObj('a'))
      .then(res => assert.deepEqual(res, { a: 'a' }));
  });
  
  it('can remove an object', () => {
    return storageBrowser.removeItem('a')
      .then(res => assert.equal(res, undefined));
  });
  
  it('can get keys, #keys', () => {
    return storageBrowser.setItem('ss', 'sssss')
      .then(() => storageBrowser.setItem('tt', 'ttttt'))
      .then(() => Promise.all([
        storageBrowser.keys(),
        storageBrowser.length()
      ]))
      .then(([keys, len]) => {
        assert.deepEqual(keys.sort(), ['ss', 'tt']);
        assert.equal(len, 2);
      });
  });
  
  it('can iterate', () => {
    const store = {};
    
    return storageBrowser.setItem('aa', 'aaaaa')
      .then(() => storageBrowser.setItem('tt', 'ttttt'))
      .then(() => storageBrowser.iterate((value1, key1) => {
        store[key1] = value1;
      }))
      .then(() => {
        assert.deepEqual(store, { aa: 'aaaaa', tt: 'ttttt' });
      });
  });
  
  it('can clear', () => {
    return storageBrowser.clear()
      .then(() => Promise.all([
        storageBrowser.keys(),
        storageBrowser.length()
      ]))
      .then(([keys, len]) => {
        assert.deepEqual(keys.sort(), []);
        assert.equal(len, 0);
      });
  });
});
