import { playerFactory } from "./playerFactory.js";
import { gameboardFactory } from "./gameboardFactory.js";
import { shipFactory } from "./shipFactory.js";
import { renderShips, renderHitOrMiss } from "./domRender.js";

// 1 of each of the following ships
// carrier - length 5
// battleship - length 4
// cruiser - length 3
// submarine - length 3
// destroyer - length 2

// TODO 
// ** test for all comp battleships being sunk and then display game over

// ** test out a game with the appropriate messages and event listeners being displayed

// module global variables
let turn = 'player';

// DOM cache
let messageDisplay = document.querySelector('.message-display');
let startBtn = document.querySelector('.game-start');
let resetBtn = document.querySelector('.reset-ships');

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
    renderShips(playerBoard);
    renderShips(compBoard);

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hide');
        resetBtn.classList.add('hide');
        gameLoop();
    })

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
            let selection = e.target.dataset.coordinate;

            let message = player.playerAttack(selection, compBoard);

            console.log(message);

            if (message === undefined) {
                return;
            }

            let displayedMsg;

            if (message.hit === false) {
                displayedMsg = 'is a miss';
                renderHitOrMiss(e.target, 'miss');

            } else if (message.hit === true) {
                displayedMsg = 'is a hit';
                renderHitOrMiss(e.target, 'hit');
            }

            if (message.hit === true && message.shipIsSunk === true) {
                messageDisplay.innerText = `${selection} ${displayedMsg}, computer's ${message.sunkShipName} is sunk`;
            } else {
                messageDisplay.innerText = `${selection} ${displayedMsg}`;
            }
            
            if (message.gameOver === true) {
                console.log('player wins, game over');
            }
        })
    }

    const compTurn = () => {

    }
}

export { playGame }