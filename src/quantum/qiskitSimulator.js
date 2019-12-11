const k = require('./ket')
const o = require('./operator')

const url = "http://localhost:5000/"

class QiskitSimulator {
    constructor () {
    }

    apply(operator, ket) {

        let state = ket.amplitudes.map(x => x + "")
                                  .map(s => s.replace("i", "j"))
                                  .map(s => s.replace(/\s/g, ''));
        let qCount = state.length == 2 ? 1 : (state.length == 4 ? 2 : 3);

        let req = {
            numberOfQubits: qCount,
            initialState: state,
            gates: [
                {
                    gate: operator.name,
                    params: [0]
                }
            ]
        };

        console.log(JSON.stringify(req))

        return fetch(url, {
            method: "POST",
            mode: 'cors',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((data) => {
            let amplitudes = data.outputState.map(s => s.replace("j", "i"));
            console.log(data);
            return new k.Ket(amplitudes)
        } )
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
        return this.apply(o.H, ket);
    }

    M(ket) {
        return this.apply(o.M, ket);
    }

    CNOT(contrloKet, targetKet) {
        let tensor = contrloKet.tensor(targetKet);
        return this.apply(o.CNOT, tensor);
    }
}

module.exports = {
    QiskitSimulator
}