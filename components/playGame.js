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
// 1) test for computer picking the same coordinate that has already been played
// 2) create a timeout function for the computer display -- simulate the computer taking the time to think

// module global variables
let turn = 'player';

// DOM cache
let messageDisplay = document.querySelector('.message-display');
let startBtn = document.querySelector('.game-start');
let resetBtn = document.querySelector('.reset-ships');
let compTurnBtn = document.querySelector('.comp-turn');
let userTurnBtn = document.querySelector('.user-turn');

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
    
        playerTurn();
    }

    const playerTurn = () => {
        messageDisplay.innerText = `Player's turn: select a tile on the computer's board`;

        // make sure the user is able to click the compGameboard
        compGameboard.style.pointerEvents = "auto";
    }

    const compTurn = () => {
        console.log(`start computer's turn phase`);

        messageDisplay.innerText = `Computer's turn: please wait while an attack is processing...`;

        let selection = computer.randomCoordinate();
        let message = computer.playerAttack(selection, playerBoard);
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
            console.log('computer wins, game over');
        }

        turn = 'player';

        userTurnBtn.classList.remove('hide');
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

    // Event Listeners

    compTurnBtn.addEventListener('click', () => {
        compTurnBtn.classList.add('hide');
        compTurn();
    })

    compGameboard.addEventListener('click', (e) => {

        let selection = e.target.dataset.coordinate;
        let message = player.playerAttack(selection, compBoard);
        let target = e.target;

        renderMessage(selection, message, target);
        
        if (message.gameOver === true) {
            console.log('player wins, game over');
        }

        compTurnBtn.classList.remove('hide');

        compGameboard.style.pointerEvents = "none";

        turn = 'computer';
    })   

    userTurnBtn.addEventListener('click', () => {
        userTurnBtn.classList.add('hide');
        playerTurn();
    })  
}

export { playGame }