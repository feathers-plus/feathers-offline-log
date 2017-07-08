
const assert = require('chai').assert;
const storageBrowser = require('../src/storage-browser');

describe('storage-browser', () => {
  it('basics', () => {
    return storageBrowser.config()
      .then(() => storageBrowser.setObj('a', { a: 'a' }))
      .then(() => storageBrowser.getObj('a'))
      .then(res => assert.deepEqual(res, { a: 'a' }));
  });
});
