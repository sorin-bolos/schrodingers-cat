const math = require('mathjs')
const k = require('../quantum/ket')
const assert = require('assert');

describe('Ket', function() {
  describe('#isUnitary()', function() {
    it('[0, 1] should be unitary', function() {
      let ket = new k.Ket([0, 1])
      assert.ok(ket);
    });

    it('[1, 0] should be unitary', function() {
      let ket = new k.Ket([1, 0]);
      assert.ok(ket);
    });

    it('[1/sqrt(2), 1/sqrt(2)] should be unitary', function() {
      let ket = new k.Ket([1/math.sqrt(2), 1/math.sqrt(2)])
      assert.ok(ket);
    });

    it('[1, 1] should not be unitary', function() {
      assert.throws(() => new k.Ket([1, 1]));
    });
  });

  describe('#tensor(otherKet)', function() {
    it('[1, 0] tensor [1, 0] should be [1, 0, 0, 0]', function() {
      let zeroZero = k.Zero.tensor(k.Zero);
      let expected = [1, 0, 0, 0].map(e => new math.complex(e));
      assert.deepEqual(zeroZero.amplitudes, expected);
    });

    it('[1, 0] tensor [0, 1] should be [0, 1, 0, 0]', function() {
      let zeroOne = k.Zero.tensor(k.One);
      let expected = [0, 1, 0, 0].map(e => new math.complex(e));
      assert.deepEqual(zeroOne.amplitudes, expected);
    });

    it('[0, 1] tensor [1, 0] should be [0, 0, 1, 0]', function() {
      let oneZero = k.One.tensor(k.Zero);
      let expected = [0, 0, 1, 0].map(e => new math.complex(e));
      assert.deepEqual(oneZero.amplitudes, expected);
    });

    it('[0, 1] tensor [0, 1] should be [0, 0, 0, 1]', function() {
      let oneOne = k.One.tensor(k.Zero);
      let expected = [0, 0, 1, 0].map(e => new math.complex(e));
      assert.deepEqual(oneOne.amplitudes, expected);
    });

    it('[1/sqrt(2), 1/sqrt(2)] tensor [1/sqrt(2), 1/sqrt(2)] should be [1/2, 1/2, 1/2, 1/2]', function() {
      
      let ket = k.Plus.tensor(k.Plus);
      let expected = [1/2, 1/2, 1/2, 1/2].map(e => new math.complex(e));
      assert.deepEqual(ket.amplitudes, expected);
    });
    it('[1, 0] tensor [i, 0] should be [i, 0, 0, 0]', function() {
      
      let ket = new k.Ket([1, 0]).tensor(new k.Ket(["i", 0]));
      let expected = ["i", 0, 0, 0].map(e => new math.complex(e));
      assert.deepEqual(ket.amplitudes, expected);
    });
  });
});