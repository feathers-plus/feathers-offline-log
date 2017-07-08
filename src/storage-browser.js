
const localforage = require('localforage');

module.exports = {
  _logger: null,
  
  config(options = {}) {
    options.instanceName = options.instanceName || 'log';
    options.name = options.name || 'offline';
  
    localforage.config(options);
    const _logger = this._logger = localforage.createInstance({ name: options.instanceName });
    
    this.setItem = _logger.setItem;
    this.getItem = _logger.getItem;
    this.removeItem = _logger.removeItem;
    this.clear = _logger.clear;
    this.length = _logger.length;
    this.keys = _logger.keys;
    this.iterate = _logger.iterate;
    
    return Promise.resolve();
  },

  setObj(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  },

  getObj(key) {
    return this.getItem(key)
      .then(str => JSON.parse(str));
  },
};
