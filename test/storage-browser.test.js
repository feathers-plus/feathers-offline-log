
const assert = require('chai').assert;
const browserStorage = require('../src/browser-storage');

describe('browser-storage', () => {
  beforeEach(() => {
    return browserStorage.config()
      .then(() => browserStorage.clear());
  });
  
  it('can set/get a string', () => {
    return browserStorage.setItem('aa', 'aaaaa')
      .then(() => browserStorage.getItem('aa'))
      .then(res => assert.equal(res, 'aaaaa'));
  });
  
  it('can set/get an object', () => {
    return browserStorage.setObj('a', { a: 'a' })
      .then(() => browserStorage.getObj('a'))
      .then(res => assert.deepEqual(res, { a: 'a' }));
  });
  
  it('can remove an object', () => {
    return browserStorage.removeItem('a')
      .then(res => assert.equal(res, undefined));
  });
  
  it('can get keys, #keys', () => {
    return browserStorage.setItem('ss', 'sssss')
      .then(() => browserStorage.setItem('tt', 'ttttt'))
      .then(() => Promise.all([
        browserStorage.keys(),
        browserStorage.length()
      ]))
      .then(([keys, len]) => {
        assert.deepEqual(keys.sort(), ['ss', 'tt']);
        assert.equal(len, 2);
      });
  });
  
  it('can iterate', () => {
    const store = {};
    
    return browserStorage.setItem('aa', 'aaaaa')
      .then(() => browserStorage.setItem('tt', 'ttttt'))
      .then(() => browserStorage.iterate((value1, key1) => {
        store[key1] = value1;
      }))
      .then(() => {
        assert.deepEqual(store, { aa: 'aaaaa', tt: 'ttttt' });
      });
  });
  
  it('can clear', () => {
    return browserStorage.clear()
      .then(() => Promise.all([
        browserStorage.keys(),
        browserStorage.length()
      ]))
      .then(([keys, len]) => {
        assert.deepEqual(keys.sort(), []);
        assert.equal(len, 0);
      });
  });
});
