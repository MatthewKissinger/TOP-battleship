// TO DO 

// -- JS SANDBOX --
import { shipFactory } from "./components/shipFactory.js";
import { gameboardFactory } from "./components/gameboardFactory.js";

// testing variable
let patrolBoat1 = shipFactory('patrolBoat1', 2, ['a2', 'a3']);

const mattBoard = gameboardFactory('Matt');

console.log(mattBoard.placedShips);

mattBoard.placeShip(patrolBoat1);

console.log(mattBoard.placedShips);




