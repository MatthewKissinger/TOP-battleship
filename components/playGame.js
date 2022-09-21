import { playerFactory } from "./playerFactory.js";
import { gameboardFactory } from "./gameboardFactory.js";
import { shipFactory } from "./shipFactory.js";
import { renderShips, renderHitOrMiss, renderDOM, renderShipsSunkUI, resetShipNamesUI } from "./domRender.js";

// 1 of each of the following ships
// carrier - length 5
// battleship - length 4
// cruiser - length 3
// submarine - length 3
// destroyer - length 2

// TODO 
// 1) workout the logic for both the user and computer placing ships on the board before the start of the game

// *** GLOBAL VARIABLES
let player;
let computer;

let playerBoard;
let compBoard;

let destroyer;
let submarine;

let compDestroyer;
let compSubmarine;

// global variable -- change to true once all of the ships have been placed, this will trigger the compBoard click event listener for the game
let shipsPlaced = false;
let placeShipsCounter = 1;
let currentTile = '';
let orientation = 'horizontal';

// *** DOM CACHE ***
let messageDisplay = document.querySelector('.message-display');
let startBtn = document.querySelector('.game-start');
let resetBtn = document.querySelector('.reset-ships');
let shipDirectionBtn = document.querySelector('.ship-direction');
let nextBtn = document.querySelector('.next-ship');
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
    player = playerFactory('player');
    computer = playerFactory('computer');

    // create the boards for each participant
    playerBoard = gameboardFactory(player.name);
    compBoard = gameboardFactory(computer.name);

    // player ship placement phase
    // submarine = shipFactory('Submarine', 3, ['b4', 'c4','d4']);

    // playerBoard.placeShip(submarine);

    compDestroyer = shipFactory('Destroyer', 2, ['c1', 'd1']);
    compSubmarine = shipFactory('Submarine', 3, ['e5', 'e6', 'e7']);

    compBoard.placeShip(compDestroyer);
    compBoard.placeShip(compSubmarine);

    renderShips(compBoard);

    // *** EVENT LISTENERS ***

    resetBtn.addEventListener('click', () => {
        console.log('run the reset ship location function');
    });

    shipDirectionBtn.addEventListener('click', () => {
        changeOrientation(orientation);
    });

    nextBtn.addEventListener('click', () => {
        console.log('move on to the next ship to be placed');
    });

    userGameboard.addEventListener('click', placeUserShips, false);

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hide');
        resetBtn.classList.add('hide');
        gameLoop();
    });

    compTurnBtn.addEventListener('click', onCompTurnBtnClick, false);

    userTurnBtn.addEventListener('click', () => {
        userTurnBtn.classList.add('hide');
        playerTurn();
    }); 

    compGameboard.addEventListener('click', onCompGameboardClick, false); 
    
    rematchBtn.addEventListener('click', (e) => {
        console.log('reset all variables and call playGame function again');
        renderDOM();
        resetShipNamesUI();
        resetVariables();

        // remove all event listeners that duplicate
        compTurnBtn.removeEventListener('click', onCompTurnBtnClick, false);
        compGameboard.removeEventListener('click', onCompGameboardClick, false);

        playGame();
        gameOverCont.classList.add('hide');
        resetBtn.classList.remove('hide');
        startBtn.classList.remove('hide');

        messageDisplay.innerText = `Press Start to Begin the Game`;
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
}

const renderMessage = (selection, message, target, board) => {
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
        let boardName;
        if (board === 'comp') {
            boardName = 'computer';
        } else {
            boardName = 'user';
        }

        messageDisplay.innerText = `${selection} ${displayedMsg}, ${boardName}'s ${message.sunkShipName} is sunk`;
        renderShipsSunkUI(compBoard.gameboard.ships, board);
    } else {
        messageDisplay.innerText = `${selection} ${displayedMsg}`;
    }
}

// *** GLOBAL FUNCTIONS ***

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

        renderMessage(selection, message, target, 'player');

        // create game over logic in a separate function
        if (message.gameOver === true) {
            gameOverFunc('computer');
            return;
        }

        userTurnBtn.classList.remove('hide');
    }, 1000)
}

const onCompTurnBtnClick = () => {
    compTurnBtn.classList.add('hide');
    compTurn();
}

const onCompGameboardClick = (e) => {
    let selection = e.target.dataset.coordinate;
    let message = player.playerAttack(selection, compBoard);
    let target = e.target;

    renderMessage(selection, message, target, 'comp');
    
    if (message.gameOver === true) {
        gameOverFunc('player');
        return;
    }

    compTurnBtn.classList.remove('hide');

    compGameboard.style.pointerEvents = "none";
}

const gameOverFunc = (winner) => {
    compGameboard.style.pointerEvents = "none";
    gameOverCont.classList.remove('hide');

    gameOverWinner.innerText = `${winner} wins!`;

}

const resetVariables = () => {
    player = undefined;
    computer = undefined;

    playerBoard = undefined;
    compBoard = undefined;

    destroyer = undefined;
    submarine = undefined;

    compDestroyer = undefined;
    compSubmarine = undefined;
}

const placeUserShips = (e) => {
    // stop click events on user gameboard
    // userGameboard.style.pointerEvents = 'none';

    let length;

    currentTile = e.target;

    console.log(currentTile);

    let coordinates = [];
    let targetCoordinate = e.target.dataset.coordinate;
    let targetCoordinateLetter = targetCoordinate.slice(0, 1);
    let targetCoordinateNum = targetCoordinate.slice(1, targetCoordinate.length);

    console.log(targetCoordinateNum);

    coordinates.push(targetCoordinate);

    console.log(playerBoard.gameboard.ships);

    if (placeShipsCounter === 1) {
        length = 2;
        playerBoard.gameboard.ships.splice((placeShipsCounter - 1), 1);
        renderShips(playerBoard);

        if (orientation === 'horizontal') {
            if (parseInt(targetCoordinateNum) === 10) {
                messageDisplay.innerText = 'Invalid tile. Make another selection';
                return;
            } else {
                messageDisplay.innerText = 'Press next to confirm selection';
            }

            for (let i = 1; i < length; i++) {
                let newCoordinate = targetCoordinateLetter + (parseInt(targetCoordinateNum) + i);
                coordinates.push(newCoordinate);
            }
            destroyer = shipFactory('Destroyer', 2, coordinates);
            playerBoard.placeShip(destroyer);
            renderShips(playerBoard);
        } else if (orientation === 'vertical') {
            
        }

    }

    // changes the orientation
    // explore adding a button to change the orientation on click
    // let selectedTile = e.target;
    // selectedTile.addEventListener('click', changeOrientation(orientation), false);

    console.log(coordinates);
}

const changeOrientation = (direction) => {
        if (direction === 'horizontal') {
            orientation = 'vertical';
            shipDirectionBtn.innerText = 'vertical';
        } else {
            orientation = 'horizontal';
            shipDirectionBtn.innerText = 'horizontal';
        }
        
        console.log(orientation);
}

export { playGame }