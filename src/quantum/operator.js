const math = require('mathjs')


class Operator {
    constructor(_elements, _name) {
        let size = math.size(_elements);
        if (size.length != 2)
            throw "Operator must be a 2-dimensional matrix";
        if (size[0] != size[1])
            throw "Operator must be a square matrix";

        this.matrix = _elements.map(a => typeof a == 'number' ? a.toFixed(PRECISION) : a)
                               .map(a => new math.complex(a));
        this.name = _name;
    }

    tensor(otherOperator) {
        let size = math.size(this.matrix)[0];
        let otherSize = math.size(otherOperator.matrix)[0];
        let tensored = [...Array(size*otherSize)].map(e => Array(size*otherSize));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let s = 0; s < otherSize; s++) {
                    for (let t = 0; t < size; t++) {
                        tensored[i*otherSize + s][j*otherSize + t] = math.multiply(this.matrix[i][j],otherOperator.matrix[s][t]);
                    }
                }
            }
        }
        return new Operator(tensored);
    }
}

const I = new Operator([[1, 0], [0, 1]], "I");
const X = new Operator([[0, 1], [1, 0]], "X");
const Y = new Operator([[0, "0+i"], ["0-i", 0]], "Y");
const Z = new Operator([[1, 0], [0, -1]], "Z");
const H = new Operator([[1/math.sqrt(2), 1/math.sqrt(2)], [1/math.sqrt(2), -1/math.sqrt(2)]], "H");
const M = new Operator([[1/math.sqrt(2), 1/math.sqrt(2)], [1/math.sqrt(2), -1/math.sqrt(2)]], "M");
const CNOT = new Operator([[1, 0, 0, 0],
                           [0, 1, 0, 0],
                           [0, 0, 0, 1],
                           [0, 0, 1, 0]], "CNOT");

module.exports = {
    Operator,
    I,
    X,
    Y,
    Z,
    H,
    M,
    CNOT
}