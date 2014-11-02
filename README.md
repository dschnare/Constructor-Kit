Constructor-Kit
===============

Constructor Kit is a simple, convenient and backward compatible constructor creation API for JavaScript.

Supports Nodejs, Bower, AMD and loading as a global browser `<script>`.

## Install

    bower install constructor-kit

Or

    npm install constructor-kit


## Bower

To use the component you will have to bundle the component using a tool like [Browserify](http://browserify.org).
For example:

*./public/modules/app.js*:

    var ck = require('constructor-kit')
    console.log(typeof ck)

*command line*:

    browserify -t debowerify ./public/modules/app.js > ./public/app.max.js


## Advantages

- Built on core JavaScript features, introduces no new concepts
- Works with all legacy and new JavaScript frameworks
- Extremely lightweight and easy to use


## Example usage

    var o = {
      toString: function () {
        return ':>' + Object.prototype.toString.call(this);
      }
    };

    var C = constructorKit(function (message) {
      this.message = message;
    }, {
      toString: function () {
        return this.message + o.toString.call(this);
      }
    }, o);

    var D = constructorKit(function () {
      C.call(this, 'Message from D!');
    }, {
      toString: function () {
        return C.prototype.toString.call(this).toUpperCase();
      }
    }, C);

    var c = new C('Hello World!');
    var d = new D();

    // Logs: ':>[object Object]'
    console.log('o.toString:', o.toString()); 
    // Logs: 'Hello World!:>[object Object]
    console.log('c.toString:', c.toString()); 
    // Logs: 'MESSAGE FROM D!:>[OBJECT OBJECT]'
    console.log('d.toString:', d.toString());


## Reference

    constructorKit(constructor)
    constructorKit(constructor, prototypeProperties)
    constructorKit(constructor, prototypeProperties, prototypeChain)

The parameter `constructor` is the actual constructor and the `prototypeProperties` parameter is a plain JavaScript object containing all the properties to have mixed into the constructor's prototype. The `prototypeChain` is an object or function (i.e. another constructor). A prototype chain will be created with the object or with the function's `prototype` property and assigned to the `prototype` property of the `constructor` parameter before returning the `constructor`.

*NOTE: `prototypeProperties` can be null.*

