import { playerFactory } from "./playerFactory.js";
import { gameboardFactory } from "./gameboardFactory.js";
import { shipFactory } from "./shipFactory.js";
import { updateGameboard } from "./domRender.js";

// 1 of each of the following ships
// carrier - length 5
// battleship - length 4
// cruiser - length 3
// submarine - length 3
// destroyer - length 2

// TODO 
// ** add in 2 computer ships
// ** test out a game with the appropriate messages and event listeners being displayed

// module global variables
let turn = 'player';

// DOM cache
let messageDisplay = document.querySelector('.message-display');
let startBtn = document.querySelector('.game-start');

let userGameboard = document.querySelector('.user-tile-cont');
let compGameboard = document.querySelector('.comp-tile-cont');

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

    let compDestroyer = shipFactory('destroyer', 2, ['c1', 'd1']);
    let compSubmarine = shipFactory('submarine', 3, ['e5', 'e6', 'e7']);

    compBoard.placeShip(compDestroyer);
    compBoard.placeShip(compSubmarine);

    // renders the ships placed on the gameboard
    updateGameboard(playerBoard);
    updateGameboard(compBoard);

    startBtn.addEventListener('click', () => {
        gameLoop();
    })
}

const gameLoop = () => {
    console.log('let the game begin');

    if (turn === 'player') {
        playerTurn();
    } else {
        compTurn();
    }
}

const playerTurn = () => {
    messageDisplay.innerText = `Player's turn: select a tile on the computer's board`;

    compGameboard.addEventListener('click', (e) => {
        console.log(e.target);
    })
}

const compTurn = () => {

}

export { playGame }