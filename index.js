// TO DO 

// # of ships and sizes to be placed on the gameboard
// go off of the hasbro rules for ages 7+

// 1 of each of the following ships
// carrier - length 5
// battleship - length 4
// cruiser - length 3
// submarine - length 3
// destroyer - length 2

// -- JS SANDBOX --
import { shipFactory } from "./components/shipFactory.js";
import { gameboardFactory } from "./components/gameboardFactory.js";
import { playerFactory } from "./components/playerFactory.js"

// testing variable
let destroyer = shipFactory('destroyer', 2, ['a2', 'a3']);
let submarine = shipFactory('submarine', 3, ['b4', 'c4','d4']);

// add all 5 ships for tests more test ships
// add computer player for tests

const player = playerFactory('Matt');
const computer = playerFactory('computer');

const playerBoard = gameboardFactory(player.name);
const compBoard = gameboardFactory(computer.name);

playerBoard.placeShip(destroyer);
playerBoard.placeShip(submarine);

computer.playerAttack('a2', playerBoard);

// playerBoard.receiveAttack('a2');

// playerBoard.receiveAttack('b4');

// playerBoard.receiveAttack('a3');

// playerBoard.receiveAttack('c4');

// playerBoard.receiveAttack('d4');





