import { playerFactory } from "./playerFactory.js";
import { gameboardFactory } from "./gameboardFactory.js";
import { shipFactory } from "./shipFactory.js";
import { renderShips, renderHitOrMiss, renderDOM, renderShipsSunkUI, resetShipNamesUI } from "./domRender.js";

// *** GLOBAL VARIABLES
let player;
let computer;

let playerBoard;
let compBoard;

let destroyer;
let submarine;
let battleship;
let carrier;

let compDestroyer;
let compSubmarine;
let compBattleship;
let compCarrier;

// global variable -- change to true once all of the ships have been placed, this will trigger the compBoard click event listener for the game
let shipsPlaced = false;
let placeShipsCounter = 1;
let orientation = 'horizontal';

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
        console.log(validShipTiles);
        if (validShipTiles === true) {
            if (validShipTiles === true && placeShipsCounter === 4) {
                console.log('this is the last ship');
                shipDirectionBtn.classList.add('hide');
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
    });

    userGameboard.addEventListener('click', () => {placeShips(event, playerBoard)}, false);

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
    battleship = undefined;
    carrier = undefined;

    compDestroyer = undefined;
    compSubmarine = undefined;
    compBattleship = undefined;
    compCarrier = undefined;
}

const placeShips = (e, board) => {
    // stop click events on user gameboard
    // userGameboard.style.pointerEvents = 'none';

    let length;

    let coordinates = [];
    let targetCoordinate = e.target.dataset.coordinate;
    let targetCoordinateLetter = targetCoordinate.slice(0, 1);
    let targetCoordinateNum = targetCoordinate.slice(1, targetCoordinate.length);

    coordinates.push(targetCoordinate);

    let placedShipCoordinates = board.gameboard.ships;
    let overlap = false;

    length = placeShipsCounter + 1;
    board.gameboard.ships.splice((placeShipsCounter - 1), 1);
    renderShips(board);

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
        // move into a separate function
        placedShipCoordinates.forEach((ship) => {
            ship.coordinates.forEach((coordinate) => {
                console.log(coordinate);
                if (coordinates.includes(coordinate)) {
                    console.log('invalid tile');
                    overlap = true;
                }
            })
        })

        if (overlap === true) {
            messageDisplay.innerText = "Invalid tile. Make another selection";
            return;
        } else {
            placeShipsRender(placeShipsCounter, length, coordinates, board);
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
        // move into separate function
        placedShipCoordinates.forEach((ship) => {
            ship.coordinates.forEach((coordinate) => {
                console.log(coordinate);
                if (coordinates.includes(coordinate)) {
                    console.log('invalid tile');
                    overlap = true;
                }
            })
        })

        if (overlap === true) {
            messageDisplay.innerText = "Invalid tile. Make another selection";
            return;
        } else {
            placeShipsRender(placeShipsCounter, length, coordinates, board);
        }
    }   
}

const placeShipsRender = (placeShipsCounter, length, coordinates, board) => {
    switch(placeShipsCounter) {
        case 1:
            destroyer = shipFactory('Destroyer', length, coordinates);
            board.placeShip(destroyer);
            renderShips(board);
            break;
        case 2:
            submarine = shipFactory('Submarine', length, coordinates);
            board.placeShip(submarine);
            renderShips(board);
            break;
        case 3:
            battleship = shipFactory('Battleship', length, coordinates);
            board.placeShip(battleship);
            renderShips(board);
            break;
        case 4:
            carrier = shipFactory('Carrier', length, coordinates);
            board.placeShip(carrier);
            renderShips(board);    
    }

    validShipTiles = true;
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

export { playGame }