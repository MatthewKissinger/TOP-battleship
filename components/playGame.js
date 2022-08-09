import { playerFactory } from "./playerFactory.js";
import { gameboardFactory } from "./gameboardFactory.js";
import { shipFactory } from "./shipFactory.js";
import { renderDOM, updateGameboards } from "./domRender.js";

// 1 of each of the following ships
// carrier - length 5
// battleship - length 4
// cruiser - length 3
// submarine - length 3
// destroyer - length 2

// TODO 
// ** add in the rest of the player and comp ships
// test out a turn phase

// module global variables
let turn = 'player';

const playGame = () => {
    // create players
    const player = playerFactory('player');
    const computer = playerFactory('computer');

    // create the boards for each participant
    const playerBoard = gameboardFactory(player.name);
    const compBoard = gameboardFactory(computer.name);

    // player ship placement phase
    let destroyer = shipFactory('destroyer', 2, ['a2', 'a3']);
    let submarine = shipFactory('submarine', 3, ['b4', 'c4','d4']);

    playerBoard.placeShip(destroyer);
    playerBoard.placeShip(submarine);

    updateGameboards(playerBoard);

    gameLoop();
}

const gameLoop = () => {
    console.log('let the game begin');
    console.log(`${turn}'s turn`);

    if (turn === 'player') {
        playerTurn();
    } else {
        compTurn();
    }
}

const playerTurn = () => {
    console.log('my turn');
}

const compTurn = () => {

}

export { playGame }