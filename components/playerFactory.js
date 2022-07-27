// player factory that creates a player and a computer player 
// it takes in the argument of name

const playerFactory = (name) => {
    let isTurn = false;

    const getIsTurn = () => {
        console.log(isTurn);
    }

    const toggleTurn = () => {
        if (isTurn === false) {
            isTurn = true;
        } else {
            isTurn = false;
        }
    }

    const playerAttack = (coordinate, enemyBoard) => {
        if (name === 'computer') {
            // make a random attack
        }
            // check to see if the coordinate provided has already been played
            enemyBoard.receiveAttack(coordinate);
    }


    // function to get a random coordinate for computer player
    // test that the coordinate has not already been played on the player board
    const randomCoordinate = () => {

    }

    return { name, getIsTurn, toggleTurn, playerAttack }
}

export { playerFactory }