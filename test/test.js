var Vec2;
if (typeof require !== 'undefined') {
  require('chai').should();
  Vec2 = require('../lib/Vec2')
} else {
  Vec2 = window.Vec2;
  chai.should();
}

describe('Vec2', function() {
  describe('constructor', function() {
    it('sets x and y if they are passed', function() {
      var v = new Vec2(5, 6);
      v.x.should.equal(5);
      v.y.should.equal(6);
    });

    it('defaults x and y to zero if not passed', function() {
      var v = new Vec2();
      v.x.should.equal(0);
      v.y.should.equal(0);
    })
  });

  describe('#set', function() {
    it('sets x and y', function() {
      var v = new Vec2();
      v.set(10, 9);
      v.x.should.equal(10);
      v.y.should.equal(9);
    });

    it('is chainable', function() {
      var v = new Vec2();
      v.set(1,2).should.equal(v);
    });
  });

  describe('#zero', function() {
    it('sets x and y to 0', function() {
      var v = new Vec2(1, 2);
      v.zero();
      v.x.should.equal(0);
      v.y.should.equal(0);
    });

    it('is chainable', function() {
      var v = new Vec2();
      v.zero().should.equal(v);
    });
  });

  describe('#negate', function() {
    it('makes positive values negative', function() {
      var
      v = new Vec2(2, 2),
      v2 = v.negate();

      v2.x.should.equal(-2);
      v2.y.should.equal(-2);
    });

    it('makes negative values positive', function() {
      var
      v = new Vec2(-2, -2),
      v2 = v.negate();

      v2.x.should.equal(2);
      v2.y.should.equal(2);
    });

    it('is chainable when returnNew is falsy', function() {
      var v = new Vec2(1,1);
      v.negate().should.equal(v);
    });

    it('returns a new Vec2 when returnNew is truthy', function() {
      var v = new Vec2(1,1);
      (v.negate(true) !== v).should.equal(true);
    });
  });

  describe('math', function() {
    var v, v2;

    beforeEach(function() {
      v = new Vec2(1,2);
      v2 = new Vec2(10, 10);
    });

    describe('#add', function() {
      it('adds to both this.x and this.y when returnNew is falsy', function() {
        v.add(v2);
        v.x.should.equal(11);
        v.y.should.equal(12);
      });

      it('returns a new vector when returnNew is truthy', function() {
        var r = v.add(v2, true);
        v.x.should.equal(1);
        v.y.should.equal(2);

        r.x.should.equal(11);
        r.y.should.equal(12);
      });

      it('returns itself when returnNew is falsy', function() {
        var r = v.add(v2);
        v.x.should.equal(11);
        v.y.should.equal(12);
        r.should.equal(v);
      })
    });

    describe('#subtract', function() {
      it('subtracts from both this.x and this.y when returnNew is falsy', function() {
        v.subtract(v2);
        v.x.should.equal(-9);
        v.y.should.equal(-8);
      });

      it('returns a new vector when returnNew is truthy', function() {
        var r = v.subtract(v2, true);
        v.x.should.equal(1);
        v.y.should.equal(2);

        r.x.should.equal(-9);
        r.y.should.equal(-8);
      });

      it('returns itself when returnNew is falsy', function() {
        var v = new Vec2(1,2);
        v.subtract(new Vec2(1,1)).should.equal(v);
      });
    });

    describe('#multiply', function() {
      it('multiplies both this.x and this.y when returnNew is falsy', function() {
        v.multiply(v2);
        v.x.should.equal(10);
        v.y.should.equal(20);
      });

      it('returns a new vector when returnNew is truthy', function() {
        var r = v.multiply(v2, true);
        v.x.should.equal(1);
        v.y.should.equal(2);

        r.x.should.equal(10);
        r.y.should.equal(20);
      });

      describe('scalar argument', function() {
        it('accepts a scalar', function() {
          var v = new Vec2(1,2);

          v.multiply(5);

          v.x.should.equal(5);
          v.y.should.equal(10);
        });

        it('returns a new Vec2 when returnNew is truthy', function() {
          var
          v = new Vec2(1,2),
          r = v.multiply(5, true);

          r.x.should.equal(5);
          r.y.should.equal(10);

          v.x.should.equal(1);
          v.y.should.equal(2);
        });

        it('returns itself when returnNew is falsy', function() {
          var v = new Vec2(1,2);
          v.multiply(1).should.equal(v);
        });
      });
    });

    describe('#rotate', function() {
      it('accepts a scalar angle in radians', function() {
        var v = new Vec2(10, 20);

        (v.rotate(1.2, false, true).equal(
          -15.017204174577788,
          16.567545949205734
        )).should.equal(true);
      });

      it('accepts a scalar angle in radians (inverse)', function() {
        var v = new Vec2(10, 20);

        (v.rotate(1.2, true, true).equal(
          22.26435926411126,
          -2.0732357701387896
        )).should.equal(true);
      });

      it('returns a new vector if returnNew is truthy', function() {
        var v = new Vec2(10, 20);
        (v.rotate(1.0, false, true) !== v).should.equal(true);
      });

      it('returns itself when returnNew is falsy', function() {
        var v = new Vec2(10, 20);
        (v.rotate(1.0, true) === v).should.equal(true);
      });
    });

    describe('#length', function() {
      it('calculates the length', function() {
        v2.length().should.equal(14.142135623730951);
      });

      it('is always positive', function() {
        v2.subtract(new Vec2(100, 200));
        (v2.length() > 0).should.equal(true);
      });
    });

    describe('#lengthSquared', function() {
      it('squares x and y, then sum them', function() {
        v2.lengthSquared().should.equal(200);
      });

      it('is always be positive', function() {
        v2.subtract(new Vec2(100, 200));
        (v2.length() > 0).should.equal(true);
      });
    });

    describe('#distance', function() {
      it('returns a new Vec2 representing the distance between two vectors', function() {
        var
        v = new Vec2(0, 10),
        v2 = new Vec2(0,0),
        d = v.distance(v2);

        d.should.equal(10);
      });
    });

    describe('#normalize', function() {
      it('properly normalizes a vector', function() {
        v2.normalize();
        v2.x.should.equal(0.7071067811865475);
        v2.y.should.equal(0.7071067811865475);
      });
    });

    describe('#skew', function() {
      // TODO: returnNew
      it('negates the y axis and swap x/y', function() {
        var v3 = v.skew();
        v.x.should.equal(1);
        v.y.should.equal(2);
        v3.x.should.equal(-2);
        v3.y.should.equal(1);
      });
    });

    describe('#abs', function() {
      it('returns a new vector with positive values', function() {
        var
        v = new Vec2(-10, -100),
        e = new Vec2(10, 100);

        (v.abs().equal(e)).should.equal(true);
      });

      it('itself with positive values applied', function() {
        var
        v = new Vec2(-10, -100),
        e = new Vec2(10, 100),
        result = v.abs();

        (result.equal(e)).should.equal(true);
        result.should.equal(v);
      });
    });

    describe('#min', function() {
      it('returns a new Vec2 containing the smallest values when returnNew is truthy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(-10, -100);

        (e.min(v2, true).equal(e)).should.equal(true);
      });

      it('applies the smallest values to itself when returnNew is falsy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(-10, -100);

        e.should.equal(e.min(v2));
      });
    });

    describe('#max', function() {
      it('returns a new Vec2 containing the largest values when returnNew is truthy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(10, 100);

        (e.max(v2, true).equal(e)).should.equal(true);
      });

      it('applies the maximum values to itself if returnNew is falsy', function() {
        var
        v = new Vec2(-10, 100),
        v2 = new Vec2(10, -100),
        e = new Vec2(10, 100);

        e.should.equal(e.max(v2));
      });
    });
  });

  describe('#equal', function() {
    it('returns true when both Vec2s have the same values', function() {
      var
      v = new Vec2(1,2),
      v2 = new Vec2(1,2);

      (v.equal(v2)).should.equal(true);
    });

    it('returns false when the Vec2s have the different values', function() {
      var
      v = new Vec2(1,2),
      v2 = new Vec2(1,1);

      (!v.equal(v2)).should.equal(true);
    });

    it('operates on 2 scalars', function() {
      var v = new Vec2(1,2);
      (v.equal(1,2)).should.equal(true);
      (!v.equal(2,1)).should.equal(true);
    });
  });

  describe('clamp', function() {
    it('lowers to the upper bound if above', function() {
      var
      val = new Vec2(4, 6),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      (val.clamp(low, high).equal(2,4)).should.equal(true);
    });

    it('raises to the lowerbound if below', function() {
      var
      val = new Vec2(-2, -10),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      (val.clamp(low, high).equal(0,0)).should.equal(true);
    });

    it('applies the result to itself if returnNew is false', function() {
      var
      val = new Vec2(4, 6),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      (val.clamp(low, high) === val).should.equal(true);
    });

    it('returns a new Vec2 if returnNew is truthy', function() {
      var
      val = new Vec2(4, 6),
      low = new Vec2(0, 0),
      high = new Vec2(2, 4);

      (val.clamp(low, high, true) !== val).should.equal(true);
    });
  })

  describe('#isValid', function() {
    it('returns false when NaN', function() {
      var v = new Vec2();
      v.x = parseInt('a', 10);
      v.y = 0;

      (!v.isValid()).should.equal(true);
    });

    it('returns false when Infinity', function() {
      var v = new Vec2(0, 1/0);
      (!v.isValid()).should.equal(true);
    });

    it('returns true when finite', function() {
      var v = new Vec2(-100, 0);
      (v.isValid()).should.equal(true);
    });
  });
});
