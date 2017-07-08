
module.exports = {
  logAndThrow,
  mixin,
};

function logAndThrow (desc) {
  return err => {
    console.log(desc, err.message);
    throw err;
  };
}

function mixin(dest, ...objs) {
  const base = typeof dest === 'function' ? dest.prototype : dest;
  
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      var descriptor = Object.getOwnPropertyDescriptor(obj, key);
      Object.defineProperty(base, key, descriptor);
    });
  });
  
  return dest;
}
