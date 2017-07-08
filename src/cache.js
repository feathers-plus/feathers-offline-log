
import makeDebug from 'debug';
const debug = makeDebug('log-cache');

export default class Cache {
  constructor(storage, options = {}) {
    this._chunkMaxLen = options.chunkMaxLen || 500000; // 0.5 meg
    this._sep = options.sep || ',';
    this._storage = storage;
    this._currChunkKey = '';
    this._currChunk = '';
  }
  
  config(options = {}) {
    debug('config started', options);
    
    return this._storage.config(options)
      .then(() => this._getChunkKeys())
      .then(keys => {
        if (keys.length) {
          this._currChunkKey = this._incrKey(keys[keys.length - 1]);
        } else {
          this._currChunkKey = '_0';
        }
        
        debug('config ended. _currChunkKey=', this._currChunkKey);
      });
  }
  
  add(str, sep) {
    debug('add started', this._currChunkKey);
    sep = sep || this._sep;
  
    return new Promise(resolve => {
      if (this._currChunk.length + str.length <= this._chunkMaxLen) {
        return resolve();
      }
  
      const promise = this._flushCurrChunk()
        .then(() => {
          this._currChunkKey = this._incrKey(this._currChunkKey);
          this._currChunk = '';
        });
  
      return resolve(promise);
    })
      .then(() => {
        this._currChunk = `${this._currChunk}${this._currChunk.length ? sep : ''}${str}`;
        this._flushCurrChunk();
        debug('add ended. length', this._currChunk.length);
      })
  }
  
  addObj(obj) {
    debug('addObj entered');
    return this.add(JSON.stringify(obj), ',');
  }

  getOldestChunk() {
    debug('getOldestChunk entered');
    return this._getChunkKeys()
      .then(keys => this._storage.getItem(keys[0]));
  }
  
  removeOldestChunk() {
    debug('removeOldestChunk entered');
    return this._getChunkKeys()
      .then(keys => this._storage.returnItem(keys[0]));
  }
  
  clear() {
    debug('clear entered');
    return this._storage.clear();
  }
  
  _getChunkKeys() {
    debug('_getChunkKeys entered');
    return this._storage.keys()
      .then(keys => keys.filter(key => key.charAt(0) === '_').sort());
  }
  
  _incrKey(lastKey) {
    return `_${(parseInt(lastKey.substr(1), 10) + 1) + ''}`;
  }
  
  _flushCurrChunk() {
    debug('_flushCurrChunk entered. key', this._currChunkKey);
    return this._storage.setItem(this._currChunkKey, this._currChunk);
  }
};
