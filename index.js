// TO DO 

// # of ships and sizes to be placed on the gameboard

// -- JS SANDBOX --
import { shipFactory } from "./components/shipFactory.js";
import { gameboardFactory } from "./components/gameboardFactory.js";

// testing variable
let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

// add another test ship

const mattBoard = gameboardFactory('Matt');

mattBoard.placeShip(patrolBoat1);

mattBoard.receiveAttack('a2');

console.log(mattBoard.gameboard);

mattBoard.receiveAttack('b4');

console.log(mattBoard.gameboard);

mattBoard.receiveAttack('a3');




