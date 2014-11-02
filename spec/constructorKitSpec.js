var ck = require('../constructor-kit');

describe('constructorKit', function () {
  beforeEach(function () {
    jasmine.addMatchers({
      toBeCallable: function (util, customEqualityMatchers) {
        return {
          compare: function (actual, expected) {
            var result = {};

            if (result.pass = util.equals(typeof actual, 'function', customEqualityMatchers)) {
              result.message = 'Expected ' + actual + ' to be a function';
            } else {
              result.message = 'Expected ' + actual + ' to be a function';
            }

            return result;
          }
        };
      }
    });
  });

  it('should have an alias', function () {
    expect(ck).toBeCallable();
    // Legacy API
    expect(ck).toBe(ck.ck);
    expect(ck).toBe(ck.constructorKit);
  });

  it('should return the same constructor passed in', function () {
    var a, b;

    a = function () {};
    b = ck(a);

    expect(a).toBe(b);
  });

  it('should set the prototype properties', function () {
    var a, b, c;

    a = ck(function () {
    }, {
      hello: function () {
        return 'hello';
      }
    });

    b = ck(function () {
    }, {
      hi: function () {
        return 'hi';
      }
    });

    c = ck(function () {
    }, {
      howdy: function () {
        return 'howdy';
      }
    });

    expect(a.prototype.hello).toBeCallable();
    expect(a.prototype.hi).not.toBeDefined();
    expect(a.prototype.howdy).not.toBeDefined();

    expect(b.prototype.hello).not.toBeDefined();
    expect(b.prototype.hi).toBeCallable();
    expect(b.prototype.howdy).not.toBeDefined();

    expect(c.prototype.hello).not.toBeDefined();
    expect(c.prototype.hi).not.toBeDefined();
    expect(c.prototype.howdy).toBeCallable();
  });

  it('should preserve prototype chain', function () {
    var a, b, c;

    a = ck(function () {
    }, {
      hello: function () {
        return 'hello';
      }
    });

    b = ck(function () {
    }, {
      hi: function () {
        return 'hi';
      }
    }, a);

    c = ck(function () {
    }, {
      howdy: function () {
        return 'howdy';
      }
    }, b);

    expect(a.prototype.hello).toBeCallable();
    expect(a.prototype.hi).not.toBeDefined();
    expect(a.prototype.howdy).not.toBeDefined();

    expect(b.prototype.hello).toBeCallable();
    expect(b.prototype.hi).toBeCallable();
    expect(b.prototype.howdy).not.toBeDefined();

    expect(c.prototype.hello).toBeCallable();
    expect(c.prototype.hi).toBeCallable();
    expect(c.prototype.howdy).toBeCallable();

    expect((new b()) instanceof a).toBe(true);
    expect((new c()) instanceof b).toBe(true);
    expect((new a()).constructor).toBe(a);
    expect((new b()).constructor).toBe(b);
    expect((new c()).constructor).toBe(c);
  });

  it('should permit inheriting prototype chain from an object', function () {
    var a, b;

    a = {
      hello: function () {
        return 'hello';
      }
    };

    b = ck(function () {
      this.hi = function () {
        return 'hi';
      };
    }, {}, a);

    expect(b.prototype.hello).toBeCallable();
    expect(b.prototype.hi).not.toBeCallable();
    expect((new b()).hi).toBeCallable();
  });
});