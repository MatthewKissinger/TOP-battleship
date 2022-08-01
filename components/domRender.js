// render the two gameboards and ship icons
// place a message display to show who's turn it is and the outcome of a playerAttack

const renderDOM = () => {
    // create playerboard
    // create compboard
    console.log('rendering the dom');

    // cache DOM
    let messageDisplay = document.querySelector('.message-display');
    let startBtn = document.querySelector('.game-start');
    let main = document.querySelector('main');

    console.log(main.innerText);
}

export { renderDOM }