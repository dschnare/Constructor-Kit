Constructor-Kit
===============

Constructor Kit is a simple, convenient and backward compatible constructor creation API for JavaScript.


**Advantages:**

- Built on core JavaScript features, introduces no new concepts
- Works with all legacy and new JavaScript frameworks
- Extremely lightweight and easy to use


Example usage:


    var o = {
      toString: function () {
        return ':>' + Object.prototype.toString.call(this);
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

    console.log('o.toString:', o.toString()); // ':>[object Object]'
    console.log('c.toString:', c.toString()); // 'Hello World!:>[object Object]
    console.log('d.toString:', d.toString()); // 'MESSAGE FROM D!:>[OBJECT OBJECT]'