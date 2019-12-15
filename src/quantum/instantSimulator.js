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
        return Promise.resolve(new k.Ket(newElements));
    }

    measure(ket) {
        let newAmplitudes = new Array(ket.amplitudes.length).fill(0);
        const rand = math.random();

        let threshold = 0;
        for(let i = 0; i < ket.amplitudes.length; i++)
        {
            const element = ket.amplitudes[i];
            const probability = math.multiply(element, element.conjugate()).re;
            threshold += probability;

            if (rand <= threshold) {
                newAmplitudes[i] = 1;
                return Promise.resolve(new k.Ket(newAmplitudes));
            }
        }

        throw "Sum of probabilities should be 1";
    }
}

module.exports = {
    InstantSimulator
}