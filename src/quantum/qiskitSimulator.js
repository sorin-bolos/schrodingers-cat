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
            return new k.Ket(amplitudes)
        } )
    }

    measure(ket) {
        return this.apply({name: 'M'}, ket);
    }
}

module.exports = {
    QiskitSimulator
}