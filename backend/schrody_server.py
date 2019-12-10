from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit import Aer, execute

from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class SchrodyServer(Resource):
    def get(self):
        circ = QuantumCircuit(1)
        circ.h(0)
        
        simulator = Aer.get_backend('statevector_simulator')
        result = execute(circ, simulator).result()
        statevector = result.get_statevector(circ)
        return {"aa" : statevector}

api.add_resource(SchrodyServer, '/')

if (__name__ == '__main__'):
    app.run(debug=True)