class Ket {
    constructor(_alpha, _beta) {

        if (!this.isUnitary(_alpha, _beta))
            throw new Exception("Ket must be unitary")

        this.vector = [_alpha, _beta];
    }

    isUnitary(alpha, beta) {
        let modulus = alpha * alpha.conjugate() + beta * beta.conjugate()
        return Math.abs(modulus - 1) < Number.EPSILON
    }
}

module.exports = {
    Ket
  }