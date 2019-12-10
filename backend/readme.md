Schrody Server

Methods:

StateVectorSimulation:

  Input: 
  {
      numberOfQubits: int,
      initialState: String[] //array of complex numbers represented as strings. If null considered |0..0>
      gates: [ //array of gates with hteir parameters
        {
            gate: string //name of the gate to apply
            params: int[] //array of qubit indexes
        }
      ]
  }

  Output:
  {
      outputState: String[] //array of complex numbers represented as strings
  }

Test command: 
    curl -d "@testRequest.json" -X POST http://localhost:5000/ -H "Content-Type: application/json"