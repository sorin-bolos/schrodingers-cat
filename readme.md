# Schrody - Schrodinger's Cat

Schrody is a cool game that is ment to teach you about quantum superposition and quantum gates in a fun way.

## Idea of the game

You are Schrody, Schrodinger's cat. You have been put in a box by your master for an experiment. Now you are in a superposition - half dead half alive. You must remain alive and be 100% alive when your master opens the box to see the result of his experiment.

In the box there are some quantum gates and you must use them to transition from the superposition state to the |ALIVE> state. However, if you are still in a suprposition when Dr. Schrodinger opens the box, you still have a random chance (depending on the suerposition) of remaining alive and passing to the next level.

## Game description

In each level you start in a different superposition of |DEAD> and |ALIVE> (|0> = |DEAD>, |1> = |DEAD>). The superposition is shown to you in the Bloch sphere at the top left of the screen and in the formula at the top of the screen.

In the box there are several quantum gates. Each time you collect a gate your superposition changes accordingly. The goal is to transition, using the quantum gates, from the superposition state to the |ALIVE> state (|1>).

The level ends when:
       1. You are no longer in a superposition but in a defined state. If you are in the state |ALIVE> you pass the level. If you are in the state |DEAD> you fail.
       2. The time ends. If you are still in a superposition when the time ends and Dr. Schrodinger looks in the box your state colapses randomly to either |DEAD> or |ALIVE>. If you are in luck and you get the state alive you can pass the level. If not you fail. 

*Once the level has ended **press space** to pass to the next level or restart the level*

## Installation

The game has been developed and tested only on environments running Windows 10.
Prerequisites: Python 3.7, pip, Npm.

Clone or download the sources.

### Installing the server

Open a command prompt in an environment that has to Python 3.7 installed.

Run `pip install qiskit` to install Qiskit

Run `pip install flask` to install Flask

Run `pip install flask_restful` to install Flask Restfull

Run `pip install flask_cors` to install Flas Cors

Navigate to the working folder.
Run `python backend/schrody_server.py` to start the server. This will launch the server on "http://localhost:5000". Make sure the port is open.

### Run the client
Open a command prompt and navigate to the main working folder.

Run `npm start`

The game should start in a new browser tab

