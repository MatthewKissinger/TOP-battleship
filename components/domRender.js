// render the two gameboards and ship icons

// cache DOM
let messageDisplay = document.querySelector('.message-display');
let startBtn = document.querySelector('.game-start');
let main = document.querySelector('main');

let userGameboard = document.querySelector('.user-tile-cont');
let userGameboardColLabel = document.querySelector('.user-gameboard-col-label');
let userGameboardRowLabel = document.querySelector('.user-gameboard-row-label');

let compGameboard = document.querySelector('.comp-tile-cont');
let compGameboardColLabel = document.querySelector('.comp-gameboard-col-label');
let compGameboardRowLabel = document.querySelector('.comp-gameboard-row-label');

const renderDOM = () => {
 
    console.log('rendering the dom');

    // render gameboard tiles
    // update the coordinate letter and # combo to be placed in a data attribute

    for (let i = 97; i <= 106; i++) {
        for (let j = 1; j <= 10; j++) {
            let newTile1 = document.createElement('div');
            newTile1.classList.add('user-tile');
            newTile1.dataset.coordinate = `${String.fromCharCode(i)}${j}`;
            userGameboard.appendChild(newTile1);

            let newTile2 = document.createElement('div');
            newTile2.classList.add('comp-tile');
            newTile2.dataset.coordinate = `${String.fromCharCode(i)}${j}`;
            compGameboard.appendChild(newTile2);
        }
    }

    // render the gameboard row labels

    for (let i = 97; i <= 106; i++) {
        let newLabel1 = document.createElement('div');
        newLabel1.innerText = `${String.fromCharCode(i)}`;
        newLabel1.classList.add('tile-label');
        userGameboardRowLabel.appendChild(newLabel1);

        let newLabel2 = document.createElement('div');
        newLabel2.innerText = `${String.fromCharCode(i)}`;
        newLabel2.classList.add('tile-label');
        compGameboardRowLabel.appendChild(newLabel2);
    }

    // render the gameboard column labels

    for (let i = 1; i <= 10; i++) {
        let newLabel1 = document.createElement('div');
        newLabel1.innerText = i;
        newLabel1.classList.add('tile-label');
        userGameboardColLabel.appendChild(newLabel1);

        let newLabel2 = document.createElement('div');
        newLabel2.innerText = i;
        newLabel2.classList.add('tile-label');
        compGameboardColLabel.appendChild(newLabel2);
    }  
}

// takes in the hits and misses for each gameboard and represents the value for each coordinate on the corresponding tile's dataset-coordinate  
const updateGameboards = (playerBoard) => {
    let playerShipArray = playerBoard.gameboard.ships;
    console.log('updating ships placed for user');

    let playerShipCoordinates = [];

    playerShipArray.forEach((ship) => {
        ship.coordinates.forEach((coordinate) => {
            playerShipCoordinates.push(coordinate);
        })
    })

    // find the user tiles that match the playerShipCoordinates array and color in the background color gray
    let userTiles = userGameboard.children;

    // convert userTiles HTMLCollection into an array then loop through each tile and test if it is a coordinate that has a placed ship
    Array.from(userTiles).forEach((element) => {
      if (playerShipCoordinates.includes(element.dataset.coordinate)) {
        element.style.backgroundColor = 'lightgray';
      }
    })
}

export { renderDOM, updateGameboards }