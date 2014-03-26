(function (global) {
  'use strict';

  function ck(constructor, prototypeProperties, prototypeChain) {
    if (arguments.length === 1) {
      prototypeProperties = {};
    } else if (arguments.length === 2) {
      prototypeChain = prototypeProperties;
      prototypeProperties = {};
    }

    prototypeProperties = prototypeProperties || {};

    if (typeof prototypeChain === 'function') {
      constructor.prototype = ck.create(prototypeChain.prototype);
      ck.mixin(constructor.prototype, prototypeProperties);
    } else if (prototypeChain) {
      constructor.prototype = ck.create(prototypeChain);
      ck.mixin(constructor.prototype, prototypeProperties);
    } else {
      constructor.prototype = ck.mixin({}, prototypeProperties);
    }

    constructor.prototype.constructor = constructor;

    return constructor;
  }

  ck.create = Object.create || function (o) {
    function F() { this.constructor = F; }
    F.prototype = o;
    return new F();
  };

  ck.mixin = function (dest) {
    var k, obj, objs;

    objs = [].slice.call(arguments, 1);
    while (objs.length) {
      obj = objs.shift();

      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          dest[k] = obj[k];
        }
      }
    }

    return dest;
  };

  if (typeof exports === 'object' && exports) {
    exports.ck = ck;
    exports.constructorKit = ck;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return {ck: ck, constructorKit: ck};
    });
  } else {
    global.ck = ck;
    global.constructorKit = ck;
  }
}(this));