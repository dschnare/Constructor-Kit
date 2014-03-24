/*
Advantages:
- Built on core JavaScript features, introduces no new concepts
- Works with all legacy and new JavaScript frameworks
- Extremely lightweight and easy to use
*/


/*
Example usage:

var o = {
  toString: function () {
    return ':>' + Object.prototype.toString.call(this, 'toString');
  }
};

var C = ck(function (message) {
  this.message = message;
}, {
  toString: function () {
    return this.message + o.toString.call(this);
  }
}, o);

var D = ck(function () {
  C.call(this, 'Message from D!');
}, {
  toString: function () {
    return C.prototype.toString.call(this).toUpperCase();
  }
}, C);

var c = new C('Hello World!');
var d = new D();

console.log('o.toString:', o.toString());
console.log('c.toString:', c.toString());
console.log('d.toString:', d.toString());
*/

(function (global) {
  'use strict';

  function ck(constructor, prototypeProperties, prototypeChain) {
    if (arguments.length === 1) {
      prototypeProperties = {};
    } else if (arguments.length === 2) {
      prototypeChain = prototypeProperties;
      prototypeProperties = {};
    }

    if (typeof prototypeChain === 'function') {
      constructor.prototype = ck.create(prototypeChain.prototype);
      ck.mixin(constructor.prototype, prototypeProperties);
    } else if (prototypeChain) {
      constructor.prototype = ck.create(prototypeChain);
      ck.mixin(constructor.prototype, prototypeProperties);
    } else {
      constructor.prototype = prototypeProperties;
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
  };

  if (typeof module === 'object' && module.exports) {
    module.exports = ck;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return ck;
    });
  } else {
    global.ck = ck;
    global.constructorKit = ck;
  }
}(this));