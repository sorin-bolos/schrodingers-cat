from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit import Aer, execute

from flask import Flask
from flask_restful import Resource, Api, fields, marshal_with, reqparse

app = Flask(__name__)
api = Api(app)

resource_fields = {
    'state': fields.List(fields.String)
}

numberOfQubits = 'numberOfQubits'
initialState = 'initialState'
gates = 'gates'
gate = 'gate'
params = 'params'
outputState = 'outputState'
bits = 'bits'

parser = reqparse.RequestParser()
parser.add_argument(numberOfQubits, type=int, help=f'Cannot parse `{numberOfQubits}`')
parser.add_argument(initialState, action='append')
parser.add_argument(gates, type=dict, action='append')

def applyGates(data):
    count = data[numberOfQubits]
    circ = QuantumCircuit(count, count)
    
    if data[initialState] != None:
        state = [complex(x) for x in data[initialState]]
        circ.initialize(state, range(count))
    
    for g in data[gates]:
        applyGate(circ, g[gate], g[params])

    simulator = Aer.get_backend('statevector_simulator')
    result = execute(circ, simulator).result()
    statevector = result.get_statevector(circ)
    return statevector

def applyGate(circuit, gateString, params):
    if (gateString == "X" or gate == "x"):
        circuit.x(params)
    elif (gateString == "Y" or gate == "y"):
        circuit.y(params)
    elif (gateString == "Z" or gate == "z"):
        circuit.z(params)
    elif (gateString == "H" or gate == "h"):
        circuit.h(params)
    elif (gateString == "CNOT" or gate == "cnot"):
        circuit.cx(params[0], params[1])
    elif (gateString == "M" or gate == "m"):
        circuit.measure(params, params)

def complexToString(complex):
    return str(complex).replace("(", "").replace(")", "")

class StateVectorSimulation(Resource):
    def post(self):
        data = parser.parse_args()
        statevector = applyGates(data)
        return {outputState : [complexToString(c) for c in statevector.tolist()]}

api.add_resource(StateVectorSimulation, '/')

if (__name__ == '__main__'):
    app.run(debug=True)