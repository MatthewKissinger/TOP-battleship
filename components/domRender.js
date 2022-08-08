// render the two gameboards and ship icons

const renderDOM = () => {
    // create playerboard
    // create compboard
    console.log('rendering the dom');

    // cache DOM
    let messageDisplay = document.querySelector('.message-display');
    let startBtn = document.querySelector('.game-start');
    let main = document.querySelector('main');

    let userGameboard = document.querySelector('.user-tile-cont');
    let compGameboard = document.querySelector('.comp-tile-cont');

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
}

export { renderDOM }