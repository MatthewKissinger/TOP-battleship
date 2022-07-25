// TO DO 

// # of ships and sizes to be placed on the gameboard
// go off of the hasbro rules for ages 7+

// -- JS SANDBOX --
import { shipFactory } from "./components/shipFactory.js";
import { gameboardFactory } from "./components/gameboardFactory.js";

// testing variable
let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

// add 2 more test ships

const mattBoard = gameboardFactory('Matt');

mattBoard.placeShip(patrolBoat1);

mattBoard.receiveAttack('a2');

console.log(mattBoard.gameboard);

mattBoard.receiveAttack('b4');

console.log(mattBoard.gameboard);

mattBoard.receiveAttack('a3');




