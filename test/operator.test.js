const math = require('mathjs')
const o = require('../quantum/operator')
const k = require('../quantum/ket')
const assert = require('assert');

describe('Operator', function() {
    describe('#constructor()', function() {
      it('[[1, 0], [0, 1]] should create operator', function() {
        let operator = new o.Operator([[1, 0], [0, 1]])
        let expected = [[1, 0], [0, 1]].map(r => r.map(e => new math.complex(e)));
        assert.deepEqual(operator.matrix, expected);
      })
    });

    describe('#tensor()', function() {
        it('X tensor I should create correct operator', function() {
          let tensored = o.X.tensor(o.I);
          let expected = [[0, 0, 1, 0], 
                          [0, 0, 0, 1],
                          [1, 0, 0, 0],
                          [0, 1, 0, 0]].map(r => r.map(e => new math.complex(e)));
        assert.deepEqual(tensored.matrix, expected);
        })
        it('X tensor Y should create correct operator', function() {
            let tensored = o.X.tensor(o.Y);
            let expected = [[0, 0, 0, "0+i"], 
                            [0, 0, "0-i", 0],
                            [0, "0+i", 0, 0],
                            ["0-i", 0, 0, 0]].map(r => r.map(e => new math.complex(e)));
            assert.deepEqual(tensored.matrix, expected);
          })
      });
});