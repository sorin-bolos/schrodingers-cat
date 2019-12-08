const math = require('mathjs')
const k = require('./ket')

class Operator {
    constructor(_elements) {
        let size = math.size(_elements);
        if (size.length != 2)
            throw "Operator must be a 2-dimensional matrix";
        if (size[0] != size[1])
            throw "Operator must be a square matrix";

        this.matrix = _elements.map(a => typeof a == 'number' ? a.toFixed(PRECISION) : a)
                               .map(a => new math.complex(a));                   
    }

    tensor(otherOperator) {
        let size = math.size(this.matrix)[0];
        let otherSize = math.size(otherOperator.matrix)[0];
        let tensored = [...Array(size*otherSize)].map(e => Array(size*otherSize));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let s = 0; s < otherSize; s++) {
                    for (let t = 0; t < size; t++) {
                        tensored[i*otherSize + s][j*otherSize + t] = this.matrix[i][j] * otherOperator.matrix[s][t];
                    }
                }
            }
        }
        return new Operator(tensored);
    } 

    apply(ket) {
        let size = math.size(ket.amplitudes);
        if (size != math.size(this.matrix)[0])
            throw `Cannot apply operator of size ${math.size(this.matrix)[0]} to ket of size ${size}`;

        let newElements = math.multiply(this.matrix, ket.amplitudes);
        return new k.Ket(newElements);
    }
}

const I = new Operator([[1, 0], [0, 1]]);
const X = new Operator([[0, 1], [1, 0]]);
const Y = new Operator([[0, "0+i"], ["0-i", 0]]);
const Z = new Operator([[1, 0], [0, -1]]);

module.exports = {
    Operator,
    I,
    X,
    Y,
    Z
}