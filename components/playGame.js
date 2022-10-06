import { playerFactory } from "./playerFactory.js";
import { gameboardFactory } from "./gameboardFactory.js";
import { shipFactory } from "./shipFactory.js";
import { renderShips, renderHitOrMiss, renderDOM, renderShipsSunkUI, resetShipNamesUI } from "./domRender.js";

// TODO LIST

// *** GLOBAL VARIABLES
let player;
let computer;

let playerBoard;
let compBoard;

let destroyer;
let submarine;
let battleship;
let carrier;

// global variable -- change to true once all of the ships have been placed, this will trigger the compBoard click event listener for the game
let placeShipsCounter = 1;
let orientation = 'horizontal';
let overlap = false;

// used to test whether the user can proceed to placing the next ship by pressing the next button
let validShipTiles = false;

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

    // *** EVENT LISTENERS ***

    resetBtn.addEventListener('click', onResetBtnClick, false);

    shipDirectionBtn.addEventListener('click', onShipDirectionBtnClick, false);

    nextBtn.addEventListener('click', onNextBtnClick, false);

    userGameboard.addEventListener('click', () => {placeShips(event, playerBoard)}, false);

    startBtn.addEventListener('click', onStartBtnClick, false);

    compTurnBtn.addEventListener('click', onCompTurnBtnClick, false);

    userTurnBtn.addEventListener('click', onUserTurnBtnClick, false); 

    compGameboard.addEventListener('click', onCompGameboardClick, false); 
    
    rematchBtn.addEventListener('click', onRematchBtnClick, false);
}

// *** GLOBAL FUNCTIONS ***

// start game function after clicking the startBtn or rematch button
const gameLoop = () => {
    playerTurn();
}

const playerTurn = () => {
    messageDisplay.innerText = `Player's turn: select a tile on the computer's board`;

    // make sure the user is able to click the compGameboard
    compGameboard.style.pointerEvents = "auto";
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
            renderShipsSunkUI(compBoard.gameboard.ships, board);
        } else {
            boardName = 'user';
            renderShipsSunkUI(playerBoard.gameboard.ships, board);
        }

        messageDisplay.innerText = `${selection} ${displayedMsg}, ${boardName}'s ${message.sunkShipName} is sunk`;
    } else {
        messageDisplay.innerText = `${selection} ${displayedMsg}`;
    }
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

        renderMessage(selection, message, target, 'player');

        // create game over logic in a separate function
        if (message.gameOver === true) {
            gameOverFunc('computer');
            return;
        }

        userTurnBtn.classList.remove('hide');
    }, 1000)
}

// EVENT Listener declared functions

const onResetBtnClick = () => {
    console.log('run the reset ship location function');
    renderDOM();
    resetShipNamesUI();
    resetVariables();
    placeShipsCounter = 1;
    overlap = false;
    validShipTiles = false;
    messageDisplay.innerText = 'Click a coordinate on the User board to place your Ships';
    // remove event listeners -- place reset into new function?
    removeAllEventListeners();
    playGame();
}

const onRematchBtnClick = () => {
    console.log('reset all variables and call playGame function again');
    renderDOM();
    resetShipNamesUI();
    resetVariables();

    // remove all event listeners that duplicate
    removeAllEventListeners();

    gameOverCont.classList.add('hide');
    resetBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    shipDirectionBtn.classList.remove('hide');

    placeShipsCounter = 1;
    overlap = false;
    validShipTiles = false;

    messageDisplay.innerText = `Click a coordinate on the User board to place your Ships`;
    userGameboard.style.pointerEvents = 'auto';
    playGame();
}

const onShipDirectionBtnClick = () => {
    changeOrientation(orientation);
}

const onCompTurnBtnClick = () => {
    compTurnBtn.classList.add('hide');
    compTurn();
}

const onUserTurnBtnClick = () => {
    userTurnBtn.classList.add('hide');
    playerTurn();
}

const onUserSelectsUsedTile = () => {
    messageDisplay.innerText = 'That tile has already been selected, choose another';
    // make sure the user is able to click the compGameboard
    compGameboard.style.pointerEvents = "auto";
}

const onCompGameboardClick = (e) => {
    let selection = e.target.dataset.coordinate;
    let message = player.playerAttack(selection, compBoard);
    let target = e.target;

    console.log(message);

    renderMessage(selection, message, target, 'comp');
    
    if (message.gameOver === true) {
        gameOverFunc('player');
        return;
    }

    if (message !== false) {
        compTurnBtn.classList.remove('hide');
        compGameboard.style.pointerEvents = "none";
    }
}

const onNextBtnClick = () => {
    // console.log(validShipTiles);
        if (validShipTiles === true) {
            if (validShipTiles === true && placeShipsCounter === 4) {
                shipDirectionBtn.classList.add('hide');
                resetBtn.classList.add('hide');
                nextBtn.classList.add('hide');
                startBtn.classList.remove('hide');
                messageDisplay.innerText = "Press the start button to confirm your ship placements and begin the match";
                return;
            }
            placeShipsCounter++;
            validShipTiles = false;
            messageDisplay.innerText = "Click a coordinate to place your next ship";
        } else {
            messageDisplay.innerText = "ship not placed or valid coordinate not selected, choose again";
        }
}

const onStartBtnClick = () => {
    // stop click events on user gameboard
    userGameboard.style.pointerEvents = 'none';
    // reset global variables for the computer's placement
    validShipTiles = false;
    placeShipsCounter = 1;

    for (let i = 0; i < 4; i++) {

        while (validShipTiles === false) {
            placeShips(event, compBoard); 
        }
        placeShipsCounter++;
        validShipTiles = false;
    }

    startBtn.classList.add('hide');
    gameLoop();
}

// ---------------------------

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
    battleship = undefined;
    carrier = undefined;
}

const removeAllEventListeners = () => {
    resetBtn.removeEventListener('click', onResetBtnClick, false);

    shipDirectionBtn.removeEventListener('click', onShipDirectionBtnClick, false);

    nextBtn.removeEventListener('click', onNextBtnClick, false);

    startBtn.removeEventListener('click', onStartBtnClick, false);

    compTurnBtn.removeEventListener('click', onCompTurnBtnClick, false);

    userTurnBtn.removeEventListener('click', onUserTurnBtnClick, false); 

    compGameboard.removeEventListener('click', onCompGameboardClick, false); 
    
    rematchBtn.removeEventListener('click', onRematchBtnClick, false);
}

// ** place ships logic ** 

const placeShips = (e, board) => {

    let length;
    let coordinates = [];
    let targetCoordinate;

    if (board === compBoard) {
        targetCoordinate = computer.randomCoordinate();

        // randomize ship orientation function here **
        randomOrientation();
    } else {
        targetCoordinate = e.target.dataset.coordinate;
    }

    let targetCoordinateLetter = targetCoordinate.slice(0, 1);
    let targetCoordinateNum = targetCoordinate.slice(1, targetCoordinate.length);

    coordinates.push(targetCoordinate);

    let placedShipCoordinates = board.gameboard.ships;

    length = placeShipsCounter + 1;
    board.gameboard.ships.splice((placeShipsCounter - 1), 1);
    if (board.gameboard.user === 'player') {
        renderShips(board);
    }

    if (orientation === 'horizontal') {
        if ((parseInt(targetCoordinateNum) + (length - 1)) > 10) {
            messageDisplay.innerText = 'Invalid tile. Make another selection';
            return;
        } else {
            messageDisplay.innerText = 'Press next to confirm selection';
        }

        for (let i = 1; i < length; i++) {
            let newCoordinate = targetCoordinateLetter + (parseInt(targetCoordinateNum) + i);
            coordinates.push(newCoordinate);
        }

        // test if any of the coordinates are in the board.gameboard.ships arrays
        testForOverlap(placedShipCoordinates, coordinates);

        if (overlap === true) {
            messageDisplay.innerText = "Invalid tile. Make another selection";
            return;
        } else {
            placeShipsRender(placeShipsCounter, length, coordinates, board);
            if (board.gameboard.user === 'player' && placeShipsCounter === 4) {
                lastUserShipPlaced();
            }
        }

    } else if (orientation === 'vertical') {
        let letterCharCode = targetCoordinateLetter.charCodeAt(0); 

        if ((parseInt(letterCharCode) + (length - 1)) > 106) {
            messageDisplay.innerText = 'Invalid tile. Make another selection';
            return;
        } else {
            messageDisplay.innerText = 'Press next to confirm selection';
        }

        for (let i = 1; i < length; i++) {
            let newCoordinate = String.fromCharCode(letterCharCode + i) + targetCoordinateNum;
            coordinates.push(newCoordinate);
        }

        // test if any of the coordinates are in the board.gameboard.ships arrays
        testForOverlap(placedShipCoordinates, coordinates);

        if (overlap === true) {
            messageDisplay.innerText = "Invalid tile. Make another selection";
            return;
        } else {
            placeShipsRender(placeShipsCounter, length, coordinates, board);
            if (board.gameboard.user === 'player' && placeShipsCounter === 4) {
                lastUserShipPlaced();
            }
        }
    }   
}

const placeShipsRender = (placeShipsCounter, length, coordinates, board) => {
    switch(placeShipsCounter) {
        case 1:
            destroyer = shipFactory('Destroyer', length, coordinates);
            board.placeShip(destroyer);
            if (board.gameboard.user === 'player') {
                renderShips(board);
            }
            break;
        case 2:
            submarine = shipFactory('Submarine', length, coordinates);
            board.placeShip(submarine);
            if (board.gameboard.user === 'player') {
                renderShips(board);
            }
            break;
        case 3:
            battleship = shipFactory('Battleship', length, coordinates);
            board.placeShip(battleship);
            if (board.gameboard.user === 'player') {
                renderShips(board);
            }
            break;
        case 4:
            carrier = shipFactory('Carrier', length, coordinates);
            board.placeShip(carrier);
            if (board.gameboard.user === 'player') {
                renderShips(board);
            }  
    }

    validShipTiles = true;
}

const testForOverlap = (placedShipCoordinates, coordinates) => {
    overlap = false;

    placedShipCoordinates.forEach((ship) => {
        ship.coordinates.forEach((coordinate) => {
            if (coordinates.includes(coordinate)) {
                overlap = true;
            }
        })
    })
}

const lastUserShipPlaced = () => {
    messageDisplay.innerText = 'Clicking next will confirm your ship placements, last chance to reset';
}

const changeOrientation = (direction) => {
        if (direction === 'horizontal') {
            orientation = 'vertical';
            shipDirectionBtn.innerText = 'vertical';
        } else {
            orientation = 'horizontal';
            shipDirectionBtn.innerText = 'horizontal';
        }
}

const randomOrientation = () => {
    let randomNum = Math.floor((Math.random() * 10) + 1);

    if (randomNum >= 6) {
        orientation = 'vertical';
    } else {
        orientation = 'horizontal';
    }
}

export { playGame, onUserSelectsUsedTile }