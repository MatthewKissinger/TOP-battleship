// render the two gameboards and ship icons

const renderDOM = () => {
 
    console.log('rendering the dom');

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
    
    // render gameboard tiles

    for (let i = 97; i <= 106; i++) {
        for (let j = 1; j <= 10; j++) {
            let newTile1 = document.createElement('div');
            newTile1.classList.add('user-tile', `${String.fromCharCode(i)}${j}`);
            userGameboard.appendChild(newTile1);

            let newTile2 = document.createElement('div');
            newTile2.classList.add('comp-tile', `${String.fromCharCode(i)}${j}`);
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

export { renderDOM }