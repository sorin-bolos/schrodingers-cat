const math = require('mathjs')
const k = require('../quantum/ket')

var assert = require('assert');
describe('Ket', function() {
  describe('#isUnitary()', function() {
    it('[0, 1] should be unitary', function() {
      let ket = new k.Ket(math.complex(0) ,math.complex(1))
      assert.equal(ket.isUnitary(math.complex(0) ,math.complex(1)), true);
    });

    it('[1, 0] should be unitary', function() {
      let ket = new k.Ket(math.complex(1) ,math.complex(0))
      assert.equal(ket.isUnitary(math.complex(1) ,math.complex(0)), true);
    });

    it('[1/sqrt(2), 1/sqrt(2)] should be unitary', function() {
      let c = math.complex(1/math.sqrt(2));
      let r = Math.abs(c*c.conjugate() - 1/2)

      assert.equal(r < Number.EPSILON, true);
    });

    it('[1, 1] should not be unitary', function() {
      assert.throws(() => new k.Ket(math.complex(1) ,math.complex(1)), "Ket must be unitary");
    });
  });
});