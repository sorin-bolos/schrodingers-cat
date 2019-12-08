const math = require('mathjs')
const o = require('../quantum/operator')
const k = require('../quantum/ket')
const s = require('../quantum/instantSimulator')
const assert = require('assert');

describe('Operator', function() {
    describe('#I()', function() {
      it('I should leave vector unchanged', function() {
        let simulator = new s.InstantSimulator();
        let ket = new k.Ket([1/2, math.sqrt(3)/2]);
        let newKet = simulator.I(ket);
        let expected = [1/2, math.sqrt(3)/2].map(e => new math.complex(e.toFixed(3)));
        assert.deepEqual(newKet.amplitudes, expected);
      })
    });

    describe('#X()', function() {
        it('X should swap vector elements', function() {
          let simulator = new s.InstantSimulator();
          let ket = new k.Ket([1/2, math.sqrt(3)/2]);
          let newKet = simulator.X(ket);
          let expected = [math.sqrt(3)/2, 1/2].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });

      describe('#Y()', function() {
        it('Y should rotate arround the y axis', function() {
          let simulator = new s.InstantSimulator();
          let a = 0.5;
          let b = (math.sqrt(3)/2).toFixed(3);
          let ket = new k.Ket([a, b]);
          let newKet = simulator.Y(ket);
          let expected = [`0+${b}i`, `0-${a}i`].map(e => new math.complex(e));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });

      describe('#Z()', function() {
        it('Z should change the sign of the secont element in the vector', function() {
          let simulator = new s.InstantSimulator();
          let ket = new k.Ket([1/2, math.sqrt(3)/2]);
          let newKet = simulator.Z(ket);
          let expected = [1/2, -math.sqrt(3)/2].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });
});