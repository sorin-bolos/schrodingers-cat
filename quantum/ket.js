const math = require('mathjs')
const PRECISION = 3;

class Ket {
    constructor(_amplitudes) {
        let vector = _amplitudes.map(a => typeof a == 'number' ? a.toFixed(PRECISION) : a)
                                .map(a => new math.complex(a))

        if (!this.isUnitary(vector))
            throw `Ket must be unitary (${vector})`;

        this.amplitudes = vector;
    }

    isUnitary(vector) {
        let sum = vector.reduce((total, element) => total + element * element.conjugate(), 0)
                        .toFixed(PRECISION);
        return sum == 1;
    }

    tensor(otherKet) {
        let tensored = this.amplitudes.map(a => otherKet.amplitudes.map(b => a*b))
                                      .reduce((v1, v2) => v1.concat(v2));
        return new Ket(tensored);
    } 
}

const Zero = new Ket([1, 0]);
const One = new Ket([0, 1]);
const Plus = new Ket([1/math.sqrt(2), 1/math.sqrt(2)]);

module.exports = {
    Ket,
    Zero,
    One,
    Plus
}