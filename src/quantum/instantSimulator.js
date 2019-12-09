const math = require('mathjs')
const k = require('./ket')
const o = require('./operator')

class InstantSimulator {
    constructor () {
    }

    apply(operator, ket) {
        let operatorSize = math.size(operator.matrix)[0]
        let ketSize = math.size(ket.amplitudes);
        if (ketSize != operatorSize)
            throw `Cannot apply operator of size ${operatorSize} to ket of size ${ketSize}`;

        let newElements = math.multiply(operator.matrix, ket.amplitudes);
        return new k.Ket(newElements);
    }

    I(ket) {
        return this.apply(o.I, ket);
    }

    X(ket) {
        return this.apply(o.X, ket);
    }

    Y(ket) {
        return this.apply(o.Y, ket);
    }

    Z(ket) {
        return this.apply(o.Z, ket);
    }

    H(ket) {
        return this.apply(o.Z, ket);
    }

    CNOT(contrloKet, targetKet) {
        let tensor = contrloKet.tensor(targetKet);
        return this.apply(o.CNOT, tensor);
    }
}

module.exports = {
    InstantSimulator
}