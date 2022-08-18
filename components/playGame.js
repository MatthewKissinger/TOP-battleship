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
// 1) create a timeout function for the computer display -- simulate the computer taking the time to think -- DONE
// 2) setup the gameover logic
//   ** create a clear function for rendering the gameboards -- it will activate once the rematch button is clicked
// 3) place ship icons in the UI container
// 4) when a corresponding ship is sunk on either gameboard, display that outcome on the ship icon
// 5) place all 5 ships for each gameboard manually and run through a few test games
// 6) workout the logic for both the user and computer placing ships on the board before the start of the game

// module global variables
let turn = 'player';

// these will all be unassiged, that way when having a rematch, they can be referenced to undefined again to wipe them
// add the player and user variables here -- unassigned
// add the player and user boards here -- unassigned
// add the player and comp ships here -- unassigned

// DOM cache
let messageDisplay = document.querySelector('.message-display');
let startBtn = document.querySelector('.game-start');
let resetBtn = document.querySelector('.reset-ships');
let compTurnBtn = document.querySelector('.comp-turn');
let userTurnBtn = document.querySelector('.user-turn');

let gameOverCont = document.querySelector('.game-over-cont');
let gameOverWinner = document.querySelector('.game-over-winner');
let rematchBtn = document.querySelector('.rematch-btn');

let userGameboard = document.querySelector('.user-tile-cont');
let compGameboard = document.querySelector('.comp-tile-cont');

const playGame = () => {

    // disallow clicking the enemy gameboard until the start game button has been pressed
    compGameboard.style.pointerEvents = "none";
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

    // Event Listeners

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hide');
        resetBtn.classList.add('hide');
        gameLoop();
    })

    compTurnBtn.addEventListener('click', () => {
        compTurnBtn.classList.add('hide');
        compTurn();
    })

    userTurnBtn.addEventListener('click', () => {
        userTurnBtn.classList.add('hide');
        playerTurn();
    }) 

    compGameboard.addEventListener('click', (e) => {
        let selection = e.target.dataset.coordinate;
        let message = player.playerAttack(selection, compBoard);
        let target = e.target;

        renderMessage(selection, message, target);
        
        if (message.gameOver === true) {
            gameOverFunc('player');
            return;
        }

        compTurnBtn.classList.remove('hide');

        compGameboard.style.pointerEvents = "none";

        turn = 'computer';
    }) 

    rematchBtn.addEventListener('click', (e) => {
        // clear rendering of hits and misses function -- build in the domRender module
        // 
        console.log('reset all variables and call playGame function again');
    })

    // start game function after clicking the startBtn or rematch button
    const gameLoop = () => {
        playerTurn();
    }

    const playerTurn = () => {
        messageDisplay.innerText = `Player's turn: select a tile on the computer's board`;

        // make sure the user is able to click the compGameboard
        compGameboard.style.pointerEvents = "auto";
    }

    const compTurn = () => {

        messageDisplay.innerText = `Computer's turn: please wait while an attack is processing...`;

        setTimeout(() => {
            let selection = computer.randomCoordinate();
            let message = computer.playerAttack(selection, playerBoard);

            // this while loop is to ensure that the computer picks a new random coordinate
            while (message === false) {
                selection = computer.randomCoordinate();
                message = computer.playerAttack(selection, playerBoard);
            }

            let tiles = userGameboard.children;
            let target;

            Array.from(tiles).forEach((element) => {
                if (selection.includes(element.dataset.coordinate)) {
                    target = element;
                }
            })

            renderMessage(selection, message, target);

            // create game over logic in a separate function
            if (message.gameOver === true) {
                gameOverFunc('computer');
                return;
            }

            turn = 'player';

            userTurnBtn.classList.remove('hide');
        }, 1000)
    }
}

const renderMessage = (selection, message, target) => {
    if (message.hit === undefined) {
        return;
    }

    let displayedMsg;

    if (message.hit === false) {
        displayedMsg = 'is a miss';
        renderHitOrMiss(target, 'miss');
    } else if (message.hit === true) {
        displayedMsg = 'is a hit';
        renderHitOrMiss(target, 'hit');
    }

    if (message.hit === true && message.shipIsSunk === true) {
        messageDisplay.innerText = `${selection} ${displayedMsg}, computer's ${message.sunkShipName} is sunk`;
    } else {
        messageDisplay.innerText = `${selection} ${displayedMsg}`;
    }
}

const gameOverFunc = (winner) => {
    gameOverCont.classList.remove('hide');

    gameOverWinner.innerText = `${winner} wins!`;

    // research how to make only the gameOverCont clickable when it becomes visible
}

export { playGame }