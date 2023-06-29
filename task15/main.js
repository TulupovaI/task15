
function cacheCalls(fn) {
  const cache = new Map();
  const callLog = [];

  return function (...args) {
    const argsKey = JSON.stringify(args);
    if (cache.has(argsKey)) {
      console.log('Cached result!');
      return cache.get(argsKey);
    }

    const result = fn.apply(this, args);
    if (callLog.length >= 10) {
      const oldestCall = callLog.shift();
      cache.delete(oldestCall);
    }
    callLog.push(argsKey);
    cache.set(argsKey, result);

    return result;
  };
}