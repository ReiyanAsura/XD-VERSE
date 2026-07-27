const { AsyncLocalStorage } = require('node:async_hooks');

if (AsyncLocalStorage && !AsyncLocalStorage.snapshot) {
  AsyncLocalStorage.snapshot = function() {
    const stores = new Map();
    return function(fn, ...args) {
      return fn(...args);
    };
  };
}

if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function(compareFn) {
    return Array.from(this).sort(compareFn);
  };
}
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() {
    return Array.from(this).reverse();
  };
}
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function(...args) {
    const copy = Array.from(this);
    copy.splice(...args);
    return copy;
  };
}
if (!Object.hasOwn) {
  Object.hasOwn = function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}
