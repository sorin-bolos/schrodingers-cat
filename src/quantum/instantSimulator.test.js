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
        it('Y should rotate around the y axis', function() {
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

      describe('#CNOT()', function() {
        it('CNOT should not change the target if control is |0> and target is |0>', function() {
          let simulator = new s.InstantSimulator();
          let control = new k.Ket([1, 0]);
          let target = new k.Ket([1, 0]);
          let newKet = simulator.CNOT(control, target);
          let expected = [1, 0, 0, 0].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });

      describe('#CNOT()', function() {
        it('CNOT should not change the target if control is |0> and target is |1>', function() {
          let simulator = new s.InstantSimulator();
          let control = new k.Ket([1, 0]);
          let target = new k.Ket([0, 1]);
          let newKet = simulator.CNOT(control, target);
          let expected = [0, 1, 0, 0].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });

      describe('#CNOT()', function() {
        it('CNOT should change the target if control is |1> and target is |0>', function() {
          let simulator = new s.InstantSimulator();
          let control = new k.Ket([0, 1]);
          let target = new k.Ket([1, 0]);
          let newKet = simulator.CNOT(control, target);
          let expected = [0, 0, 0, 1].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });

      describe('#CNOT()', function() {
        it('CNOT should change the target if control is |1> and target is |1>', function() {
          let simulator = new s.InstantSimulator();
          let control = new k.Ket([0, 1]);
          let target = new k.Ket([0, 1]);
          let newKet = simulator.CNOT(control, target);
          let expected = [0, 0, 1, 0].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(newKet.amplitudes, expected);
        })
      });

      describe('#Entangle()', function() {
        it('H + CNOT should entangle qubits', function() {
          let simulator = new s.InstantSimulator();
          let q0 = new k.Ket([1, 0]);
          let q1 = new k.Ket([1, 0]);
          let system = q0.tensor(q1);
          let operator = o.H.tensor(o.I);
          system = simulator.apply(operator, system);
          system = simulator.apply(o.CNOT, system);

          let expected = [1/math.sqrt(2), 0, 0, 1/math.sqrt(2)].map(e => new math.complex(e.toFixed(3)));
          assert.deepEqual(system.amplitudes, expected);
        })
      });
});